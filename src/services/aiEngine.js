/**
 * Virtual Patient AI Engine using Groq API via Environment Variables
 */

const GROQ_API_KEY =
  import.meta.env?.VITE_GROQ_API_KEY ||
  process.env?.REACT_APP_GROQ_API_KEY ||
  process.env?.GROQ_API_KEY ||
  "";

export async function queryVirtualPatient(
  osceCase,
  userQuestion,
  dialogueHistory,
) {
  if (GROQ_API_KEY && GROQ_API_KEY.trim().length > 0) {
    try {
      const systemPrompt = `You are playing the role of a medical patient named ${osceCase.patientProfile.name}, a ${osceCase.patientProfile.age}-year-old ${osceCase.patientProfile.gender}.
Chief Complaint: ${osceCase.script.chiefComplaint}.
History of Present Illness: ${osceCase.script.historyOfPresentIllness}
Past Medical History: ${osceCase.script.pastMedicalHistory}
Medications & Allergies: ${osceCase.script.medicationsAndAllergies}
Family/Social History: ${osceCase.script.familyAndSocialHistory}

CRITICAL RULES:
1. Speak naturally as a patient using non-medical, layperson terms.
2. DO NOT state or reveal your exact diagnosis (${osceCase.script.hiddenDiagnosis}) directly.
3. Keep answers brief and realistic (1-3 sentences maximum).
4. Answer strictly based on your patient script.`;

      const messages = [{ role: "system", content: systemPrompt }];

      dialogueHistory
        .filter((m) => m.sender === "student" || m.sender === "patient")
        .forEach((m) => {
          messages.push({
            role: m.sender === "student" ? "user" : "assistant",
            content: m.text,
          });
        });

      messages.push({ role: "user", content: userQuestion });

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: messages,
            temperature: 0.7,
            max_tokens: 250,
          }),
        },
      );

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    } catch (error) {
      console.warn(
        "Groq API call failed, falling back to local rule engine:",
        error,
      );
    }
  }

  return fallbackPatientLogic(osceCase, userQuestion);
}

function fallbackPatientLogic(osceCase, question) {
  const q = question.toLowerCase();
  const script = osceCase.script;

  if (
    q.includes("pain") ||
    q.includes("feel") ||
    q.includes("hurt") ||
    q.includes("happen") ||
    q.includes("start") ||
    q.includes("onset")
  ) {
    return script.historyOfPresentIllness;
  }
  if (
    q.includes("medication") ||
    q.includes("pill") ||
    q.includes("drug") ||
    q.includes("allerg")
  ) {
    return script.medicationsAndAllergies;
  }
  if (
    q.includes("past") ||
    q.includes("before") ||
    q.includes("medical") ||
    q.includes("condition") ||
    q.includes("disease")
  ) {
    return script.pastMedicalHistory;
  }
  if (
    q.includes("family") ||
    q.includes("smoke") ||
    q.includes("drink") ||
    q.includes("work") ||
    q.includes("job") ||
    q.includes("live")
  ) {
    return script.familyAndSocialHistory;
  }

  return `I am not sure, doctor. Main problem is ${script.chiefComplaint.toLowerCase()}.`;
}

/**
 * Evaluates the student's entire session using Groq LLM with a secure fallback structure.
 */
export async function evaluateSession(
  osceCase,
  dialogue,
  performedExams,
  provisional,
  differentials,
  reasoning,
) {
  const targetDiagnosis =
    osceCase?.script?.hiddenDiagnosis || "Clinical Target Condition";

  if (GROQ_API_KEY && GROQ_API_KEY.trim().length > 0) {
    try {
      const evaluationPrompt = `You are a strict medical OSCE examiner evaluating a student encounter.
Case Target Diagnosis: ${targetDiagnosis}
Case Summary/Key Findings: ${osceCase?.script?.historyOfPresentIllness || ""}

Student's Submitted Provisional Diagnosis: "${provisional}"
Student's Differential Diagnoses: "${JSON.stringify(differentials)}"
Student's Performed Examinations: "${JSON.stringify(performedExams)}"
Student's Reasoning: "${reasoning}"

Evaluate the student and return ONLY a valid JSON object (no markdown wrapping, no extra text) with this exact structure:
{
  "historyScore": (number 0-100),
  "examScore": (number 0-100),
  "diagnosisScore": (number 0-100),
  "reasoningScore": (number 0-100),
  "overall": (number 0-100),
  "xpEarned": (number),
  "feedback": "Overall summary of performance",
  "historyCorrect": ["Required history questions/findings for this case"],
  "examCorrect": ["Required physical examinations/vitals for this case"],
  "diagnosisCorrect": ["The correct primary diagnosis: ${targetDiagnosis}"],
  "reasoningCorrect": ["Key pathophysiological reasoning steps required"]
}`;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "system", content: evaluationPrompt }],
            temperature: 0.2,
            max_tokens: 800,
          }),
        },
      );

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (content) {
        const cleanedJSON = content
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        const parsed = JSON.parse(cleanedJSON);
        if (parsed && typeof parsed.overall === "number") {
          return parsed;
        }
      }
    } catch (error) {
      console.warn(
        "Groq evaluation API call failed, using fallback rubric evaluation:",
        error,
      );
    }
  }

  // Fallback Rule Engine ensuring properties are never undefined
  const isMatch = provisional
    .toLowerCase()
    .includes(targetDiagnosis.toLowerCase());

  const historyScore = Math.min(100, Math.max(30, dialogue.length * 12));
  const examScore = Math.min(100, Math.max(20, performedExams.length * 40));
  const diagnosisScore = isMatch ? 95 : 35;
  const reasoningScore = reasoning.trim().length > 25 ? 85 : 45;
  const overall = Math.round(
    (historyScore + examScore + diagnosisScore + reasoningScore) / 4,
  );

  return {
    historyScore,
    examScore,
    diagnosisScore,
    reasoningScore,
    overall,
    xpEarned: overall * 3,
    feedback: isMatch
      ? `Great job! You accurately synthesized the clinical presentation and correctly identified ${targetDiagnosis}.`
      : `Your differential covers common complaints, but you missed key criteria for ${targetDiagnosis}.`,
    historyCorrect: [
      `Detailed timeline and onset of ${osceCase?.script?.chiefComplaint || "symptoms"}`,
      "Aggravating and relieving factors",
      "Pertinent negative symptoms",
    ],
    examCorrect: [
      "Targeted systemic physical examination",
      "Vital signs stabilization check",
    ],
    diagnosisCorrect: [targetDiagnosis],
    reasoningCorrect: [
      `Accurate correlation of clinical presentation pointing to ${targetDiagnosis}`,
    ],
  };
}
