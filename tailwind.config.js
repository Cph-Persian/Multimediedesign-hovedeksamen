/** @type {import('tailwindcss').Config} */

/**
 * Design tokens for Ministeriets AI-Platform.
 *
 * Tokens er organiseret efter CRAP-modellen (Robin Williams, "The Non-
 * Designer's Design Book") og Gestalt-perceptionslovene:
 *
 *   CRAP:
 *     Contrast    — typografi-skala, farvekontrast, vægt-forskelle
 *     Repetition  — tokens gentages på tværs af komponenter
 *     Alignment   — fælles spacing og radius-rytme
 *     Proximity   — spacing-skala definerer gruppe- vs. sektions-afstande
 *
 *   Gestalt:
 *     Similarity  — semantiske farve-tokens (verify, warn, profil-accenter)
 *     Common Region — radii + shadow-tokens definerer kort-containere
 *     Figure-Ground — shadow-tokens etablerer dybde mellem surface og bg
 *     Continuation — letterSpacing og lineHeight skaber typografisk flow
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      /* ----------------------------------------------------------
         FARVER — Gestalt Similarity (semantiske tokens) + CRAP Contrast
         ---------------------------------------------------------- */
      colors: {
        // Core UVM palette — Repetition: alle officielle elementer trækker på
        // disse fem tokens, hvilket binder brandet visuelt sammen
        uvm: {
          primary: '#002B5C',     // Brand-navy — autoritet & tillid
          surface: '#FFFFFF',     // Kort/content baggrund
          cta:     '#E31B23',     // Kritiske handlinger / advarsler (kun her!)
          neutral: '#F3F4F6',     // Side-baggrund (Figure-Ground: sletter "figur"-fladen)
          ink:     '#0F1B2D',     // Body-tekst (Contrast: dybere end primary)
          muted:   '#5B6B82',     // Sekundær tekst (Contrast: tydeligt nedtonet)
          border:  '#E2E8F0',     // Subtile rammer
        },

        // Semantiske status-tokens — Gestalt Similarity ved feedback
        verify: { DEFAULT: '#047857', soft: '#ECFDF5', ring: '#A7F3D0' },
        warn:   { DEFAULT: '#92400E', soft: '#FFFBEB', ring: '#FDE68A' },

        // Profil-accenter — Repetition i farve-laget, så hver elev
        // konsekvent ser SIN profilfarve i CTA, fokus, og badges
        stx: { DEFAULT: '#3B82F6', soft: '#DBEAFE', ink: '#1E3A8A' },
        htx: { DEFAULT: '#14B8A6', soft: '#CCFBF1', ink: '#115E59' },
        hhx: { DEFAULT: '#1E40AF', soft: '#DBEAFE', ink: '#1E3A8A' },
      },

      /* ----------------------------------------------------------
         TYPOGRAFI — CRAP Contrast (skala) + Continuation (line-height)
         ---------------------------------------------------------- */
      fontFamily: {
        // To-fonts-system jf. styletile: Work Sans til headlines, Inter til UI
        // (Repetition + Contrast: ALDRIG samme font til både H og body)
        heading: ['"Work Sans"', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Contrast: hver step er markant forskellig — ingen "lidt-større" skala
        'h1': ['2.25rem',   { lineHeight: '2.5rem',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['1.5rem',    { lineHeight: '2rem',    letterSpacing: '-0.01em', fontWeight: '600' }],
        's1': ['1.125rem',  { lineHeight: '1.75rem',                          fontWeight: '500' }],
        'b1': ['1rem',      { lineHeight: '1.625rem',                         fontWeight: '400' }],
        'c1': ['0.8125rem', { lineHeight: '1.125rem',                         fontWeight: '400' }],
      },

      /* ----------------------------------------------------------
         SHADOWS — Gestalt Figure-Ground (dybde-hierarki)
         ---------------------------------------------------------- */
      boxShadow: {
        // Tre niveauer = tre figur-grund-relationer i UI'et
        'card':  '0 1px 2px 0 rgba(15, 27, 45, 0.04), 0 1px 3px 0 rgba(15, 27, 45, 0.06)', // baseline
        'lift':  '0 8px 24px -8px rgba(15, 27, 45, 0.18)',   // hover/active raised state
        'modal': '0 24px 48px -12px rgba(15, 27, 45, 0.25)', // overlays
        'focus': '0 0 0 3px rgba(0, 43, 92, 0.35)',          // WCAG focus-ring
      },

      /* ----------------------------------------------------------
         RADIUS-RYTME — CRAP Repetition (genbrugte former)
         ---------------------------------------------------------- */
      borderRadius: {
        // Sammenhængende skala, der bruges konsistent:
        //   - sm (4px)  → chips, tags
        //   - md (8px)  → standardknapper, inputs
        //   - lg (12px) → kort, alerts
        //   - xl2 (16px) → større paneler (ai-region)
        //   - 2xl (24px) → besked-bobler
        //   - full → pille-knapper og avatars
        'xl2': '1rem',
      },

      /* ----------------------------------------------------------
         SPACING — Gestalt Proximity (rytme mellem grupper)
         ---------------------------------------------------------- */
      // Vi bruger Tailwinds default spacing-skala (multipla af 4px), men
      // koden følger denne konvention:
      //   space-y-1.5 / gap-1.5    — inden i samme klump (tæt = beslægtet)
      //   space-y-3   / gap-3      — mellem klumper i samme sektion
      //   space-y-6   / gap-6      — mellem sektioner på en side
      //   space-y-8   / gap-8      — mellem hoved-zoner

      /* ----------------------------------------------------------
         ANIMATIONER — Gestalt Common Fate
         ---------------------------------------------------------- */
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.55 },
        },
      },
      animation: {
        // Bruges på "thinking"-dots; flere prikker pulser sammen = "fælles skæbne"
        'pulse-soft': 'pulse-soft 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
