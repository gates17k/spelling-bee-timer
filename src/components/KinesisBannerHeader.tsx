import React from 'react';
import {
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  ListMusic,
} from 'lucide-react';
import { COMPETITION_METADATA } from '../utils/competitionRules';

interface KinesisBannerHeaderProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenWordManager: () => void;
  onOpenRules: () => void;
}

export const KinesisBannerHeader: React.FC<KinesisBannerHeaderProps> = ({
  isFullscreen,
  onToggleFullscreen,
  isMuted,
  onToggleMute,
  onOpenWordManager,
  onOpenRules,
}) => {
  return (
    <header className="relative w-full shrink-0 overflow-hidden border-b-2 border-[#d4af37] bg-gradient-to-r from-[#041022] via-[#0a2349] to-[#041022] shadow-lg">
      {/* Subtle Authentic Kinesis 2026 Uploaded Banner Backdrop with High-Contrast Scrim */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <img
          src={COMPETITION_METADATA.bannerWideAsset}
          alt="Kinesis 2026 Shillong Medical College Panorama"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041022]/95 via-[#081f42]/80 to-[#041022]/95" />
      </div>

      {/* Top Ornamental Gold Ribbon Line */}
      <div className="h-1 w-full bg-gold-metallic" />

      <div className="relative z-10 w-full px-4 py-1.5 lg:px-6">
        {/* Top Utility & Fullscreen Control Strip */}
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2 border-b border-[#d4af37]/25 pb-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-wider text-amber-200/95">
            <span className="rounded bg-[#d4af37]/20 border border-[#d4af37]/50 px-1.5 py-0.2 text-[10px] font-black text-amber-300">
              16:9 LANDSCAPE STAGE
            </span>
            <span className="font-bold text-white">{COMPETITION_METADATA.date}</span>
            <span aria-hidden="true">·</span>
            <span>{COMPETITION_METADATA.timeSlot}</span>
            <span aria-hidden="true">·</span>
            <span>{COMPETITION_METADATA.venue}</span>
            <span aria-hidden="true">·</span>
            <span className="font-bold text-amber-300">Judge: {COMPETITION_METADATA.judge}</span>
          </div>

          {/* Stage Controls: Manage Category Words, Rules, Audio Mute, and Fullscreen */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenWordManager}
              className="flex items-center gap-1 rounded-md border border-[#d4af37]/50 bg-[#0c274e]/90 px-2.5 py-0.5 text-[11px] font-bold text-white hover:bg-[#13386e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ListMusic className="h-3 w-3 text-amber-300 shrink-0" />
              <span>Manage Category Words</span>
            </button>

            <button
              type="button"
              onClick={onOpenRules}
              className="flex items-center gap-1 rounded-md border border-[#d4af37]/50 bg-[#0c274e]/90 px-2.5 py-0.5 text-[11px] font-bold text-white hover:bg-[#13386e] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <BookOpen className="h-3 w-3 text-amber-300 shrink-0" />
              <span>Official Rules &amp; Theme</span>
            </button>

            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute Stage Audio' : 'Mute Stage Audio'}
              className="flex items-center justify-center rounded-md border border-[#d4af37]/40 bg-[#0c274e]/90 p-1 text-amber-200 hover:bg-[#13386e] hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Stage Sound Effects' : 'Mute Stage Sound Effects'}
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5 text-red-400" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>

            <button
              type="button"
              data-testid="fullscreen-btn"
              onClick={onToggleFullscreen}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Stage'}
              className="flex items-center gap-1 rounded-md bg-gold-metallic px-3 py-0.5 text-[11px] font-black text-[#05142b] hover:brightness-110 transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span>Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Fullscreen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Institutional & Event Banner Row */}
        <div className="grid grid-cols-12 items-center gap-2">
          {/* Left: Official Shillong Medical College Crest Emblem */}
          <div className="col-span-4 flex items-center gap-2.5">
            <div
              role="img"
              aria-label="Shillong Medical College Official Emblem"
              className="h-12 w-12 shrink-0 rounded-full border-2 border-[#d4af37] bg-white shadow-[0_0_16px_rgba(212,175,55,0.5)]"
              style={{
                backgroundImage: `url(${COMPETITION_METADATA.schedulePosterAsset})`,
                backgroundSize: '560% auto',
                backgroundPosition: '21.5% 5.2%',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="text-left min-w-0">
              <p className="text-[9px] font-bold tracking-[0.16em] text-amber-300 truncate">
                {COMPETITION_METADATA.established} · {COMPETITION_METADATA.motto}
              </p>
              <h2 className="font-display-serif text-sm font-extrabold tracking-wide text-white whitespace-nowrap sm:text-base">
                SHILLONG MEDICAL COLLEGE
              </h2>
              <p className="text-[11px] font-semibold text-amber-200/90 truncate">
                {COMPETITION_METADATA.committee} · “Minds in Motion, Hearts in Harmony”
              </p>
            </div>
          </div>

          {/* Center: KINESIS 2026 & SPELLING BEE COMPETITION Grand Title */}
          <div className="col-span-5 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-2.5">
              <h1 className="font-display-serif text-2xl font-black tracking-[0.08em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-3xl whitespace-nowrap leading-none">
                KINES<span className="text-amber-300">I</span>S{' '}
                <span className="text-gold-metallic">2026</span>
              </h1>
              <span className="hidden text-[10px] font-bold tracking-[0.14em] text-amber-200 xl:inline whitespace-nowrap">
                SPORTS | <span className="text-amber-300 underline">LITERATURE</span> | CULTURE | CAMARADERIE
              </span>
            </div>

            {/* Grand Stage Competition Title Ribbon */}
            <div className="mt-1 inline-flex items-center gap-2 rounded-lg border-2 border-[#d4af37] bg-gradient-to-r from-[#091e3a] via-[#133868] to-[#091e3a] px-4 py-0.5 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Sparkles className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span className="font-display-serif text-base font-black tracking-[0.1em] text-gold-metallic sm:text-xl whitespace-nowrap">
                SPELLING BEE COMPETITION
              </span>
              <Sparkles className="h-3.5 w-3.5 text-amber-300 shrink-0" />
            </div>
          </div>

          {/* Right: UK English Software Pronouncer Standard Callout */}
          <div className="col-span-3 flex flex-col items-end justify-center text-right">
            <div className="rounded-lg border border-[#d4af37]/50 bg-[#071936]/90 px-3 py-1 shadow-inner">
              <div className="text-[9px] font-extrabold tracking-[0.14em] text-amber-300">
                SOFTWARE PRONOUNCER · RULE 3 &amp; 6
              </div>
              <div className="text-[11px] font-black tracking-wide text-white whitespace-nowrap">
                UK ENGLISH SPELLING &amp; PRONUNCIATION
              </div>
              <div className="text-[10px] font-medium text-amber-200/85">
                Trial (90s) · Round 1 (90s) · Semifinal (60s) · Final (45s)
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
