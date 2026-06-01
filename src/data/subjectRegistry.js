/**
 * subjectRegistry.js — BREDE fag-katalog (67 fag på tværs af profiler).
 */

export const SUBJECT_REGISTRY = [
  /* ============================================================
     STX (Stx-bekendtgørelsen)
     ============================================================ */
  // Obligatoriske
  { id: 'dansk_stx',                  navn: 'Dansk',                  profil: 'stx', niveauer: ['A'],          status: 'obligatorisk', deepId: 'dansk_a_stx',     alias: ['dansk'] },
  { id: 'engelsk_stx',                navn: 'Engelsk',                profil: 'stx', niveauer: ['A', 'B'],     status: 'obligatorisk', alias: ['engelsk', 'english'] },
  { id: 'tysk_fortsaetter_stx',       navn: 'Tysk (fortsætter)',      profil: 'stx', niveauer: ['A', 'B'],     status: 'studieretning', alias: ['tysk'] },
  { id: 'fransk_fortsaetter_stx',     navn: 'Fransk (fortsætter)',    profil: 'stx', niveauer: ['A', 'B'],     status: 'studieretning', alias: ['fransk', 'french'] },
  { id: 'spansk_stx',                 navn: 'Spansk',                 profil: 'stx', niveauer: ['A'],          status: 'studieretning', alias: ['spansk', 'spanish'] },
  { id: 'latin_stx',                  navn: 'Latin',                  profil: 'stx', niveauer: ['C', 'A'],     status: 'valgfag', alias: ['latin'] },
  { id: 'graesk_stx',                 navn: 'Græsk',                  profil: 'stx', niveauer: ['A'],          status: 'valgfag', alias: ['græsk', 'graesk'] },
  { id: 'historie_stx',               navn: 'Historie',               profil: 'stx', niveauer: ['A'],          status: 'obligatorisk', deepId: 'historie_a_stx', alias: ['historie', 'historik'] },
  { id: 'idraet_stx',                 navn: 'Idræt',                  profil: 'stx', niveauer: ['C', 'B', 'A'], status: 'obligatorisk', alias: ['idræt', 'idraet', 'sport'] },
  { id: 'matematik_stx',              navn: 'Matematik',              profil: 'stx', niveauer: ['C', 'B', 'A'], status: 'obligatorisk', deepId: 'matematik_b_stx', alias: ['matematik', 'mat', 'math'] },
  { id: 'naturvidenskabelig_faggruppe_stx', navn: 'Naturvidenskabelig faggruppe (NF)', profil: 'stx', niveauer: ['C'], status: 'obligatorisk', alias: ['nf', 'naturvidenskabelig'] },
  { id: 'religion_stx',               navn: 'Religion',               profil: 'stx', niveauer: ['C', 'B'],     status: 'obligatorisk', alias: ['religion'] },
  { id: 'oldtidskundskab_stx',        navn: 'Oldtidskundskab',        profil: 'stx', niveauer: ['C'],          status: 'obligatorisk', alias: ['oldtidskundskab', 'antikken'] },
  { id: 'samfundsfag_stx',            navn: 'Samfundsfag',            profil: 'stx', niveauer: ['C', 'B', 'A'], status: 'obligatorisk', alias: ['samfundsfag', 'samfund'] },

  // Naturvidenskab (kan tages som NF eller separat)
  { id: 'fysik_stx',                  navn: 'Fysik',                  profil: 'stx', niveauer: ['C', 'B', 'A'], status: 'studieretning', alias: ['fysik', 'physics'] },
  { id: 'kemi_stx',                   navn: 'Kemi',                   profil: 'stx', niveauer: ['C', 'B', 'A'], status: 'studieretning', alias: ['kemi', 'chemistry'] },
  { id: 'biologi_stx',                navn: 'Biologi',                profil: 'stx', niveauer: ['C', 'B', 'A'], status: 'studieretning', alias: ['biologi', 'biology'] },
  { id: 'bioteknologi_stx',           navn: 'Bioteknologi',           profil: 'stx', niveauer: ['A'],          status: 'studieretning', alias: ['bioteknologi'] },
  { id: 'naturgeografi_stx',          navn: 'Naturgeografi',          profil: 'stx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['naturgeografi', 'geografi'] },
  { id: 'astronomi_stx',              navn: 'Astronomi',              profil: 'stx', niveauer: ['C'],          status: 'valgfag', alias: ['astronomi'] },

  // Kunst, kultur, samfund
  { id: 'musik_stx',                  navn: 'Musik',                  profil: 'stx', niveauer: ['C', 'B', 'A'], status: 'kunstnerisk_valg', alias: ['musik', 'music'] },
  { id: 'billedkunst_stx',            navn: 'Billedkunst',            profil: 'stx', niveauer: ['C', 'B'],     status: 'kunstnerisk_valg', alias: ['billedkunst'] },
  { id: 'dramatik_stx',               navn: 'Dramatik',               profil: 'stx', niveauer: ['C', 'B'],     status: 'kunstnerisk_valg', alias: ['dramatik', 'teater'] },
  { id: 'mediefag_stx',               navn: 'Mediefag',               profil: 'stx', niveauer: ['C', 'B'],     status: 'kunstnerisk_valg', alias: ['mediefag', 'medier'] },
  { id: 'filosofi_stx',               navn: 'Filosofi',               profil: 'stx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['filosofi'] },
  { id: 'psykologi_stx',              navn: 'Psykologi',              profil: 'stx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['psykologi'] },
  { id: 'erhvervsokonomi_stx',        navn: 'Erhvervsøkonomi',        profil: 'stx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['erhvervsøkonomi'] },
  { id: 'innovation_stx',             navn: 'Innovation',             profil: 'stx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['innovation'] },
  { id: 'informatik_stx',             navn: 'Informatik',             profil: 'stx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['informatik', 'it'] },
  { id: 'statistik_stx',              navn: 'Statistik',              profil: 'stx', niveauer: ['C'],          status: 'valgfag', alias: ['statistik', 'statistics'] },

  /* ============================================================
     HTX (Htx-bekendtgørelsen)
     ============================================================ */
  // Obligatoriske
  { id: 'dansk_htx',                  navn: 'Dansk',                  profil: 'htx', niveauer: ['A'],          status: 'obligatorisk', alias: ['dansk'] },
  { id: 'engelsk_htx',                navn: 'Engelsk',                profil: 'htx', niveauer: ['A', 'B'],     status: 'obligatorisk', alias: ['engelsk', 'english'] },
  { id: 'matematik_htx',              navn: 'Matematik',              profil: 'htx', niveauer: ['A'],          status: 'obligatorisk', deepId: 'matematik_a_htx', alias: ['matematik', 'mat', 'math'] },
  { id: 'fysik_htx',                  navn: 'Fysik',                  profil: 'htx', niveauer: ['A', 'B'],     status: 'obligatorisk', deepId: 'fysik_a_htx',     alias: ['fysik', 'physics'] },
  { id: 'kemi_htx',                   navn: 'Kemi',                   profil: 'htx', niveauer: ['A', 'B'],     status: 'obligatorisk', alias: ['kemi'] },
  { id: 'biologi_htx',                navn: 'Biologi',                profil: 'htx', niveauer: ['A', 'B', 'C'], status: 'obligatorisk', alias: ['biologi'] },
  { id: 'teknologi_htx',              navn: 'Teknologi',              profil: 'htx', niveauer: ['A', 'B'],     status: 'obligatorisk', deepId: 'teknologi_b_htx', alias: ['teknologi'] },
  { id: 'teknikfag_htx',              navn: 'Teknikfag',              profil: 'htx', niveauer: ['A'],          status: 'obligatorisk', alias: ['teknikfag', 'design og produktion', 'byggeri og energi', 'proces levnedsmiddel og sundhed', 'udvikling og produktion', 'digitalt design'] },
  { id: 'kommunikation_it_htx',       navn: 'Kommunikation/IT',       profil: 'htx', niveauer: ['C', 'A'],     status: 'obligatorisk', alias: ['kommunikation it', 'kom-it'] },
  { id: 'samfundsfag_htx',            navn: 'Samfundsfag',            profil: 'htx', niveauer: ['C', 'B'],     status: 'obligatorisk', alias: ['samfundsfag', 'samfund'] },
  { id: 'ideehistorie_htx',           navn: 'Idéhistorie',            profil: 'htx', niveauer: ['B'],          status: 'obligatorisk', alias: ['idéhistorie', 'idehistorie'] },

  // Valgfag på HTX
  { id: 'informatik_htx',             navn: 'Informatik',             profil: 'htx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['informatik', 'it'] },
  { id: 'innovation_htx',             navn: 'Innovation',             profil: 'htx', niveauer: ['C'],          status: 'valgfag', alias: ['innovation'] },
  { id: 'psykologi_htx',              navn: 'Psykologi',              profil: 'htx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['psykologi'] },
  { id: 'matematik_htx_valg_b',       navn: 'Matematik (valgfag)',    profil: 'htx', niveauer: ['B'],          status: 'valgfag', alias: ['matematik b htx'] },

  /* ============================================================
     HHX (Hhx-bekendtgørelsen)
     ============================================================ */
  // Obligatoriske
  { id: 'dansk_hhx',                  navn: 'Dansk',                  profil: 'hhx', niveauer: ['A'],          status: 'obligatorisk', alias: ['dansk'] },
  { id: 'engelsk_hhx',                navn: 'Engelsk',                profil: 'hhx', niveauer: ['A'],          status: 'obligatorisk', alias: ['engelsk', 'english'] },
  { id: 'tysk_hhx',                   navn: 'Tysk',                   profil: 'hhx', niveauer: ['A', 'B'],     status: 'studieretning', alias: ['tysk'] },
  { id: 'fransk_hhx',                 navn: 'Fransk',                 profil: 'hhx', niveauer: ['A', 'B'],     status: 'studieretning', alias: ['fransk'] },
  { id: 'spansk_hhx',                 navn: 'Spansk',                 profil: 'hhx', niveauer: ['A'],          status: 'studieretning', alias: ['spansk'] },
  { id: 'matematik_hhx',              navn: 'Matematik',              profil: 'hhx', niveauer: ['C', 'B', 'A'], status: 'obligatorisk', alias: ['matematik', 'mat', 'math'] },
  { id: 'samfundsfag_hhx',            navn: 'Samfundsfag',            profil: 'hhx', niveauer: ['C', 'B'],     status: 'obligatorisk', alias: ['samfundsfag', 'samfund'] },
  { id: 'historie_hhx',               navn: 'Historie',               profil: 'hhx', niveauer: ['B'],          status: 'obligatorisk', alias: ['historie'] },
  { id: 'virksomhedsoekonomi_hhx',    navn: 'Virksomhedsøkonomi',     profil: 'hhx', niveauer: ['C', 'B', 'A'], status: 'obligatorisk', deepId: 'virksomhedsoekonomi_b_hhx', alias: ['virksomhedsøkonomi', 'vø', 'erhvervsøkonomi'] },
  { id: 'afsaetning_hhx',             navn: 'Afsætning',              profil: 'hhx', niveauer: ['B', 'A'],     status: 'obligatorisk', deepId: 'afsaetning_a_hhx', alias: ['afsætning', 'afsaetning', 'marketing'] },
  { id: 'international_oekonomi_hhx', navn: 'International økonomi',  profil: 'hhx', niveauer: ['B', 'A'],     status: 'obligatorisk', deepId: 'international_oekonomi_b_hhx', alias: ['international økonomi', 'inter ø'] },

  // Valgfag på HHX
  { id: 'erhvervscase_hhx',           navn: 'Erhvervscase',           profil: 'hhx', niveauer: ['C'],          status: 'obligatorisk', alias: ['erhvervscase', 'case'] },
  { id: 'innovation_hhx',             navn: 'Innovation',             profil: 'hhx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['innovation'] },
  { id: 'finansiering_hhx',           navn: 'Finansiering',           profil: 'hhx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['finansiering'] },
  { id: 'markedskommunikation_hhx',   navn: 'Markedskommunikation',   profil: 'hhx', niveauer: ['C'],          status: 'valgfag', alias: ['markedskommunikation'] },
  { id: 'erhvervsret_hhx',            navn: 'Erhvervsret',            profil: 'hhx', niveauer: ['C'],          status: 'valgfag', alias: ['erhvervsret'] },
  { id: 'kulturforstaaelse_hhx',      navn: 'Kulturforståelse',       profil: 'hhx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['kulturforståelse'] },
  { id: 'psykologi_hhx',              navn: 'Psykologi',              profil: 'hhx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['psykologi'] },
  { id: 'filosofi_hhx',               navn: 'Filosofi',               profil: 'hhx', niveauer: ['C'],          status: 'valgfag', alias: ['filosofi'] },
  { id: 'informatik_hhx',             navn: 'Informatik',             profil: 'hhx', niveauer: ['C', 'B'],     status: 'valgfag', alias: ['informatik', 'it'] },
]

/* -------------------------------------------------------------
   Helpers
   ------------------------------------------------------------- */

/**
 * findRegistryMatch — finder den registry-indgang elevens prompt bedst
 * matcher (typisk via et alias). Vægter eksakt-aliasmatch højest.
 *
 * Hvis profileId er givet, prioriteres fag i den profil — men der
 * søges også på tværs af profiler så vi kan opdage cross-profile-spørgsmål.
 */
export function findRegistryMatch(message, profileId) {
  if (!message) return null
  const lower = message.toLowerCase()

  // Først: in-profile match (vægtet højere)
  const inProfile = profileId ? SUBJECT_REGISTRY.filter(s => s.profil === profileId) : []
  const outProfile = profileId ? SUBJECT_REGISTRY.filter(s => s.profil !== profileId) : SUBJECT_REGISTRY

  function bestIn(list, weight) {
    let best = null
    let bestScore = 0
    for (const entry of list) {
      let score = 0
      for (const a of entry.alias) {
        if (lower.includes(a)) score += 3
        else if (a.length >= 5 && lower.includes(a.slice(0, 5))) score += 1
      }
      if (lower.includes(entry.navn.toLowerCase())) score += 4
      if (score > 0) score *= weight
      if (score > bestScore) {
        bestScore = score
        best = entry
      }
    }
    return { match: best, score: bestScore }
  }

  const inResult = bestIn(inProfile, 1.0)
  const outResult = bestIn(outProfile, 0.9)

  // Returner det bedste match (in-profile vinder ved tie)
  if (inResult.score >= outResult.score) {
    return inResult.match
      ? { entry: inResult.match, isInProfile: true, score: inResult.score }
      : (outResult.match
          ? { entry: outResult.match, isInProfile: false, score: outResult.score }
          : null)
  }
  return outResult.match
    ? { entry: outResult.match, isInProfile: false, score: outResult.score }
    : null
}

