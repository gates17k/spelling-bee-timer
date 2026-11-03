import React from 'react';
import { Flame, CheckCircle2, Users, Clock, Award, Compass } from 'lucide-react';
import {
  RoundConfig,
  RoundId,
  ROUNDS_CONFIG,
  ROUND_ORDER,
} from '../utils/competitionRules';

interface RoundProgressionStripProps {
  activeRoundId: RoundId;
  isTieBreaker: boolean;
  onSelectRound: (roundId: RoundId) => void;
  onToggleTieBreaker: () => void;
}

export const RoundProgressionStrip: React.FC<RoundProgressionStripProps> = ({
  activeRoundId,
  isTieBreaker,
  onSelectRound,
  onToggleTieBreaker,
}) => {
  const activeRound: RoundConfig = ROUNDS_CONFIG[activeRoundId];
  const isTrialActive = activeRoundId === 'trial' && !isTieBreaker;

  return (
    <section
      aria-label="Competition Round Progression and Current Level Highlight"
      className="w-full shrink-0 px-4 pt-1.5 lg:px-6"
    >
      {/* 5-Column Interactive Stage Category Selector (Trial Run + 3 Rounds + Tie-Breaker) */}
      <div className="grid grid-cols-5 gap-2">
        {ROUND_ORDER.map((rId) => {
          const r = ROUNDS_CONFIG[rId];
          const isCurrent = rId === activeRoundId && !isTieBreaker;
          const isCompleted = !isTieBreaker && r.levelNumber < activeRound.levelNumber;
          const isTrialCard = r.id === 'trial';

          const codeRangeText =
            r.id === 'trial'
              ? 'Code #01–#10'
              : 'Code #01–#50';

          return (
            <button
              key={r.id}
              type="button"
              data-testid={`round-btn-${r.id}`}
              onClick={() => onSelectRound(r.id)}
              aria-pressed={isCurrent}
              className={`group relative flex flex-col justify-between rounded-xl px-3 py-1.5 text-left transition-all cursor-pointer ${
                isCurrent
                  ? isTrialCard
                    ? 'border-2 border-teal-300 bg-gradient-to-b from-teal-900 via-[#0d3b42] to-[#061c24] shadow-[0_0_20px_rgba(45,212,191,0.45)] ring-1 ring-teal-300'
                    : 'border-2 border-[#ffdf73] bg-gradient-to-b from-[#1a4380] via-[#102d5c] to-[#091c3a] shadow-[0_0_20px_rgba(212,175,55,0.45)] ring-1 ring-[#d4af37]'
                  : isCompleted
                  ? 'border border-emerald-500/40 bg-[#081d3b]/80 opacity-85 hover:opacity-100'
                  : 'border border-[#d4af37]/30 bg-[#071832]/75 opacity-80 hover:border-[#d4af37]/70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-black tracking-[0.1em] ${
                    isCurrent
                      ? isTrialCard
                        ? 'text-teal-300'
                        : 'text-amber-300'
                      : isCompleted
                      ? 'text-emerald-300'
                      : 'text-slate-300'
                  }`}
                >
                  {isTrialCard && <Compass className="h-3 w-3 shrink-0" />}
                  {isCurrent ? '★ ACTIVE · ' : isCompleted ? '✔ DONE · ' : ''}
                  {isTrialCard ? 'DEMO STAGE' : `LEVEL ${r.levelNumber}`}
                </span>

                <span
                  className={`font-digital-led text-xs font-extrabold tracking-wider ${
                    isCurrent ? 'text-red-400' : 'text-amber-200/80'
                  }`}
                >
                  {r.durationSeconds}s CLOCK
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-1">
                <h3
                  className={`font-display-serif text-xs font-black tracking-wide sm:text-sm truncate ${
                    isCurrent ? 'text-white' : 'text-slate-200'
                  }`}
                >
                  {r.title}
                </h3>
                {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />}
              </div>

              <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 border-t border-white/10 pt-0.5 text-[10px] font-semibold text-slate-200">
                <span className="text-amber-300 font-bold">{codeRangeText}</span>
                <span aria-hidden="true">·</span>
                <span>{r.participantsCount} Spellers</span>
              </div>
            </button>
          );
        })}

        {/* Tie-Breaker Separate Box Mode Button */}
        <button
          type="button"
          data-testid="round-btn-tb"
          onClick={onToggleTieBreaker}
          aria-pressed={isTieBreaker}
          className={`flex flex-col justify-between rounded-xl px-3 py-1.5 text-left transition-all cursor-pointer ${
            isTieBreaker
              ? 'border-2 border-orange-400 bg-gradient-to-b from-red-900 via-red-950 to-[#1f0808] shadow-[0_0_20px_rgba(239,68,68,0.55)] ring-1 ring-orange-400'
              : 'border border-[#d4af37]/35 bg-[#081b38]/80 hover:border-orange-400/70'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-black tracking-[0.1em] ${
                isTieBreaker ? 'text-orange-300' : 'text-amber-300/90'
              }`}
            >
              <Flame className="h-3 w-3 shrink-0" />
              {isTieBreaker ? '★ ACTIVE ★' : 'TIE-BREAKER'}
            </span>
            <span className="font-digital-led text-[10px] font-bold text-orange-300">
              SEPARATE BOX
            </span>
          </div>

          <div>
            <h3 className="font-display-serif text-xs font-black tracking-wide text-white sm:text-sm truncate">
              Tie-Breaker Word
            </h3>
          </div>

          <div className="mt-0.5 border-t border-white/10 pt-0.5 text-[10px] font-semibold text-slate-200 truncate">
            <span className="text-orange-300 font-bold">Code TB-01–TB-20</span> · Separate Box
          </div>
        </button>
      </div>

      {/* Prominent High-Contrast Current Level Spotlight Banner */}
      <div
        className={`mt-1.5 flex items-center justify-between gap-2 rounded-xl border-2 px-4 py-1.5 shadow-md transition-colors ${
          isTieBreaker
            ? 'border-orange-400 bg-gradient-to-r from-[#450a0a] via-[#7f1d1d] to-[#450a0a] text-white'
            : isTrialActive
            ? 'border-teal-300 bg-gradient-to-r from-[#06363d] via-[#0e5863] to-[#06363d] text-white'
            : 'border-[#fff1be] bg-gold-metallic text-[#051329]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`rounded px-2 py-0.5 text-[11px] font-black tracking-[0.14em] ${
              isTieBreaker
                ? 'bg-orange-500 text-black'
                : isTrialActive
                ? 'bg-teal-300 text-[#042327]'
                : 'bg-[#06152d] text-[#f5d77f]'
            }`}
          >
            {isTieBreaker
              ? 'SEPARATE TIE-BREAKER LOT'
              : isTrialActive
              ? 'PRE-COMPETITION WALKTHROUGH'
              : `CURRENT LEVEL ${activeRound.levelNumber} OF 3`}
          </span>

          <h2
            className={`font-display-serif text-lg font-black tracking-wide sm:text-xl ${
              isTieBreaker || isTrialActive ? 'text-white' : 'text-[#051329]'
            }`}
          >
            {isTieBreaker
              ? `${activeRound.title.toUpperCase()} — TIE-BREAKER WORD`
              : isTrialActive
              ? 'TRIAL RUN: PRACTICE DEMO (BEFORE ROUND 1)'
              : activeRound.title.toUpperCase()}
          </h2>
        </div>

        <div
          className={`flex items-center gap-3 text-xs font-extrabold ${
            isTieBreaker || isTrialActive ? 'text-amber-200' : 'text-[#06152d]'
          }`}
        >
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span>{activeRound.durationSeconds} Seconds Allotted</span>
          </span>
          <span aria-hidden="true">|</span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 shrink-0" />
            <span>{activeRound.participantsCount} Contestants</span>
          </span>
          <span aria-hidden="true">|</span>
          <span className="inline-flex items-center gap-1">
            <Award className="h-3.5 w-3.5 shrink-0" />
            <span>
              {isTrialActive
                ? 'Practice Walkthrough (0 Pts)'
                : `+${activeRound.pointsPerCorrectWord} Pts / Correct Word`}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};
