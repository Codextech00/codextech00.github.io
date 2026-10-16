import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Puzzle,
  Sparkles,
  Award,
  CheckCircle2,
  RotateCcw,
  Flame,
  ArrowRight,
  HelpCircle,
  Zap,
  Check,
  Trophy
} from 'lucide-react';
import { StudentProfile } from '../types';
import { StorageService } from '../utils/storage';

interface EducationalPuzzlesProps {
  student: StudentProfile | null;
  onOpenStudentAuth: () => void;
}

export const EducationalPuzzles: React.FC<EducationalPuzzlesProps> = ({
  student,
  onOpenStudentAuth
}) => {
  const [activeGame, setActiveGame] = useState<'chem' | 'crossmath' | 'biomatch'>('chem');

  // ----------------------------------------------------
  // GAME 1: CHEMICAL EQUATION BALANCER LAB
  // ----------------------------------------------------
  const chemPuzzles = [
    {
      id: 'chem-1',
      title: 'Rusting / Steam on Red Hot Iron',
      reactants: [
        { formula: 'Fe', atoms: { Fe: 1 } },
        { formula: 'H₂O', atoms: { H: 2, O: 1 } }
      ],
      products: [
        { formula: 'Fe₃O₄', atoms: { Fe: 3, O: 4 } },
        { formula: 'H₂', atoms: { H: 2 } }
      ],
      solution: [3, 4, 1, 4], // 3Fe + 4H2O -> 1Fe3O4 + 4H2
      note: 'Reaction of steam with red-hot iron produces magnetic iron oxide (ferroso-ferric oxide).'
    },
    {
      id: 'chem-2',
      title: 'Aerobic Cellular Respiration',
      reactants: [
        { formula: 'C₆H₁₂O₆', atoms: { C: 6, H: 12, O: 6 } },
        { formula: 'O₂', atoms: { O: 2 } }
      ],
      products: [
        { formula: 'CO₂', atoms: { C: 1, O: 2 } },
        { formula: 'H₂O', atoms: { H: 2, O: 1 } }
      ],
      solution: [1, 6, 6, 6], // 1 C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O
      note: 'Biological oxidation of glucose to release 38 ATP equivalent energy.'
    },
    {
      id: 'chem-3',
      title: 'Action of Dilute Acid on Aluminum',
      reactants: [
        { formula: 'Al', atoms: { Al: 1 } },
        { formula: 'HCl', atoms: { H: 1, Cl: 1 } }
      ],
      products: [
        { formula: 'AlCl₃', atoms: { Al: 1, Cl: 3 } },
        { formula: 'H₂', atoms: { H: 2 } }
      ],
      solution: [2, 6, 2, 3], // 2Al + 6HCl -> 2AlCl3 + 3H2
      note: 'Vigorous displacement reaction yielding aluminum chloride and hydrogen gas.'
    }
  ];

  const [chemIndex, setChemIndex] = useState(0);
  const currentChem = chemPuzzles[chemIndex];
  const [chemCoeffs, setChemCoeffs] = useState<number[]>([1, 1, 1, 1]);
  const [chemSolved, setChemSolved] = useState<boolean>(false);

  const updateCoeff = (index: number, val: number) => {
    if (chemSolved) return;
    const clamped = Math.max(1, Math.min(12, val));
    const next = [...chemCoeffs];
    next[index] = clamped;
    setChemCoeffs(next);

    // Verify balance
    checkChemBalance(next);
  };

  const checkChemBalance = (coeffs: number[]) => {
    // Count atoms on Left:
    const leftAtoms: Record<string, number> = {};
    currentChem.reactants.forEach((r, idx) => {
      const c = coeffs[idx];
      Object.entries(r.atoms).forEach(([elem, count]) => {
        leftAtoms[elem] = (leftAtoms[elem] || 0) + count * c;
      });
    });

    // Count atoms on Right:
    const rightAtoms: Record<string, number> = {};
    currentChem.products.forEach((p, idx) => {
      const c = coeffs[currentChem.reactants.length + idx];
      Object.entries(p.atoms).forEach(([elem, count]) => {
        rightAtoms[elem] = (rightAtoms[elem] || 0) + count * c;
      });
    });

    // Compare
    const allElements = Object.keys({ ...leftAtoms, ...rightAtoms });
    const isBalanced = allElements.every((elem) => leftAtoms[elem] === rightAtoms[elem]);

    if (isBalanced) {
      setChemSolved(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      if (student) {
        StorageService.markPuzzleComplete(`chem-${currentChem.id}`, 100);
      }
    }
  };

  const resetChem = () => {
    setChemCoeffs([1, 1, 1, 1]);
    setChemSolved(false);
  };

  const nextChemPuzzle = () => {
    setChemIndex((prev) => (prev + 1) % chemPuzzles.length);
    setChemCoeffs([1, 1, 1, 1]);
    setChemSolved(false);
  };

  // ----------------------------------------------------
  // GAME 2: CROSSMATH ALGEBRA GRID
  // ----------------------------------------------------
  // Grid:
  // [A] + [B] = 10
  //  +     *
  // [C] - [D] = 2
  //  =     =
  // 12    15
  // Solution: A=6, B=4, C=6, D=4 => A+C=12, B*D=16 (wait, let's pick simple clean system)
  // System:
  // [ x ] + [ y ] = 14
  //  +        -
  // [ z ] + [ w ] = 10
  //  =        =
  //  15       3
  // x + y = 14
  // x + z = 15  => z = 15 - x
  // y - w = 3   => w = y - 3
  // z + w = 10  => (15 - x) + (y - 3) = 10 => 12 - x + y = 10 => x - y = 2
  // x + y = 14 and x - y = 2 => 2x = 16 => x = 8, y = 6.
  // z = 15 - 8 = 7.
  // w = 6 - 3 = 3.
  // Check:
  // Row 1: 8 + 6 = 14 (OK)
  // Row 2: 7 + 3 = 10 (OK)
  // Col 1: 8 + 7 = 15 (OK)
  // Col 2: 6 - 3 = 3 (OK)
  // Perfect!
  const [crossInput, setCrossInput] = useState<{ x: string; y: string; z: string; w: string }>({
    x: '',
    y: '',
    z: '',
    w: ''
  });
  const [crossSolved, setCrossSolved] = useState<boolean>(false);
  const [crossError, setCrossError] = useState<string | null>(null);

  const checkCrossMath = () => {
    const x = Number(crossInput.x);
    const y = Number(crossInput.y);
    const z = Number(crossInput.z);
    const w = Number(crossInput.w);

    if (isNaN(x) || isNaN(y) || isNaN(z) || isNaN(w)) {
      setCrossError('Please fill in all four numbers!');
      return;
    }

    if (x + y === 14 && z + w === 10 && x + z === 15 && y - w === 3) {
      setCrossSolved(true);
      setCrossError(null);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      if (student) {
        StorageService.markPuzzleComplete('crossmath-1', 120);
      }
    } else {
      setCrossError('Incorrect solution! Check row & column equations.');
    }
  };

  // ----------------------------------------------------
  // GAME 3: LIFE PROCESSES BIO MATCHUP
  // ----------------------------------------------------
  const bioPairs = [
    { id: 1, term: 'Pepsin', match: 'Stomach protein digestion in acidic medium' },
    { id: 2, term: 'Bile Juice', match: 'Liver fluid that emulsifies large fat globules' },
    { id: 3, term: 'Trypsin', match: 'Pancreatic enzyme digesting proteins in alkaline medium' },
    { id: 4, term: 'Nephron', match: 'Functional filtration unit of human kidney' }
  ];

  const [selectedBioTerm, setSelectedBioTerm] = useState<number | null>(null);
  const [matchedBioPairs, setMatchedBioPairs] = useState<number[]>([]);

  const handleSelectBioTerm = (id: number) => {
    if (matchedBioPairs.includes(id)) return;
    setSelectedBioTerm(id);
  };

  const handleSelectBioMatch = (id: number) => {
    if (selectedBioTerm === null) return;
    if (selectedBioTerm === id) {
      const nextMatched = [...matchedBioPairs, id];
      setMatchedBioPairs(nextMatched);
      setSelectedBioTerm(null);

      if (nextMatched.length === bioPairs.length) {
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        if (student) {
          StorageService.markPuzzleComplete('biomatch-1', 90);
        }
      }
    } else {
      setSelectedBioTerm(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border border-amber-500/30 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Puzzle className="w-3.5 h-3.5 text-amber-400" />
              <span>Gamified CBSE 2026-27 Learning Labs</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Educational Puzzles & Science Labs
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-2xl">
              Learn concepts through play. Balance chemical equations, solve algebraic cross grids, and pair life processes enzymes to earn high XP points!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-2 rounded-2xl">
            {(
              [
                { id: 'chem', label: 'Chem Balancer', icon: Zap },
                { id: 'crossmath', label: 'CrossMath Grid', icon: Trophy },
                { id: 'biomatch', label: 'Bio Matchup', icon: Sparkles }
              ] as const
            ).map((game) => {
              const Icon = game.icon;
              const isActive = activeGame === game.id;
              return (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{game.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* GAME 1: CHEMICAL BALANCER */}
      {activeGame === 'chem' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Puzzle {chemIndex + 1} of {chemPuzzles.length} • Stoichiometry Lab
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">{currentChem.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetChem}
                className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={nextChemPuzzle}
                className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Next Reaction</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Equation Canvas */}
          <div
            className={`p-6 md:p-8 rounded-3xl border transition-all text-center space-y-6 ${
              chemSolved
                ? 'bg-emerald-950/40 border-emerald-500/80 shadow-2xl shadow-emerald-500/20'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            {chemSolved && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs animate-bounce">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>PERFECTLY BALANCED! +100 XP REWARDED</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xl md:text-2xl font-bold font-mono">
              {/* Reactants */}
              {currentChem.reactants.map((r, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={chemCoeffs[idx]}
                      onChange={(e) => updateCoeff(idx, Number(e.target.value))}
                      className="w-12 h-12 rounded-xl bg-slate-900 border-2 border-indigo-500/60 focus:border-amber-400 text-white text-center text-lg font-bold outline-none"
                    />
                    <span className="text-[10px] text-slate-500 mt-1">Coeff</span>
                  </div>
                  <span className="text-white">{r.formula}</span>
                  {idx < currentChem.reactants.length - 1 && (
                    <span className="text-slate-500 mx-1">+</span>
                  )}
                </div>
              ))}

              {/* Reaction Arrow */}
              <div className="px-2 text-amber-400 text-2xl font-sans">⟶</div>

              {/* Products */}
              {currentChem.products.map((p, idx) => {
                const coeffIdx = currentChem.reactants.length + idx;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={chemCoeffs[coeffIdx]}
                        onChange={(e) => updateCoeff(coeffIdx, Number(e.target.value))}
                        className="w-12 h-12 rounded-xl bg-slate-900 border-2 border-indigo-500/60 focus:border-amber-400 text-white text-center text-lg font-bold outline-none"
                      />
                      <span className="text-[10px] text-slate-500 mt-1">Coeff</span>
                    </div>
                    <span className="text-white">{p.formula}</span>
                    {idx < currentChem.products.length - 1 && (
                      <span className="text-slate-500 mx-1">+</span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              {currentChem.note}
            </p>
          </div>
        </div>
      )}

      {/* GAME 2: CROSSMATH ALGEBRA GRID */}
      {activeGame === 'crossmath' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Algebraic Thinking Puzzle • Linear Equations System
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">2x2 Cross-Equation Puzzle Grid</h2>
            <p className="text-xs text-slate-400 mt-1">
              Find the 4 integers [x, y, z, w] so both rows and both columns satisfy the equations simultaneously!
            </p>
          </div>

          <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-inner space-y-4">
            {crossSolved && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs text-center">
                🎉 BRILLIANT! System solved correctly. (x=8, y=6, z=7, w=3)
              </div>
            )}
            {crossError && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
                {crossError}
              </div>
            )}

            {/* Row 1 */}
            <div className="flex items-center justify-between text-lg font-mono font-bold">
              <input
                type="number"
                placeholder="x"
                value={crossInput.x}
                onChange={(e) => setCrossInput({ ...crossInput, x: e.target.value })}
                className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-indigo-500 text-center text-white text-xl font-bold"
              />
              <span className="text-slate-400">+</span>
              <input
                type="number"
                placeholder="y"
                value={crossInput.y}
                onChange={(e) => setCrossInput({ ...crossInput, y: e.target.value })}
                className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-indigo-500 text-center text-white text-xl font-bold"
              />
              <span className="text-slate-400">=</span>
              <span className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400 text-xl font-bold">
                14
              </span>
            </div>

            {/* Vertical Operators */}
            <div className="flex items-center justify-between px-4 text-slate-400 text-lg font-bold">
              <span className="w-14 text-center">+</span>
              <span className="w-14 text-center">-</span>
              <span className="w-14"></span>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-between text-lg font-mono font-bold">
              <input
                type="number"
                placeholder="z"
                value={crossInput.z}
                onChange={(e) => setCrossInput({ ...crossInput, z: e.target.value })}
                className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-indigo-500 text-center text-white text-xl font-bold"
              />
              <span className="text-slate-400">+</span>
              <input
                type="number"
                placeholder="w"
                value={crossInput.w}
                onChange={(e) => setCrossInput({ ...crossInput, w: e.target.value })}
                className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-indigo-500 text-center text-white text-xl font-bold"
              />
              <span className="text-slate-400">=</span>
              <span className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400 text-xl font-bold">
                10
              </span>
            </div>

            {/* Equal signs below */}
            <div className="flex items-center justify-between px-4 text-slate-400 text-lg font-bold">
              <span className="w-14 text-center">=</span>
              <span className="w-14 text-center">=</span>
              <span className="w-14"></span>
            </div>

            {/* Column targets */}
            <div className="flex items-center justify-between text-lg font-mono font-bold">
              <span className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400 text-xl font-bold">
                15
              </span>
              <span className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400 text-xl font-bold">
                3
              </span>
              <span className="w-14"></span>
            </div>

            <button
              onClick={checkCrossMath}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow cursor-pointer mt-4"
            >
              Verify Math Solution
            </button>
          </div>
        </div>
      )}

      {/* GAME 3: LIFE PROCESSES BIO MATCHUP */}
      {activeGame === 'biomatch' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
          <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Biology Life Processes Lab
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">Enzyme & Organ Interactive Matchup</h2>
              <p className="text-xs text-slate-400 mt-1">
                Click an enzyme on the left, then click its corresponding organ & function on the right!
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              Matched: {matchedBioPairs.length} / {bioPairs.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Terms */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Enzyme / Structure</h3>
              {bioPairs.map((pair) => {
                const isMatched = matchedBioPairs.includes(pair.id);
                const isSelected = selectedBioTerm === pair.id;

                return (
                  <button
                    key={pair.id}
                    disabled={isMatched}
                    onClick={() => handleSelectBioTerm(pair.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 opacity-60'
                        : isSelected
                        ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-base">{pair.term}</span>
                    {isMatched ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <span className="text-xs text-slate-500">Click to connect</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Functions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Site & Function</h3>
              {/* Shuffled display */}
              {[bioPairs[1], bioPairs[3], bioPairs[0], bioPairs[2]].map((pair) => {
                const isMatched = matchedBioPairs.includes(pair.id);

                return (
                  <button
                    key={pair.id}
                    disabled={isMatched}
                    onClick={() => handleSelectBioMatch(pair.id)}
                    className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start justify-between ${
                      isMatched
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 opacity-60'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="text-xs md:text-sm leading-relaxed">{pair.match}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
