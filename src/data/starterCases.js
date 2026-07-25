export const StarterCases = [
  {
    id: "osce-cardio-01",
    title: "Sudden Central Chest Pain",
    specialty: "Cardiology",
    difficulty: "Intermediate",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "Arthur Pendelton",
      age: 58,
      gender: "Male",
      occupation: "Accountant",
    },
    vignette:
      "A 58-year-old male presents to the Emergency Department complaining of severe central chest pressure that began 45 minutes ago while working in his garden.",
    script: {
      chiefComplaint: "Heavy chest pressure radiating to my left jaw",
      historyOfPresentIllness:
        "Began abruptly 45 minutes ago. 8/10 pain severity. Associated with heavy sweating and mild nausea. Rest has not helped.",
      pastMedicalHistory:
        "Hypertension for 10 years, Type 2 Diabetes Mellitus, Hyperlipidemia.",
      medicationsAndAllergies:
        "Lisinopril 20mg daily, Metformin 1000mg twice daily. NKDA.",
      familyAndSocialHistory:
        "Father died of an MI at age 52. 30 pack-year smoking history.",
      hiddenDiagnosis: "ST-Elevation Myocardial Infarction (STEMI)",
      differentials: [
        "Acute Coronary Syndrome / STEMI",
        "Aortic Dissection",
        "Pulmonary Embolism",
        "Gastroesophageal Reflux",
      ],
      redFlags: [
        "Radiation to jaw/arm",
        "Diaphoresis",
        "Sudden exertional onset",
      ],
    },
    physicalExams: [
      {
        id: "exam-cv-1",
        system: "Cardiovascular",
        name: "Cardiac Auscultation",
        description:
          "Listen to aortic, pulmonic, tricuspid, and mitral cardiac areas",
        finding:
          "S1, S2 present. S4 gallop noted. No friction rub or systolic murmur.",
        isRequired: true,
      },
      {
        id: "exam-resp-1",
        system: "Respiratory",
        name: "Lung Auscultation",
        description: "Auscultate posterior and anterior lung fields",
        finding: "Bibasilar fine crackles noted at lung bases.",
        isRequired: true,
      },
      {
        id: "exam-vitals-1",
        system: "General",
        name: "Vital Signs Check",
        description: "Measure BP, HR, SpO2, and Temperature",
        finding:
          "BP: 155/95 mmHg, HR: 104 bpm (tachycardic), SpO2: 95% room air, Temp: 36.8°C.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-resp-02",
    title: "Acute Shortness of Breath",
    specialty: "Pulmonology",
    difficulty: "Beginner",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "Clara Oswald",
      age: 24,
      gender: "Female",
      occupation: "Graphic Designer",
    },
    vignette:
      "A 24-year-old female presents with acute worsening shortness of breath and audible wheezing after visiting a local flower park.",
    script: {
      chiefComplaint: "Tightness in my chest and trouble breathing",
      historyOfPresentIllness:
        "Began 2 hours ago. Has progressively worsened. Expiratory wheezing noted. Triggered by pollen or animal exposure.",
      pastMedicalHistory: "Eczema, childhood asthma.",
      medicationsAndAllergies:
        "Albuterol inhaler PRN (lost last week). Allergic to cat dander.",
      familyAndSocialHistory: "Mother has allergic rhinitis. Non-smoker.",
      hiddenDiagnosis: "Acute Asthma Exacerbation",
      differentials: [
        "Acute Asthma Exacerbation",
        "Anaphylaxis",
        "Foreign Body Aspiration",
        "Acute Bronchitis",
      ],
      redFlags: [
        "Inability to speak in full sentences",
        "Silent chest",
        "Use of accessory muscles",
      ],
    },
    physicalExams: [
      {
        id: "exam-resp-2",
        system: "Respiratory",
        name: "Pulmonary Auscultation",
        description: "Auscultate all pulmonary zones",
        finding:
          "Widespread polyphonic expiratory wheezing throughout all lung fields.",
        isRequired: true,
      },
      {
        id: "exam-heent-1",
        system: "HEENT",
        name: "Upper Airway Inspection",
        description: "Inspect nasal mucosa and posterior pharynx",
        finding: "Boggy turbinates, no lip or facial swelling, no stridor.",
        isRequired: false,
      },
    ],
  },
  {
    id: "osce-heme-01",
    title: "Iron Deficiency Anemia",
    specialty: "Hematology",
    difficulty: "Beginner",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "Sarah",
      age: 22,
      gender: "Female",
      occupation: "Medical student",
    },
    vignette:
      "22-year-old female medical student presenting with severe fatigue, dizziness, and poor concentration during exams.",
    script: {
      chiefComplaint:
        "Severe fatigue, dizziness, and poor concentration during exams.",
      historyOfPresentIllness:
        "Gradual onset over 6 months. Heavy menstrual bleeding.",
      pastMedicalHistory: "No blood in stool or melena.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "Poor dietary iron intake (vegetarian).",
      hiddenDiagnosis: "Iron deficiency anemia",
      differentials: [
        "Iron deficiency anemia",
        "Thalassemia minor",
        "Anemia of chronic disease",
        "Hypothyroidism",
      ],
      redFlags: [
        "Syncope",
        "severe dyspnea at rest",
        "chest pain",
      ],
    },
    physicalExams: [
      {
        id: "exam-gen-2",
        system: "General",
        name: "Physical Examination",
        description: "Perform a basic general physical examination.",
        finding:
          "Marked conjunctival and palmar pallor, spoon-shaped nails (koilonychia), angular cheilitis. Tachycardia (HR: 105 bpm).",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-cardio-02",
    title: "Essential Hypertension Screening",
    specialty: "Cardiology",
    difficulty: "Beginner",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "Robert",
      age: 45,
      gender: "Male",
      occupation: "Businessman",
    },
    vignette:
      "45-year-old male businessman attending a routine health checkup.",
    script: {
      chiefComplaint: "Attending a routine health checkup.",
      historyOfPresentIllness: "Asymptomatic.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory:
        "High stress, sedentary lifestyle, high salt intake, strong family history of early cardiovascular disease.",
      hiddenDiagnosis: "Essential hypertension",
      differentials: [
        "Essential hypertension",
        "Secondary hypertension (Renal artery stenosis, Cushing's syndrome)",
        "White-coat hypertension",
      ],
      redFlags: [
        "Severe headache",
        "visual disturbances",
        "chest pain",
        "neurological deficits",
      ],
    },
    physicalExams: [
      {
        id: "exam-cv-3",
        system: "Cardiovascular",
        name: "Blood Pressure and Exam",
        description: "Blood pressure measurement.",
        finding:
          "BP 155/95 mmHg (confirmed on two separate readings). BMI 29.5 kg/m2. Fundoscopy and cardiovascular exam are otherwise normal.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-gyn-01",
    title: "Primary Dysmenorrhea",
    specialty: "Gynecology",
    difficulty: "Beginner",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "Emma",
      age: 19,
      gender: "Female",
      occupation: "College student",
    },
    vignette:
      "19-year-old female college student complaining of severe lower abdominal pain with menstruation.",
    script: {
      chiefComplaint: "Severe lower abdominal pain with menstruation.",
      historyOfPresentIllness:
        "Pain starts 1 day before menses, lasts 48 hours, crampy in nature, radiates to thighs and lower back. Accompanied by nausea.",
      pastMedicalHistory: "Normal menstrual cycle regularity.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Primary dysmenorrhea",
      differentials: [
        "Primary dysmenorrhea",
        "Endometriosis",
        "Pelvic Inflammatory Disease (PID)",
        "Ovarian cyst",
      ],
      redFlags: [
        "Abnormal intermenstrual bleeding",
        "purulent vaginal discharge",
        "dyspareunia",
      ],
    },
    physicalExams: [
      {
        id: "exam-abd-1",
        system: "Abdominal",
        name: "Abdominal Exam",
        description: "Evaluate abdomen and pelvic region",
        finding:
          "Abdomen soft, non-tender outside menses. No pelvic masses.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-neuro-01",
    title: "Tension Headache",
    specialty: "Neurology",
    difficulty: "Beginner",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "David",
      age: 28,
      gender: "Male",
      occupation: "Software engineer",
    },
    vignette:
      "28-year-old software engineer presenting with recurring headaches.",
    script: {
      chiefComplaint: "Recurring headaches.",
      historyOfPresentIllness:
        "Dull, aching, band-like pain around the head. Worse at the end of the workday. No photophobia, phonophobia, or aura.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Tension-type headache",
      differentials: [
        "Tension-type headache",
        "Migraine without aura",
        "Cervicogenic headache",
        "Eye strain",
      ],
      redFlags: [
        "Sudden onset thunderclap headache",
        "fever with neck stiffness",
        "focal neurological signs",
      ],
    },
    physicalExams: [
      {
        id: "exam-neuro-1",
        system: "Neurology",
        name: "Neurological Exam",
        description: "Assess cranial nerves and muscle tenderness",
        finding:
          "Tenderness in pericranial and neck muscles. Normal neurological examination.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-gi-01",
    title: "Acute Gastroenteritis",
    specialty: "Gastroenterology",
    difficulty: "Intermediate",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "Michael",
      age: 30,
      gender: "Male",
      occupation: "Unknown",
    },
    vignette:
      "30-year-old male presenting with watery diarrhea and vomiting for 2 days.",
    script: {
      chiefComplaint: "Watery diarrhea and vomiting for 2 days.",
      historyOfPresentIllness:
        "Ate street food 3 days ago. 6–8 episodes of non-bloody watery stools daily. Diffuse crampy abdominal pain.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Acute Gastroenteritis",
      differentials: [
        "Viral gastroenteritis",
        "Bacterial gastroenteritis (E. coli, Salmonella)",
        "Food poisoning",
        "Amoebic dysentery",
      ],
      redFlags: [
        "High-grade fever",
        "bloody diarrhea (dysentery)",
        "severe hypotension",
        "oliguria",
      ],
    },
    physicalExams: [
      {
        id: "exam-gi-1",
        system: "General",
        name: "Hydration and Abdominal Exam",
        description: "Evaluate hydration status",
        finding:
          "Dry mucous membranes, decreased skin turgor, mild diffuse abdominal tenderness without rebound, mild tachycardia (HR: 110 bpm).",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-resp-03",
    title: "Bronchial Asthma Exacerbation",
    specialty: "Pulmonology",
    difficulty: "Intermediate",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "Leo",
      age: 16,
      gender: "Male",
      occupation: "Student",
    },
    vignette:
      "16-year-old male presenting with shortness of breath and wheezing.",
    script: {
      chiefComplaint: "Shortness of breath and wheezing.",
      historyOfPresentIllness:
        "Triggers include dust exposure and cold air.",
      pastMedicalHistory: "History of atopy (eczema).",
      medicationsAndAllergies:
        "Uses salbutamol inhaler intermittently.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Bronchial asthma exacerbation",
      differentials: [
        "Bronchial asthma exacerbation",
        "Acute bronchitis",
        "Foreign body aspiration",
        "Anaphylaxis",
      ],
      redFlags: [
        "Silent chest",
        "cyanosis",
        "inability to complete sentences in one breath",
        "peak expiratory flow <30%",
      ],
    },
    physicalExams: [
      {
        id: "exam-resp-3",
        system: "Respiratory",
        name: "Respiratory Examination",
        description: "Respiratory examination.",
        finding:
          "Tachypnea (RR: 26/min), bilateral polyphonic expiratory wheezes across all lung fields, usage of accessory neck muscles.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-derm-01",
    title: "Scabies Infestation",
    specialty: "Dermatology",
    difficulty: "Intermediate",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "Alex",
      age: 24,
      gender: "Male",
      occupation: "University student",
    },
    vignette:
      "24-year-old university student living in a dormitory, presenting with severe generalized itching.",
    script: {
      chiefComplaint: "Severe generalized itching.",
      historyOfPresentIllness: "Itching is worse at night.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory:
        "Multiple roommates share similar symptoms.",
      hiddenDiagnosis: "Scabies",
      differentials: [
        "Scabies",
        "Atopic dermatitis",
        "Contact dermatitis",
        "Insect bites",
      ],
      redFlags: [
        "Secondary bacterial infection (impetigo/cellulitis)",
        "crusted (Norwegian) scabies in immunocompromised state",
      ],
    },
    physicalExams: [
      {
        id: "exam-derm-1",
        system: "Dermatology",
        name: "Skin Examination",
        description:
          "Physical identification of classic skin burrows.",
        finding:
          "Erythematous papules, excoriations, and delicate burrows in web spaces of fingers, flexor surfaces of wrists, and umbilicus.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-uro-01",
    title: "Benign Prostatic Hyperplasia (BPH)",
    specialty: "Urology",
    difficulty: "Intermediate",
    timeLimitMinutes: 10,
    patientProfile: {
      name: "Arthur",
      age: 65,
      gender: "Male",
      occupation: "Retired",
    },
    vignette: "65-year-old male complaining of difficulty urinating.",
    script: {
      chiefComplaint: "Difficulty urinating.",
      historyOfPresentIllness:
        "Nocturia (3–4 times/night), weak stream, hesitancy, post-void dribbling, sensation of incomplete emptying for 1 year.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Benign prostatic hyperplasia",
      differentials: [
        "Benign prostatic hyperplasia",
        "Prostate adenocarcinoma",
        "Neurogenic bladder",
        "Urethral stricture",
      ],
      redFlags: [
        "Hematuria",
        "bone pain",
        "nodular/hard prostate on DRE",
        "acute urinary retention",
      ],
    },
    physicalExams: [
      {
        id: "exam-uro-1",
        system: "Urology",
        name: "Abdominal and Rectal Exam",
        description:
          "Simulated digital rectal examination explanation.",
        finding:
          "Distended urinary bladder on abdominal palpation. Digital Rectal Exam (DRE): Smooth, enlarged, non-tender prostate with preserved median sulcus.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-surg-01",
    title: "Acute Appendicitis",
    specialty: "Surgery",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "Chris",
      age: 21,
      gender: "Male",
      occupation: "Student",
    },
    vignette:
      "21-year-old male presenting with severe abdominal pain.",
    script: {
      chiefComplaint: "Severe abdominal pain.",
      historyOfPresentIllness:
        "Pain started around the umbilicus 12 hours ago and migrated to the right lower quadrant. Low-grade fever, nausea, anorexia (hamburger sign positive).",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Acute appendicitis",
      differentials: [
        "Acute appendicitis",
        "Mesenteric adenitis",
        "Meckel's diverticulitis",
        "Acute ileitis",
      ],
      redFlags: [
        "Generalized abdominal rigidity",
        "high fever with rigors",
        "septic shock (indicating perforation)",
      ],
    },
    physicalExams: [
      {
        id: "exam-abd-2",
        system: "Abdominal",
        name: "Abdominal Exam",
        description:
          "Abdominal examination techniques for acute abdomen.",
        finding:
          "Tenderness at McBurney's point, positive Rovsing's sign, localized rebound tenderness, guarding in right iliac fossa.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-resp-04",
    title: "Pulmonary Tuberculosis (TB)",
    specialty: "Infectious Disease",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "John",
      age: 38,
      gender: "Male",
      occupation: "Unknown",
    },
    vignette:
      "38-year-old male presenting with chronic cough and weight loss.",
    script: {
      chiefComplaint: "Chronic cough and weight loss.",
      historyOfPresentIllness:
        "Cough with purulent sputum for 5 weeks, hemoptysis (blood-streaked sputum) for 3 days, low-grade evening fever, night sweats, 6 kg weight loss.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Pulmonary tuberculosis",
      differentials: [
        "Pulmonary tuberculosis",
        "Bronchiectasis",
        "Lung carcinoma",
        "Chronic lung abscess",
      ],
      redFlags: [
        "Massive hemoptysis",
        "severe respiratory distress",
        "disseminated/miliary spread",
      ],
    },
    physicalExams: [
      {
        id: "exam-resp-4",
        system: "Respiratory",
        name: "Lung Examination",
        description: "Auscultation of lungs",
        finding:
          "Cachectic appearance, apical crackles on auscultation, diminished breath sounds over the right upper zone.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-id-01",
    title: "Typhoid Fever (Enteric Fever)",
    specialty: "Infectious Disease",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "Aisha",
      age: 25,
      gender: "Female",
      occupation: "Unknown",
    },
    vignette:
      "25-year-old female presenting with high-grade persistent fever for 10 days.",
    script: {
      chiefComplaint: "High-grade persistent fever for 10 days.",
      historyOfPresentIllness:
        "Step-ladder pattern fever, headache, malaise, abdominal discomfort, constipation initially followed by loose stools.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "Recent consumption of untreated water.",
      hiddenDiagnosis: "Typhoid fever",
      differentials: [
        "Typhoid fever",
        "Malaria",
        "Dengue fever",
        "Brucellosis",
      ],
      redFlags: [
        "Intestinal perforation (sudden severe abdominal pain, peritonitis)",
        "gastrointestinal bleeding",
        "altered sensorium",
      ],
    },
    physicalExams: [
      {
        id: "exam-gi-2",
        system: "Abdominal",
        name: "Abdominal Physical Examination",
        description: "Abdominal physical examination.",
        finding:
          "Relative bradycardia (Faget sign), faint rose spots on upper abdomen, mild splenomegaly, coated tongue.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-gi-02",
    title: "Peptic Ulcer Disease / Duodenal Ulcer",
    specialty: "Gastroenterology",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "George",
      age: 40,
      gender: "Male",
      occupation: "Taxi driver",
    },
    vignette:
      "40-year-old male taxi driver complaining of burning epigastric pain.",
    script: {
      chiefComplaint: "Burning epigastric pain.",
      historyOfPresentIllness:
        "Pain occurs 2–3 hours after meals and often wakes him up at night. Relieved by food or antacids.",
      pastMedicalHistory: "Frequent use of NSAIDs for back pain.",
      medicationsAndAllergies: "NSAIDs.",
      familyAndSocialHistory: "Chronic smoker.",
      hiddenDiagnosis: "Duodenal ulcer",
      differentials: [
        "Duodenal ulcer",
        "Gastric ulcer",
        "Gastroesophageal reflux disease (GERD)",
        "Non-ulcer dyspepsia",
        "Chronic cholecystitis",
      ],
      redFlags: [
        "Melena",
        "hematemesis",
        "persistent vomiting",
        "unexplained weight loss",
        "sudden sharp agonizing pain (perforated ulcer)",
      ],
    },
    physicalExams: [
      {
        id: "exam-gi-3",
        system: "Abdominal",
        name: "Abdominal Exam",
        description: "Palpation of abdomen",
        finding:
          "Epigastric tenderness on deep palpation. Rest of abdominal exam is normal.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-ped-01",
    title: "Pediatric Severe Pneumonia",
    specialty: "Pediatrics",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "Sam",
      age: 2,
      gender: "Male",
      occupation: "Child",
    },
    vignette:
      "2-year-old male child brought by mother due to fever and rapid breathing.",
    script: {
      chiefComplaint: "Fever and rapid breathing.",
      historyOfPresentIllness:
        "Fever and cough for 3 days. The child has become lethargic and is refusing feed today.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Severe community-acquired pneumonia",
      differentials: [
        "Severe community-acquired pneumonia",
        "Acute bronchiolitis",
        "Asthma/Reactive airway disease",
        "Foreign body aspiration",
      ],
      redFlags: [
        "Central cyanosis",
        "inability to drink/feed",
        "persistent vomiting",
        "convulsions",
        "stridor in a calm child",
      ],
    },
    physicalExams: [
      {
        id: "exam-resp-5",
        system: "Respiratory",
        name: "Pediatric Clinical Assessment",
        description: "Pediatric clinical assessment.",
        finding:
          "Tachypnea (RR: 52/min), lower chest wall indrawing, nasal flaring, grunting, coarse crepitations over the left lower lung base.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-ent-01",
    title: "Chronic Suppurative Otitis Media (CSOM)",
    specialty: "ENT",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "Chloe",
      age: 26,
      gender: "Female",
      occupation: "Unknown",
    },
    vignette:
      "26-year-old female presenting with ear discharge and hearing loss.",
    script: {
      chiefComplaint: "Ear discharge and hearing loss.",
      historyOfPresentIllness:
        "Recurrent, painless, non-foul-smelling mucopurulent discharge from the right ear for 2 years, exacerbated by water entry into the ear. Reduced hearing in the right ear.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "CSOM",
      differentials: [
        "CSOM (Tubotympanic)",
        "CSOM (Atticoantral/Cholesteatoma)",
        "Otitis externa",
        "Chronic otitis media with effusion",
      ],
      redFlags: [
        "Foul-smelling purulent discharge",
        "otalgia",
        "vertigo",
        "facial nerve palsy",
        "post-auricular swelling (mastoiditis)",
      ],
    },
    physicalExams: [
      {
        id: "exam-ent-1",
        system: "ENT",
        name: "Otoscopic Examination",
        description:
          "Otoscopic examination findings interpretation, and tuning fork tests.",
        finding:
          "Otoscopy reveals a central perforation in the pars tensa of the right tympanic membrane. Rinne test negative on the right side; Weber lateralizes to the right ear (conductive hearing loss).",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-ophtho-01",
    title: "Senile Cataract",
    specialty: "Ophthalmology",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "Martha",
      age: 68,
      gender: "Female",
      occupation: "Unknown",
    },
    vignette:
      "68-year-old female presenting with progressive vision loss.",
    script: {
      chiefComplaint: "Progressive vision loss.",
      historyOfPresentIllness:
        "Gradual, painless reduction in visual acuity over 3 years in both eyes. Complains of glare while driving at night, faded color perception, and frequent changes in reading glass prescription.",
      pastMedicalHistory: "None noted.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Senile cataract",
      differentials: [
        "Senile cataract",
        "Primary open-angle glaucoma",
        "Age-related macular degeneration",
        "Diabetic retinopathy",
      ],
      redFlags: [
        "Painful red eye",
        "sudden vision loss",
        "severe headache with halo vision (angle-closure glaucoma)",
      ],
    },
    physicalExams: [
      {
        id: "exam-eye-1",
        system: "Ophthalmology",
        name: "Anterior Segment Examination",
        description: "Basic anterior segment examination skills.",
        finding:
          "Reduced visual acuity (6/36 in right eye, 6/24 in left eye). Leukocoria (greyish-white opacification of the lens visible on pupillary light examination). Absent red reflex.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-obgyn-01",
    title: "Preeclampsia",
    specialty: "Obstetrics",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "Jessica",
      age: 29,
      gender: "Female",
      occupation: "Unknown",
    },
    vignette:
      "29-year-old pregnant female (primigravida at 34 weeks gestation) attending an antenatal visit.",
    script: {
      chiefComplaint:
        "Frontal headache, bilateral pedal edema, and facial puffiness for 4 days.",
      historyOfPresentIllness:
        "No vaginal bleeding or fluid leaking. Normal fetal movements.",
      pastMedicalHistory: "Primigravida at 34 weeks gestation.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Preeclampsia with severe features",
      differentials: [
        "Preeclampsia with severe features",
        "Chronic hypertension in pregnancy",
        "Gestational hypertension",
        "Superimposed preeclampsia",
      ],
      redFlags: [
        "Epigastric/right upper quadrant pain",
        "visual scotomas/blurring",
        "hyperreflexia/clonus",
        "oliguria",
        "pulmonary edema (Eclampsia signs)",
      ],
    },
    physicalExams: [
      {
        id: "exam-ob-1",
        system: "General",
        name: "Vitals and Edema Check",
        description: "Check blood pressure and assess edema",
        finding:
          "BP 160/105 mmHg. Dipstick proteinuria: 3+ (3.0 g/L). Generalized edema. Normal symphysis-fundal height for gestational age.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-cardio-03",
    title: "Acute Coronary Syndrome (STEMI)",
    specialty: "Cardiology",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "William",
      age: 54,
      gender: "Male",
      occupation: "Unknown",
    },
    vignette:
      "54-year-old male presenting to the Emergency Department with crushing chest pain.",
    script: {
      chiefComplaint: "Crushing chest pain.",
      historyOfPresentIllness:
        "Sudden onset severe retrosternal chest pain radiating to left arm and jaw, lasting 1.5 hours. Associated with diaphoresis, nausea, and air hunger.",
      pastMedicalHistory: "Dyslipidemia.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "History of heavy smoking.",
      hiddenDiagnosis: "Acute ST-elevation myocardial infarction",
      differentials: [
        "Acute ST-elevation myocardial infarction",
        "Aortic dissection",
        "Pulmonary embolism",
        "Acute pericarditis",
        "Esophageal spasm",
      ],
      redFlags: [
        "Hypotension/cardiogenic shock",
        "pulmonary edema",
        "ventricular dysrhythmias",
        "syncope",
      ],
    },
    physicalExams: [
      {
        id: "exam-cv-4",
        system: "Cardiovascular",
        name: "Emergency Cardiovascular Exam",
        description: "Emergency cardiovascular exam.",
        finding:
          "Patient is anxious, pale, cold, and clammy. BP: 100/65 mmHg, HR: 112 bpm (regular). S4 gallop present on cardiac auscultation. Lung fields clear.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-gi-03",
    title: "Decompensated Liver Cirrhosis",
    specialty: "Gastroenterology",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "Richard",
      age: 50,
      gender: "Male",
      occupation: "Unknown",
    },
    vignette:
      "50-year-old male presenting with abdominal distension and yellowing of eyes.",
    script: {
      chiefComplaint: "Abdominal distension and yellowing of eyes.",
      historyOfPresentIllness:
        "Abdominal swelling for 1 month, bilateral leg swelling, easy bruising, jaundice, altered sleep-wake cycle (drowsiness during the day).",
      pastMedicalHistory: "History of chronic Hepatitis C infection.",
      medicationsAndAllergies: "None noted.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Decompensated liver cirrhosis",
      differentials: [
        "Decompensated liver cirrhosis (HCV-related)",
        "Alcoholic liver disease",
        "Non-alcoholic steatohepatitis (NASH) cirrhosis",
        "Congestive heart failure",
        "Nephrotic syndrome",
      ],
      redFlags: [
        "Hematemesis/melena (variceal bleed)",
        "severe confusion/coma (Grade III/IV hepatic encephalopathy)",
        "spontaneous bacterial peritonitis (fever + diffuse abdominal pain)",
      ],
    },
    physicalExams: [
      {
        id: "exam-gi-4",
        system: "Abdominal",
        name: "Gastrointestinal System Physical Examination",
        description:
          "Complete gastrointestinal system physical examination.",
        finding:
          "Scleral icterus, palmar erythema, spider nevi on chest, gynecomastia, abdominal distension with fluid thrill and shifting dullness, asterixis (flapping tremor positive).",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-neuro-02",
    title: "Acute Ischemic Stroke",
    specialty: "Neurology",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "Susan",
      age: 62,
      gender: "Female",
      occupation: "Unknown",
    },
    vignette:
      "62-year-old female presenting with sudden onset right-sided weakness and speech difficulty 2 hours ago.",
    script: {
      chiefComplaint:
        "Sudden onset right-sided weakness and speech difficulty 2 hours ago.",
      historyOfPresentIllness:
        "Sudden weakness in right arm and leg, inability to speak clearly (expressive dysphasia).",
      pastMedicalHistory:
        "Long-standing atrial fibrillation and hypertension with poor medication compliance.",
      medicationsAndAllergies: "Poor medication compliance.",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Acute ischemic stroke",
      differentials: [
        "Acute ischemic stroke",
        "Intracerebral hemorrhage",
        "Subdural hematoma",
        "Transient Ischemic Attack (TIA)",
        "Hypoglycemic mimic",
      ],
      redFlags: [
        "Rapid deterioration in consciousness",
        "signs of raised ICP (bradycardia, hypertension, irregular breathing)",
        "severe headache preceding weakness",
      ],
    },
    physicalExams: [
      {
        id: "exam-neuro-2",
        system: "Neurology",
        name: "Stroke Protocol Examination",
        description: "FAST/NIHSS assessment.",
        finding:
          "Right-sided lower facial droop, hyperreflexia and Babinski sign positive on the right side, muscle power 1/5 in right upper and lower limbs. Broca's dysphasia present.",
        isRequired: true,
      },
    ],
  },
  {
    id: "osce-endo-01",
    title: "Diabetic Ketoacidosis (DKA)",
    specialty: "Endocrinology",
    difficulty: "Advanced",
    timeLimitMinutes: 15,
    patientProfile: {
      name: "Jason",
      age: 19,
      gender: "Male",
      occupation: "Unknown",
    },
    vignette:
      "19-year-old male presenting to the emergency room with severe vomiting and confusion.",
    script: {
      chiefComplaint: "Severe vomiting and confusion.",
      historyOfPresentIllness:
        "History of polyuria, polydipsia, abdominal pain, and rapid deep breathing for 24 hours.",
      pastMedicalHistory:
        "Known Type 1 Diabetic who missed insulin doses for 3 days due to an intercurrent viral illness.",
      medicationsAndAllergies: "Insulin (missed doses).",
      familyAndSocialHistory: "None noted.",
      hiddenDiagnosis: "Diabetic Ketoacidosis (DKA)",
      differentials: [
        "Diabetic Ketoacidosis (DKA)",
        "Hyperosmolar Hyperglycemic State (HHS)",
        "Acute abdomen",
        "Alcoholic ketoacidosis",
        "Uremic encephalopathy",
      ],
      redFlags: [
        "Severe hypokalemia",
        "cerebral edema (headache, bradycardia, altered sensorium)",
        "refractory hypotension",
        "severe metabolic acidosis (pH < 7.00)",
      ],
    },
    physicalExams: [
      {
        id: "exam-endo-1",
        system: "General",
        name: "Metabolic Emergency Evaluation",
        description: "Assess vitals, breathing, and hydration.",
        finding:
          "Dehydrated, fruity odor (acetone) on breath, Kussmaul respiration (deep, rapid breathing), diffuse abdominal tenderness without localized peritonitis. BP: 90/60 mmHg, HR: 125 bpm.",
        isRequired: true,
      },
    ],
  },
];
