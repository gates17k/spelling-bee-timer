import {
  FormattedTimer,
  RoundConfig,
  COMPETITION_METADATA,
  MedicalWordBoxItem,
  formatCodeNumber,
} from './competitionRules';

export interface PiPRenderState {
  round: RoundConfig;
  isTieBreaker: boolean;
  timer: FormattedTimer;
  isRunning: boolean;
  activeWord: MedicalWordBoxItem | null;
  hasPronouncedCurrentWord: boolean;
  isMeaningVisibleOnStage: boolean;
  revealSpellingOnStage: boolean;
}

/**
 * Renders the 16:9 Kinesis 2026 Spelling Bee Banner focused strictly on the
 * Black & Red Digital Timer + Category Code Number Pronunciation onto a 1280x720 canvas.
 */
export function drawAlwaysOnTopProjectorFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: PiPRenderState
) {
  // 1. Royal Navy Blue Background matching Kinesis 2026
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#071b3a');
  bgGrad.addColorStop(0.5, '#0b254e');
  bgGrad.addColorStop(1, '#051226');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Gold Outer Frame
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.strokeRect(14, 14, width - 28, height - 28);

  // 2. Top Header: SHILLONG MEDICAL COLLEGE & KINESIS 2026
  ctx.fillStyle = '#f3d27a';
  ctx.font = '700 22px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    `${COMPETITION_METADATA.college}  ·  ${COMPETITION_METADATA.festival}`,
    width / 2,
    54
  );

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 36px "Cinzel", Georgia, serif';
  ctx.fillText('SPELLING BEE COMPETITION', width / 2, 98);

  // 3. Highlighted Current Category / Round Banner
  const badgeY = 118;
  const badgeH = 68;
  const badgeW = width - 120;
  const badgeX = 60;

  const badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY);
  if (state.isTieBreaker) {
    badgeGrad.addColorStop(0, '#7c2d12');
    badgeGrad.addColorStop(0.5, '#ea580c');
    badgeGrad.addColorStop(1, '#7c2d12');
  } else if (state.round.id === 'trial') {
    badgeGrad.addColorStop(0, '#0f766e');
    badgeGrad.addColorStop(0.5, '#2dd4bf');
    badgeGrad.addColorStop(1, '#0f766e');
  } else {
    badgeGrad.addColorStop(0, '#9a6f0a');
    badgeGrad.addColorStop(0.5, '#f2cc66');
    badgeGrad.addColorStop(1, '#9a6f0a');
  }
  ctx.fillStyle = badgeGrad;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 12);
  ctx.fill();

  ctx.fillStyle = state.isTieBreaker ? '#ffffff' : '#06152d';
  ctx.font = '900 30px "Plus Jakarta Sans", sans-serif';
  const roundHeadline = state.isTieBreaker
    ? `★ TIE-BREAKER CATEGORY  ·  ${state.round.shortTitle} (${state.round.durationSeconds}s) ★`
    : state.round.id === 'trial'
    ? `★ TRIAL RUN (PRACTICE DEMO)  ·  ${state.round.durationSeconds} SECONDS ★`
    : `★ CURRENT LEVEL: ${state.round.shortTitle}  ·  ${state.round.durationSeconds} SECONDS ★`;
  ctx.fillText(roundHeadline, width / 2, badgeY + 45);

  // 4. Centerpiece Pitch-Black Digital Timer Housing with Red Digital Numbers
  const boxX = 60;
  const boxY = 206;
  const boxW = width - 120;
  const boxH = 355;

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 20);
  ctx.fill();

  ctx.strokeStyle = state.timer.isExpired
    ? '#ff1a1a'
    : state.timer.isCritical
    ? '#ff3b3b'
    : '#d4af37';
  ctx.lineWidth = state.timer.isCritical || state.timer.isExpired ? 6 : 4;
  ctx.stroke();

  // Digital Timer Labels (MINUTES : SECONDS : MILLISECONDS)
  ctx.fillStyle = '#ff4d4d';
  ctx.font = '700 20px "Plus Jakarta Sans", monospace';
  ctx.fillText('MINUTES                 SECONDS                 MILLISECONDS', width / 2, boxY + 46);

  // Giant Red Digital Numbers MM:SS:MS
  ctx.save();
  ctx.fillStyle = '#ff1a1a';
  ctx.shadowColor = 'rgba(255, 20, 20, 0.9)';
  ctx.shadowBlur = 28;
  ctx.font = '700 180px "Share Tech Mono", "JetBrains Mono", monospace';
  ctx.fillText(state.timer.formatted, width / 2, boxY + 236);
  ctx.restore();

  // Status Bar inside black timer box
  if (state.timer.isExpired) {
    ctx.fillStyle = '#ff1a1a';
    ctx.font = '900 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('▲ TIME EXPIRED — 00:00:00 ▲', width / 2, boxY + 318);
  } else if (state.activeWord) {
    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    const codeLabel = formatCodeNumber(state.activeWord.boxNumber, state.activeWord.isTieBreaker);
    const statusText = state.revealSpellingOnStage
      ? `  ·  BRITISH SPELLING: ${state.activeWord.britishSpelling}`
      : state.hasPronouncedCurrentWord
      ? `  ·  WORD PRONOUNCED — COUNTDOWN ACTIVE`
      : `  ·  LOT SELECTED — AWAITING "PRONOUNCE & START CLOCK"`;
    ctx.fillText(`SELECTED LOT: ${codeLabel}${statusText}`, width / 2, boxY + 318);
  }

  // 5. Bottom Pronunciation & Meaning Bar
  ctx.fillStyle = '#f3d27a';
  ctx.font = '700 21px "Plus Jakarta Sans", sans-serif';
  const bottomMessage =
    state.activeWord && state.isMeaningVisibleOnStage
      ? `Meaning: ${state.activeWord.meaning}`
      : state.activeWord && !state.hasPronouncedCurrentWord
      ? `Code Number ${formatCodeNumber(state.activeWord.boxNumber, state.activeWord.isTieBreaker)} Locked — Press "Pronounce & Start Clock" to speak word`
      : 'British English Software Pronouncer (en-GB) Ready';
  ctx.fillText(bottomMessage, width / 2, 620, width - 140);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    `British English Spelling & Pronunciation (en-GB)  ·  Countdown Inclusive of Repeat / Meaning`,
    width / 2,
    662
  );
}
