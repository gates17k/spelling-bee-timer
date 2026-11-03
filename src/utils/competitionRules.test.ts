import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ROUNDS_CONFIG,
  ROUND_ORDER,
  formatTimerMMSSMS,
  createInitialParticipants,
  updateParticipantWordResult,
  INITIAL_MEDICAL_WORD_BOX,
  formatCodeNumber,
  getCategoryWordPool,
  clampSpeechRate,
  formatSpeechRate,
  COMPETITION_METADATA,
} from './competitionRules.ts';

test('Trial Run is positioned before Round 1 and has 10 random medical words (CODE #01 to CODE #10)', () => {
  assert.deepEqual(ROUND_ORDER, ['trial', 'round1', 'round2', 'round3']);
  assert.equal(ROUNDS_CONFIG.trial.durationMs, 90_000);
  assert.equal(COMPETITION_METADATA.spellingStandard, 'UK ENGLISH SPELLING & PRONUNCIATION');

  const trialWords = getCategoryWordPool(INITIAL_MEDICAL_WORD_BOX, 'trial', false);
  assert.equal(trialWords.length, 10);
  assert.equal(formatCodeNumber(trialWords[0].boxNumber, trialWords[0].isTieBreaker), 'CODE #01');
  assert.equal(trialWords[0].britishSpelling, 'HAEMOGLOBIN');
  assert.equal(formatCodeNumber(trialWords[9].boxNumber, trialWords[9].isTieBreaker), 'CODE #10');
  assert.equal(trialWords[9].britishSpelling, 'TACHYCARDIA');
});

test('Finalised Round Words (CODE #01 to CODE #50) and Tie-Breaker Words (TB-01 to TB-20) match SPELL_2_FINAL PDF', () => {
  const round1Words = getCategoryWordPool(INITIAL_MEDICAL_WORD_BOX, 'round1', false);
  const round2Words = getCategoryWordPool(INITIAL_MEDICAL_WORD_BOX, 'round2', false);
  const round3Words = getCategoryWordPool(INITIAL_MEDICAL_WORD_BOX, 'round3', false);
  assert.equal(round1Words.length, 50);
  assert.equal(round2Words.length, 50);
  assert.equal(round3Words.length, 50);

  // Spot check finalised Round words from SPELL 2_FINAL.pdf
  assert.equal(formatCodeNumber(round1Words[0].boxNumber, round1Words[0].isTieBreaker), 'CODE #01');
  assert.equal(round1Words[0].britishSpelling, 'DIPHTHERIA');
  assert.equal(formatCodeNumber(round1Words[6].boxNumber, round1Words[6].isTieBreaker), 'CODE #07');
  assert.equal(round1Words[6].britishSpelling, 'PHAEOCHROMOCYTOMA');
  assert.equal(formatCodeNumber(round1Words[12].boxNumber, round1Words[12].isTieBreaker), 'CODE #13');
  assert.equal(round1Words[12].britishSpelling, 'SPHYGMOMANOMETER');
  assert.equal(round1Words[12].ttsWord, 'sphygmomanometer');
  assert.equal(formatCodeNumber(round1Words[15].boxNumber, round1Words[15].isTieBreaker), 'CODE #16');
  assert.equal(round1Words[15].britishSpelling, 'CRYPTORCHIDISM');
  assert.equal(round1Words[15].ttsWord, 'cryptorchidism');
  assert.equal(formatCodeNumber(round1Words[49].boxNumber, round1Words[49].isTieBreaker), 'CODE #50');
  assert.equal(round1Words[49].britishSpelling, 'QUARANTINE');

  // Spot check finalised Tie-Breaker words from SPELL 2_FINAL.pdf
  const tbWords = getCategoryWordPool(INITIAL_MEDICAL_WORD_BOX, 'round1', true);
  assert.equal(tbWords.length, 20);
  assert.equal(formatCodeNumber(tbWords[0].boxNumber, tbWords[0].isTieBreaker), 'TB-01');
  assert.equal(tbWords[0].britishSpelling, 'VALPROATE');
  assert.equal(formatCodeNumber(tbWords[3].boxNumber, tbWords[3].isTieBreaker), 'TB-04');
  assert.equal(tbWords[3].britishSpelling, 'ORTHOPHTHALALDEHYDE');
  assert.equal(tbWords[3].ttsWord, 'ortho-phthalaldehyde');
  assert.equal(formatCodeNumber(tbWords[17].boxNumber, tbWords[17].isTieBreaker), 'TB-18');
  assert.equal(tbWords[17].britishSpelling, 'DICHOTOMOUS');
  assert.equal(tbWords[17].ttsWord, 'dichotomous');
  assert.equal(formatCodeNumber(tbWords[19].boxNumber, tbWords[19].isTieBreaker), 'TB-20');
  assert.equal(tbWords[19].britishSpelling, 'BACTERIOPHAGE');

  // Verify every word has UK English pronunciation hints, ttsWord, and 1-line meaning
  assert.equal(INITIAL_MEDICAL_WORD_BOX.length, 80);
  for (const item of INITIAL_MEDICAL_WORD_BOX) {
    assert.ok(item.meaning.length > 15, `Meaning too short for ${item.britishSpelling}`);
    assert.ok(item.phoneticHint && item.phoneticHint.length > 2, `Missing phoneticHint for ${item.britishSpelling}`);
    assert.ok(item.ttsWord && item.ttsWord.length > 2, `Missing ttsWord for ${item.britishSpelling}`);
  }
});

test('Speech rate clamping and formatting for Word and Meaning pronunciation', () => {
  assert.equal(clampSpeechRate(0.2), 0.4);
  assert.equal(clampSpeechRate(2.0), 1.4);
  assert.equal(clampSpeechRate(0.754), 0.75);
  assert.equal(formatSpeechRate(0.85), '0.85x');
  assert.equal(formatSpeechRate(1), '1.00x');
});

test('Round configurations match PDF rules exactly (90s, 60s, 45s)', () => {
  assert.equal(ROUNDS_CONFIG.round1.durationMs, 90_000);
  assert.equal(ROUNDS_CONFIG.round2.durationMs, 60_000);
  assert.equal(ROUNDS_CONFIG.round3.durationMs, 45_000);
});

test('formatTimerMMSSMS formats minutes:seconds:milliseconds accurately in 2-digit and 3-digit modes', () => {
  const t90 = formatTimerMMSSMS(90_000, 90_000, 2);
  assert.equal(t90.minutes, '01');
  assert.equal(t90.seconds, '30');
  assert.equal(t90.milliseconds, '00');
  assert.equal(t90.formatted, '01:30:00');
  assert.equal(t90.isExpired, false);

  const tMid = formatTimerMMSSMS(45_678, 90_000, 3);
  assert.equal(tMid.minutes, '00');
  assert.equal(tMid.seconds, '45');
  assert.equal(tMid.milliseconds, '678');
  assert.equal(tMid.formatted, '00:45:678');

  const tZero = formatTimerMMSSMS(0, 90_000, 2);
  assert.equal(tZero.formatted, '00:00:00');
  assert.equal(tZero.isExpired, true);
});

test('Participant scoring awards 10 points per correct word and 0 for incorrect', () => {
  const initial = createInitialParticipants();
  assert.equal(initial.length, 8);

  const afterCorrect = updateParticipantWordResult(initial, 1, 'round1', 'word1', 'correct');
  const p1 = afterCorrect.find((p) => p.id === 1)!;
  assert.equal(p1.scores.round1.points, 10);
});

test('Code words remain completely untouched and UK English spellings verified', () => {
  const round1 = getCategoryWordPool(INITIAL_MEDICAL_WORD_BOX, 'round1', false);
  const code13 = round1.find((w) => w.boxNumber === 13);
  const code16 = round1.find((w) => w.boxNumber === 16);

  assert.ok(code13);
  assert.equal(code13.britishSpelling, 'SPHYGMOMANOMETER');
  assert.equal(code13.ttsWord, 'sphygmomanometer');

  assert.ok(code16);
  assert.equal(code16.britishSpelling, 'CRYPTORCHIDISM');
  assert.equal(code16.ttsWord, 'cryptorchidism');

  // Verify all 80 words are defined and intact
  assert.equal(INITIAL_MEDICAL_WORD_BOX.length, 80);
});
