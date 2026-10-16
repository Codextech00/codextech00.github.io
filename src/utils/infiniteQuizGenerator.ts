import { QuizQuestion, SubjectType, ChapterType, QuestionDifficulty } from '../types';

// Helper for random integers in range [min, max]
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateInfiniteQuestion(subject?: SubjectType, specificChapter?: ChapterType): QuizQuestion {
  const chosenSubject: SubjectType = subject || (Math.random() > 0.5 ? 'Mathematics' : 'Science');

  if (chosenSubject === 'Mathematics') {
    return generateMathDynamicQuestion(specificChapter);
  } else {
    return generateScienceDynamicQuestion(specificChapter);
  }
}

// ----------------------------------------------------------------------
// MATHEMATICS PROCEDURAL GENERATOR
// ----------------------------------------------------------------------
function generateMathDynamicQuestion(filterChapter?: ChapterType): QuizQuestion {
  const mathGenerators = [
    // 1. Real Numbers - HCF & LCM property
    () => {
      const a = randInt(12, 48);
      const b = randInt(15, 60);
      const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
      const hcfVal = gcd(a, b);
      const lcmVal = (a * b) / hcfVal;

      const question = `If HCF(${a}, ${b}) = ${hcfVal}, find the value of LCM(${a}, ${b}).`;
      const correct = `${lcmVal}`;
      const wrong1 = `${lcmVal + hcfVal}`;
      const wrong2 = `${Math.floor(lcmVal / 2) || lcmVal + 12}`;
      const wrong3 = `${lcmVal - 4}`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `math-real-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Mathematics' as SubjectType,
        chapter: 'Real Numbers' as ChapterType,
        difficulty: 'Easy' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `By the fundamental property for two positive integers a and b: HCF(a, b) × LCM(a, b) = a × b. Therefore, LCM(${a}, ${b}) = (${a} × ${b}) / ${hcfVal} = ${lcmVal}.`,
        formulaOrHint: 'HCF(a, b) × LCM(a, b) = a × b'
      };
    },

    // 2. Quadratic Equations - Equal roots condition
    () => {
      const b = 2 * randInt(2, 8); // even number
      const c = randInt(1, 9);
      // For ax^2 + bx + c = 0 to have equal roots, D = b^2 - 4ac = 0 => 4ac = b^2 => a = b^2 / (4c)
      // Let's frame: 4x^2 - kx + 9 = 0
      const sqrtA = randInt(1, 4);
      const sqrtC = randInt(2, 6);
      const a = sqrtA * sqrtA;
      const cVal = sqrtC * sqrtC;
      const kVal = 2 * sqrtA * sqrtC;

      const question = `Find the positive value of 'k' for which the quadratic equation ${a}x² - kx + ${cVal} = 0 has two equal and real roots.`;
      const correct = `${kVal}`;
      const wrong1 = `${kVal + 2}`;
      const wrong2 = `${kVal * 2}`;
      const wrong3 = `${Math.abs(kVal - 4) || 8}`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `math-quad-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Mathematics' as SubjectType,
        chapter: 'Quadratic Equations' as ChapterType,
        difficulty: 'Medium' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `For equal roots, discriminant D = b² - 4ac = 0. Here a = ${a}, b = -k, c = ${cVal}. (-k)² - 4(${a})(${cVal}) = 0 ⇒ k² = ${4 * a * cVal} ⇒ k = ${kVal}.`,
        formulaOrHint: 'For equal real roots, Discriminant D = b² - 4ac = 0'
      };
    },

    // 3. Arithmetic Progressions - nth term
    () => {
      const a = randInt(2, 10);
      const d = randInt(3, 7);
      const n = randInt(12, 25);
      const an = a + (n - 1) * d;

      const question = `In an Arithmetic Progression with first term a = ${a} and common difference d = ${d}, find the ${n}th term (a_${n}).`;
      const correct = `${an}`;
      const wrong1 = `${an + d}`;
      const wrong2 = `${an - d}`;
      const wrong3 = `${an + 2}`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `math-ap-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Mathematics' as SubjectType,
        chapter: 'Arithmetic Progressions' as ChapterType,
        difficulty: 'Easy' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `Formula for nth term of an AP is aₙ = a + (n - 1)d. Here a = ${a}, d = ${d}, and n = ${n}. aₙ = ${a} + (${n} - 1)(${d}) = ${a} + ${n - 1} × ${d} = ${an}.`,
        formulaOrHint: 'aₙ = a + (n - 1)d'
      };
    },

    // 4. Coordinate Geometry - Distance Formula
    () => {
      // Pick Pythagorean triples to keep distance integer
      const triples = [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [8, 15, 17]
      ];
      const selected = triples[randInt(0, triples.length - 1)];
      const dx = selected[0];
      const dy = selected[1];
      const dist = selected[2];

      const x1 = randInt(1, 5);
      const y1 = randInt(1, 5);
      const x2 = x1 + dx;
      const y2 = y1 + dy;

      const question = `Calculate the distance between points P(${x1}, ${y1}) and Q(${x2}, ${y2}).`;
      const correct = `${dist} units`;
      const wrong1 = `${dist + 2} units`;
      const wrong2 = `${dist - 1} units`;
      const wrong3 = `${dist * 2} units`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `math-coord-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Mathematics' as SubjectType,
        chapter: 'Coordinate Geometry' as ChapterType,
        difficulty: 'Easy' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `Using distance formula d = √[(x₂ - x₁)² + (y₂ - y₁)²] = √[(${x2} - ${x1})² + (${y2} - ${y1})²] = √[${dx}² + ${dy}²] = √${dx * dx + dy * dy} = ${dist} units.`,
        formulaOrHint: 'Distance = √[(x₂ - x₁)² + (y₂ - y₁)²]'
      };
    },

    // 5. Trigonometry - Value evaluation
    () => {
      const angles = [30, 45, 60];
      const ang = angles[randInt(0, angles.length - 1)];
      let question = '';
      let correct = '';
      let explanation = '';
      let wrong1 = '', wrong2 = '', wrong3 = '';

      if (ang === 30) {
        question = 'Evaluate: 2 sin(30°) + 4 cos(60°) - tan(45°)';
        // 2*(1/2) + 4*(1/2) - 1 = 1 + 2 - 1 = 2
        correct = '2';
        wrong1 = '1';
        wrong2 = '3';
        wrong3 = '0';
        explanation = 'sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1. Substitute: 2(1/2) + 4(1/2) - 1 = 1 + 2 - 1 = 2.';
      } else if (ang === 45) {
        question = 'Evaluate: 2 tan²(45°) + cos²(30°) - sin²(60°)';
        // 2*(1)^2 + 3/4 - 3/4 = 2
        correct = '2';
        wrong1 = '1';
        wrong2 = '√3';
        wrong3 = '1/2';
        explanation = 'tan 45° = 1, cos 30° = √3/2, sin 60° = √3/2. Substitute: 2(1)² + (√3/2)² - (√3/2)² = 2 + 3/4 - 3/4 = 2.';
      } else {
        question = 'If sin θ = 3/5, what is the value of cos θ (where θ is an acute angle)?';
        correct = '4/5';
        wrong1 = '3/4';
        wrong2 = '5/4';
        wrong3 = '2/5';
        explanation = 'Using identity sin²θ + cos²θ = 1 ⇒ cos θ = √(1 - sin²θ) = √(1 - 9/25) = √(16/25) = 4/5.';
      }

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `math-trig-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Mathematics' as SubjectType,
        chapter: 'Introduction to Trigonometry' as ChapterType,
        difficulty: 'Medium' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation,
        formulaOrHint: 'sin²θ + cos²θ = 1'
      };
    },

    // 6. Probability - Marbles / Balls in a bag
    () => {
      const red = randInt(3, 8);
      const blue = randInt(4, 9);
      const green = randInt(2, 6);
      const total = red + blue + green;

      const question = `A bag contains ${red} red, ${blue} blue, and ${green} green marbles. A marble is drawn at random. What is the probability of getting a red marble?`;
      const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
      const g = gcd(red, total);
      const simplified = `${red / g}/${total / g}`;
      const correct = simplified;
      const wrong1 = `${(red + 1) / g}/${total / g}`;
      const wrong2 = `${blue / gcd(blue, total)}/${total / gcd(blue, total)}`;
      const wrong3 = `${green / gcd(green, total)}/${total / gcd(green, total)}`;

      const options = shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3])).slice(0, 4));
      while (options.length < 4) {
        options.push(`${randInt(1, 3)}/${randInt(4, 7)}`);
      }
      return {
        id: `math-prob-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Mathematics' as SubjectType,
        chapter: 'Probability' as ChapterType,
        difficulty: 'Easy' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `Total outcomes = ${red} + ${blue} + ${green} = ${total}. Favourable outcomes for red = ${red}. Probability P(Red) = ${red}/${total} = ${correct}.`,
        formulaOrHint: 'P(Event) = (Number of Favorable Outcomes) / (Total Number of Outcomes)'
      };
    },

    // 7. Statistics - Empirical Relationship
    () => {
      const mean = randInt(20, 50);
      const median = randInt(mean - 4, mean + 6);
      // 3 Median = Mode + 2 Mean => Mode = 3 Median - 2 Mean
      const mode = 3 * median - 2 * mean;

      const question = `For a frequency distribution, if the Mean is ${mean} and the Median is ${median}, find the Mode using the empirical relationship.`;
      const correct = `${mode}`;
      const wrong1 = `${mode + 3}`;
      const wrong2 = `${mode - 4}`;
      const wrong3 = `${Math.round((mean + median) / 2)}`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `math-stat-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Mathematics' as SubjectType,
        chapter: 'Statistics' as ChapterType,
        difficulty: 'Medium' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `The empirical formula relating central tendencies is: Mode = 3 Median - 2 Mean. Substituting values: Mode = 3(${median}) - 2(${mean}) = ${3 * median} - ${2 * mean} = ${mode}.`,
        formulaOrHint: '3 Median = Mode + 2 Mean'
      };
    },

    // 8. Areas Related to Circles - Sector Area
    () => {
      const r = 7 * randInt(1, 3); // multiple of 7 to simplify with pi = 22/7
      const angles = [60, 90, 120];
      const theta = angles[randInt(0, 2)];
      // Area = (theta/360) * (22/7) * r^2
      const area = Math.round((theta / 360) * (22 / 7) * r * r * 10) / 10;

      const question = `Find the area of a sector of a circle of radius ${r} cm with a central angle of ${theta}°. (Take π = 22/7)`;
      const correct = `${area} cm²`;
      const wrong1 = `${Math.round((area + 15.5) * 10) / 10} cm²`;
      const wrong2 = `${Math.round((area - 11.2) * 10) / 10} cm²`;
      const wrong3 = `${Math.round(area * 1.5 * 10) / 10} cm²`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `math-circle-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Mathematics' as SubjectType,
        chapter: 'Areas Related to Circles' as ChapterType,
        difficulty: 'Medium' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `Area of sector = (θ / 360°) × πr² = (${theta} / 360) × (22 / 7) × ${r} × ${r} = ${area} cm².`,
        formulaOrHint: 'Area of sector = (θ / 360°) × πr²'
      };
    }
  ];

  const chosenGenerator = mathGenerators[randInt(0, mathGenerators.length - 1)];
  return chosenGenerator();
}

// ----------------------------------------------------------------------
// SCIENCE PROCEDURAL GENERATOR
// ----------------------------------------------------------------------
function generateScienceDynamicQuestion(filterChapter?: ChapterType): QuizQuestion {
  const scienceGenerators = [
    // 1. Electricity - Ohm's Law & Power
    () => {
      const r = randInt(5, 25);
      const v = randInt(10, 220);
      const i = Math.round((v / r) * 100) / 100;
      const question = `An electric heating appliance has a resistance of ${r} Ω and is connected to a ${v} V source. Calculate the current flowing through it.`;
      const correct = `${i} A`;
      const wrong1 = `${Math.round((i * 1.5) * 100) / 100} A`;
      const wrong2 = `${Math.round((i * 0.5) * 100) / 100} A`;
      const wrong3 = `${Math.round((v * r) * 10) / 10} A`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `sci-elec-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Science' as SubjectType,
        chapter: 'Electricity' as ChapterType,
        difficulty: 'Easy' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `According to Ohm's Law: V = I × R ⇒ I = V / R = ${v} / ${r} = ${i} A.`,
        formulaOrHint: 'Ohm’s Law: V = I × R'
      };
    },

    // 2. Electricity - Equivalent Resistance in Parallel
    () => {
      const r1 = 6;
      const r2 = 12;
      // 1/Rp = 1/6 + 1/12 = 3/12 = 1/4 => Rp = 4
      const question = `Two resistors of ${r1} Ω and ${r2} Ω are connected in parallel. What is their effective equivalent resistance?`;
      const correct = `4 Ω`;
      const wrong1 = `18 Ω`;
      const wrong2 = `8 Ω`;
      const wrong3 = `2 Ω`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `sci-elec-res-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Science' as SubjectType,
        chapter: 'Electricity' as ChapterType,
        difficulty: 'Medium' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `For resistors in parallel: 1/Rₚ = 1/R₁ + 1/R₂ = 1/6 + 1/12 = 3/12 = 1/4 ⇒ Rₚ = 4 Ω.`,
        formulaOrHint: '1/Rₚ = 1/R₁ + 1/R₂'
      };
    },

    // 3. Light - Lens Power & Focal Length
    () => {
      const f_cm = [20, 25, 50, 100][randInt(0, 3)];
      const f_m = f_cm / 100;
      const power = Math.round((1 / f_m) * 10) / 10;
      const question = `A convex lens has a focal length of +${f_cm} cm. What is its optical power in dioptres?`;
      const correct = `+${power} D`;
      const wrong1 = `-${power} D`;
      const wrong2 = `+${f_cm} D`;
      const wrong3 = `+${Math.round((power / 2) * 10) / 10} D`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `sci-light-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Science' as SubjectType,
        chapter: 'Light – Reflection and Refraction' as ChapterType,
        difficulty: 'Easy' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `Power of lens P = 1 / f (in metres). Focal length = +${f_cm} cm = +${f_m} m. P = 1 / ${f_m} = +${power} D. Convex lenses have positive power.`,
        formulaOrHint: 'P = 1 / f (in metres)'
      };
    },

    // 4. Chemical Reactions - Redox Identification
    () => {
      const reactions = [
        {
          rxn: 'CuO + H₂ ⟶ Cu + H₂O',
          subOx: 'H₂',
          subRed: 'CuO',
          oxAgent: 'CuO',
          redAgent: 'H₂'
        },
        {
          rxn: 'ZnO + C ⟶ Zn + CO',
          subOx: 'C',
          subRed: 'ZnO',
          oxAgent: 'ZnO',
          redAgent: 'C'
        },
        {
          rxn: 'MnO₂ + 4HCl ⟶ MnCl₂ + 2H₂O + Cl₂',
          subOx: 'HCl',
          subRed: 'MnO₂',
          oxAgent: 'MnO₂',
          redAgent: 'HCl'
        }
      ];
      const r = reactions[randInt(0, reactions.length - 1)];
      const question = `In the reaction: ${r.rxn}, identify the substance oxidized and the oxidizing agent respectively.`;
      const correct = `${r.subOx} is oxidized; ${r.oxAgent} is the oxidizing agent`;
      const wrong1 = `${r.subRed} is oxidized; ${r.redAgent} is the oxidizing agent`;
      const wrong2 = `Both are oxidized`;
      const wrong3 = `${r.oxAgent} is oxidized; ${r.subOx} is reducing agent`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `sci-chem-redox-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Science' as SubjectType,
        chapter: 'Chemical Reactions and Equations' as ChapterType,
        difficulty: 'Competency/HOTS' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `Oxidation is gain of oxygen or loss of hydrogen. ${r.subOx} gains oxygen to become oxidized. The oxidizing agent supplies oxygen, which is ${r.oxAgent}.`,
        formulaOrHint: 'Oxidation = Gain of O or Loss of H; Reduction = Loss of O or Gain of H'
      };
    },

    // 5. Acids, Bases and Salts - Universal Indicator / pH
    () => {
      const items = [
        { name: 'Gastric juice in human stomach', ph: 'around 1.2 to 2.0 (strongly acidic)', correct: 'Strongly Acidic (pH ~ 1.2)' },
        { name: 'Pure Water at 25°C', ph: '7.0 (neutral)', correct: 'Neutral (pH = 7.0)' },
        { name: 'Milk of Magnesia (Antacid)', ph: 'around 10.5 (mildly alkaline)', correct: 'Basic (pH ~ 10.5)' },
        { name: 'Toothpaste', ph: 'around 8.0 to 9.0 (basic to neutralize mouth acids)', correct: 'Weakly Basic (pH ~ 8.0)' }
      ];
      const selected = items[randInt(0, items.length - 1)];
      const question = `What is the nature and approximate pH classification of ${selected.name}?`;
      const correct = selected.correct;
      const wrong1 = 'Highly Acidic (pH = 0)';
      const wrong2 = 'Highly Alkaline (pH = 14)';
      const wrong3 = 'Completely Neutral (pH = 7.0)';

      const options = shuffle(Array.from(new Set([correct, wrong1, wrong2, wrong3])));
      return {
        id: `sci-acid-ph-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Science' as SubjectType,
        chapter: 'Acids, Bases and Salts' as ChapterType,
        difficulty: 'Easy' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `${selected.name} has a nature: ${selected.ph}. Tooth enamel starts corroding below pH 5.5.`,
        formulaOrHint: 'pH < 7 is Acidic, pH = 7 is Neutral, pH > 7 is Basic'
      };
    },

    // 6. Life Processes - Nutrition & Enzymes
    () => {
      const enzymes = [
        { name: 'Pepsin', site: 'Stomach', medium: 'Acidic (due to HCl)', substrate: 'Proteins' },
        { name: 'Trypsin', site: 'Small intestine (Pancreatic juice)', medium: 'Alkaline', substrate: 'Proteins' },
        { name: 'Salivary Amylase', site: 'Mouth / Buccal cavity', medium: 'Neutral/Slightly acidic (~6.8)', substrate: 'Starch into Maltose' },
        { name: 'Bile Juice', site: 'Liver / Gall bladder', medium: 'Alkaline', substrate: 'Emulsification of large fat globules' }
      ];
      const en = enzymes[randInt(0, enzymes.length - 1)];
      const question = `Which digestive enzyme/fluid is secreted at the ${en.site} to act on ${en.substrate} in an ${en.medium} medium?`;
      const correct = en.name;
      const wrong1 = enzymes.find(x => x.name !== en.name)?.name || 'Lipase';
      const wrong2 = 'Renin';
      const wrong3 = 'Glucagon';

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `sci-bio-enz-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Science' as SubjectType,
        chapter: 'Life Processes' as ChapterType,
        difficulty: 'Medium' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `${en.name} works in the ${en.site} to digest ${en.substrate}. Its optimal environment is ${en.medium}.`,
        formulaOrHint: 'Pepsin requires acidic pH created by HCl in stomach.'
      };
    },

    // 7. Heredity - Mendel's Cross
    () => {
      const question = 'In a Mendelian monohybrid cross between pure tall pea plants (TT) and pure dwarf pea plants (tt), what is the phenotypic ratio in the F2 generation?';
      const correct = '3 Tall : 1 Dwarf';
      const wrong1 = '1 Tall : 2 Medium : 1 Dwarf';
      const wrong2 = '9 : 3 : 3 : 1';
      const wrong3 = 'All Tall';

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `sci-bio-mendel-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Science' as SubjectType,
        chapter: 'Heredity and Evolution' as ChapterType,
        difficulty: 'Medium' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: 'In the F2 generation of a monohybrid cross, the phenotypic ratio is 3 : 1 (3 Tall, 1 Dwarf), while the genotypic ratio is 1 TT : 2 Tt : 1 tt (1 : 2 : 1).',
        formulaOrHint: 'F2 Phenotypic Ratio = 3 : 1; Genotypic Ratio = 1 : 2 : 1'
      };
    },

    // 8. Our Environment - 10% Energy Transfer
    () => {
      const sunlight = randInt(10, 50) * 1000; // e.g. 20000 J
      // Producers capture 1% of solar energy:
      const producerEnergy = sunlight * 0.01;
      // Herbivore captures 10% of producer:
      const herbivoreEnergy = producerEnergy * 0.1;
      // Carnivore captures 10% of herbivore:
      const carnivoreEnergy = herbivoreEnergy * 0.1;

      const question = `If green plants in a terrestrial ecosystem receive ${sunlight} J of solar energy, how much energy will be available to the primary consumer (herbivores)?`;
      const correct = `${herbivoreEnergy} J`;
      const wrong1 = `${producerEnergy} J`;
      const wrong2 = `${carnivoreEnergy} J`;
      const wrong3 = `${sunlight * 0.1} J`;

      const options = shuffle([correct, wrong1, wrong2, wrong3]);
      return {
        id: `sci-env-ten-${Date.now()}-${randInt(100, 999)}`,
        subject: 'Science' as SubjectType,
        chapter: 'Our Environment' as ChapterType,
        difficulty: 'Competency/HOTS' as QuestionDifficulty,
        question,
        options,
        correctIndex: options.indexOf(correct),
        explanation: `Step 1: Plants trap only 1% of solar energy falling on leaves = 1% of ${sunlight} J = ${producerEnergy} J. Step 2: According to Lindeman's 10% Law, herbivores receive 10% of plant energy = 10% of ${producerEnergy} J = ${herbivoreEnergy} J.`,
        formulaOrHint: 'Plants capture 1% solar energy; 10% is passed to each successive trophic level.'
      };
    }
  ];

  const chosenGenerator = scienceGenerators[randInt(0, scienceGenerators.length - 1)];
  return chosenGenerator();
}
