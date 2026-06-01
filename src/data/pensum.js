/**
 * pensum.js — den "dybe" pensum-database.
 */

export const SUBJECTS = [
  {
    id: 'dansk_a_stx',
    titel: 'Dansk A',
    profil: 'stx',
    niveau: 'A',
    kortTitel: 'Dansk A — STX',
    farveHint: 'humaniora',
    identifikation: {
      uddannelse: 'stx',
      niveau: 'A',
      bilag: 'Bilag 89 (2017) — revideret som Bilag 89A, december 2025',
      reform: 'Gymnasiereformen 2017; revision 2025',
      senestRevideret: '2025',
    },
    fagligeMaal: [
      'Udtrykke sig præcist, nuanceret og formidlingsbevidst mundtligt, skriftligt såvel som multimodalt',
      'Beherske skriftsprogets normer for korrekthed og anvende grammatiske og stilistiske grundbegreber',
      'Anvende centrale mundtlige fremstillingsformer med formidlingsbevidsthed',
      'Analysere, fortolke og perspektivere fiktive og ikke-fiktive tekster i alle medier',
      'Anvende relevante litterære, sproglige og medieanalytiske begreber og metoder',
      'Demonstrere indblik i sprogets opbygning, brug og funktion samt sprogets historiske udvikling',
      'Demonstrere kendskab til træk af den danske litteraturs historie med fokus på centrale forfatterskaber',
      'Navigere kritisk og analytisk i information i alle medier samt deltage reflekteret i demokratisk debat',
    ],
    kernestof: [
      'Dansksprogede tekster suppleret med norske og svenske tekster på originalsprog',
      'Tekster behandles i et litterært, sprogligt og mediemæssigt perspektiv (vægtning ca. 2:1:1)',
      'Mindst seks værker — heraf roman, digtsamling og dokumentarfilm',
      'Centrale forfatterskaber fra dansk litteraturhistorie',
      'Tekster fra middelalder, renæssance, oplysningstid, romantik, det moderne gennembrud, 1900- og 2000-tallet',
      'Sproglige analyser af tekster fra både nutid og ældre tid',
      'Mediemæssige genrer: nyhedsformidling, dokumentar, sociale medier, levende billeder',
      'Argumentationsanalyse, retorik og kommunikationsanalyse',
      'Fagets metoder: nykritisk, biografisk, ideologikritisk, receptionsanalytisk m.fl.',
    ],
    kompetencer: [
      'Læsekompetence (analytisk og fortolkende)',
      'Skrivekompetence (litterær, debatterende, reflekterende artikel)',
      'Mundtlig fremstillingskompetence',
      'Mediekompetence',
      'Sproglig kompetence (grammatisk og stilistisk)',
    ],
    eksamensform:
      'Skriftlig prøve (5 timer) og mundtlig prøve på baggrund af tekstmateriale; mundtlig eksamination ca. 30 min. med ca. 60 min. forberedelse',
    url: 'https://emu.dk/stx/dansk/laereplan-og-vejledning',
    verificering:
      'Parafraseret fra bilag 89 (2017) og bilag 89A (2025) — ordret formulering bør verificeres mod PDF',
  },
  {
    id: 'historie_a_stx',
    titel: 'Historie A',
    profil: 'stx',
    niveau: 'A',
    kortTitel: 'Historie A — STX',
    farveHint: 'humaniora',
    identifikation: {
      uddannelse: 'stx',
      niveau: 'A',
      bilag: 'Bilag 103A — august 2022',
      reform: 'Gymnasiereformen 2017; revideret 2022',
      senestRevideret: '2022 (vejledning 2024 og 2025)',
    },
    fagligeMaal: [
      'Redegøre for centrale udviklingslinjer og begivenheder i Danmarks, Europas og verdens historie',
      'Redegøre for sammenhænge mellem den lokale, nationale, regionale, europæiske og globale udvikling',
      'Skelne mellem typer af forklaringer på samfundsmæssige forandringer og diskutere periodisering',
      'Reflektere over mennesket som historieskabt og historieskabende',
      'Anvende metodisk-kritisk tilgang til at udvælge og analysere historisk materiale',
      'Opnå indsigt i hvordan historiefaget medvirker til at forstå nutiden',
      'Formulere historiske problemstillinger og relatere dem til egen tid',
      'Formidle og remediere faglige sammenhænge, herunder med digitale medier',
      'Demonstrere viden om fagets identitet og metoder',
    ],
    kernestof: [
      'Hovedlinjer i Danmarks, Europas og verdens historie fra antikken til i dag',
      'Forandringer i levevilkår, teknologi og produktion',
      'Forholdet mellem Europa og resten af verden i kolonial og postkolonial sammenhæng',
      'Stats- og nationsdannelser, herunder Danmarks',
      'Politiske og sociale revolutioner',
      'Demokrati, menneskerettigheder og ligestilling i nationalt og globalt perspektiv',
      'Nationale, regionale og globale konflikter i 1900- og 2000-tallet',
      'Holocaust og andre folkedrab',
      'Ideologiernes kamp i det 20. århundrede',
      'Globalisering og brug af historie',
      'Historiebrug og historisk bevidsthed; historiografi',
    ],
    kompetencer: [
      'Historisk bevidsthed',
      'Kronologi- og sammenhængsforståelse',
      'Kildekritisk og metodisk kompetence',
      'Faglig formidling, mundtligt og skriftligt',
    ],
    eksamensform:
      'Mundtlig prøve på baggrund af ukendt prøvemateriale (3-5 normalsider). Eksamination ca. 30 min., forberedelse ca. 90 min.',
    url: 'https://emu.dk/stx/historie/laereplan-og-vejledning',
    verificering: 'Parafraseret fra bilag 103A (august 2022); verificeret mod vejledning 2025',
  },
  {
    id: 'matematik_b_stx',
    titel: 'Matematik B',
    profil: 'stx',
    niveau: 'B',
    kortTitel: 'Matematik B — STX',
    farveHint: 'naturvidenskab',
    identifikation: {
      uddannelse: 'stx',
      niveau: 'B',
      bilag: 'Bilag 112A — august 2024',
      reform: 'Gymnasiereformen 2017; ny læreplan august 2024',
      senestRevideret: '2024 (vejledning november 2025)',
    },
    fagligeMaal: [
      'Håndtere simple formler og oversætte mellem symbolholdigt og naturligt sprog',
      'Anvende variabelsammenhænge i modellering af data og foretage fremskrivninger',
      'Anvende simple statistiske eller sandsynlighedsteoretiske modeller',
      'Stille spørgsmål karakteristiske for matematik (tankegangskompetence)',
      'Demonstrere viden om matematikkens samspil med kultur, videnskab og teknologi',
      'Demonstrere viden om matematikkens udvikling',
      'Anvende CAS-værktøjer til problemløsning og forståelse',
      'Kommunikere mundtligt og skriftligt med og om matematik',
    ],
    kernestof: [
      'Regningsarternes hierarki, ligningsløsning, uligheder, procent- og rentesregning',
      'Eksponential-, potens- og logaritmefunktioner',
      'Polynomier af 2. grad og rationale funktioner i simple tilfælde',
      'Differentialregning: differentialkvotient, regneregler, monotoniforhold, ekstrema',
      'Anvendelser af differentialregning til optimering',
      'Integralregning: stamfunktion, bestemt integral, areal under graf',
      'Vektorer i to dimensioner: prikprodukt, projektion, linjens og cirklens ligning',
      'Trigonometri: sinus, cosinus, tangens; sinus- og cosinusrelationerne',
      'Statistik: deskriptiv statistik, lineær regression, residualer, korrelation',
      'Sandsynlighedsregning og binomialfordelingen i simple tilfælde',
      'Matematiske beviser og deduktiv struktur',
    ],
    kompetencer: [
      'Tankegangskompetence',
      'Ræsonnements- og bevisførelseskompetence',
      'Modelleringskompetence',
      'Problembehandlingskompetence',
      'Repræsentationskompetence',
      'Symbol- og formalismekompetence',
      'Kommunikationskompetence',
      'Hjælpemiddelkompetence',
    ],
    eksamensform: 'Skriftlig prøve på 4 timer (delprøve 1 uden hjælpemidler, delprøve 2 med alle hjælpemidler)',
    url: 'https://emu.dk/stx/matematik/laereplan-og-vejledning',
    verificering: 'Bilag 112A (august 2024) — verificeret mod vejledning november 2025',
  },
  {
    id: 'teknologi_b_htx',
    titel: 'Teknologi B',
    profil: 'htx',
    niveau: 'B',
    kortTitel: 'Teknologi B — HTX',
    farveHint: 'teknologi',
    identifikation: {
      uddannelse: 'htx',
      niveau: 'B',
      bilag: 'Bilag 81 — august 2017',
      reform: 'Gymnasiereformen 2017',
      senestRevideret: '2017 (vejledning august 2024)',
    },
    fagligeMaal: [
      'Identificere og analysere et teknologisk problem og opstille krav til en løsning',
      'Indsamle, vurdere og anvende information om teknologiske, økonomiske, miljømæssige og samfundsmæssige forhold',
      'Udvikle, designe og fremstille et produkt og dokumentere processen',
      'Vurdere et produkts funktion, kvalitet, brugbarhed og bæredygtighed',
      'Anvende relevante materialer, komponenter og processer i produktudvikling',
      'Kombinere samfundsfaglig, teknisk og naturvidenskabelig viden',
      'Kommunikere et udviklingsforløbs resultater mundtligt, skriftligt og visuelt',
      'Reflektere over teknologiens rolle og konsekvenser i samfundet',
    ],
    kernestof: [
      'Produktudvikling som systematisk og iterativ proces',
      'Faserne: problemidentifikation, problemanalyse, produktprincip, produktudformning, realisering',
      'Indsamling af information om konkurrerende produkter og brugsundersøgelser',
      'Kravspecifikation på baggrund af problemanalyse',
      'Teknisk dokumentation: arbejdstegninger, el-diagrammer, flow-sheets, samlingstegninger, styklister',
      'Materialer og komponenter: egenskaber, opbygning, egnethed',
      'Processer, bearbejdnings- og sammenføjningsmetoder',
      'Softwareelementer (i relevant omfang)',
      'Sammenhæng mellem teknologiske løsninger og samfundsmæssige problemstillinger',
      'Bæredygtighed, miljø og livscyklus',
    ],
    kompetencer: [
      'Innovations- og udviklingskompetence',
      'Praktisk-håndværksmæssig kompetence',
      'Analytisk og refleksiv kompetence',
      'Dokumentations- og formidlingskompetence',
    ],
    eksamensform:
      'Projekteksamen: mundtlig prøve baseret på skriftlig rapport og fremstillet produkt; præsentation og samtale',
    url: 'https://emu.dk/htx/teknologi/laereplan-og-vejledning',
    verificering: 'Bilag 81 (august 2017) — uændret; vejledning opdateret august 2024',
  },
  {
    id: 'fysik_a_htx',
    titel: 'Fysik A',
    profil: 'htx',
    niveau: 'A',
    kortTitel: 'Fysik A — HTX',
    farveHint: 'naturvidenskab',
    identifikation: {
      uddannelse: 'htx',
      niveau: 'A',
      bilag: 'Bilag 59 — august 2017 (synoptisk Fysik B/A)',
      reform: 'Gymnasiereformen 2017',
      senestRevideret: '2017 (vejledning juli 2024)',
    },
    fagligeMaal: [
      'Behandle problemstillinger ved at opstille og anvende fysiske modeller, kvalitativt og kvantitativt',
      'Planlægge, udføre og bearbejde eksperimentelt arbejde, herunder usikkerheder og fejlkilder',
      'Analysere data, herunder med IT-værktøjer, og sammenligne med teoretiske forudsigelser',
      'Anvende fysisk teori til at forklare og forudsige fænomener i hverdag, teknik og natur',
      'Demonstrere viden om centrale fysiske teorier og deres tekniske anvendelse',
      'Formidle fysisk viden mundtligt og skriftligt med korrekt fagsprog',
      'Reflektere over fysikkens muligheder og begrænsninger',
      'Arbejde projektorienteret med fysiske problemstillinger i samspil med andre fag',
    ],
    kernestof: [
      'Mekanik: kinematik, Newtons love, energi, arbejde, effekt, impuls',
      'Bevægelse med konstant hastighed/acceleration; cirkelbevægelse',
      'Termodynamik: temperatur, varmekapacitet, faseovergange, hovedsætninger',
      'Bølgelære: harmonisk svingning, bølgeligningen, interferens, lyd og lys',
      'Elektriske kredsløb: stationære strømme, Ohms lov, effekt',
      'Elektromagnetisme: elektriske og magnetiske felter, induktion',
      'Atomfysik: atomers opbygning, energiniveauer, emission og absorption',
      'Kernefysik: radioaktivitet, henfaldslove, fission og fusion',
      'Den moderne fysiske beskrivelse af universet',
      'Anvendelser i moderne teknologi',
    ],
    kompetencer: [
      'Eksperimentel kompetence',
      'Modelleringskompetence',
      'Repræsentations- og symbolkompetence',
      'Faglig formidlingskompetence',
      'Problemløsnings- og projektkompetence',
    ],
    eksamensform: 'Skriftlig prøve (5 timer) og mundtlig prøve baseret på eksperimentelt arbejde og kendt forløb',
    url: 'https://emu.dk/htx/fysik/laereplan-og-vejledning',
    verificering: 'Synoptisk læreplan Fysik B/A på htx (august 2017); vejledning juli 2024',
  },
  {
    id: 'matematik_a_htx',
    titel: 'Matematik A',
    profil: 'htx',
    niveau: 'A',
    kortTitel: 'Matematik A — HTX',
    farveHint: 'naturvidenskab',
    identifikation: {
      uddannelse: 'htx',
      niveau: 'A',
      bilag: 'Bilag 68A — august 2024',
      reform: 'Gymnasiereformen 2017; ny læreplan august 2024',
      senestRevideret: '2024 (vejledning august 2024)',
    },
    fagligeMaal: [
      'Anvende matematiske begreber og udføre simple ræsonnementer, herunder følge og udføre beviser',
      'Skifte mellem repræsentationer (algebraisk, grafisk, tabelmæssigt og verbalt)',
      'Behandle matematiske problemer med og uden CAS-værktøjer',
      'Anvende grundlæggende algebraiske færdigheder',
      'Opstille, anvende og kritisk vurdere matematiske modeller',
      'Anvende matematik i samspil med teknikfag og naturvidenskabelige fag',
      'Demonstrere viden om matematikkens udvikling og samspil med teknologi',
      'Kommunikere matematik mundtligt og skriftligt med korrekt fagsprog',
    ],
    kernestof: [
      'Funktioner: lineære, polynomielle, eksponentielle, potens, logaritmiske og trigonometriske',
      'Differentialregning: regneregler, kæderegel, produkt-/kvotientregel, monotoniforhold, optimering',
      'Integralregning: stamfunktion, bestemt og ubestemt integral, integration ved substitution; areal og volumen',
      'Differentialligninger: 1. ordens lineære og separable; Eulers metode, linjeelementer',
      'Vektorer i plan og rum: prikprodukt, krydsprodukt, linjer, planer, kugler',
      'Vektorfunktioner: tangent-, hastigheds- og accelerationsvektorer',
      'Statistik og sandsynlighed: deskriptiv statistik, normalfordeling, lineær regression',
      'Komplekse tal i grundtræk',
      'Numerisk metodik og brug af CAS',
      'Matematisk modellering i tekniske og naturvidenskabelige sammenhænge',
    ],
    kompetencer: [
      'Tankegangs-, ræsonnements- og bevisførelseskompetence',
      'Modellerings- og problembehandlingskompetence',
      'Repræsentations-, symbol- og formalismekompetence',
      'Kommunikationskompetence',
      'Hjælpemiddelkompetence',
    ],
    eksamensform: 'Skriftlig prøve på 5 timer (delprøve uden og med hjælpemidler) samt mundtlig prøve',
    url: 'https://emu.dk/htx/matematik/laereplan-og-vejledning',
    verificering: 'Bilag 68A (august 2024) — verificeret mod vejledning',
  },
  {
    id: 'afsaetning_a_hhx',
    titel: 'Afsætning A',
    profil: 'hhx',
    niveau: 'A',
    kortTitel: 'Afsætning A — HHX',
    farveHint: 'samfundsvidenskab',
    identifikation: {
      uddannelse: 'hhx',
      niveau: 'A',
      bilag: 'Bilag 22 — august 2017',
      reform: 'Gymnasiereformen 2017',
      senestRevideret: '2017 (vejledning august 2024); forsøgsprøve med projekteksamen 2026',
    },
    fagligeMaal: [
      'Anvende afsætningsøkonomisk teori til at analysere virksomheders interne og eksterne forhold',
      'Analysere købsadfærd på B2B-, B2C-, C2B- og C2C-markeder',
      'Indsamle, bearbejde og vurdere kvalitative og kvantitative markedsdata',
      'Anvende segmenterings-, målgruppe- og positioneringsmodeller',
      'Udarbejde og vurdere strategiske og taktiske marketingplaner nationalt og internationalt',
      'Analysere internationaliseringsmuligheder og -strategier',
      'Vurdere og foreslå konkrete handlingsplaner',
      'Formidle afsætningsøkonomiske analyser mundtligt og skriftligt',
    ],
    kernestof: [
      'Virksomhedens interne forhold: idégrundlag, mission, vision, strategi, værdikæde',
      'Virksomhedens eksterne forhold: makro- og mikroforhold, brancheanalyse',
      'Købsadfærd på B2B-, B2C-, C2B- og C2C-markeder',
      'Markedsanalyse: kvalitative og kvantitative metoder',
      'Segmentering, målgruppevalg og positionering',
      'Marketingmix (de 7 P\'er)',
      'Brand og branding',
      'Strategisk og taktisk marketingplanlægning',
      'Internationalisering: markedsudvælgelse, indtrængningsstrategier, kulturelle forhold',
      'Markedsføringsetik, bæredygtighed og samfundsansvar (CSR)',
      'Måling af marketingeffektivitet (ROMI), profitabilitetsanalyse',
      'Digital marketing',
    ],
    kompetencer: [
      'Afsætningsøkonomisk analysekompetence',
      'Innovations- og handlekompetence',
      'Metodekompetence (kvalitativ og kvantitativ)',
      'Formidlings- og kommunikationskompetence',
      'Internationalt og interkulturelt udsyn',
    ],
    eksamensform:
      'Skriftlig prøve (5 timer) på baggrund af casemateriale og mundtlig prøve baseret på afsluttende forløb',
    url: 'https://emu.dk/hhx/afsaetning/laereplan-og-vejledning',
    verificering: 'Bilag 22 (august 2017); vejledning august 2024',
  },
  {
    id: 'virksomhedsoekonomi_b_hhx',
    titel: 'Virksomhedsøkonomi B',
    profil: 'hhx',
    niveau: 'B',
    kortTitel: 'Virksomhedsøkonomi B — HHX',
    farveHint: 'samfundsvidenskab',
    identifikation: {
      uddannelse: 'hhx',
      niveau: 'B',
      bilag: 'Bilag 50 — august 2017',
      reform: 'Gymnasiereformen 2017',
      senestRevideret: '2017 (vejledning juni 2024)',
    },
    fagligeMaal: [
      'Identificere, formulere og analysere virksomhedsøkonomiske problemstillinger',
      'Anvende virksomhedsøkonomisk teori og metode til økonomisk analyse',
      'Udarbejde og fortolke regnskabs- og nøgletalsanalyser',
      'Udarbejde og anvende budgetter og budgetkontrol',
      'Vurdere investerings- og finansieringsalternativer',
      'Vurdere bæredygtighedsaspekter og samfundsansvar',
      'Anvende digitale værktøjer (regneark m.m.)',
      'Formidle virksomhedsøkonomiske analyser mundtligt og skriftligt',
    ],
    kernestof: [
      'Virksomhedens økonomiske styring og forretningsmodel',
      'Opstart af virksomhed: idégrundlag, etableringsbudget, finansieringsbudget, resultat- og likviditetsbudget',
      'Pris- og omkostningskalkulation',
      'Årsrapporten: formål, struktur, regnskabsklasser',
      'Resultatopgørelse, balance og noter',
      'Virksomhedsanalyse — strategisk og finansiel',
      'Regnskabsanalyse: rentabilitet, indtjeningsevne, kapitaltilpasning, soliditet',
      'Indtægts- og omkostningsanalyse',
      'Logistik og aktivitetsplanlægning',
      'Investering og investeringskalkulation (kapitalværdimetoden)',
      'Budgettering og budgetkontrol',
      'Bæredygtighed og CSR i et virksomhedsøkonomisk perspektiv',
    ],
    kompetencer: [
      'Virksomhedsøkonomisk analyse- og vurderingskompetence',
      'Strukturel og målrettet problemløsningskompetence',
      'Innovativ tilgang til økonomiske udfordringer',
      'PBL-baseret arbejdskompetence',
      'Formidlingskompetence',
    ],
    eksamensform: 'Mundtlig prøve på baggrund af ukendt casemateriale (B-niveau)',
    url: 'https://emu.dk/hhx/virksomhedsoekonomi/laereplan-og-vejledning',
    verificering: 'Bilag 50 (august 2017); vejledning juni 2024',
  },
  {
    id: 'international_oekonomi_b_hhx',
    titel: 'International økonomi B',
    profil: 'hhx',
    niveau: 'B',
    kortTitel: 'International økonomi B — HHX',
    farveHint: 'samfundsvidenskab',
    identifikation: {
      uddannelse: 'hhx',
      niveau: 'B',
      bilag: 'Bilag 32 — august 2017',
      reform: 'Gymnasiereformen 2017',
      senestRevideret: '2017 (vejledning august 2024)',
    },
    fagligeMaal: [
      'Anvende økonomisk teori til at analysere samfundsøkonomiske problemstillinger',
      'Redegøre for centrale makroøkonomiske nøgletal',
      'Analysere konjunkturudvikling, vækst og strukturelle ændringer',
      'Analysere virksomheders og husholdningers beslutninger på markedet',
      'Vurdere effekter af økonomisk politik (finans-, penge-, valutakurs- og strukturpolitik)',
      'Analysere globaliseringens og den internationale handels betydning',
      'Anvende kvalitative og kvantitative metoder',
      'Formidle samfundsøkonomiske analyser mundtligt og skriftligt',
    ],
    kernestof: [
      'Virksomheders og husholdningers beslutninger på markedet (mikroøkonomi)',
      'Makroøkonomiske nøgletal: BNP, vækst, inflation, ledighed, betalingsbalance',
      'Det økonomiske kredsløb i en åben økonomi',
      'Konjunkturudvikling og konjunkturteori',
      'Vækst, produktivitet og konkurrenceevne',
      'Økonomisk politik: finans-, penge-, valutakurs- og strukturpolitik',
      'Økonomiske skoler (klassisk/keynesiansk perspektiv)',
      'International handelsteori (komparative fordele, told, frihandel, EU\'s indre marked)',
      'Globalisering og institutioner (EU, WTO, IMF)',
      'Bæredygtig udvikling og økonomi',
      'Kvalitative og kvantitative metoder',
    ],
    kompetencer: [
      'Samfundsøkonomisk analysekompetence (mikro og makro)',
      'Metodekompetence (kvalitativ og kvantitativ)',
      'Vurderings- og handlingskompetence',
      'Formidlingskompetence',
      'Internationalt udsyn og demokratisk dannelse',
    ],
    eksamensform: 'Mundtlig prøve på baggrund af eksamensprojekt (problemorienteret undersøgelse), ca. 30 min.',
    url: 'https://emu.dk/hhx/international-oekonomi/laereplan-og-vejledning',
    verificering: 'Bilag 32 (august 2017); vejledning august 2024',
  },
]

/* -------------------------------------------------------------
   Helpers
   ------------------------------------------------------------- */

export function getSubjectsByProfile(profileId) {
  return SUBJECTS.filter(s => s.profil === profileId)
}

export function getSubjectById(id) {
  return SUBJECTS.find(s => s.id === id) ?? null
}

/**
 * findRelevantKernestof — simpel keyword-baseret retrieval.
 * Bruges af AI-motoren til at "ground'e" svar i pensum (ikke vektor-søgning,
 * men tilstrækkelig til prototypen og fuldstændig deterministisk).
 */
export function findRelevantKernestof(subjectId, query, limit = 3) {
  const subject = getSubjectById(subjectId)
  if (!subject) return []

  const q = query.toLowerCase()
  const tokens = q.split(/\s+/).filter(t => t.length >= 3)

  const scored = subject.kernestof.map((emne, idx) => {
    const lower = emne.toLowerCase()
    let score = 0
    for (const t of tokens) {
      if (lower.includes(t)) score += 2
      // Delvis match — de første 4 tegn
      else if (t.length >= 4 && lower.includes(t.slice(0, 4))) score += 1
    }
    return { emne, idx, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => ({ titel: s.emne, indeks: s.idx, subject: subject.titel }))
}

export function findRelevantFagligeMaal(subjectId, query, limit = 2) {
  const subject = getSubjectById(subjectId)
  if (!subject) return []

  const q = query.toLowerCase()
  const tokens = q.split(/\s+/).filter(t => t.length >= 3)

  const scored = subject.fagligeMaal.map((maal, idx) => {
    const lower = maal.toLowerCase()
    let score = 0
    for (const t of tokens) {
      if (lower.includes(t)) score += 2
    }
    return { maal, idx, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => ({ titel: s.maal, indeks: s.idx }))
}
