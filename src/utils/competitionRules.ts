export type RoundId = 'trial' | 'round1' | 'round2' | 'round3';

export interface RoundConfig {
  id: RoundId;
  levelNumber: 0 | 1 | 2 | 3;
  badgeLabel: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  durationSeconds: number;
  durationMs: number;
  participantsCount: number;
  wordsPerParticipant: number;
  pointsPerCorrectWord: number;
  pointsPerIncorrectWord: number;
  qualifiersCount: number;
  qualificationRule: string;
  tieBreakerRule: string;
  bulletRules: string[];
}

export const COMPETITION_METADATA = {
  college: 'SHILLONG MEDICAL COLLEGE',
  established: 'ESTD · 2025',
  motto: 'LEARN HEAL & INSPIRE',
  festival: 'KINESIS 2026',
  pillars: ['SPORTS', 'LITERATURE', 'CULTURE', 'CAMARADERIE'],
  tagline: '“Minds in Motion, Hearts in Harmony”',
  committee: 'Academic & Literary Committee',
  eventTitle: 'SPELLING BEE COMPETITION',
  judge: 'Dr. N. Surong',
  date: 'Tuesday, 3rd November 2026',
  timeSlot: '2:15 PM – 3:00 PM',
  venue: 'Conference Hall, Shillong Medical College',
  totalParticipants: 8,
  totalRounds: 3,
  spellingStandard: 'UK ENGLISH SPELLING & PRONUNCIATION',
  bannerWideAsset: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_22.52.48_6811f8c7.jpeg',
  schedulePosterAsset: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_22.24.04_45c2512e.jpeg',
  rulesPdfAsset: '/assets/aistudio/spelling_bee_1fb649de.pdf',
  finalWordsPdfAsset: '/assets/aistudio/SPELL_2_FINAL_8ab3bee7.pdf',
};

export const GENERAL_RULES: string[] = [
  'The competition shall have 3 official rounds: First Round, Semifinal and Final Round (preceded by a Trial Run walkthrough).',
  'A Participant shall choose a code number (lot) from a box corresponding to a word which he/she is required to spell.',
  'A SOFTWARE PRONOUNCER shall pronounce each word clearly when "Pronounce & Start Clock" is pressed.',
  'Participants may request the word to be repeated AND/OR its meaning. The software pronouncer will repeat the word and/or its meaning if requested.',
  'The time allotted shall be inclusive of the duration taken to repeat the given word or provide its meaning.',
  'The participants are required to spell each word in accordance with UK ENGLISH SPELLING AND PRONUNCIATION.',
  'The countdown CLOCK shall begin once the pronouncer gives the word to the participant.',
  'Participants must spell a word loud and clear at a pace not too slow or too fast.',
  'Having spelled a word, the participant shall not be permitted to change the sequence of letters already spelled. Any change in original letters/sequence leads to disqualification.',
  'Participant may pause in between letters if he/she forgets the letters of the word, and continue.',
  'The participant is required to pronounce the word after he/she has spelled.',
];

export const JUDGE_ROLES: string[] = [
  'Judges listen carefully to every letter spoken by the speller to confirm whether the word is spelled correctly.',
  'Judges will write down each letter exactly as the contestant utters it to compare it against the official master guide.',
  'Judges carefully watch the speller’s mouth movements to differentiate between similar-sounding letters (like "b" and "d" or "m" and "n") and account for speech impediments.',
  'Judge signals the result by stating "CORRECT" or "INCORRECT" immediately after the participant has spelled the word.',
  'For each participant the judges will tally the points accordingly.',
  'If a word is missed or spelled incorrectly, they will provide the correct spelling before moving to the next speller.',
];

export const ROUNDS_CONFIG: Record<RoundId, RoundConfig> = {
  trial: {
    id: 'trial',
    levelNumber: 0,
    badgeLabel: 'PRACTICE WALKTHROUGH · BEFORE ROUND 1',
    title: 'Trial Run: Practice',
    shortTitle: 'TRIAL RUN · PRACTICE DEMO',
    subtitle: '10 Practice Medical Words (Code #01–#10) · 90s Practice Clock',
    durationSeconds: 90,
    durationMs: 90_000,
    participantsCount: 8,
    wordsPerParticipant: 1,
    pointsPerCorrectWord: 0,
    pointsPerIncorrectWord: 0,
    qualifiersCount: 8,
    qualificationRule: 'Warm-up demonstration for contestants to understand Code Number selection, UK pronunciation & timer rules.',
    tieBreakerRule: 'Practice demonstration only — no points or eliminations.',
    bulletRules: [
      'Contestant picks a Practice Lot (Code Number #01–#10) and the host selects that Code Number on screen.',
      'The word remains silent and hidden when the Code Number is selected.',
      'When ready, the host clicks "PRONOUNCE & START CLOCK" to pronounce the word in UK English and start the countdown simultaneously.',
      'Contestant may request "REPEAT WORD" or "SPEAK MEANING" while the clock is running.',
    ],
  },
  round1: {
    id: 'round1',
    levelNumber: 1,
    badgeLabel: 'LEVEL 1 OF 3 · OPENING STAGE',
    title: 'Round 1: First Round',
    shortTitle: 'ROUND 1 · FIRST ROUND',
    subtitle: 'All 8 Participants · 2 Medical Words Each (Code #01–#50) · 90 Seconds Per Word',
    durationSeconds: 90,
    durationMs: 90_000,
    participantsCount: 8,
    wordsPerParticipant: 2,
    pointsPerCorrectWord: 10,
    pointsPerIncorrectWord: 0,
    qualifiersCount: 4,
    qualificationRule: 'Top 4 participants with the highest scores qualify for Round 2 (Semifinal).',
    tieBreakerRule: 'In case of a tie for qualifying positions, a tie-breaker word is chosen from the separate Tie-Breaker Box (TB-01–TB-20).',
    bulletRules: [
      'All 8 participants shall take part in this round.',
      'Each participant shall be given 2 Medical words to spell from the Round Code Box (#01–#50).',
      'Each participant shall have 90 seconds to spell the given word correctly.',
      'The time allotted shall be inclusive of the duration taken to repeat the given word or provide its meaning.',
      'Each correctly spelled word shall earn 10 points; an incorrect spelling shall earn 0 points.',
      'The 4 participants with the highest scores shall qualify for Round 2.',
      'In case of a tie for the qualifying positions, a tie-breaker word shall be given from a separate box.',
    ],
  },
  round2: {
    id: 'round2',
    levelNumber: 2,
    badgeLabel: 'LEVEL 2 OF 3 · KNOCKOUT STAGE',
    title: 'Round 2: Semifinal',
    shortTitle: 'ROUND 2 · SEMIFINAL',
    subtitle: '4 Qualifying Participants · 2 Medical Words Each (Code #01–#50) · 60 Seconds Per Word',
    durationSeconds: 60,
    durationMs: 60_000,
    participantsCount: 4,
    wordsPerParticipant: 2,
    pointsPerCorrectWord: 10,
    pointsPerIncorrectWord: 0,
    qualifiersCount: 2,
    qualificationRule: 'Top 2 participants with the highest scores advance to the Final Round.',
    tieBreakerRule: 'In case of a tie for qualifying positions, a tie-breaker word is chosen from the separate Tie-Breaker Box (TB-01–TB-20).',
    bulletRules: [
      'The 4 qualifying participants shall compete in this round.',
      'Each participant shall be given 2 Medical words to spell from the Round Code Box (#01–#50).',
      'Each participant shall have 60 seconds to spell the given word correctly.',
      'The time allotted shall be inclusive of the duration taken to repeat the given word or provide its meaning.',
      'Each correctly spelled word shall earn 10 points.',
      'The 2 participants with the highest scores shall advance to the Final Round.',
      'In case of a tie for the qualifying positions, a tie-breaker word shall be given from a separate box.',
    ],
  },
  round3: {
    id: 'round3',
    levelNumber: 3,
    badgeLabel: 'LEVEL 3 OF 3 · CHAMPIONSHIP STAGE',
    title: 'Round 3: Final Round',
    shortTitle: 'ROUND 3 · FINAL ROUND',
    subtitle: '2 Finalists · 2 Medical Words Each (Code #01–#50) · 45 Seconds Per Word',
    durationSeconds: 45,
    durationMs: 45_000,
    participantsCount: 2,
    wordsPerParticipant: 2,
    pointsPerCorrectWord: 10,
    pointsPerIncorrectWord: 0,
    qualifiersCount: 1,
    qualificationRule: 'The participant with the higher score after the designated set of words is declared the Winner.',
    tieBreakerRule: 'In case of a tie in total points, a tie-breaker word is chosen from the separate Tie-Breaker Box (TB-01–TB-20).',
    bulletRules: [
      'The 2 finalists shall compete for the championship.',
      'Each participant shall be given 2 Medical words to spell from the Round Code Box (#01–#50).',
      'Each participant shall have 45 seconds to spell the given word correctly.',
      'The time allotted shall be inclusive of the duration taken to repeat the given word or provide its meaning.',
      'Each correctly spelled word shall earn 10 points.',
      'In case of a tie in the total points, a tie-breaker word shall be given from a separate box.',
      'The participant with the higher score after the designated set of words shall be declared the winner.',
    ],
  },
};

export const ROUND_ORDER: RoundId[] = ['trial', 'round1', 'round2', 'round3'];

export interface FormattedTimer {
  minutes: string;
  seconds: string;
  milliseconds: string;
  formatted: string;
  totalRemainingMs: number;
  progressPercent: number;
  isWarning: boolean;
  isCritical: boolean;
  isExpired: boolean;
}

/**
 * Formats remaining milliseconds into MM:SS:MS where:
 * - MM is 2-digit minutes (00-99)
 * - SS is 2-digit seconds (00-59)
 * - MS is 2-digit centiseconds (00-99) or 3-digit milliseconds (000-999)
 */
export function formatTimerMMSSMS(
  remainingMs: number,
  totalDurationMs: number,
  msDigits: 2 | 3 = 2
): FormattedTimer {
  const clampedMs = Math.max(0, Math.floor(remainingMs));
  const totalSeconds = Math.floor(clampedMs / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const rawMs = clampedMs % 1000;

  const minutes = String(mins).padStart(2, '0');
  const seconds = String(secs).padStart(2, '0');
  const milliseconds =
    msDigits === 3
      ? String(rawMs).padStart(3, '0')
      : String(Math.floor(rawMs / 10)).padStart(2, '0');

  const safeTotal = totalDurationMs > 0 ? totalDurationMs : 1;
  const progressPercent = Math.min(100, Math.max(0, (clampedMs / safeTotal) * 100));

  return {
    minutes,
    seconds,
    milliseconds,
    formatted: `${minutes}:${seconds}:${milliseconds}`,
    totalRemainingMs: clampedMs,
    progressPercent,
    isWarning: clampedMs > 0 && clampedMs <= 20_000,
    isCritical: clampedMs > 0 && clampedMs <= 10_000,
    isExpired: clampedMs === 0,
  };
}

export type WordResultStatus = 'pending' | 'correct' | 'incorrect';

export interface ParticipantRoundScore {
  word1: WordResultStatus;
  word2: WordResultStatus;
  tieBreakerWords: WordResultStatus[];
  points: number;
}

export interface ParticipantRecord {
  id: number;
  codeNumber: string;
  name: string;
  batchOrHouse: string;
  scores: Record<RoundId, ParticipantRoundScore>;
  eliminatedInRound?: RoundId;
}

export function calculateRoundPoints(score: Omit<ParticipantRoundScore, 'points'>): number {
  let pts = 0;
  if (score.word1 === 'correct') pts += 10;
  if (score.word2 === 'correct') pts += 10;
  for (const tb of score.tieBreakerWords) {
    if (tb === 'correct') pts += 10;
  }
  return pts;
}

export function createInitialParticipants(): ParticipantRecord[] {
  return Array.from({ length: 8 }, (_, idx) => {
    const num = idx + 1;
    return {
      id: num,
      codeNumber: `SMC-0${num}`,
      name: `Contestant #${num}`,
      batchOrHouse: 'MBBS Batch · SMC',
      scores: {
        trial: { word1: 'pending', word2: 'pending', tieBreakerWords: [], points: 0 },
        round1: { word1: 'pending', word2: 'pending', tieBreakerWords: [], points: 0 },
        round2: { word1: 'pending', word2: 'pending', tieBreakerWords: [], points: 0 },
        round3: { word1: 'pending', word2: 'pending', tieBreakerWords: [], points: 0 },
      },
    };
  });
}

export function updateParticipantWordResult(
  participants: ParticipantRecord[],
  participantId: number,
  roundId: RoundId,
  slot: 'word1' | 'word2',
  status: WordResultStatus
): ParticipantRecord[] {
  return participants.map((p) => {
    if (p.id !== participantId) return p;
    const currentRoundScore = p.scores[roundId];
    const updatedRound: ParticipantRoundScore = {
      ...currentRoundScore,
      [slot]: status,
      points: 0,
    };
    updatedRound.points = calculateRoundPoints(updatedRound);
    return {
      ...p,
      scores: {
        ...p.scores,
        [roundId]: updatedRound,
      },
    };
  });
}

export interface MedicalWordBoxItem {
  id: string;
  boxNumber: number;
  isTieBreaker: boolean;
  roundId: RoundId;
  britishSpelling: string;
  ttsWord?: string;
  phoneticHint: string;
  meaning: string;
  used: boolean;
}

/**
 * Formats a word's lot number into an official stage Code Number (e.g. "CODE #01", "TB-01")
 */
export function formatCodeNumber(boxNumber: number, isTieBreaker: boolean): string {
  const padded = String(boxNumber).padStart(2, '0');
  return isTieBreaker ? `TB-${padded}` : `CODE #${padded}`;
}

export const INITIAL_MEDICAL_WORD_BOX: MedicalWordBoxItem[] = [
  // ===========================================================================
  // CATEGORY 0: TRIAL RUN (BEFORE ROUND 1) — 10 Random Medical Words (CODE #01 to CODE #10)
  // ===========================================================================
  {
    id: 'tr-1',
    boxNumber: 1,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'HAEMOGLOBIN',
    ttsWord: 'haemoglobin',
    phoneticHint: 'hee-muh-GLOH-bin',
    meaning: 'The iron-containing oxygen-transport metalloprotein in the red blood cells of vertebrates.',
    used: false,
  },
  {
    id: 'tr-2',
    boxNumber: 2,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'OESOPHAGUS',
    ttsWord: 'oesophagus',
    phoneticHint: 'ee-SOF-uh-gus',
    meaning: 'The muscular alimentary canal extending from the pharynx to the stomach.',
    used: false,
  },
  {
    id: 'tr-3',
    boxNumber: 3,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'PAEDIATRICS',
    ttsWord: 'paediatrics',
    phoneticHint: 'pee-dee-AT-riks',
    meaning: 'The branch of medicine dealing with children and their diseases.',
    used: false,
  },
  {
    id: 'tr-4',
    boxNumber: 4,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'GYNAECOLOGY',
    ttsWord: 'gynaecology',
    phoneticHint: 'guy-nuh-KOL-uh-jee',
    meaning: 'The branch of physiology and medicine which deals with the functions and diseases specific to women.',
    used: false,
  },
  {
    id: 'tr-5',
    boxNumber: 5,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'ANAESTHESIA',
    ttsWord: 'anaesthesia',
    phoneticHint: 'an-es-THEE-zhuh',
    meaning: 'Insensitivity to pain, especially as artificially induced before surgery.',
    used: false,
  },
  {
    id: 'tr-6',
    boxNumber: 6,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'STETHOSCOPE',
    ttsWord: 'stethoscope',
    phoneticHint: 'STETH-uh-skohp',
    meaning: 'A medical instrument for listening to the action of someone’s heart or breathing.',
    used: false,
  },
  {
    id: 'tr-7',
    boxNumber: 7,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'LEUKAEMIA',
    ttsWord: 'leukaemia',
    phoneticHint: 'loo-KEE-mee-uh',
    meaning: 'A malignant progressive disease in which the bone marrow produces increased numbers of immature leucocytes.',
    used: false,
  },
  {
    id: 'tr-8',
    boxNumber: 8,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'DIARRHOEA',
    ttsWord: 'diarrhoea',
    phoneticHint: 'dye-uh-REE-uh',
    meaning: 'A condition in which faeces are discharged from the bowels frequently and in a liquid form.',
    used: false,
  },
  {
    id: 'tr-9',
    boxNumber: 9,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'ORTHOPAEDICS',
    ttsWord: 'orthopaedics',
    phoneticHint: 'or-thuh-PEE-diks',
    meaning: 'The branch of medicine dealing with the correction of deformities of bones or muscles.',
    used: false,
  },
  {
    id: 'tr-10',
    boxNumber: 10,
    isTieBreaker: false,
    roundId: 'trial',
    britishSpelling: 'TACHYCARDIA',
    ttsWord: 'tachycardia',
    phoneticHint: 'tak-ih-KAR-dee-uh',
    meaning: 'An abnormally rapid heart rate, typically defined as over 100 beats per minute at rest.',
    used: false,
  },

  // ===========================================================================
  // OFFICIAL ROUND CODES (CODE #01 to CODE #50) — Shared across Round 1, Round 2, and Round 3
  // From SPELL_2_FINAL.pdf (Pages 1 to 5)
  // ===========================================================================
  {
    id: 'rnd-1',
    boxNumber: 1,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'DIPHTHERIA',
    ttsWord: 'diphtheria',
    phoneticHint: 'dif-THEER-ee-uh',
    meaning: 'An acute, highly contagious bacterial infection causing inflammation of the mucous membranes of the throat.',
    used: false,
  },
  {
    id: 'rnd-2',
    boxNumber: 2,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'FLUORESCENCE',
    ttsWord: 'fluorescence',
    phoneticHint: 'floo-uh-RES-uhns',
    meaning: 'The visible or invisible radiation emitted by certain substances as a result of incident radiation of a shorter wavelength.',
    used: false,
  },
  {
    id: 'rnd-3',
    boxNumber: 3,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'PLACEBO',
    ttsWord: 'placebo',
    phoneticHint: 'pluh-SEE-boh',
    meaning: 'A harmless substance given for the psychological benefit to a patient or as a control in testing new drugs.',
    used: false,
  },
  {
    id: 'rnd-4',
    boxNumber: 4,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'PRURITUS',
    ttsWord: 'pruritus',
    phoneticHint: 'proo-RYE-tus',
    meaning: 'Severe itching of the skin, as a symptom of various medical ailments.',
    used: false,
  },
  {
    id: 'rnd-5',
    boxNumber: 5,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'IATROGENIC',
    ttsWord: 'iatrogenic',
    phoneticHint: 'eye-at-roh-JEN-ik',
    meaning: 'Relating to illness or symptoms induced inadvertently by medical examination or treatment.',
    used: false,
  },
  {
    id: 'rnd-6',
    boxNumber: 6,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'STRYCHNINE',
    ttsWord: 'strychnine',
    phoneticHint: 'STRIK-neen',
    meaning: 'A bitter, highly poisonous crystalline alkaloid obtained from nux vomica and related plants.',
    used: false,
  },
  {
    id: 'rnd-7',
    boxNumber: 7,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'PHAEOCHROMOCYTOMA',
    ttsWord: 'phaeochromocytoma',
    phoneticHint: 'fee-oh-kroh-moh-sye-TOH-muh',
    meaning: 'A usually benign vascular tumour of the adrenal medulla that secretes excess adrenaline and noradrenaline.',
    used: false,
  },
  {
    id: 'rnd-8',
    boxNumber: 8,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'APHTHOUS',
    ttsWord: 'aphthous',
    phoneticHint: 'AF-thus',
    meaning: 'Relating to or characterized by small shallow ulcers on the mucous membranes of the mouth.',
    used: false,
  },
  {
    id: 'rnd-9',
    boxNumber: 9,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'HELMINTH',
    ttsWord: 'helminth',
    phoneticHint: 'HEL-minth',
    meaning: 'A parasitic worm, such as a fluke, tapeworm, or nematode.',
    used: false,
  },
  {
    id: 'rnd-10',
    boxNumber: 10,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'CHOLECYSTECTOMY',
    ttsWord: 'cholecystectomy',
    phoneticHint: 'koh-lee-sis-TEK-tuh-mee',
    meaning: 'Surgical removal of the gallbladder.',
    used: false,
  },
  {
    id: 'rnd-11',
    boxNumber: 11,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'ANEURYSM',
    ttsWord: 'aneurysm',
    phoneticHint: 'AN-yoo-riz-uhm',
    meaning: 'An excessive localized enlargement of an artery caused by a weakening of the artery wall.',
    used: false,
  },
  {
    id: 'rnd-12',
    boxNumber: 12,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'OPHTHALMOLOGY',
    ttsWord: 'ophthalmology',
    phoneticHint: 'of-thal-MOL-uh-jee',
    meaning: 'The branch of medicine concerned with the study and treatment of disorders and diseases of the eye.',
    used: false,
  },
  {
    id: 'rnd-13',
    boxNumber: 13,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'SPHYGMOMANOMETER',
    ttsWord: 'sphygmomanometer',
    phoneticHint: 'sfig-moh-muh-NOM-ih-ter',
    meaning: 'An instrument for measuring blood pressure, typically consisting of an inflatable rubber cuff and a mercury or mechanical manometer.',
    used: false,
  },
  {
    id: 'rnd-14',
    boxNumber: 14,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'BRACHYTHERAPY',
    ttsWord: 'brachytherapy',
    phoneticHint: 'brak-ee-THER-uh-pee',
    meaning: 'The treatment of cancer by the insertion of radioactive implants directly into the affected tissue.',
    used: false,
  },
  {
    id: 'rnd-15',
    boxNumber: 15,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'BENIGN',
    ttsWord: 'benign',
    phoneticHint: 'bih-NYNE',
    meaning: 'Of a disease or growth: not harmful in effect; in particular, not malignant.',
    used: false,
  },
  {
    id: 'rnd-16',
    boxNumber: 16,
    isTieBreaker: false,
    roundId: 'round1',
    britishSpelling: 'CRYPTORCHIDISM',
    ttsWord: 'cryptorchidism',
    phoneticHint: 'krip-TOR-kih-diz-uhm',
    meaning: 'A congenital developmental condition in which one or both testes fail to descend into the scrotum.',
    used: false,
  },
  {
    id: 'rnd-17',
    boxNumber: 17,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'PSORIASIS',
    ttsWord: 'psoriasis',
    phoneticHint: 'suh-RYE-uh-sis',
    meaning: 'A chronic skin disease marked by red, itchy, scaly patches, most commonly on the knees, elbows, and scalp.',
    used: false,
  },
  {
    id: 'rnd-18',
    boxNumber: 18,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'LEGIONNAIRE',
    ttsWord: 'legionnaire',
    phoneticHint: 'lee-juh-NAIR',
    meaning: 'Relating to Legionnaires’ disease, a severe form of bacterial pneumonia caused by Legionella bacteria.',
    used: false,
  },
  {
    id: 'rnd-19',
    boxNumber: 19,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'SCHIZOPHRENIA',
    ttsWord: 'schizophrenia',
    phoneticHint: 'skit-suh-FREE-nee-uh',
    meaning: 'A severe mental disorder characterized by a breakdown in the relation between thought, emotion, and behaviour.',
    used: false,
  },
  {
    id: 'rnd-20',
    boxNumber: 20,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'ECHINOCOCCOSIS',
    ttsWord: 'echinococcosis',
    phoneticHint: 'ee-kye-noh-kok-OH-sis',
    meaning: 'A parasitic disease caused by infection with tiny tapeworms of the genus Echinococcus.',
    used: false,
  },
  {
    id: 'rnd-21',
    boxNumber: 21,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'DYSPNOEA',
    ttsWord: 'dyspnoea',
    phoneticHint: 'disp-NEE-uh',
    meaning: 'Difficult or laboured breathing.',
    used: false,
  },
  {
    id: 'rnd-22',
    boxNumber: 22,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'BACTERIURIA',
    ttsWord: 'bacteriuria',
    phoneticHint: 'bak-teer-ee-YOOR-ee-uh',
    meaning: 'The presence of bacteria in the urine, typically indicating a urinary tract infection.',
    used: false,
  },
  {
    id: 'rnd-23',
    boxNumber: 23,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'ENCEPHALOPATHY',
    ttsWord: 'encephalopathy',
    phoneticHint: 'en-sef-uh-LOP-uh-thee',
    meaning: 'Any disease or disorder in which the functioning of the brain is affected by some agent or condition.',
    used: false,
  },
  {
    id: 'rnd-24',
    boxNumber: 24,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'PRION',
    ttsWord: 'prion',
    phoneticHint: 'PREE-on',
    meaning: 'An infectious protein particle lacking nucleic acid that causes neurodegenerative brain diseases.',
    used: false,
  },
  {
    id: 'rnd-25',
    boxNumber: 25,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'IMMUNOGENICITY',
    ttsWord: 'immunogenicity',
    phoneticHint: 'im-yoo-noh-juh-NIS-ih-tee',
    meaning: 'The ability of a foreign substance, such as an antigen, to provoke an immune response in the body.',
    used: false,
  },
  {
    id: 'rnd-26',
    boxNumber: 26,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'CHIMERIC',
    ttsWord: 'chimeric',
    phoneticHint: 'kye-MEER-ik',
    meaning: 'Containing tissues or genetic material derived from two or more genetically distinct organisms.',
    used: false,
  },
  {
    id: 'rnd-27',
    boxNumber: 27,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'NOSOCOMIAL',
    ttsWord: 'nosocomial',
    phoneticHint: 'noz-oh-KOH-mee-uhl',
    meaning: 'Of a disease or infection: originating or acquired in a hospital.',
    used: false,
  },
  {
    id: 'rnd-28',
    boxNumber: 28,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'ISTHMUS',
    ttsWord: 'isthmus',
    phoneticHint: 'IS-mus',
    meaning: 'A narrow organ, passage, or piece of tissue connecting two larger parts of the body.',
    used: false,
  },
  {
    id: 'rnd-29',
    boxNumber: 29,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'NOREPINEPHRINE',
    ttsWord: 'norepinephrine',
    phoneticHint: 'nor-ep-ih-NEF-rin',
    meaning: 'A hormone and neurotransmitter released by the adrenal medulla and sympathetic nerves that raises blood pressure.',
    used: false,
  },
  {
    id: 'rnd-30',
    boxNumber: 30,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'HETEROGENEOUS',
    ttsWord: 'heterogeneous',
    phoneticHint: 'het-uh-roh-JEE-nee-us',
    meaning: 'Diverse in character or content; composed of different cellular or tissue elements.',
    used: false,
  },
  {
    id: 'rnd-31',
    boxNumber: 31,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'HAEMAGGLUTINATION',
    ttsWord: 'haemagglutination',
    phoneticHint: 'hee-muh-gloo-tih-NAY-shuhn',
    meaning: 'The clumping together of red blood cells, especially as caused by antibodies or viruses.',
    used: false,
  },
  {
    id: 'rnd-32',
    boxNumber: 32,
    isTieBreaker: false,
    roundId: 'round2',
    britishSpelling: 'FAHRENHEIT',
    ttsWord: 'fahrenheit',
    phoneticHint: 'FAR-uhn-hyte',
    meaning: 'Of or denoting a scale of temperature on which water freezes at 32 degrees and boils at 212 degrees.',
    used: false,
  },
  {
    id: 'rnd-33',
    boxNumber: 33,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'ISOPROPYL',
    ttsWord: 'isopropyl',
    phoneticHint: 'eye-soh-PROH-pyl',
    meaning: 'A propyl group in which the point of attachment is at the central carbon atom, as in rubbing alcohol.',
    used: false,
  },
  {
    id: 'rnd-34',
    boxNumber: 34,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'RHEUMATISM',
    ttsWord: 'rheumatism',
    phoneticHint: 'ROO-muh-tiz-uhm',
    meaning: 'Any disease marked by inflammation and pain in the joints, muscles, or fibrous tissue.',
    used: false,
  },
  {
    id: 'rnd-35',
    boxNumber: 35,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'RICKETTSIA',
    ttsWord: 'rickettsia',
    phoneticHint: 'rih-KET-see-uh',
    meaning: 'A genus of non-motile obligately intracellular bacteria transmitted to humans by ticks, mites, fleas, or lice.',
    used: false,
  },
  {
    id: 'rnd-36',
    boxNumber: 36,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'ANAEMIA',
    ttsWord: 'anaemia',
    phoneticHint: 'uh-NEE-mee-uh',
    meaning: 'A condition in which there is a deficiency of red cells or of haemoglobin in the blood.',
    used: false,
  },
  {
    id: 'rnd-37',
    boxNumber: 37,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'BRONCHITIS',
    ttsWord: 'bronchitis',
    phoneticHint: 'brong-KYE-tis',
    meaning: 'Inflammation of the mucous membrane in the bronchial tubes of the lungs.',
    used: false,
  },
  {
    id: 'rnd-38',
    boxNumber: 38,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'POLYMERASE',
    ttsWord: 'polymerase',
    phoneticHint: 'pol-IM-uh-rayz',
    meaning: 'An enzyme which brings about the formation of a particular polymer, especially DNA or RNA.',
    used: false,
  },
  {
    id: 'rnd-39',
    boxNumber: 39,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'ADDUCTION',
    ttsWord: 'adduction',
    phoneticHint: 'uh-DUK-shuhn',
    meaning: 'The movement of a limb or other part towards the midline of the body or towards another part.',
    used: false,
  },
  {
    id: 'rnd-40',
    boxNumber: 40,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'METAPLASIA',
    ttsWord: 'metaplasia',
    phoneticHint: 'met-uh-PLAY-zhuh',
    meaning: 'Abnormal transformation of an adult differentiated tissue into another type of differentiated tissue.',
    used: false,
  },
  {
    id: 'rnd-41',
    boxNumber: 41,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'INFLUENZA',
    ttsWord: 'influenza',
    phoneticHint: 'in-floo-EN-zuh',
    meaning: 'A highly contagious viral infection of the respiratory passages causing fever and severe aching.',
    used: false,
  },
  {
    id: 'rnd-42',
    boxNumber: 42,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'HISTAMINE',
    ttsWord: 'histamine',
    phoneticHint: 'HIS-tuh-meen',
    meaning: 'A compound released by cells in response to injury and in allergic and inflammatory reactions.',
    used: false,
  },
  {
    id: 'rnd-43',
    boxNumber: 43,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'DIAPHRAGM',
    ttsWord: 'diaphragm',
    phoneticHint: 'DYE-uh-fram',
    meaning: 'A dome-shaped muscular partition separating the thorax from the abdomen in mammals.',
    used: false,
  },
  {
    id: 'rnd-44',
    boxNumber: 44,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'SEBACEOUS',
    ttsWord: 'sebaceous',
    phoneticHint: 'sih-BAY-shus',
    meaning: 'Relating to oil-secreting glands of the skin that lubricate the hair and epidermis.',
    used: false,
  },
  {
    id: 'rnd-45',
    boxNumber: 45,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'HYDROCORTISONE',
    ttsWord: 'hydrocortisone',
    phoneticHint: 'hye-droh-KOR-tih-zohn',
    meaning: 'The steroid hormone cortisol, especially as used medicinally to treat inflammation and allergy.',
    used: false,
  },
  {
    id: 'rnd-46',
    boxNumber: 46,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'DYSLEXIA',
    ttsWord: 'dyslexia',
    phoneticHint: 'dis-LEK-see-uh',
    meaning: 'A general term for disorders that involve difficulty in learning to read or interpret words and letters.',
    used: false,
  },
  {
    id: 'rnd-47',
    boxNumber: 47,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'PROSTHESIS',
    ttsWord: 'prosthesis',
    phoneticHint: 'pros-THEE-sis',
    meaning: 'An artificial body part, such as a limb, a heart, or a joint replacement.',
    used: false,
  },
  {
    id: 'rnd-48',
    boxNumber: 48,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'SEIZURE',
    ttsWord: 'seizure',
    phoneticHint: 'SEE-zhuh',
    meaning: 'A sudden episode of abnormal uncontrolled electrical activity in the brain.',
    used: false,
  },
  {
    id: 'rnd-49',
    boxNumber: 49,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'DIMORPHIC',
    ttsWord: 'dimorphic',
    phoneticHint: 'dye-MOR-fik',
    meaning: 'Occurring in or representing two distinct forms, such as fungi growing as either yeast or mould.',
    used: false,
  },
  {
    id: 'rnd-50',
    boxNumber: 50,
    isTieBreaker: false,
    roundId: 'round3',
    britishSpelling: 'QUARANTINE',
    ttsWord: 'quarantine',
    phoneticHint: 'KWOR-uhn-teen',
    meaning: 'A state, period, or place of isolation in which people or animals exposed to infectious disease are placed.',
    used: false,
  },

  // ===========================================================================
  // OFFICIAL TIE-BREAKER WORDS (TB-01 to TB-20) — Separate Box
  // From SPELL_2_FINAL.pdf (Pages 6 to 7)
  // ===========================================================================
  {
    id: 'tb-1',
    boxNumber: 1,
    isTieBreaker: true,
    roundId: 'round1',
    britishSpelling: 'VALPROATE',
    ttsWord: 'valproate',
    phoneticHint: 'val-PROH-ayt',
    meaning: 'A salt or ester of valproic acid used as an anticonvulsant in the treatment of epilepsy and bipolar disorder.',
    used: false,
  },
  {
    id: 'tb-2',
    boxNumber: 2,
    isTieBreaker: true,
    roundId: 'round1',
    britishSpelling: 'DIPHYLLOBOTHRIUM',
    ttsWord: 'diphyllobothrium',
    phoneticHint: 'dye-fil-oh-BOTH-ree-uhm',
    meaning: 'A genus of large parasitic tapeworms transmitted to humans through the consumption of raw or undercooked fish.',
    used: false,
  },
  {
    id: 'tb-3',
    boxNumber: 3,
    isTieBreaker: true,
    roundId: 'round1',
    britishSpelling: 'ENTEROBACTERIACEAE',
    ttsWord: 'enterobacteriaceae',
    phoneticHint: 'en-ter-oh-bak-teer-ee-AY-see-ee',
    meaning: 'A large family of Gram-negative rod-shaped bacteria that includes normal gut flora and pathogens such as Salmonella.',
    used: false,
  },
  {
    id: 'tb-4',
    boxNumber: 4,
    isTieBreaker: true,
    roundId: 'round1',
    britishSpelling: 'ORTHOPHTHALALDEHYDE',
    ttsWord: 'ortho-phthalaldehyde',
    phoneticHint: 'or-thoh-fthal-AL-duh-hyde',
    meaning: 'A high-level aromatic dialdehyde chemical disinfectant used for sterilizing heat-sensitive medical instruments.',
    used: false,
  },
  {
    id: 'tb-5',
    boxNumber: 5,
    isTieBreaker: true,
    roundId: 'round1',
    britishSpelling: 'CHOLEDOCHOLITHIASIS',
    ttsWord: 'choledocholithiasis',
    phoneticHint: 'koh-led-oh-koh-lih-THYE-uh-sis',
    meaning: 'The presence of one or more gallstones in the common bile duct.',
    used: false,
  },
  {
    id: 'tb-6',
    boxNumber: 6,
    isTieBreaker: true,
    roundId: 'round1',
    britishSpelling: 'DYSDIADOCHOKINESIA',
    ttsWord: 'dysdiadochokinesia',
    phoneticHint: 'dis-dye-ad-oh-koh-kih-NEE-zhuh',
    meaning: 'Impaired ability to perform rapid, alternating movements, typically caused by cerebellar dysfunction.',
    used: false,
  },
  {
    id: 'tb-7',
    boxNumber: 7,
    isTieBreaker: true,
    roundId: 'round1',
    britishSpelling: 'EHRLICHIOSIS',
    ttsWord: 'ehrlichiosis',
    phoneticHint: 'air-lik-ee-OH-sis',
    meaning: 'A tick-borne bacterial infection caused by bacteria of the genus Ehrlichia that infect white blood cells.',
    used: false,
  },
  {
    id: 'tb-8',
    boxNumber: 8,
    isTieBreaker: true,
    roundId: 'round2',
    britishSpelling: 'THIOTHIXENE',
    ttsWord: 'thiothixene',
    phoneticHint: 'thye-oh-THIK-seen',
    meaning: 'A thioxanthene antipsychotic drug used in the management of schizophrenia and other psychotic disorders.',
    used: false,
  },
  {
    id: 'tb-9',
    boxNumber: 9,
    isTieBreaker: true,
    roundId: 'round2',
    britishSpelling: 'PLAGIARISM',
    ttsWord: 'plagiarism',
    phoneticHint: 'PLAY-juh-riz-uhm',
    meaning: 'The practice of taking someone else’s work or ideas and passing them off as one’s own.',
    used: false,
  },
  {
    id: 'tb-10',
    boxNumber: 10,
    isTieBreaker: true,
    roundId: 'round2',
    britishSpelling: 'CORYNEBACTERIUM',
    ttsWord: 'corynebacterium',
    phoneticHint: 'kor-ih-nee-bak-TEER-ee-uhm',
    meaning: 'A genus of Gram-positive rod-shaped bacteria that includes the causative agent of diphtheria.',
    used: false,
  },
  {
    id: 'tb-11',
    boxNumber: 11,
    isTieBreaker: true,
    roundId: 'round2',
    britishSpelling: 'INTUSSUSCEPTION',
    ttsWord: 'intussusception',
    phoneticHint: 'in-tuh-suh-SEP-shuhn',
    meaning: 'A serious condition in which one segment of the intestine invaginates or telescopes inside an adjacent segment.',
    used: false,
  },
  {
    id: 'tb-12',
    boxNumber: 12,
    isTieBreaker: true,
    roundId: 'round2',
    britishSpelling: 'CHEILOSCHISIS',
    ttsWord: 'cheiloschisis',
    phoneticHint: 'kye-LOS-kih-sis',
    meaning: 'A congenital cleft or fissure in the upper lip, commonly known as cleft lip.',
    used: false,
  },
  {
    id: 'tb-13',
    boxNumber: 13,
    isTieBreaker: true,
    roundId: 'round2',
    britishSpelling: 'LYMPHANGIECTASIS',
    ttsWord: 'lymphangiectasis',
    phoneticHint: 'lim-fan-jee-EK-tuh-sis',
    meaning: 'Pathological dilation of the lymphatic vessels, often affecting the lining of the small intestine.',
    used: false,
  },
  {
    id: 'tb-14',
    boxNumber: 14,
    isTieBreaker: true,
    roundId: 'round3',
    britishSpelling: 'PACHYONYCHIA',
    ttsWord: 'pachyonychia',
    phoneticHint: 'pak-ee-oh-NIK-ee-uh',
    meaning: 'Abnormal thickening of the fingernails or toenails, often occurring as a congenital disorder.',
    used: false,
  },
  {
    id: 'tb-15',
    boxNumber: 15,
    isTieBreaker: true,
    roundId: 'round3',
    britishSpelling: 'ALZHEIMER',
    ttsWord: 'alzheimer',
    phoneticHint: 'ALTS-hye-mer',
    meaning: 'Progressive mental deterioration occurring in middle or old age, due to generalized degeneration of the brain.',
    used: false,
  },
  {
    id: 'tb-16',
    boxNumber: 16,
    isTieBreaker: true,
    roundId: 'round3',
    britishSpelling: 'ANAMNESTIC',
    ttsWord: 'anamnestic',
    phoneticHint: 'an-am-NES-tik',
    meaning: 'Relating to a patient’s medical history or a rapid secondary immune response upon re-exposure to an antigen.',
    used: false,
  },
  {
    id: 'tb-17',
    boxNumber: 17,
    isTieBreaker: true,
    roundId: 'round3',
    britishSpelling: 'EOSINOPHILIA',
    ttsWord: 'eosinophilia',
    phoneticHint: 'ee-oh-sin-oh-FIL-ee-uh',
    meaning: 'An abnormally high concentration of eosinophil white blood cells in the blood, often seen in allergies or parasitic infections.',
    used: false,
  },
  {
    id: 'tb-18',
    boxNumber: 18,
    isTieBreaker: true,
    roundId: 'round3',
    britishSpelling: 'DICHOTOMOUS',
    ttsWord: 'dichotomous',
    phoneticHint: 'dye-KOT-uh-mus',
    meaning: 'Dividing or branching into two equal parts or mutually exclusive categories.',
    used: false,
  },
  {
    id: 'tb-19',
    boxNumber: 19,
    isTieBreaker: true,
    roundId: 'round3',
    britishSpelling: 'GLOSSOPHARYNGEAL',
    ttsWord: 'glossopharyngeal',
    phoneticHint: 'glos-oh-fuh-RIN-jee-uhl',
    meaning: 'Relating to both the tongue and the pharynx, especially the ninth cranial nerve.',
    used: false,
  },
  {
    id: 'tb-20',
    boxNumber: 20,
    isTieBreaker: true,
    roundId: 'round3',
    britishSpelling: 'BACTERIOPHAGE',
    ttsWord: 'bacteriophage',
    phoneticHint: 'bak-TEER-ee-oh-fayj',
    meaning: 'A virus which parasitizes a bacterium by infecting it and reproducing inside it.',
    used: false,
  },
];

export const SPEECH_RATE_MIN = 0.4;
export const SPEECH_RATE_MAX = 1.4;
export const SPEECH_RATE_STEP = 0.05;

export const SPEECH_RATE_PRESETS = [
  { label: '0.50x Very Slow', value: 0.5 },
  { label: '0.70x Slow', value: 0.7 },
  { label: '0.85x Clear UK', value: 0.85 },
  { label: '1.00x Normal', value: 1.0 },
  { label: '1.15x Fast', value: 1.15 },
];

/**
 * Pure function to clamp and round speech synthesis rate for word and meaning pronunciation.
 */
export function clampSpeechRate(rate: number): number {
  if (!Number.isFinite(rate)) return 0.85;
  const clamped = Math.min(SPEECH_RATE_MAX, Math.max(SPEECH_RATE_MIN, rate));
  return Math.round(clamped * 100) / 100;
}

/**
 * Formats a speech rate number as a clean stage multiplier string (e.g. "0.85x").
 */
export function formatSpeechRate(rate: number): string {
  return `${clampSpeechRate(rate).toFixed(2)}x`;
}

/**
 * Helper to filter the active word pool for a given category:
 * - Trial Run ('trial'): returns the 10 Trial Run words (CODE #01 to CODE #10)
 * - Round 1, Round 2, Round 3: returns all 50 Finalised Round Words (CODE #01 to CODE #50)
 * - Tie-Breaker: returns all 20 Finalised Tie-Breaker Words (TB-01 to TB-20)
 */
export function getCategoryWordPool(
  wordBox: MedicalWordBoxItem[],
  activeRoundId: RoundId,
  isTieBreaker: boolean
): MedicalWordBoxItem[] {
  if (isTieBreaker) {
    return wordBox.filter((w) => w.isTieBreaker);
  }
  if (activeRoundId === 'trial') {
    return wordBox.filter((w) => !w.isTieBreaker && w.roundId === 'trial');
  }
  return wordBox.filter((w) => !w.isTieBreaker && w.roundId !== 'trial');
}
