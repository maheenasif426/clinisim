import React, { useState, useMemo } from 'react';
import { useOsceStore } from '../store/useOsceStore';
import { Clock, ChevronRight, Search, SlidersHorizontal, Inbox, ChevronLeft } from 'lucide-react';

const ITEMS_PER_PAGE = 6; // Set to 6 so it displays a clean 3 rows of 2 cards on desktop

export default function CaseLibrary() {
  const { cases, selectCase } = useOsceStore();

  // Local state for search, filters, and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamically extract unique specialties and difficulties from the case data
  const specialties = useMemo(() => {
    const unique = new Set(cases.map((c) => c.specialty));
    return ['All', ...Array.from(unique).sort()];
  }, [cases]);

  const difficulties = useMemo(() => {
    const unique = new Set(cases.map((c) => c.difficulty));
    return ['All', ...Array.from(unique)];
  }, [cases]);

  // Filter cases based on search and selected dropdowns
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.vignette.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialty =
        specialtyFilter === 'All' || c.specialty === specialtyFilter;
      
      const matchesDifficulty =
        difficultyFilter === 'All' || c.difficulty === difficultyFilter;

      return matchesSearch && matchesSpecialty && matchesDifficulty;
    });
  }, [cases, searchQuery, specialtyFilter, difficultyFilter]);

  // Reset pagination on filter or search change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, specialtyFilter, difficultyFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE) || 1;
  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCases.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCases, currentPage]);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 w-full min-h-full flex flex-col justify-between space-y-8">
      
      <div>
        {/* Header & Stats Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-950 border border-teal-500/20 p-6 rounded-2xl shadow-lg">
          <div>
            <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest">Clinical Simulation Suite</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">OSCE Case Library</h2>
            <p className="text-sm text-slate-400 mt-1">
              Browse interactive patient encounters, filter by clinical specialty, and launch active stations.
            </p>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-xl text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Available Stations</span>
            <span className="text-lg font-black text-teal-400">{filteredCases.length}</span>
            <span className="text-xs text-slate-500"> / {cases.length} Total</span>
          </div>
        </div>

        {/* Control Panel (Search & Filters) */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-inner">
          
          {/* Search Bar */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search cases by title, symptom, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder:text-slate-600 shadow-inner"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <div className="relative flex items-center">
              <SlidersHorizontal className="absolute left-3.5 h-4 w-4 text-slate-500 pointer-events-none" />
              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="w-full sm:w-52 bg-slate-950 border border-slate-800 text-white text-sm rounded-xl pl-10 pr-8 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none cursor-pointer transition-all shadow-inner"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'All' ? 'All Specialties' : specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex items-center">
              <SlidersHorizontal className="absolute left-3.5 h-4 w-4 text-slate-500 pointer-events-none" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full sm:w-44 bg-slate-950 border border-slate-800 text-white text-sm rounded-xl pl-10 pr-8 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 appearance-none cursor-pointer transition-all shadow-inner"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'All' ? 'All Difficulties' : difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Case Grid */}
        {paginatedCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedCases.map((c) => (
              <div
                key={c.id}
                className="bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_25px_rgba(20,184,166,0.08)] hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 tracking-wide uppercase">
                      {c.specialty}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                      {c.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-teal-300 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed line-clamp-3">
                    {c.vignette}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5 bg-slate-950/50 px-2.5 py-1.5 rounded-lg border border-slate-800/50">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>{c.timeLimitMinutes || 10} Mins</span>
                  </span>
                  <button
                    onClick={() => selectCase(c)}
                    className="bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-all duration-300 border border-teal-500/20 hover:border-teal-500 shadow-sm"
                  >
                    <span>Enter Station</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 bg-slate-900/40 rounded-2xl border border-slate-800 border-dashed">
            <Inbox className="w-12 h-12 text-slate-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-200">No matching cases found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm text-center">
              Try adjusting your search criteria or resetting your active specialty and difficulty filters.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSpecialtyFilter('All');
                setDifficultyFilter('All');
              }}
              className="mt-6 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-400 px-4 py-2 rounded-xl transition-colors border border-slate-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-800/80">
          <span className="text-xs text-slate-400">
            Showing page <span className="font-bold text-white">{currentPage}</span> of <span className="font-bold text-white">{totalPages}</span>
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-800 flex items-center space-x-1 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    currentPage === page
                      ? 'bg-teal-500 text-slate-950 shadow-[0_0_15px_rgba(20,184,166,0.3)]'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-800 flex items-center space-x-1 transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}