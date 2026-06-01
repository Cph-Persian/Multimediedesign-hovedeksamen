/**
 * concepts.js — kurateret bibliotek over de mest stillede elev-spørgsmål.
 */

export const CONCEPTS = [
  /* =========================================================
     STX — Dansk A
     ========================================================= */
  {
    id: 'argumentationsanalyse',
    subjectIds: ['dansk_a_stx'],
    triggers: ['argumentationsanalyse', 'toulmin', 'argumentation', 'argumenter', 'argument'],
    titel: 'Argumentationsanalyse (Toulmin-modellen)',
    definition:
      '**Argumentationsanalyse** er en systematisk gennemgang af hvordan en afsender forsøger at overbevise en modtager. Den mest brugte model i dansk er **Toulmin-modellen**, der opdeler ethvert argument i seks elementer.',
    formula:
      '**Påstand** ← *(støttes af)* — **Belæg** ← *(forbindes via)* — **Hjemmel**\n\n*(yderligere)* **Rygdækning · Styrkemarkør · Gendrivelse**',
    forklaring:
      'Påstanden er det afsenderen vil have dig til at acceptere. Belægget er den evidens der støtter påstanden. Hjemlen er den underforståede regel der binder belæg til påstand sammen — og det er ofte i hjemlen at en argumentation kan kritiseres. Rygdækning bakker hjemlen op, styrkemarkøren angiver hvor sikker afsenderen er, og gendrivelsen er afsenderens egen forbehold.',
    eksempel:
      'Generelt eksempel: "Vi bør indføre vegetarisk skolemad (**påstand**), fordi en stor undersøgelse viser at unge får for meget mættet fedt (**belæg**) — og skolen har ansvar for elevernes sundhed (**hjemmel**)."',
    ledendeSporgsmal:
      'Hvilket af de seks Toulmin-elementer er ofte det skjulte i den tekst du arbejder med — og hvorfor tror du afsenderen ikke siger det direkte?',
    kernestofRefs: [7],
  },
  {
    id: 'fortaellertyper',
    subjectIds: ['dansk_a_stx'],
    triggers: ['fortæller', 'fortaeller', 'førsteperson', 'tredjeperson', '3.person', '1.person', 'alvidende', 'personbunden'],
    titel: 'Fortællertyper',
    definition:
      'Fortælleren er den instans der formidler historien. I dansk skelner vi typisk mellem **1.-personsfortæller**, **3.-personsfortæller (personbunden)** og **3.-personsfortæller (alvidende)**.',
    forklaring:
      '1.-personsfortælleren er en del af handlingen og bruger "jeg" — vi får adgang til netop dén persons tanker, men er afhængige af deres pålidelighed. 3.-personsfortælleren personbunden bruger "han/hun" og er bundet til én karakters bevidsthed. 3.-personsfortælleren alvidende kan se ind i flere karakterers tanker og overskue tid og sted ud over personernes egen viden.',
    eksempel:
      'En **upålidelig fortæller** er en særligt vigtig 1.-personstype: læseren får signaler om at fortællerens version af virkeligheden ikke kan stoles på (selvbedrag, manipulerende, barn der ikke forstår alt).',
    ledendeSporgsmal:
      'Hvilken fortællertype er der i din tekst — og hvad opnår forfatteren ved netop det valg?',
    kernestofRefs: [3, 8],
  },
  {
    id: 'litteraere_perioder',
    subjectIds: ['dansk_a_stx'],
    triggers: ['romantik', 'modernisme', 'oplysningstid', 'realisme', 'naturalisme', 'periode', 'litteraturhistorie', 'det moderne gennembrud'],
    titel: 'Litterære perioder i dansk',
    definition:
      'Dansk litteraturhistorie inddeles i perioder med hver deres menneske- og verdenssyn. De vigtigste i pensum er **oplysningstid (ca. 1700-1800)**, **romantik (ca. 1800-1870)**, **det moderne gennembrud (1870-1900)**, **modernisme (1900-)**, og **postmodernisme (sidste del af 1900-tallet)**.',
    forklaring:
      'Hver periode kan kendetegnes ved tre ting: menneskesyn (er mennesket fornuftigt, naturligt, fragmenteret?), verdenssyn (er verden ordnet af Gud, naturen, kaos?), og typiske formgreb. Når du periode-bestemmer en tekst, skal du argumentere ud fra hvilke af disse tre der dominerer — ikke kun ud fra årstallet.',
    eksempel:
      'En tekst med fragmenteret form, isolerede individer og en følelse af meningstab peger mod **modernismen** — selv hvis den er skrevet i 1960. Periodisering handler om holdning, ikke kalender.',
    ledendeSporgsmal:
      'Hvilken af de tre — menneskesyn, verdenssyn eller form — vil du bruge som primær argument for periodebestemmelse i din tekst?',
    kernestofRefs: [4],
  },
  {
    id: 'stilistiske_virkemidler',
    subjectIds: ['dansk_a_stx'],
    triggers: ['stilistisk', 'virkemidler', 'metafor', 'allegori', 'symbol', 'gentagelse', 'kontrast', 'besjæling'],
    titel: 'Stilistiske virkemidler',
    definition:
      'Stilistiske virkemidler er sproglige greb der skaber betydning ud over det bogstavelige. De vigtigste i pensum er **metafor**, **lignelse**, **personifikation/besjæling**, **kontrast**, **gentagelse**, **symbol** og **ironi**.',
    forklaring:
      'Når du analyserer virkemidler, skal du altid gøre to ting: (1) identificere virkemidlet og navngive det præcist, og (2) forklare HVAD det gør i teksten — altså hvilken effekt eller betydning det skaber. Det er anden del der adskiller en god analyse fra en opremsning.',
    eksempel:
      'En **kontrast** mellem "lyset" og "mørket" gør sjældent kun noget visuelt — den signalerer typisk en tematisk modsætning som fx håb/fortvivlelse eller viden/uvidenhed.',
    ledendeSporgsmal:
      'Vælg ét virkemiddel i din tekst: hvad ville teksten miste hvis lige netop dét virkemiddel blev fjernet?',
    kernestofRefs: [5, 7],
  },

  /* =========================================================
     STX — Historie A
     ========================================================= */
  {
    id: 'kildekritik',
    subjectIds: ['historie_a_stx'],
    triggers: ['kildekritik', 'kilde', 'troværdighed', 'førstehånd', 'andenhånd', 'kildetype'],
    titel: 'Kildekritik',
    definition:
      '**Kildekritik** er den systematiske vurdering af en histori­sk kildes brugbarhed og troværdighed. Den følger to spor: den **ydre kildekritik** (hvem, hvornår, hvor, i hvilken form) og den **indre kildekritik** (hvad siger kilden, og kan den stoles på).',
    formula:
      '**Ophav** → **Tendens** → **Førsteh./andenh.** → **Bruges som beretning eller levn?**',
    forklaring:
      'Hver kilde har et ophav (afsender og kontekst), en tendens (afsenderens hensigt og bias), og en distance til begivenheden (førstehånds- eller andenhåndskilde). Den vigtigste skelnen er **beretning vs. levn**: en beretning bruges som vidnesbyrd om hvad der skete; et levn bruges som spor af afsenderens egen tid og holdning. Samme tekst kan være begge dele afhængigt af spørgsmålet.',
    eksempel:
      'En propagandaplakat fra 1940 er sjældent en pålidelig **beretning** om krigens forløb, men den er et fremragende **levn** der fortæller om afsenderens budskab og selvopfattelse.',
    ledendeSporgsmal:
      'Bruger du din kilde som beretning eller levn — og hvilket spørgsmål stiller du den?',
    kernestofRefs: [10],
  },
  {
    id: 'periodisering',
    subjectIds: ['historie_a_stx'],
    triggers: ['periodisering', 'periode', 'epoke', 'inddeling'],
    titel: 'Periodisering',
    definition:
      '**Periodisering** er at inddele historien i meningsfulde tidsafsnit. Det er ikke en neutral handling — valg af periodegrænser er en faglig fortolkning der fremhæver bestemte forandringer som vigtigere end andre.',
    forklaring:
      'Forskellige periodiseringsprincipper giver forskellige historier. Politisk periodisering bruger regenter eller statsformer; økonomisk periodisering bruger produktionsmåder; kulturel periodisering bruger ide- og mentalitetsskift. Når du vælger en periodisering, skal du kunne forsvare hvorfor den belyser dit problem bedre end alternativerne.',
    eksempel:
      'Skal vi se Berlinmurens fald (1989) som **enden** på den kolde krig, eller som **starten** på en ny verdensorden? Begge er gyldige — de besvarer bare to forskellige spørgsmål.',
    ledendeSporgsmal:
      'Hvilket periodiseringsprincip passer bedst til det spørgsmål du undersøger — og hvad fremhæver det, som andre principper ville skjule?',
    kernestofRefs: [2],
  },
  {
    id: 'historiebrug',
    subjectIds: ['historie_a_stx'],
    triggers: ['historiebrug', 'historisk bevidsthed', 'erindring', 'mindekultur'],
    titel: 'Historiebrug og historisk bevidsthed',
    definition:
      '**Historiebrug** er den måde fortiden anvendes i nutiden — til at legitimere magt, danne identitet, eller fremme et politisk projekt. **Historisk bevidsthed** er evnen til at forstå sig selv som historieskabt og historieskabende.',
    forklaring:
      'Historiebrug findes i alt fra museer og mindesmærker til politiske taler og film. Centralt er at fortiden ikke bare er — den **bruges**. Når du analyserer historiebrug, skal du spørge: hvem bruger fortiden, hvilken fortid vælges, hvilke fortider udelades, og hvilket nutidigt formål tjener brugen?',
    eksempel:
      'En statsledelse der fremhæver "vores stolte krigerfortid" gør det sjældent for fortidens skyld — det gør de for at legitimere en bestemt nutidig politik. Det er klassisk **politisk historiebrug**.',
    ledendeSporgsmal:
      'Hvilken fortid er det der bruges i dit kildemateriale, og hvilken fortid bliver tilsvarende skubbet ud af billedet?',
    kernestofRefs: [10],
  },

  /* =========================================================
     STX — Matematik B
     ========================================================= */
  {
    id: 'andengradsligning',
    subjectIds: ['matematik_b_stx', 'matematik_a_htx'],
    triggers: ['andengradsligning', 'kvadratisk ligning', 'andengradsformlen', 'discriminant', 'diskriminant', '2. grad', 'andengrad'],
    titel: 'Andengradsligning',
    definition:
      'En **andengradsligning** er en ligning hvor den højeste potens af den ubekendte er 2. Den standardform du arbejder med på B-niveau er $ax^2 + bx + c = 0$, hvor $a \\ne 0$.',
    formula:
      '$$ax^2 + bx + c = 0 \\quad\\Longrightarrow\\quad x = \\frac{-b \\pm \\sqrt{d}}{2a}, \\quad d = b^2 - 4ac$$',
    forklaring:
      'Konstanterne $a$, $b$ og $c$ kaldes **koefficienter**: $a$ er koefficienten på $x^2$-leddet, $b$ er på $x$-leddet, og $c$ er konstantleddet. **Diskriminanten** $d = b^2 - 4ac$ afgør antallet af løsninger — er $d > 0$ er der to løsninger, $d = 0$ giver én (en dobbeltrod), og $d < 0$ giver ingen reelle løsninger. Selve løsningsmetoden hedder **andengradsformlen** (eller "den store formel").',
    eksempel:
      'Den generelle fremgang er: (1) skriv ligningen på standardform, (2) aflæs $a, b, c$, (3) beregn $d$, (4) afgør antallet af løsninger ud fra $d$, (5) indsæt i formlen hvis $d \\ge 0$.',
    ledendeSporgsmal:
      'Passer det her til den ligning du arbejder med — eller skal vi se nærmere på, hvordan du finder diskriminanten i dit eget tilfælde?',
    kernestofRefs: [0, 2],
  },
  {
    id: 'differentialregning',
    subjectIds: ['matematik_b_stx', 'matematik_a_htx'],
    triggers: ['differentialregning', 'differentier', 'differentialkvotient', 'afledet', 'tangenthældning', 'monotoni', 'ekstrema'],
    titel: 'Differentialregning',
    definition:
      '**Differentialregning** handler om hastigheden af forandring. **Differentialkvotienten** $f\'(x)$ er hældningen af tangenten til grafen for $f$ i punktet $x$ — altså hvor stejlt funktionen vokser eller aftager netop dér.',
    formula:
      '$$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$\n\n**Centrale regneregler:** $(f+g)\' = f\' + g\'$, $(c \\cdot f)\' = c \\cdot f\'$, $(f \\cdot g)\' = f\' g + f g\'$, $\\big(f(g(x))\\big)\' = f\'(g(x)) \\cdot g\'(x)$ (kæderegel).',
    forklaring:
      'Den afledede bruges til at bestemme **monotoniforhold** ($f\'(x) > 0 \\Rightarrow$ voksende; $f\'(x) < 0 \\Rightarrow$ aftagende) og **lokale ekstrema** (kandidater er punkter hvor $f\'(x) = 0$). I anvendelsesopgaver — fx optimering — er trinene typisk: opstil funktionen, differentier, find $x$ hvor $f\'(x)=0$, og verificér at det er et maksimum/minimum.',
    eksempel:
      'For $f(x) = x^2$ er $f\'(x) = 2x$. Dvs. tangenthældningen vokser lineært med $x$ — et udtryk for at parablen krummer mere og mere udad.',
    ledendeSporgsmal:
      'Vil du gerne se, hvordan vi finder ekstrema, eller skal vi gennemgå kædereglen først til en sammensat funktion?',
    kernestofRefs: [3, 4],
  },
  {
    id: 'integralregning',
    subjectIds: ['matematik_b_stx', 'matematik_a_htx'],
    triggers: ['integral', 'integrer', 'stamfunktion', 'areal under graf', 'bestemt integral'],
    titel: 'Integralregning',
    definition:
      '**Integralregning** er differentialregningens omvendte operation. En **stamfunktion** $F$ til $f$ er en funktion hvor $F\'(x) = f(x)$. **Det bestemte integral** $\\int_a^b f(x) \\, dx$ måler det fortegns-betonede areal mellem grafen og $x$-aksen fra $a$ til $b$.',
    formula:
      '$$\\int_a^b f(x) \\, dx = F(b) - F(a) \\quad\\text{(infinitesimalregningens hovedsætning)}$$',
    forklaring:
      'Det ubestemte integral $\\int f(x)\\, dx = F(x) + k$ leverer alle stamfunktioner (konstanten $k$ kan være vilkårlig). Det bestemte integral giver et tal — typisk et areal eller en akkumuleret størrelse. Bemærk at "areal under grafen" tæller med fortegn: dele af grafen under $x$-aksen bidrager negativt.',
    eksempel:
      'For $f(x) = x$ er $F(x) = \\tfrac{1}{2}x^2 + k$. Det bestemte integral $\\int_0^2 x\\, dx = F(2) - F(0) = 2$.',
    ledendeSporgsmal:
      'Skal vi se på, hvordan man bruger integralet til at finde et areal mellem to grafer — eller fokuserer du på selve regnereglerne?',
    kernestofRefs: [5],
  },
  {
    id: 'vektorer_2d',
    subjectIds: ['matematik_b_stx'],
    triggers: ['vektor', 'prikprodukt', 'projektion', 'ortogonal', 'cosinusrelation', 'sinusrelation'],
    titel: 'Vektorer i to dimensioner',
    definition:
      'En **vektor** er en størrelse med både retning og længde. I planet skrives en vektor som $\\vec{v} = (v_1, v_2)$. **Prikproduktet** mellem to vektorer er et tal: $\\vec{a} \\cdot \\vec{b} = a_1 b_1 + a_2 b_2$.',
    formula:
      '$$\\vec{a} \\cdot \\vec{b} = |\\vec{a}|\\,|\\vec{b}|\\cos\\theta, \\qquad |\\vec{v}| = \\sqrt{v_1^2 + v_2^2}$$',
    forklaring:
      'Prikproduktet bruges til to ting i pensum: at finde **vinklen** mellem to vektorer, og at afgøre om de er **ortogonale** ($\\vec{a} \\cdot \\vec{b} = 0$ præcis når $\\vec{a} \\perp \\vec{b}$). Linjens ligning på normalform i planet udnytter netop ortogonalitet: $a(x - x_0) + b(y - y_0) = 0$, hvor $(a,b)$ er en normalvektor.',
    eksempel:
      'Generel fremgang: For at finde vinklen mellem to vektorer, beregn $\\vec{a} \\cdot \\vec{b}$, beregn $|\\vec{a}|$ og $|\\vec{b}|$, og isolér $\\cos\\theta$.',
    ledendeSporgsmal:
      'Arbejder du med vinkler, projektioner, eller en linjes ligning — hvor vil du gerne have eksempler først?',
    kernestofRefs: [6],
  },
  {
    id: 'eksponentialfunktion',
    subjectIds: ['matematik_b_stx', 'matematik_a_htx'],
    triggers: ['eksponentialfunktion', 'eksponentiel', 'fremskrivning', 'vækstrate', 'halveringstid', 'fordoblingstid'],
    titel: 'Eksponentialfunktion',
    definition:
      'En **eksponentialfunktion** er en funktion på formen $f(x) = b \\cdot a^x$, hvor $a > 0$ og $a \\ne 1$ er **fremskrivningsfaktoren** og $b = f(0)$ er begyndelsesværdien.',
    formula:
      '$$f(x) = b \\cdot a^x \\quad\\text{med}\\quad a = 1 + r \\quad\\text{(}r = \\text{vækstrate)}$$',
    forklaring:
      'Eksponentielle modeller beskriver fænomener hvor ændringen er proportional med selve størrelsen — fx renteopsparing, befolkningstilvækst og radioaktivt henfald. **Fordoblingstiden** $T_2$ findes via $a^{T_2} = 2 \\Leftrightarrow T_2 = \\frac{\\ln 2}{\\ln a}$, og **halveringstiden** $T_{1/2} = \\frac{\\ln(1/2)}{\\ln a}$.',
    eksempel:
      'En vækstrate på 5 % pr. år giver $a = 1{,}05$. Modellen $f(x) = 100 \\cdot 1{,}05^x$ beskriver da en størrelse der starter ved 100 og vokser med 5 % pr. tidsenhed.',
    ledendeSporgsmal:
      'Vil du anvende den her på en konkret model — eller starte med at forstå hvorfor fordoblingstiden ikke afhænger af begyndelsesværdien?',
    kernestofRefs: [1],
  },

  /* =========================================================
     HTX — Teknologi B
     ========================================================= */
  {
    id: 'designprocessen',
    subjectIds: ['teknologi_b_htx'],
    triggers: ['designprocess', 'iterativ', 'produktudvikling', 'designforløb'],
    titel: 'Designprocessen',
    definition:
      '**Designprocessen** i Teknologi B er en **systematisk og iterativ** model for produktudvikling. Den består af seks faser, men de gennemløbes sjældent én gang i en lige linje — du springer ofte tilbage når du opdager nye krav.',
    formula:
      '**Problemidentifikation → Problemanalyse → Produktprincip → Produktudformning → Produktionsforberedelse → Realisering**',
    forklaring:
      'Det centrale ord er **iterativ**: hver fase kan tvinge dig tilbage. Når du fx i produktudformningen opdager at materialet ikke holder, skal du tilbage til produktprincippet. Det er ikke en fejl — det er metoden. I rapporten skal du dokumentere både hvad du gjorde, og hvorfor (begrundelser i form af brugerundersøgelser, krav, beregninger).',
    eksempel:
      'Generel fremgang: Start med problemidentifikation og kravspecifikation FØR du springer til produktprincip — det er den hyppigste fejl, og den er svær at rette senere.',
    ledendeSporgsmal:
      'Hvilken fase er du i nu i din egen proces, og hvilken iteration kunne være nyttig at gå tilbage til?',
    kernestofRefs: [0, 1, 3],
  },
  {
    id: 'kravspecifikation',
    subjectIds: ['teknologi_b_htx'],
    triggers: ['kravspecifikation', 'krav', 'brugerkrav', 'funktionskrav'],
    titel: 'Kravspecifikation',
    definition:
      '**Kravspecifikationen** er den dokumenterede liste over hvad produktet skal kunne. Krav skal være **målbare** — ellers kan du ikke vurdere om dit endelige produkt opfylder dem.',
    forklaring:
      'Krav inddeles typisk i funktionskrav (hvad produktet gør), brugerkrav (hvordan brugeren oplever det), produktionskrav (hvordan det fremstilles), og myndighedskrav (lov/standard). Hvert krav skal have en kilde — fx en brugerundersøgelse, en standard eller en samtale med en interessent.',
    eksempel:
      '"Produktet skal være let at bruge" er IKKE et krav — det er en hensigt. "Produktet skal kunne anvendes uden instruktion af 9 ud af 10 brugere i en brugertest" ER et krav, fordi det er målbart.',
    ledendeSporgsmal:
      'Tag ét af dine egne krav: er det målbart, og hvilken kilde kan du dokumentere det med?',
    kernestofRefs: [3],
  },

  /* =========================================================
     HTX — Fysik A
     ========================================================= */
  {
    id: 'newtons_love',
    subjectIds: ['fysik_a_htx'],
    triggers: ['newtons love', 'newtons 1', 'newtons 2', 'newtons 3', 'inertiens lov', 'kraft', 'aktion reaktion'],
    titel: 'Newtons love',
    definition:
      '**Newtons tre love** er fundamentet for klassisk mekanik. De forbinder kraft, masse og bevægelse — og er stadig den korrekte beskrivelse for alt der ikke nærmer sig lysets hastighed.',
    formula:
      '**1. Inertiens lov**: $\\sum \\vec{F} = 0 \\Leftrightarrow \\vec{a} = 0$\n\n**2. Kraftloven**: $\\vec{F}_{net} = m \\vec{a}$\n\n**3. Aktion = reaktion**: $\\vec{F}_{A\\to B} = -\\vec{F}_{B \\to A}$',
    forklaring:
      '1. lov siger at en genstand fortsætter sin bevægelse uændret hvis ingen netto-kraft virker. 2. lov er den vigtigste i opgaver: accelerationen er proportional med den samlede kraft og omvendt proportional med massen. 3. lov forklarer hvorfor du ikke kan presse på noget uden også selv at blive presset på — hver kraft har en lige stor og modsat reaktion.',
    eksempel:
      'I en frit fald-opgave virker kun tyngdekraften: $F_{tyngde} = mg \\Rightarrow a = g \\approx 9{,}82\\,\\mathrm{m/s^2}$. Tilføjer du luftmodstand, skal du lægge den modsatrettede kraft til den samlede $F_{net}$.',
    ledendeSporgsmal:
      'Hvilke kræfter virker på det objekt du arbejder med — og er du sikker på at du har dem alle med?',
    kernestofRefs: [0],
  },
  {
    id: 'energibevarelse',
    subjectIds: ['fysik_a_htx'],
    triggers: ['energibevarelse', 'energi', 'mekanisk energi', 'kinetisk', 'potentiel'],
    titel: 'Energibevarelse',
    definition:
      '**Energibevarelse** er princippet om at den samlede energi i et lukket system er konstant. Energi kan omdannes mellem former — kinetisk, potentiel, indre — men den kan ikke skabes eller forsvinde.',
    formula:
      '$$E_{kin} = \\tfrac{1}{2} m v^2, \\quad E_{pot} = m g h, \\quad E_{kin} + E_{pot} = \\text{konstant (uden friktion)}$$',
    forklaring:
      'I mekaniske systemer uden friktion gælder: faldende potentiel energi = stigende kinetisk energi. Med friktion bliver en del af den mekaniske energi til indre energi (varme), og du skal regne arbejdet udført af friktionen ind. Energiprincippet er ofte hurtigere end Newtons love til problemer med start- og sluthastigheder.',
    eksempel:
      'En slæde der glider 2 m ned ad en glat skråning omdanner $E_{pot} = m g h$ til $E_{kin} = \\tfrac{1}{2} m v^2$ — og slutfarten kan udregnes uden at kende skråningens vinkel.',
    ledendeSporgsmal:
      'Er dit system med eller uden friktion — og hvor mange energiformer er involveret undervejs?',
    kernestofRefs: [0],
  },

  /* =========================================================
     HTX — Matematik A
     ========================================================= */
  {
    id: 'differentialligning',
    subjectIds: ['matematik_a_htx'],
    triggers: ['differentialligning', 'separabel', 'lineær diff', 'eulers metode', 'linjeelement'],
    titel: 'Differentialligninger',
    definition:
      'En **differentialligning** er en ligning hvor den ubekendte er en funktion, og hvor funktionens afledede indgår. På HTX A arbejder vi især med **1. ordens lineære** og **separable** differentialligninger.',
    formula:
      '**Lineær 1. orden**: $y\' + p(x) y = q(x)$\n\n**Separabel**: $\\dfrac{dy}{dx} = g(x) h(y)$ — løses ved $\\int \\frac{1}{h(y)} dy = \\int g(x) dx$',
    forklaring:
      'Den **fuldstændige løsning** indeholder en konstant $k$ — det er en hel familie af løsninger. En **partikulær løsning** vælges ved at indsætte en kendt værdi (en begyndelsesbetingelse). Når en analytisk løsning ikke findes, bruger vi numeriske metoder som **Eulers metode**: $y_{n+1} = y_n + h \\cdot f(x_n, y_n)$.',
    eksempel:
      'Generel fremgang for separabel: Adskil $y$ og $x$, integrer begge sider, isolér $y$, brug evt. begyndelsesbetingelsen til at finde konstanten.',
    ledendeSporgsmal:
      'Er din ligning separabel, lineær, eller skal vi bruge Euler — og hvad er begyndelsesbetingelsen?',
    kernestofRefs: [3],
  },
  {
    id: 'vektorer_3d',
    subjectIds: ['matematik_a_htx'],
    triggers: ['krydsprodukt', 'vektorprodukt', 'plan', 'normalvektor', 'rumvektor', 'vektor i rum'],
    titel: 'Vektorer i rummet',
    definition:
      'I rummet skrives en vektor som $\\vec{v} = (v_1, v_2, v_3)$. **Krydsproduktet** $\\vec{a} \\times \\vec{b}$ er en vektor der står vinkelret på både $\\vec{a}$ og $\\vec{b}$, og hvis længde er parallelogrammets areal.',
    formula:
      '$$\\vec{a} \\times \\vec{b} = (a_2 b_3 - a_3 b_2,\\ a_3 b_1 - a_1 b_3,\\ a_1 b_2 - a_2 b_1)$$\n\n**Plans normalform**: $a(x-x_0) + b(y-y_0) + c(z-z_0) = 0$, hvor $(a,b,c)$ er normalvektor.',
    forklaring:
      'Krydsproduktet bruges til at finde normalvektorer (til planer), areal af parallelogrammer og volumen af parallelepipeder (via det blandede produkt). Normalvektoren til et plan er nøglen til planets ligning, til afstand fra punkt til plan, og til vinkler mellem planer.',
    eksempel:
      'For at finde planet gennem tre punkter: tag to vektorer i planet (differenser mellem punkterne), tag deres krydsprodukt → det er normalvektoren, indsæt et af punkterne i normalformen.',
    ledendeSporgsmal:
      'Skal vi tage normalformen for et plan først, eller foretrækker du at se hvordan krydsproduktet bruges til areal?',
    kernestofRefs: [4],
  },

  /* =========================================================
     HHX — Afsætning A
     ========================================================= */
  {
    id: 'swot_analyse',
    subjectIds: ['afsaetning_a_hhx', 'virksomhedsoekonomi_b_hhx'],
    triggers: ['swot', 'swot-analyse', 'styrker svagheder', 'muligheder trusler'],
    titel: 'SWOT-analyse',
    definition:
      '**SWOT-analysen** sammenfatter virksomhedens situation på fire områder: **S**trengths (styrker), **W**eaknesses (svagheder), **O**pportunities (muligheder) og **T**hreats (trusler).',
    formula:
      '**Internt:** Styrker · Svagheder\n\n**Eksternt:** Muligheder · Trusler',
    forklaring:
      'Den centrale skelnen er intern vs. ekstern. Styrker og svagheder er forhold inde i virksomheden (kompetencer, ressourcer, processer). Muligheder og trusler er forhold uden for (marked, konkurrenter, lovgivning, teknologi). En velgennemført SWOT skal lede til **konkrete strategiske handlinger** — fx hvordan virksomheden kan bruge en styrke til at udnytte en mulighed (SO-strategi).',
    eksempel:
      'En SWOT er kun værdifuld hvis du kobler felterne: en styrke + en mulighed = vækststrategi; en svaghed + en trussel = forsvarsstrategi. En ren opremsning uden disse koblinger får sjældent topkarakter.',
    ledendeSporgsmal:
      'Hvilken SO- eller WT-kobling giver mest mening for den case du arbejder med?',
    kernestofRefs: [0, 1],
  },
  {
    id: 'pestel',
    subjectIds: ['afsaetning_a_hhx', 'international_oekonomi_b_hhx'],
    triggers: ['pestel', 'pest', 'makroforhold', 'omverden'],
    titel: 'PESTEL-modellen',
    definition:
      '**PESTEL** er en model til analyse af virksomhedens makro-omverden. Forkortelsen står for **P**olitiske, **Ø**konomiske, **S**ociokulturelle, **T**eknologiske, **E**kologiske og **L**ovgivningsmæssige forhold.',
    forklaring:
      'PESTEL bruges typisk i starten af en strategisk analyse til at kortlægge eksterne kræfter virksomheden ikke selv kan kontrollere. Den fungerer som input til SWOT (især "muligheder" og "trusler"). En god PESTEL er **selektiv** — du analyserer kun de PESTEL-faktorer der reelt påvirker virksomhedens marked, ikke alle seks for syns skyld.',
    eksempel:
      'En vegansk fødevarevirksomhed vil have høj relevans af **S** (sundhedstrend, klimabevidsthed) og **E** (CO2-aftryk, dyrevelfærd) — mens **L** måske er mindre afgørende.',
    ledendeSporgsmal:
      'Hvilke 2-3 PESTEL-faktorer er reelt afgørende for din virksomhed — og kan du dokumentere dem med data?',
    kernestofRefs: [1],
  },
  {
    id: 'segmentering_stp',
    subjectIds: ['afsaetning_a_hhx'],
    triggers: ['segmentering', 'målgruppe', 'positionering', 'stp'],
    titel: 'STP — Segmentering, Målgruppevalg, Positionering',
    definition:
      '**STP** er den klassiske marketingproces fra et heterogent marked til en konkret strategi: **S**egmentering (opdel markedet), **T**argeting (vælg målgruppe), **P**ositionering (fastlæg position i målgruppens bevidsthed).',
    forklaring:
      'Segmenteringskriterier på B2C-markedet er typisk demografiske, geografiske, psykografiske og adfærdsmæssige. Et godt segment er **målbart, tilgængeligt, substantielt og operationelt**. Positionering handler om hvilken plads virksomheden ønsker at indtage — ofte visualiseret som et **positioneringskort** med to konkurrerende dimensioner (fx pris vs. kvalitet).',
    eksempel:
      'Tesla segmenterede oprindeligt på psykografi (innovations- og miljøinteresserede) og adfærd (tidlige adoptere), valgte high-end målgruppen først, og positionerede sig som "den seriøse premium-elbil" — ikke som "billig elbil".',
    ledendeSporgsmal:
      'Hvilke 2 dimensioner ville bedst beskrive positioneringen i din case — og er der "ledig plads" på kortet?',
    kernestofRefs: [4],
  },
  {
    id: 'marketingmix_7p',
    subjectIds: ['afsaetning_a_hhx'],
    triggers: ['marketingmix', '4p', '7p', 'product price place promotion'],
    titel: 'Marketingmix (de 7 P\'er)',
    definition:
      '**Marketingmixet** er virksomhedens taktiske værktøjer til at påvirke efterspørgslen efter et produkt. På HHX A arbejder vi med **de 7 P\'er**, der udvider den klassiske 4 P-model med tre serviceorienterede P\'er.',
    formula:
      '**Klassisk 4P**: Product · Price · Place · Promotion\n\n**Service-udvidet 7P**: + People · Physical evidence · Processes',
    forklaring:
      'De 4 klassiske P\'er handler om selve produktet, prisen, distributionen og kommunikationen. De 3 ekstra P\'er er særligt vigtige for serviceydelser, hvor leveringen er en del af "produktet": **People** (medarbejdere som kundeoplevelse), **Physical evidence** (fysiske spor af servicen — lokaler, uniformer), og **Processes** (kundens rejse gennem servicen).',
    eksempel:
      'En streamingtjeneste: **Product** = indhold; **Price** = abonnementsmodel; **Place** = app/web; **Promotion** = trailers/influencer; **Processes** = onboarding og anbefalingsalgoritme; **Physical evidence** = brand-design; **People** = kundeservice.',
    ledendeSporgsmal:
      'Hvilket P er svagest i din case — og hvilket konkret tiltag kunne styrke det?',
    kernestofRefs: [5],
  },

  /* =========================================================
     HHX — Virksomhedsøkonomi B
     ========================================================= */
  {
    id: 'daekningsbidrag',
    subjectIds: ['virksomhedsoekonomi_b_hhx'],
    triggers: ['dækningsbidrag', 'daekningsbidrag', 'db', 'dækningsgrad'],
    titel: 'Dækningsbidrag',
    definition:
      '**Dækningsbidraget (DB)** er det beløb der er tilbage af omsætningen til at dække de **kapacitetsomkostninger** (faste omkostninger) og generere overskud, efter at de **variable omkostninger** er trukket fra.',
    formula:
      '$$DB = \\text{Omsætning} - \\text{Variable omkostninger}$$\n\n**Dækningsgrad** = $\\dfrac{DB}{\\text{Omsætning}} \\cdot 100\\%$',
    forklaring:
      'Dækningsbidraget er centralt i bidragsmodellen og i resultatopgørelsens funktionsopdelte form. **Dækningsgraden** udtrykker hvor stor en del af hver krones omsætning der er "tilbage" efter de variable omkostninger — den siger noget om virksomhedens følsomhed over for omsætningsfald. **Nulpunktsomsætningen** er det punkt hvor DB præcist dækker de faste omkostninger: $\\dfrac{\\text{Faste omkostninger}}{\\text{Dækningsgrad}}$.',
    eksempel:
      'En virksomhed med en dækningsgrad på 40 % skal hente 40 øre af hver omsætningskrone til dækning af faste omkostninger og overskud. Falder omsætningen 1 mio. kr., falder DB 400.000 kr.',
    ledendeSporgsmal:
      'Skal vi se på, hvordan man bruger DB til at finde nulpunktsomsætningen — eller hvordan dækningsgraden ændrer sig ved prisændringer?',
    kernestofRefs: [2, 7],
  },
  {
    id: 'noegletal',
    subjectIds: ['virksomhedsoekonomi_b_hhx'],
    triggers: ['nøgletal', 'noegletal', 'rentabilitet', 'soliditet', 'afkastningsgrad', 'overskudsgrad'],
    titel: 'Regnskabsanalyse — nøgletal',
    definition:
      '**Nøgletal** er forholdstal beregnet ud fra årsregnskabet. De gør det muligt at sammenligne virksomheder af forskellig størrelse og vurdere økonomisk udvikling over tid. På B-niveau arbejder vi typisk i fire grupper: **rentabilitet**, **indtjeningsevne**, **kapitaltilpasning** og **soliditet/likviditet**.',
    formula:
      '**Afkastningsgrad** = $\\dfrac{\\text{Resultat før renter}}{\\text{Aktiver i alt}} \\cdot 100\\%$\n\n**Overskudsgrad** = $\\dfrac{\\text{Resultat før renter}}{\\text{Omsætning}} \\cdot 100\\%$\n\n**Soliditetsgrad** = $\\dfrac{\\text{Egenkapital}}{\\text{Aktiver i alt}} \\cdot 100\\%$',
    forklaring:
      'Afkastningsgraden viser hvor effektivt virksomheden bruger sine aktiver til at skabe indtjening — den er rentabilitetens "tophistorie". Overskudsgraden måler indtjeningsevnen pr. omsætningskrone. Soliditetsgraden viser hvor stor del af aktiverne der er finansieret af egenkapital — altså hvor "polstret" virksomheden er mod tab. Nøgletal skal altid sammenlignes med branchen og med tidligere år for at give mening.',
    eksempel:
      'En afkastningsgrad på 8 % er gennemsnitlig dansk handel; under 4 % er bekymrende; over 15 % er stærkt og bør forklares (er det holdbart, eller en engangshændelse?).',
    ledendeSporgsmal:
      'Hvilken nøgletals-gruppe siger mest om dit problem: er det indtjeningsevne, finansiel risiko, eller kapitaltilpasning?',
    kernestofRefs: [6],
  },
  {
    id: 'investeringskalkulation',
    subjectIds: ['virksomhedsoekonomi_b_hhx'],
    triggers: ['investering', 'kapitalværdi', 'npv', 'tilbagebetalingstid', 'intern rente'],
    titel: 'Investeringskalkulation',
    definition:
      '**Investeringskalkulation** er metoden til at vurdere om en investering er økonomisk attraktiv. Den vigtigste model er **kapitalværdimetoden (NPV)**, som diskonterer fremtidige nettoindbetalinger til nutidsværdi.',
    formula:
      '$$\\text{Kapitalværdi} = -I_0 + \\sum_{t=1}^{n} \\frac{NCF_t}{(1+r)^t}$$',
    forklaring:
      '$I_0$ er anskaffelsessummen, $NCF_t$ er nettocashflowet i periode $t$, $r$ er kalkulationsrenten (afkastkravet), og $n$ er løbetiden. Tommelfingerregel: er kapitalværdien positiv, er investeringen rentabel ved den valgte rente. Kalkulationsrenten afspejler både risiko og alternativomkostning — vælges den for lav, accepterer du dårlige projekter; vælges den for høj, afviser du gode.',
    eksempel:
      'En investering på 1 mio. kr. der giver 250.000 kr. årligt i 5 år ved 8 % rente: diskontér hver indbetaling og sum dem — er summen større end 1 mio., er investeringen profitabel.',
    ledendeSporgsmal:
      'Hvordan ville et fald i kalkulationsrenten på 2 procentpoint påvirke konklusionen — er den robust?',
    kernestofRefs: [9],
  },

  /* =========================================================
     HHX — International økonomi B
     ========================================================= */
  {
    id: 'bnp',
    subjectIds: ['international_oekonomi_b_hhx'],
    triggers: ['bnp', 'bruttonationalprodukt', 'gdp', 'nationalindkomst'],
    titel: 'Bruttonationalprodukt (BNP)',
    definition:
      '**BNP** er den samlede værdi af alle færdigvarer og tjenester produceret inden for et lands grænser i en periode (typisk et år). Det er det vigtigste enkelte mål for et lands økonomiske aktivitet.',
    formula:
      '**Anvendelsessiden**: $BNP = C + I + G + (X - M)$\n\nC = privatforbrug · I = investeringer · G = offentligt forbrug · X = eksport · M = import',
    forklaring:
      '**Realt BNP** korrigerer for inflation og er det relevante mål for **økonomisk vækst**. **Nominelt BNP** måler i løbende priser. **BNP pr. indbygger** giver et mål for materiel velstand, men intet mål for fordeling, miljø eller livskvalitet. BNP-væksten beregnes som $\\frac{BNP_t - BNP_{t-1}}{BNP_{t-1}} \\cdot 100\\%$.',
    eksempel:
      'Et land kan have høj BNP-vækst, men hvis befolkningen vokser endnu hurtigere, falder BNP pr. indbygger — derfor skelnes der altid mellem absolut vækst og pr.-indbygger-vækst.',
    ledendeSporgsmal:
      'Bruger din analyse realt eller nominelt BNP — og hvilken forskel gør det for konklusionen?',
    kernestofRefs: [1],
  },
  {
    id: 'inflation',
    subjectIds: ['international_oekonomi_b_hhx'],
    triggers: ['inflation', 'forbrugerprisindeks', 'cpi', 'pengeværdi'],
    titel: 'Inflation',
    definition:
      '**Inflation** er en vedvarende stigning i det generelle prisniveau. Den måles oftest via **forbrugerprisindekset (CPI)** som procentvis ændring fra år til år.',
    formula:
      '$$\\text{Inflation}_t = \\frac{CPI_t - CPI_{t-1}}{CPI_{t-1}} \\cdot 100\\%$$',
    forklaring:
      'Inflation kan have flere årsager: **efterspørgselstræk** (samlet efterspørgsel overstiger udbud), **omkostningspres** (stigende råvare- eller lønomkostninger), eller **importeret inflation** (svækket valuta gør import dyrere). Centralbanker styrer typisk efter et inflationsmål omkring 2 % — for høj inflation udhuler købekraft, for lav (eller deflation) kan udløse økonomisk stilstand.',
    eksempel:
      'Stiger CPI fra 110 til 113{,}3 fra ét år til det næste, er inflationen $(113{,}3 - 110)/110 \\cdot 100 = 3{,}0\\%$.',
    ledendeSporgsmal:
      'Er den inflation du analyserer drevet af efterspørgsel, omkostninger eller import — og hvilken type økonomisk politik passer til hver?',
    kernestofRefs: [1, 5],
  },
  {
    id: 'finanspolitik',
    subjectIds: ['international_oekonomi_b_hhx'],
    triggers: ['finanspolitik', 'pengepolitik', 'ekspansiv', 'kontraktiv', 'multiplikator'],
    titel: 'Økonomisk politik (finans- og pengepolitik)',
    definition:
      '**Finanspolitik** er regeringens brug af offentligt forbrug, investeringer og skatter til at påvirke samlet efterspørgsel. **Pengepolitik** er centralbankens styring af renteniveau og pengemængde med samme formål.',
    formula:
      '**Ekspansiv finanspolitik**: ↑ G eller ↓ T → ↑ samlet efterspørgsel → ↑ BNP, ↓ ledighed\n\n**Kontraktiv pengepolitik**: ↑ rente → ↓ investeringer & forbrug → ↓ inflation',
    forklaring:
      'Politikken vælges efter den økonomiske situation: under lavkonjunktur typisk ekspansiv (skub gang i økonomien), under højkonjunktur kontraktiv (dæmp inflation). Effekten af finanspolitik forstærkes af **multiplikatoreffekten** — en krone i ekstra offentligt forbrug giver mere end en krone i samlet aktivitet, fordi modtageren også bruger sin nye indkomst videre.',
    eksempel:
      'I 2008-finanskrisen brugte mange lande både ekspansiv finanspolitik (hjælpepakker) OG ekspansiv pengepolitik (rentenedsættelser) — kombinationen kaldes "policy-mix".',
    ledendeSporgsmal:
      'Hvilken kombination af finans- og pengepolitik er passende for det konjunkturbillede du analyserer?',
    kernestofRefs: [5],
  },
]

/* -------------------------------------------------------------
   Helpers
   ------------------------------------------------------------- */

/**
 * findConcept — finder den bedst matchende koncept-indgang for en
 * given elev-besked. Hvis et `subjectId` er givet, begrænses søgningen
 * til det fag; ellers søges der på tværs af alle koncepter.
 *
 * Scorer ud fra hvor mange triggere der rammes.
 */
export function findConcept(message, subjectId) {
  if (!message) return null
  const lower = message.toLowerCase()
  const candidates = subjectId
    ? CONCEPTS.filter(c => c.subjectIds.includes(subjectId))
    : CONCEPTS

  let best = null
  let bestScore = 0
  for (const c of candidates) {
    let score = 0
    for (const t of c.triggers) {
      if (lower.includes(t)) score += 2
      // partial match (de første 5 tegn) for at fange bøjningsformer
      else if (t.length >= 5 && lower.includes(t.slice(0, 5))) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      best = c
    }
  }
  return bestScore >= 2 ? best : null
}

/**
 * findConceptInProfile — søger på tværs af alle koncepter, men kun
 * dem der hører under en given profils fag. Bruges af den nye samlede
 * chat hvor eleven kan stille spørgsmål om alle profilens fag i samme samtale.
 *
 * Vi behøver ikke selv kende profil→subject-mappet her, fordi hvert
 * koncept allerede angiver `subjectIds`. Vi får kandidat-fag-listen ind.
 */
export function findConceptInProfile(message, subjectIdsInProfile) {
  if (!message) return null
  if (!Array.isArray(subjectIdsInProfile) || subjectIdsInProfile.length === 0) {
    return findConcept(message, null)
  }
  const allowed = new Set(subjectIdsInProfile)
  const lower = message.toLowerCase()

  let best = null
  let bestScore = 0
  for (const c of CONCEPTS) {
    if (!c.subjectIds.some(id => allowed.has(id))) continue
    let score = 0
    for (const t of c.triggers) {
      if (lower.includes(t)) score += 2
      else if (t.length >= 5 && lower.includes(t.slice(0, 5))) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      best = c
    }
  }
  return bestScore >= 2 ? best : null
}

/**
 * findAnyConcept — global søgning uden profil-filtrering. Bruges af
 * cross-profile-detektion: hvis ingen koncept matches i elevens profil,
 * tjekker vi om der er en match i en anden profil.
 */
export function findAnyConcept(message) {
  return findConcept(message, null)
}

/**
 * hasAnyConceptSignal — billig sanity-check der returnerer true hvis
 * elevens besked nævner mindst ÉT trigger-ord fra koncept-biblioteket.
 * Bruges af context-check-loopet til at afgøre om vi har nok signal
 * til at give et fagligt svar, eller om vi skal spørge til fag/niveau.
 */
export function hasAnyConceptSignal(message) {
  if (!message) return false
  const lower = message.toLowerCase()
  for (const c of CONCEPTS) {
    for (const t of c.triggers) {
      if (lower.includes(t)) return true
      if (t.length >= 5 && lower.includes(t.slice(0, 5))) return true
    }
  }
  return false
}
