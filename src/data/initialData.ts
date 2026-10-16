import { QuizQuestion, SamplePaper, ChapterNote, NotificationItem, PuzzleGame } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'cbse-circ-2026-01',
    title: 'CBSE 2026-27 Class X Curriculum & Competency Weightage Official Blueprint',
    category: 'CBSE Circular',
    date: 'October 12, 2026',
    isImportant: true,
    summary: 'Minimum 50% Competency-Based Questions (MCQs, Case-Based, Source-Integrated) mandatory for Class 10 Board Examinations 2026-27.',
    fullContent: `The Central Board of Secondary Education (CBSE) has notified all affiliated schools regarding the final blueprint for the 2026-27 Board Examinations. 
Highlights:
1. 50% of total questions will be Competency-Focused (MCQs, case-based questions, source-based integrated questions).
2. 20% Select response type questions (Multiple Choice Questions).
3. 30% Constructed response questions (Short Answer and Long Answer questions).
4. No overall choice in question papers; internal choices will be provided in 33% of questions.
5. All schools must conduct internal assessments across Periodic Tests, Multiple Assessments, Portfolio, and Subject Enrichment Activities.`,
    pdfTitle: 'CBSE_Circular_ClassX_2026-27_Blueprint.pdf'
  },
  {
    id: 'cbse-circ-2026-02',
    title: 'Science & Mathematics Practical & Internal Assessment Guidelines 2026-27',
    category: 'Syllabus Update',
    date: 'September 28, 2026',
    isImportant: true,
    summary: '20 marks internal assessment breakdown for Science (086) and Math (041/241) with lab record submission timeline.',
    fullContent: `Guidelines for Internal Assessment (20 Marks):
- Periodic Tests: 5 Marks (Average of best two periodic tests out of three).
- Multiple Assessment: 5 Marks (Quizzes, oral tests, concept maps, exit slips).
- Portfolio: 5 Marks (Classwork, notebook submission, peer assessment, student reflections).
- Subject Enrichment Activities: 5 Marks (Science Practical work / Math Lab practical projects).
Lab records must be verified by external observers starting December 15, 2026.`,
    pdfTitle: 'Internal_Assessment_Handbook_2026-27.pdf'
  },
  {
    id: 'cbse-circ-2026-03',
    title: 'Class 10 Board Examination 2027 Tentative Datesheet Notification',
    category: 'Datesheet',
    date: 'October 05, 2026',
    isImportant: true,
    summary: 'CBSE Class X Main Board examinations scheduled to commence from February 15, 2027.',
    fullContent: `Tentative Examination Datesheet for Major Subjects:
- February 17, 2027: Language (English Communicative / English Language & Literature)
- February 23, 2027: Science (Theory Code 086)
- March 02, 2027: Social Science (Code 087)
- March 09, 2027: Mathematics Standard (041) / Mathematics Basic (241)
- March 14, 2027: Hindi Course A / B
Detailed subject-wise date sheet will be dispatched along with admit cards in January 2027.`,
    pdfTitle: 'Tentative_Datesheet_CBSE_2027.pdf'
  },
  {
    id: 'cbse-circ-2026-04',
    title: 'Top 10 High-Yield Strategy Points for Scoring 95%+ in Science & Math',
    category: 'Exam Strategy',
    date: 'October 14, 2026',
    isImportant: false,
    summary: 'Subject expert panel insights on avoiding common pitfalls in NCERT step-marking and ray diagrams.',
    fullContent: `Strategic Preparation Points for 2026-27 Aspirants:
1. Master NCERT Exemplar problems: 30% of HOTS (Higher Order Thinking Skills) questions directly originate from or are styled after NCERT Exemplar.
2. In Science Physics: Always include arrow heads in ray diagrams. Omission loses 0.5 marks per diagram.
3. In Chemistry: Specify states of matter (s, l, g, aq) in balanced chemical equations.
4. In Biology: Label diagrams neatly with pencil; state function alongside structure in 3-mark questions.
5. In Math: Write given data, formula, and step numbers clearly. Step-marking guarantees partial credits even if the final arithmetic calculation goes astray.`,
    pdfTitle: 'CBSE_Topper_Strategy_Handout.pdf'
  }
];

export const INITIAL_QUESTIONS: QuizQuestion[] = [
  // SCIENCE QUESTIONS
  {
    id: 'q-sci-01',
    subject: 'Science',
    chapter: 'Chemical Reactions and Equations',
    difficulty: 'Competency/HOTS',
    question: 'A shiny brown-coloured element ‘X’ on heating in air becomes black in colour. Name the element ‘X’ and the black coloured compound formed.',
    options: [
      'X is Copper (Cu); black compound is Copper(II) oxide (CuO)',
      'X is Iron (Fe); black compound is Ferrous oxide (FeO)',
      'X is Lead (Pb); black compound is Lead dioxide (PbO₂)',
      'X is Silver (Ag); black compound is Silver sulfide (Ag₂S)'
    ],
    correctIndex: 0,
    explanation: 'Copper (Cu) is a reddish-brown metal. On heating in air, it reacts with oxygen to form black copper(II) oxide: 2Cu + O₂ → 2CuO.',
    formulaOrHint: '2Cu(s) + O₂(g) ⟶ 2CuO(s) (Black)',
    isCompetencyBased: true
  },
  {
    id: 'q-sci-02',
    subject: 'Science',
    chapter: 'Acids, Bases and Salts',
    difficulty: 'Medium',
    question: 'Bleaching powder is chemically known as Calcium oxychloride. How is it prepared on a commercial scale?',
    options: [
      'By the action of chlorine gas on dry slaked lime [Ca(OH)₂]',
      'By heating calcium carbonate with sodium chloride',
      'By reacting calcium oxide with dilute hydrochloric acid',
      'By passing carbon dioxide through lime water'
    ],
    correctIndex: 0,
    explanation: 'Bleaching powder (CaOCl₂) is manufactured by passing chlorine gas over dry slaked lime: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O.',
    formulaOrHint: 'Ca(OH)₂ + Cl₂ ⟶ CaOCl₂ + H₂O'
  },
  {
    id: 'q-sci-03',
    subject: 'Science',
    chapter: 'Metals and Non-metals',
    difficulty: 'Competency/HOTS',
    question: 'Assertion (A): Aluminum does not corrode easily despite being high in the reactivity series.\nReason (R): Aluminum forms a tough, non-porous protective oxide layer of Al₂O₃ on its surface.',
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is not the correct explanation of (A)',
      '(A) is true but (R) is false',
      '(A) is false but (R) is true'
    ],
    correctIndex: 0,
    explanation: 'Aluminum reacts with atmospheric oxygen to form a thin, tenacious layer of aluminum oxide (Al₂O₃) that prevents further oxidation and corrosion (self-passivation / anodizing).',
    formulaOrHint: '4Al + 3O₂ ⟶ 2Al₂O₃ (Protective passive oxide film)',
    isCompetencyBased: true
  },
  {
    id: 'q-sci-04',
    subject: 'Science',
    chapter: 'Carbon and its Compounds',
    difficulty: 'Medium',
    question: 'What is observed when ethanol reacts with sodium metal?',
    options: [
      'Effervescence of hydrogen gas (burns with pop sound) and formation of sodium ethoxide',
      'Evolution of carbon dioxide gas which turns lime water milky',
      'Formation of a sweet-smelling ester precipitate',
      'No reaction occurs at room temperature'
    ],
    correctIndex: 0,
    explanation: 'Ethanol reacts vigorously with active sodium metal to produce sodium ethoxide and hydrogen gas: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑.',
    formulaOrHint: '2CH₃CH₂OH + 2Na ⟶ 2CH₃CH₂ONa + H₂↑'
  },
  {
    id: 'q-sci-05',
    subject: 'Science',
    chapter: 'Life Processes',
    difficulty: 'Competency/HOTS',
    question: 'During vigorous anaerobic exercise, why do muscle cramps occur in human beings?',
    options: [
      'Accumulation of lactic acid due to conversion of pyruvate in low oxygen',
      'Accumulation of ethanol and carbon dioxide in muscle fibers',
      'Excessive breakdown of ATP into creatinine phosphate',
      'Complete oxidation of glucose into water vapor'
    ],
    correctIndex: 0,
    explanation: 'In human skeletal muscles, when oxygen supply is insufficient during strenuous exercise, pyruvate is converted into lactic acid (3-carbon molecule). The buildup of lactic acid causes muscle fatigue and cramps.',
    formulaOrHint: 'Glucose ⟶ Pyruvate ⟶ Lactic acid + Energy (in cytoplasm of muscle cells under lack of O₂)',
    isCompetencyBased: true
  },
  {
    id: 'q-sci-06',
    subject: 'Science',
    chapter: 'Light – Reflection and Refraction',
    difficulty: 'Hard',
    question: 'An object is placed at a distance of 12 cm in front of a concave mirror of focal length 15 cm. What is the nature and position of the image formed?',
    options: [
      'Virtual, erect and formed at 60 cm behind the mirror',
      'Real, inverted and formed at 60 cm in front of the mirror',
      'Virtual, erect and formed at 30 cm behind the mirror',
      'Real, inverted and formed at 20 cm in front of the mirror'
    ],
    correctIndex: 0,
    explanation: 'u = -12 cm, f = -15 cm. 1/v = 1/f - 1/u = -1/15 - (-1/12) = -1/15 + 1/12 = (-4 + 5)/60 = +1/60 ⇒ v = +60 cm. Since v is positive, the image is virtual, erect, and behind the mirror.',
    formulaOrHint: 'Mirror Formula: 1/f = 1/v + 1/u'
  },
  {
    id: 'q-sci-07',
    subject: 'Science',
    chapter: 'The Human Eye and the Colourful World',
    difficulty: 'Medium',
    question: 'A person cannot clearly see objects placed beyond 1.5 m. Identify the eye defect and the corrective lens needed.',
    options: [
      'Myopia (Short-sightedness); Concave lens of appropriate power',
      'Hypermetropia (Far-sightedness); Convex lens of appropriate power',
      'Presbyopia; Bifocal cylindrical lens',
      'Astigmatism; Bifocal progressive lens'
    ],
    correctIndex: 0,
    explanation: 'A person unable to see distant objects clearly suffers from Myopia (far point is reduced to 1.5 m). It is corrected using a concave (diverging) lens with focal length f = -1.5 m.',
    formulaOrHint: 'For myopic eye: Corrective focal length f = -d (distance of far point)'
  },
  {
    id: 'q-sci-08',
    subject: 'Science',
    chapter: 'Electricity',
    difficulty: 'Hard',
    question: 'Three identical bulbs of 60 W, 220 V each are connected in series across a 220 V mains supply. What is the total power consumed by the combination?',
    options: [
      '20 W',
      '180 W',
      '60 W',
      '40 W'
    ],
    correctIndex: 0,
    explanation: 'Resistance of each bulb R = V²/P = 220²/60. When connected in series, total resistance R_eq = 3R. Total power P_total = V² / R_eq = V² / (3R) = (V²/R) / 3 = 60 / 3 = 20 W.',
    formulaOrHint: 'In series for n identical appliances: P_total = P / n'
  },
  {
    id: 'q-sci-09',
    subject: 'Science',
    chapter: 'Magnetic Effects of Electric Current',
    difficulty: 'Medium',
    question: 'Which scientific rule determines the direction of the magnetic force experienced by a current-carrying straight conductor placed in an external magnetic field?',
    options: [
      'Fleming’s Left-Hand Rule',
      'Right-Hand Thumb Rule (Maxwell’s Corkscrew Rule)',
      'Fleming’s Right-Hand Rule',
      'Faraday’s Law of Induction'
    ],
    correctIndex: 0,
    explanation: 'Fleming’s Left-Hand Rule gives the direction of Force (Thumb), Magnetic Field (Forefinger), and Current (Middle finger) when held mutually perpendicular.',
    formulaOrHint: 'Left-Hand: Thumb = Force/Motion, Forefinger = Magnetic Field, Middle finger = Current'
  },
  {
    id: 'q-sci-10',
    subject: 'Science',
    chapter: 'Control and Coordination',
    difficulty: 'Medium',
    question: 'Which plant hormone is responsible for promoting cell elongation towards light (phototropism)?',
    options: [
      'Auxin',
      'Gibberellin',
      'Cytokinin',
      'Abscisic Acid'
    ],
    correctIndex: 0,
    explanation: 'Auxin is synthesized at shoot tips. It diffuses towards the shady side of the shoot, stimulating greater cell elongation there, causing the shoot to bend towards light.',
    formulaOrHint: 'Auxin promotes phototropism; Abscisic acid causes stomata closure and wilting.'
  },

  // MATHEMATICS QUESTIONS
  {
    id: 'q-math-01',
    subject: 'Mathematics',
    chapter: 'Real Numbers',
    difficulty: 'Easy',
    question: 'If two positive integers ‘a’ and ‘b’ are written as a = x³y² and b = xy³, where x and y are prime numbers, what is HCF(a, b)?',
    options: [
      'xy²',
      'x³y³',
      'x²y²',
      'xy'
    ],
    correctIndex: 0,
    explanation: 'HCF is the product of the smallest power of each common prime factor. Common factors are x (smallest power 1) and y (smallest power 2). Hence HCF = x¹y² = xy².',
    formulaOrHint: 'HCF = Product of least powers of common prime factors.'
  },
  {
    id: 'q-math-02',
    subject: 'Mathematics',
    chapter: 'Polynomials',
    difficulty: 'Medium',
    question: 'If α and β are the zeroes of the quadratic polynomial f(x) = x² - 5x + 6, find the value of (1/α + 1/β).',
    options: [
      '5/6',
      '-5/6',
      '6/5',
      '1/6'
    ],
    correctIndex: 0,
    explanation: 'For ax² + bx + c = 0, sum of zeroes α + β = -(-5)/1 = 5, and product αβ = 6/1 = 6. Then 1/α + 1/β = (α + β) / (αβ) = 5/6.',
    formulaOrHint: '1/α + 1/β = (α + β) / (αβ)'
  },
  {
    id: 'q-math-03',
    subject: 'Mathematics',
    chapter: 'Pair of Linear Equations in Two Variables',
    difficulty: 'Medium',
    question: 'For what value of ‘c’ does the pair of linear equations cx - y = 2 and 6x - 2y = 3 have infinitely many solutions?',
    options: [
      'No value of c exists',
      'c = 3',
      'c = -3',
      'c = 12'
    ],
    correctIndex: 0,
    explanation: 'For infinitely many solutions: a₁/a₂ = b₁/b₂ = c₁/c₂. Here a₁/a₂ = c/6, b₁/b₂ = (-1)/(-2) = 1/2, and c₁/c₂ = 2/3. Since 1/2 ≠ 2/3, the lines are never coincident regardless of c. Thus no such value exists.',
    formulaOrHint: 'Coincident lines require a₁/a₂ = b₁/b₂ = c₁/c₂.'
  },
  {
    id: 'q-math-04',
    subject: 'Mathematics',
    chapter: 'Arithmetic Progressions',
    difficulty: 'Competency/HOTS',
    question: 'In an AP, the sum of first n terms is given by Sₙ = 3n² + 5n. Find the common difference ‘d’.',
    options: [
      '6',
      '3',
      '8',
      '5'
    ],
    correctIndex: 0,
    explanation: 'When Sₙ = An² + Bn, the common difference d = 2A. Here A = 3, so d = 2(3) = 6. Alternatively: S₁ = 3(1)² + 5(1) = 8 = a₁. S₂ = 3(4) + 10 = 22. a₂ = S₂ - S₁ = 22 - 8 = 14. d = a₂ - a₁ = 14 - 8 = 6.',
    formulaOrHint: 'If Sₙ = An² + Bn, then common difference d = 2A'
  },
  {
    id: 'q-math-05',
    subject: 'Mathematics',
    chapter: 'Triangles',
    difficulty: 'Medium',
    question: 'In ΔABC, DE || BC such that AD/DB = 3/5. If AC = 5.6 cm, find the length of AE.',
    options: [
      '2.1 cm',
      '3.5 cm',
      '1.8 cm',
      '2.8 cm'
    ],
    correctIndex: 0,
    explanation: 'By Basic Proportionality Theorem (Thales Theorem): AD/AB = AE/AC. Given AD/DB = 3/5 ⇒ AD/AB = 3/(3 + 5) = 3/8. Therefore AE = (3/8) × 5.6 = 3 × 0.7 = 2.1 cm.',
    formulaOrHint: 'Basic Proportionality Theorem: AD/AB = AE/AC'
  },
  {
    id: 'q-math-06',
    subject: 'Mathematics',
    chapter: 'Coordinate Geometry',
    difficulty: 'Medium',
    question: 'Find the coordinates of the point which divides the line segment joining A(1, -2) and B(4, 7) internally in the ratio 1 : 2.',
    options: [
      '(2, 1)',
      '(3, 4)',
      '(1, 2)',
      '(2, 3)'
    ],
    correctIndex: 0,
    explanation: 'By section formula: x = (m₁x₂ + m₂x₁)/(m₁ + m₂) = (1×4 + 2×1)/(1 + 2) = 6/3 = 2. y = (m₁y₂ + m₂y₁)/(m₁ + m₂) = (1×7 + 2×(-2))/(1 + 2) = (7 - 4)/3 = 3/3 = 1. The point is (2, 1).',
    formulaOrHint: 'x = (m₁x₂ + m₂x₁) / (m₁ + m₂), y = (m₁y₂ + m₂y₁) / (m₁ + m₂)'
  },
  {
    id: 'q-math-07',
    subject: 'Mathematics',
    chapter: 'Introduction to Trigonometry',
    difficulty: 'Medium',
    question: 'If tan θ + cot θ = 2, find the value of tan²θ + cot²θ.',
    options: [
      '2',
      '4',
      '0',
      '1'
    ],
    correctIndex: 0,
    explanation: 'Squaring both sides: (tan θ + cot θ)² = 2² ⇒ tan²θ + cot²θ + 2 tan θ cot θ = 4. Since tan θ · cot θ = 1, tan²θ + cot²θ + 2 = 4 ⇒ tan²θ + cot²θ = 2.',
    formulaOrHint: '(a + b)² = a² + b² + 2ab with tan θ · cot θ = 1'
  },
  {
    id: 'q-math-08',
    subject: 'Mathematics',
    chapter: 'Circles',
    difficulty: 'Easy',
    question: 'From an external point P, two tangents PA and PB are drawn to a circle with centre O. If ∠APB = 80°, find ∠AOB.',
    options: [
      '100°',
      '80°',
      '50°',
      '90°'
    ],
    correctIndex: 0,
    explanation: 'In quadrilateral OAPB, radius OA ⊥ tangent PA (∠OAP = 90°) and OB ⊥ PB (∠OBP = 90°). The sum of opposite angles ∠APB + ∠AOB = 180° (supplementary). Thus ∠AOB = 180° - 80° = 100°.',
    formulaOrHint: 'The angle between two tangents and the angle subtended by line segment joining contact points at centre are supplementary.'
  },
  {
    id: 'q-math-09',
    subject: 'Mathematics',
    chapter: 'Surface Areas and Volumes',
    difficulty: 'Competency/HOTS',
    question: 'A solid metallic sphere of radius 6 cm is melted and recast into small spheres of radius 2 cm each. How many such small spheres are formed?',
    options: [
      '27',
      '9',
      '8',
      '18'
    ],
    correctIndex: 0,
    explanation: 'Number of spheres n = Volume of large sphere / Volume of small sphere = (4/3 π R³) / (4/3 π r³) = (R / r)³ = (6 / 2)³ = 3³ = 27.',
    formulaOrHint: 'Number of recast objects = V_original / V_unit = (R / r)³'
  },
  {
    id: 'q-math-10',
    subject: 'Mathematics',
    chapter: 'Probability',
    difficulty: 'Medium',
    question: 'Two unbiased dice are rolled simultaneously. What is the probability that the sum of the numbers appearing on the two dice is a prime number?',
    options: [
      '5/12',
      '7/36',
      '1/2',
      '13/36'
    ],
    correctIndex: 0,
    explanation: 'Total outcomes = 36. Prime sums possible are 2, 3, 5, 7, 11.\nSum 2: (1,1) [1]\nSum 3: (1,2),(2,1) [2]\nSum 5: (1,4),(2,3),(3,2),(4,1) [4]\nSum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) [6]\nSum 11: (5,6),(6,5) [2]\nTotal favorable = 1 + 2 + 4 + 6 + 2 = 15. P(Prime sum) = 15/36 = 5/12.',
    formulaOrHint: 'Prime sums on pair of dice: 2, 3, 5, 7, 11 (Total 15 pairs out of 36)'
  }
];

export const INITIAL_SAMPLE_PAPERS: SamplePaper[] = [
  {
    id: 'cbse-sqp-science-2027',
    title: 'CBSE Class X Science (086) Official Style Sample Question Paper 2026-27',
    subject: 'Science',
    paperType: 'Sample Question Paper 2026-27',
    year: '2026-27',
    durationMinutes: 180,
    maximumMarks: 80,
    blueprintOverview: 'Formulated per CBSE 2026-27 competency guidelines. Section A (20 Marks), Section B (10 Marks), Section C (18 Marks), Section D (20 Marks), Section E (12 Marks Case-Based).',
    generalInstructions: [
      'This question paper consists of 39 questions in 5 sections.',
      'All questions are compulsory. However, an internal choice is provided in some questions.',
      'Section A consists of 20 objective type questions carrying 1 mark each.',
      'Section B consists of 6 Very Short questions carrying 02 marks each. Answers should be in the range of 30 to 50 words.',
      'Section C consists of 7 Short Answer type questions carrying 03 marks each. Answers should be in the range of 50 to 80 words.',
      'Section D consists of 3 Long Answer type questions carrying 05 marks each. Answers should be in the range of 80 to 120 words.',
      'Section E consists of 3 source-based/case-based units of assessment of 04 marks each with sub-parts.'
    ],
    sections: [
      {
        name: 'Section A - Objective Questions & Assertion-Reason',
        description: 'Questions 1 to 20 carry 1 mark each.',
        totalMarks: 20,
        questions: [
          {
            questionNumber: 1,
            text: 'When aqueous solution of potassium iodide and lead nitrate are mixed, a precipitate is formed. What is the colour of the precipitate and the chemical formula of the compound precipitated?',
            marks: 1,
            answerKey: 'Yellow precipitate of Lead iodide [PbI₂].',
            stepMarksExplanation: '0.5 mark for yellow colour, 0.5 mark for formula PbI₂.'
          },
          {
            questionNumber: 2,
            text: 'Which gas is released when zinc granules react with dilute sodium hydroxide upon heating?',
            marks: 1,
            answerKey: 'Hydrogen gas (H₂). Equation: Zn + 2NaOH → Na₂ZnO₂ + H₂↑',
            stepMarksExplanation: '1 mark for correct gas identification and sodium zincate context.'
          },
          {
            questionNumber: 3,
            text: 'Assertion (A): Veins have thinner walls as compared to arteries.\nReason (R): Blood flows through veins under high and pulsating pressure.',
            marks: 1,
            answerKey: '(A) is true, but (R) is false.',
            stepMarksExplanation: '1 mark. Blood in veins flows under low pressure; arteries need thick elastic walls to withstand high systolic pressure.'
          }
        ]
      },
      {
        name: 'Section B - Very Short Answer Type',
        description: 'Questions 21 to 26 carry 2 marks each.',
        totalMarks: 10,
        questions: [
          {
            questionNumber: 21,
            text: 'State two conditions necessary for rusting of iron. Write a balanced chemical formula for rust.',
            marks: 2,
            answerKey: 'Conditions: (i) Presence of oxygen/air (ii) Presence of moisture/water. Formula for rust: Hydrated Iron(III) oxide [Fe₂O₃·xH₂O].',
            stepMarksExplanation: '0.5 mark each for the two conditions; 1 mark for the chemical formula Fe₂O₃·xH₂O.'
          },
          {
            questionNumber: 22,
            text: 'A wire of resistance 20 Ω is drawn out so that its length is doubled. What will be its new resistance?',
            marks: 2,
            answerKey: 'New resistance = 80 Ω.',
            stepMarksExplanation: 'Volume remains constant: A₁L₁ = A₂L₂. When length is doubled (L₂ = 2L₁), area halves (A₂ = A₁/2). R₂ = ρ(2L₁) / (A₁/2) = 4 [ρL₁/A₁] = 4 × 20 = 80 Ω. (1 mark for formula/ratio, 1 mark for 80 Ω).'
          }
        ]
      },
      {
        name: 'Section C - Short Answer Type',
        description: 'Questions 27 to 33 carry 3 marks each.',
        totalMarks: 18,
        questions: [
          {
            questionNumber: 27,
            text: 'Explain the mechanism of sex determination in human beings with the help of a suitable genetic cross flow chart.',
            marks: 3,
            answerKey: 'Human females possess XX chromosomes (homogametic, producing only X ova). Males possess XY chromosomes (heterogametic, producing 50% X and 50% Y sperms). Fertilization of X ovum by X sperm yields female child (XX); fertilization by Y sperm yields male child (XY). Hence father determines biological sex with equal 50:50 probability.',
            stepMarksExplanation: '1 mark for explanation of male heterogamety, 1 mark for genetic cross diagram, 1 mark for 50% statistical probability conclusion.'
          }
        ]
      },
      {
        name: 'Section D - Long Answer Type',
        description: 'Questions 34 to 36 carry 5 marks each.',
        totalMarks: 20,
        questions: [
          {
            questionNumber: 34,
            text: '(a) Draw a neat labeled diagram of a human nephron.\n(b) Describe the three major steps involved in urine formation in kidneys.',
            marks: 5,
            answerKey: '(a) Labeled diagram showing Bowman’s capsule, glomerulus, renal artery, tubular loop of Henle, collecting duct.\n(b) Step 1: Ultrafiltration in glomerulus under high blood pressure.\nStep 2: Selective reabsorption in renal tubules (glucose, amino acids, salts, water).\nStep 3: Tubular secretion of excess ions and urea into collecting duct.',
            stepMarksExplanation: '2 marks for neat labeled diagram; 1 mark each for the three steps with scientific terminology.'
          }
        ]
      },
      {
        name: 'Section E - Case-Based Integrated Assessment',
        description: 'Questions 37 to 39 carry 4 marks each with case text.',
        totalMarks: 12,
        questions: [
          {
            questionNumber: 37,
            text: 'Case Study: Domestic Electric Circuits and Safety Devices.\nIn domestic circuits, electric power from municipal poles enters through an electricity meter before distribution through a fuse or MCB board. Neutral wire (black/blue), live wire (red/brown), and earth wire (green/yellow) ensure safety against current leakage to metal casings.\n\nSub-questions:\n(i) Why are domestic appliances connected in parallel instead of series? (1 Mark)\n(ii) What is the function of the earth wire in heavy appliances like electric geysers or refrigerators? (1 Mark)\n(iii) An electric oven of rating 2 kW, 220 V is operated in a domestic circuit of 5 A current rating. What will happen when it is turned on? Justify with calculations. (2 Marks)',
            marks: 4,
            answerKey: '(i) Parallel connection ensures independent switches for each appliance and full 220 V voltage across all devices. If one fails, others continue.\n(ii) Earth wire provides a very low resistance conducting path for stray leak currents directly to ground, preventing severe electric shocks.\n(iii) Power P = 2000 W, Voltage V = 220 V. Current I = P / V = 2000 / 220 ≈ 9.09 A. Since 9.09 A exceeds the safe 5 A fuse rating, the circuit will overload and the fuse wire will melt / MCB will trip immediately.',
            stepMarksExplanation: '1 mark for part (i); 1 mark for part (ii); 1 mark for formula I = P/V with 9.09 A calculation and 1 mark for overload/fuse melting conclusion.'
          }
        ]
      }
    ]
  },
  {
    id: 'cbse-sqp-math-standard-2027',
    title: 'CBSE Class X Mathematics Standard (041) Sample Paper 2026-27',
    subject: 'Mathematics',
    paperType: 'Sample Question Paper 2026-27',
    year: '2026-27',
    durationMinutes: 180,
    maximumMarks: 80,
    blueprintOverview: 'CBSE 2026-27 Mathematics Standard (Code 041) sample paper strictly aligned with chapter-wise weightage: Algebra (20), Geometry (15), Trigonometry (12), Coordinate Geometry (6), Mensuration (10), Statistics & Probability (11), Number Systems (6).',
    generalInstructions: [
      'This question paper contains 38 questions divided into 5 Sections A, B, C, D and E.',
      'Section A comprises 20 MCQs of 1 mark each.',
      'Section B comprises 5 Short Answer Type-I questions of 2 marks each.',
      'Section C comprises 6 Short Answer Type-II questions of 3 marks each.',
      'Section D comprises 4 Long Answer questions of 5 marks each.',
      'Section E comprises 3 Case-Based integrated units of assessment of 4 marks each with sub-parts.'
    ],
    sections: [
      {
        name: 'Section A - MCQs & Assertion-Reason',
        description: 'Questions 1 to 20 carry 1 mark each.',
        totalMarks: 20,
        questions: [
          {
            questionNumber: 1,
            text: 'If the zeroes of the quadratic polynomial ax² + bx + c, c ≠ 0 are equal, then:',
            marks: 1,
            answerKey: 'c and a have the same sign (b² - 4ac = 0 ⇒ 4ac = b² > 0 ⇒ ac > 0)',
            stepMarksExplanation: '1 mark for correct deduction using discriminant condition.'
          },
          {
            questionNumber: 2,
            text: 'If sin θ + cos θ = √2 cos θ, then the value of (cos θ - sin θ) is:',
            marks: 1,
            answerKey: '√2 sin θ',
            stepMarksExplanation: '1 mark. sin θ = (√2 - 1) cos θ ⇒ cos θ - sin θ = cos θ - (√2 - 1)cos θ = (2 - √2)cos θ = √2 sin θ.'
          }
        ]
      },
      {
        name: 'Section B - Short Answer Type I',
        description: 'Questions 21 to 25 carry 2 marks each.',
        totalMarks: 10,
        questions: [
          {
            questionNumber: 21,
            text: 'Prove that √5 is an irrational number by method of contradiction.',
            marks: 2,
            answerKey: 'Assume √5 = a/b where a and b are co-prime integers (b ≠ 0). 5 = a²/b² ⇒ a² = 5b² (5 divides a² ⇒ 5 divides a). Let a = 5c ⇒ 25c² = 5b² ⇒ b² = 5c² (5 divides b). Hence 5 is a common factor of a and b, which contradicts their co-primality. Therefore √5 is irrational.',
            stepMarksExplanation: '1 mark for proving 5 divides a and b; 1 mark for contradiction reasoning.'
          }
        ]
      },
      {
        name: 'Section C - Short Answer Type II',
        description: 'Questions 26 to 31 carry 3 marks each.',
        totalMarks: 18,
        questions: [
          {
            questionNumber: 26,
            text: 'Find the ratio in which the y-axis divides the line segment joining the points A(5, -6) and B(-1, -4). Also find the point of intersection.',
            marks: 3,
            answerKey: 'Ratio = 5 : 1. Point of intersection = (0, -13/3).',
            stepMarksExplanation: '1 mark for setting point on y-axis as (0, y); 1 mark for calculating ratio k : 1 = 5 : 1 using x-coordinate 0; 1 mark for evaluating y = -13/3.'
          }
        ]
      },
      {
        name: 'Section D - Long Answer Type',
        description: 'Questions 32 to 35 carry 5 marks each.',
        totalMarks: 20,
        questions: [
          {
            questionNumber: 32,
            text: 'State and prove Basic Proportionality Theorem (Thales Theorem).',
            marks: 5,
            answerKey: 'Statement: If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.\nProof: Draw ΔABC with DE || BC. Join BE, CD and draw perpendiculars DM ⊥ AC and EN ⊥ AB. Ratio of areas: ar(ADE)/ar(BDE) = AD/DB and ar(ADE)/ar(CDE) = AE/EC. Since triangles BDE and CDE lie on the same base DE between parallel lines DE and BC, ar(BDE) = ar(CDE). Hence AD/DB = AE/EC.',
            stepMarksExplanation: '1 mark for precise statement; 1 mark for diagram and construction; 3 marks for step-by-step ratio of areas proof.'
          }
        ]
      },
      {
        name: 'Section E - Case-Based Integrated Assessment',
        description: 'Questions 36 to 38 carry 4 marks each.',
        totalMarks: 12,
        questions: [
          {
            questionNumber: 36,
            text: 'Case Study: Satellite Antenna and Trigonometric Angles.\nA telecommunication transmission tower is situated on top of a hill. From a monitoring post on level ground 100 m away from the foot of the hill, the angle of elevation of the top of the hill is 30°, and the angle of elevation of the top of the tower is 45°.\n\nSub-questions:\n(i) Find the height of the hill. (Take √3 = 1.732) (1 Mark)\n(ii) Find the total height of the hill plus tower. (1 Mark)\n(iii) Calculate the exact height of the transmission tower alone. (2 Marks)',
            marks: 4,
            answerKey: '(i) Height of hill h = 100 × tan(30°) = 100 / √3 ≈ 57.73 m.\n(ii) Total height H = 100 × tan(45°) = 100 × 1 = 100 m.\n(iii) Height of tower alone = H - h = 100 - 57.73 = 42.27 m.',
            stepMarksExplanation: '1 mark for hill height (57.73 m); 1 mark for total height (100 m); 2 marks for difference calculation (42.27 m).'
          }
        ]
      }
    ]
  }
];

export const INITIAL_NOTES: ChapterNote[] = [
  {
    id: 'note-sci-chem-01',
    subject: 'Science',
    chapter: 'Chemical Reactions and Equations',
    title: 'Chemical Reactions and Equations - Complete Mindmap & NCERT Points',
    summary: 'Master chemical equation balancing, types of chemical reactions (combination, decomposition, displacement, double displacement), oxidation-reduction, rancidity, and corrosion.',
    highYieldPoints: [
      'A chemical reaction involves breaking and making of bonds between atoms to produce new substances with entirely different properties.',
      'Law of Conservation of Mass: Total mass of elements present in the products must equal the total mass of elements present in reactants.',
      'Thermal decomposition: Heating green Ferrous Sulphate crystals (FeSO₄·7H₂O) loses water of crystallisation and decomposes to reddish-brown Fe₂O₃ + SO₂↑ + SO₃↑ with pungent burning sulphur odour.',
      'Electrolytic decomposition of water yields H₂ and O₂ gases in a 2:1 volume ratio at cathode and anode respectively.',
      'Displacement: Fe + CuSO₄(aq) [Blue] ⟶ FeSO₄(aq) [Pale green] + Cu [Brownish deposit].',
      'Corrosion of Silver forms black Ag₂S; Copper forms green basic copper carbonate [CuCO₃·Cu(OH)₂]; Iron forms reddish-brown rust [Fe₂O₃·xH₂O].'
    ],
    formulasAndReactions: [
      { label: 'Combination (Slaking of lime)', formula: 'CaO(s) [Quicklime] + H₂O(l) ⟶ Ca(OH)₂(aq) [Slaked lime] + Heat (Exothermic)' },
      { label: 'White washing whitewash glaze', formula: 'Ca(OH)₂(aq) + CO₂(g) ⟶ CaCO₃(s) [Calcium Carbonate] + H₂O(l)' },
      { label: 'Lead Nitrate Thermal Decomposition', formula: '2Pb(NO₃)₂(s) ⟶ 2PbO(s) [Yellow] + 4NO₂↑ [Brown fumes] + O₂↑' },
      { label: 'Photolytic decomposition', formula: '2AgCl(s) [White] ──Sunlight──> 2Ag(s) [Grey] + Cl₂↑(g)' }
    ],
    commonMistakes: [
      'Writing word equations without state symbols (s, l, g, aq) — CBSE marking scheme cuts 0.5 mark.',
      'Confusing oxidizing agent with substance oxidized: The substance reduced is the oxidizing agent!'
    ],
    ncertExemplarTips: [
      'Remember that respiration is an exothermic reaction because glucose oxidation produces 38 ATP equivalent energy.',
      'Precipitation reactions are invariably double displacement reactions.'
    ],
    downloadFileName: 'Class10_Science_Ch1_Chemical_Reactions_Notes.pdf'
  },
  {
    id: 'note-sci-elec-01',
    subject: 'Science',
    chapter: 'Electricity',
    title: 'Electricity - Formula Sheet, Circuit Laws & High-Yield Numericals',
    summary: 'Comprehensive revision of electric current, potential difference, Ohm’s law, factors affecting resistance, resistivity, series & parallel circuits, Joule’s heating law, and electric power.',
    highYieldPoints: [
      'Electric current I = Q / t (1 Ampere = 1 Coulomb / 1 Second). Electric current is measured by an ammeter connected in series (low resistance).',
      'Potential difference V = W / Q (1 Volt = 1 Joule / 1 Coulomb). Measured by voltmeter in parallel (high resistance).',
      'Ohm’s law states V ∝ I at constant temperature, so V = IR.',
      'Resistance R depends on: length (R ∝ l), cross-sectional area (R ∝ 1/A), nature of material (resistivity ρ), and temperature. R = ρl / A.',
      'Resistivity (ρ) depends ONLY on the material and temperature, NOT on dimensions (length or thickness). Unit: Ω·m.',
      'Alloys have higher resistivity and do not oxidize (burn) easily at high temperatures; hence used in heating elements of toasters and irons (e.g. Nichrome).',
      'Joule’s Law of Heating: H = I²Rt = VIt = (V² / R)t.'
    ],
    formulasAndReactions: [
      { label: 'Ohm’s Law', formula: 'V = I × R' },
      { label: 'Resistance Formula', formula: 'R = ρ (L / A)' },
      { label: 'Series Resistance', formula: 'R_s = R₁ + R₂ + R₃ + ... + R_n' },
      { label: 'Parallel Resistance', formula: '1/R_p = 1/R₁ + 1/R₂ + 1/R₃ + ...' },
      { label: 'Electric Power', formula: 'P = V × I = I²R = V² / R' },
      { label: 'Commercial Energy Unit', formula: '1 kWh = 1 unit = 3.6 × 10⁶ Joules' }
    ],
    commonMistakes: [
      'Forgetting to convert time in minutes to seconds when calculating Heat H = I²Rt in Joules!',
      'Assuming resistivity changes when wire is stretched: Resistivity remains constant, only resistance quadruples when length doubles and volume remains fixed.'
    ],
    ncertExemplarTips: [
      'Tungsten has high melting point (3380°C) and flexibility, making it ideal for bulb filaments.',
      'In domestic circuits, parallel wiring ensures every appliance receives full 220V and operates independently.'
    ],
    downloadFileName: 'Class10_Science_Electricity_Complete_Notes.pdf'
  },
  {
    id: 'note-math-trig-01',
    subject: 'Mathematics',
    chapter: 'Introduction to Trigonometry',
    title: 'Introduction to Trigonometry - Values Table, Identities & Short Tricks',
    summary: 'Master standard angle values (0°, 30°, 45°, 60°, 90°), fundamental Pythagorean identities, complementary transformations, and board proof strategies.',
    highYieldPoints: [
      'Trigonometric ratios are defined for acute angles in a right-angled triangle.',
      'sin θ = Opposite/Hypotenuse, cos θ = Adjacent/Hypotenuse, tan θ = Opposite/Adjacent.',
      'Reciprocal identities: cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ = cos θ / sin θ.',
      'Values trick: For 0°, 30°, 45°, 60°, 90°, evaluate √(0/4), √(1/4), √(2/4), √(3/4), √(4/4) ⟶ 0, 1/2, 1/√2, √3/2, 1 for sine values!',
      'Key Pythagorean Identities:\n1) sin²θ + cos²θ = 1\n2) 1 + tan²θ = sec²θ  ⇒  sec²θ - tan²θ = 1  ⇒  (sec θ - tan θ)(sec θ + tan θ) = 1\n3) 1 + cot²θ = cosec²θ  ⇒  cosec²θ - cot²θ = 1'
    ],
    formulasAndReactions: [
      { label: 'Standard Identity 1', formula: 'sin²θ + cos²θ = 1  ⟺  cos²θ = 1 - sin²θ' },
      { label: 'Standard Identity 2', formula: 'sec²θ - tan²θ = 1  ⟺  sec θ - tan θ = 1 / (sec θ + tan θ)' },
      { label: 'Standard Identity 3', formula: 'cosec²θ - cot²θ = 1  ⟺  cosec θ - cot θ = 1 / (cosec θ + cot θ)' },
      { label: 'Tangent Quotient', formula: 'tan θ = sin θ / cos θ,  cot θ = cos θ / sin θ' }
    ],
    commonMistakes: [
      'Writing sin(A + B) = sin A + sin B (strictly false!).',
      'Confusing (sin θ)² with sin θ²: In (sin θ)², it is written as sin²θ.'
    ],
    ncertExemplarTips: [
      'In identity proof questions: Whenever sec θ and tan θ or cosec θ and cot θ appear, convert everything to sin θ and cos θ as a foolproof universal technique.'
    ],
    downloadFileName: 'Class10_Math_Trigonometry_Master_CheatSheet.pdf'
  },
  {
    id: 'note-math-quad-01',
    subject: 'Mathematics',
    chapter: 'Quadratic Equations',
    title: 'Quadratic Equations - Discriminant Analysis, Word Problems & Formulas',
    summary: 'Standard form ax² + bx + c = 0, factorization method, quadratic formula (Sridharacharya formula), nature of roots, and real-life speed/time/pipe word problem models.',
    highYieldPoints: [
      'Standard form: ax² + bx + c = 0 where a, b, c are real numbers and a ≠ 0.',
      'Roots by quadratic formula: x = [-b ± √(b² - 4ac)] / (2a).',
      'Discriminant D = b² - 4ac dictates nature of roots:\n• D > 0: Two distinct real roots\n• D = 0: Two equal (coincident) real roots (x = -b / 2a)\n• D < 0: No real roots (roots are imaginary/complex)',
      'Speed and Time word problems: Upstream speed = (x - y) km/h, Downstream speed = (x + y) km/h where x = speed of boat in still water and y = stream speed.',
      'Taps and cistern problems: If tap takes x hours, work done in 1 hour = 1/x.'
    ],
    formulasAndReactions: [
      { label: 'Quadratic Formula', formula: 'x = (-b ± √(b² - 4ac)) / (2a)' },
      { label: 'Discriminant', formula: 'D = b² - 4ac' },
      { label: 'Condition for Equal Roots', formula: 'b² - 4ac = 0  ⇒  b² = 4ac' }
    ],
    commonMistakes: [
      'Forgetting the denominator 2a in the quadratic formula and dividing only the square root part!',
      'Rejecting negative solutions blindly: Only reject negative solutions if the variable represents physical quantities like age, speed, or distance.'
    ],
    ncertExemplarTips: [
      'When solving equations reducible to quadratic forms like x/(x-1) + (x-1)/x = 2 1/2, substitute y = x/(x-1) to simplify into 2y² - 5y + 2 = 0 first.'
    ],
    downloadFileName: 'Class10_Math_Quadratic_Equations_Notes.pdf'
  }
];

export const INITIAL_PUZZLES: PuzzleGame[] = [
  {
    id: 'puz-chem-balance',
    title: 'Chemical Equation Balancing Lab',
    subject: 'Science',
    category: 'Equation Balancer',
    description: 'Balance stoichiometric coefficients for combustion, neutralization, and redox equations to unlock high XP.',
    difficulty: 'Medium',
    rewardXP: 100
  },
  {
    id: 'puz-math-crossgrid',
    title: 'CrossMath Algebra Grid Challenge',
    subject: 'Mathematics',
    category: 'Math CrossGrid',
    description: 'Solve arithmetic progressions and quadratic roots to fill the 3x3 educational crossword grid.',
    difficulty: 'Challenging',
    rewardXP: 150
  },
  {
    id: 'puz-bio-organ',
    title: 'Life Processes Enzyme & Organ Match',
    subject: 'Science',
    category: 'Bio Matchup',
    description: 'Match digestive enzymes, hormones, and anatomical organs in the correct biological chain.',
    difficulty: 'Easy',
    rewardXP: 80
  }
];
