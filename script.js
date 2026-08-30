/* ============================================================================
   JOGU — script.js
   Vanilla JS, nessun framework, nessun backend. Dati in memoria.
   Moduli logici separati (namespace) per rendere semplice l'innesto futuro
   di un backend reale senza riscrivere la UI:
     I18N · STORE · AUTH · MATCHING · REPUTATION · BADGES ·
     NOTIFY · SHARE · ROUTER · UI (rendering)
   ============================================================================ */
(function () {
  "use strict";

  /* ==========================================================================
     I18N — sistema di traduzioni centralizzato
     ========================================================================== */
  const I18N = (function () {
    const dict = {
      it: {
        appName: "JOGU",
        payoffIt: "Manca uno? JOGU.",
        payoffEn: "Never play one short.",
        landingSub: "La rete che aiuta le partite di calcio amatoriale a non saltare mai.",
        login: "Accedi", register: "Registrati", logout: "Esci",
        email: "Email", password: "Password", continueGoogle: "Continua con Google",
        continueFacebook: "Continua con Facebook", or: "oppure",
        noAccount: "Non hai un account?", hasAccount: "Hai già un account?",
        name: "Nome", zone: "Zona", level: "Livello", position: "Posizione preferita",
        photo: "Foto", createAccount: "Crea account", welcomeBack: "Bentornato",
        loginSub: "Accedi per trovare la tua prossima partita.",
        registerSub: "Entra nella rete. Zero partite saltate.",
        whatToDo: "Cosa vuoi fare?",
        missingPlayersTitle: "MI MANCANO GIOCATORI",
        missingPlayersSub: "Crea una partita e trova chi manca.",
        wantToPlayTitle: "VOGLIO GIOCARE",
        wantToPlaySub: "Trova una partita che ha bisogno di te.",
        home: "Home", discover: "Cerca", create: "Crea", myMatches: "Partite", profile: "Profilo",
        notifications: "Notifiche",
        yourMatchEmpty: "La tua partita ha ancora {{n}} posti vuoti.",
        yourMatchOne: "La tua partita ha ancora 1 posto vuoto.",
        nextMatch: "Prossima partita",
        opportunitiesNear: "{{n}} partite hanno bisogno di te",
        noMatchYet: "Hai una partita in programma?",
        noMatchYetSub: "Organizzane una o trova chi ha bisogno di te.",
        needsYouSection: "Partite che hanno bisogno di te",
        seeAll: "Vedi tutte",
        format: "Formato", date: "Data", time: "Ora", place: "Luogo",
        totalPlayers: "Numero totale giocatori", alreadyIn: "Giocatori già presenti",
        howManyMissing: "Quanti giocatori mancano?",
        youAre: "Siete {{filled}}/{{total}}",
        missingN: "🔥 Mancano {{n}} giocatori", missingOne: "🔥 Manca 1 giocatore",
        costOptional: "Costo per giocatore (facoltativo)", preferredPosOptional: "Posizione richiesta (facoltativa)",
        notes: "Note", phoneOptional: "Telefono (facoltativo)",
        showPhoneApproved: "Mostra il mio numero ai giocatori approvati",
        publish: "Pubblica partita",
        matchOnline: "LA TUA PARTITA È ONLINE",
        shareFind: "CONDIVIDI E TROVA GIOCATORI",
        seeApplications: "VEDI CANDIDATURE",
        shareMsg: "⚽ {{missingText}} per una partita.\n📍 {{place}}\n🕗 {{when}}\n\nEntra su JOGU e candidati 👇\n{{link}}",
        shareOneMissing: "Ci manca 1 giocatore",
        shareNMissing: "Ci mancano {{n}} giocatori",
        linkCopied: "Link copiato negli appunti",
        matchesNeedYou: "PARTITE CHE HANNO BISOGNO DI TE",
        matchPercent: "{{n}}% MATCH",
        wantToPlayCta: "VOGLIO GIOCARE",
        filters: "Filtri", within1: "Entro 1 km", within3: "Entro 3 km", within5: "Entro 5 km",
        today: "Oggi", tomorrow: "Domani", thisWeek: "Questa settimana",
        missing1: "Manca 1", missing2plus: "Mancano 2+",
        applyConfirmTitle: "Sei sicuro di poter essere presente?",
        applyConfirmBody: "Se vieni approvato, il posto sarà assegnato a te. La tua affidabilità tiene conto delle partite confermate e rispettate.",
        confirmApplication: "CONFERMA CANDIDATURA",
        applicationSent: "Candidatura inviata",
        applicationSentSub: "In attesa dell'approvazione dell'organizzatore.",
        statusPending: "In attesa", statusApproved: "Approvato", statusConfirmed: "Confermato",
        statusCompleted: "Completato", statusRejected: "Rifiutato",
        approve: "APPROVA", reject: "RIFIUTA",
        playerApproved: "Giocatore approvato",
        applicationsReceived: "Candidature ricevute",
        noApplications: "Nessuna candidatura ancora. Condividi la partita per trovarne.",
        reliability: "Affidabilità", matchesPlayedLbl: "Partite", presenceLbl: "Presenza",
        confirmsRespectedLbl: "Conferme rispettate",
        cantComeAnymore: "NON POSSO PIÙ VENIRE", cancelConfirmTitle: "Confermi la rinuncia?",
        cancelConfirmBody: "Il tuo posto verrà liberato e assegnato al primo in lista d'attesa compatibile.",
        confirmCancel: "Conferma rinuncia", back: "Indietro",
        joinWaitlist: "ENTRA IN LISTA D'ATTESA", inWaitlist: "Sei in lista d'attesa",
        spotFreed: "Si è liberato un posto", matchComplete: "PARTITA COMPLETA",
        matchCompleteCelebrate: "🎉 PARTITA COMPLETA!",
        matchCompleteSub: "Tutti i posti sono stati riempiti.",
        yourNumbers: "I tuoi numeri", matchesOrganized: "Partite organizzate",
        completionRate: "% completamento", cancellations: "Cancellazioni",
        editProfile: "Modifica profilo", save: "Salva", cancel: "Annulla",
        badges: "Badge", recentMatches: "Ultime partite", preferredFormat: "Formato preferito",
        goalkeeper: "Portiere", defender: "Difensore", midfielder: "Centrocampista",
        forward: "Attaccante", wildcard: "Jolly",
        beginner: "Principiante", casual: "Amatoriale", intermediate: "Intermedio", advanced: "Avanzato",
        rookie: "Rookie", regular: "Regular", reliableLvl: "Reliable", veteran: "Veteran", legend: "Legend",
        gameSaverCta: "PUOI SALVARE QUESTA PARTITA", gameSaverMinutes: "Mancano {{n}} minuti",
        saveMatch: "SALVA LA PARTITA",
        markAttendance: "Verifica presenza", didShow: "Questo giocatore si è presentato?",
        yes: "Sì", no: "No", onTime: "Puntuale", correct: "Corretto", levelConsistent: "Livello coerente",
        inviteTeam: "PORTA LA TUA SQUADRA SU JOGU",
        inviteTeamSub: "La prossima volta che vi manca qualcuno, non fate saltare la partita.",
        inviteFriends: "INVITA AMICI",
        demoDataNote: "Dati demo",
        spotsFilledToday: "posti riempiti oggi", matchesCompletedWeek: "partite completate questa settimana",
        activePlayersZone: "giocatori attivi nella tua zona",
        noMatches: "Nessuna partita trovata", tryDifferentFilters: "Prova a modificare i filtri.",
        applyingAs: "Ti candidi come",
        organizer: "Organizzatore", km: "km", spots: "{{filled}}/{{total}}",
        urgencyLow: "BASSA", urgencyMid: "MEDIA", urgencyHigh: "URGENTE",
        loginRequired: "Accedi o registrati per candidarti a questa partita.",
        viewMatch: "Vedi la partita",
        demoSimulateApproval: "Simula: approvazione organizzatore (demo)",
        yourPhoneVisible: "Il tuo numero è visibile ai giocatori approvati.",
        phoneVisibleAfterApproval: "Il numero sarà visibile solo dopo l'approvazione.",
        organizerPhone: "Telefono organizzatore",
        custom: "Personalizzato",
        notifApproved: "✅ Sei stato approvato.",
        notifComplete: "🎉 La partita è completa.",
        notifBadge: "🏆 Hai ottenuto il badge {{badge}}.",
        notifGameSaver: "⚡ Puoi salvare una partita che inizierà tra {{n}} minuti.",
        notifNearby: "⚡ Manca 1 giocatore a {{km}} km da te.",
        notifYourMatch: "🔥 La tua partita ha ancora {{n}} posto/i vuoto/i.",
        markAllRead: "Segna tutte come lette",
        noNotifications: "Nessuna notifica per ora.",
        applicantsList: "Candidati", myApplications: "Le mie candidature",
        upcoming: "In programma", history: "Storico", organizing: "Che organizzo",
        applied: "A cui mi sono candidato",
        distanceFromYou: "{{km}} km da te",
        why92: "Perché questo match", reasonNear: "📍 Vicino a te", reasonLevel: "⚽ Livello compatibile",
        reasonAvail: "🕗 Sei disponibile", reasonFormat: "🎯 Formato che ti piace",
        reasonReliable: "🤝 Organizzatore affidabile", reasonPref: "🧭 Posizione richiesta compatibile",
        heroPayoffLead: "Manca uno?",
        heroPayoffAccent: "JOGU.",
        getStarted: "Inizia ora", alreadyMember: "Ho già un account",
        stepFormat5: "5 vs 5", stepFormat7: "7 vs 7", stepFormat8: "8 vs 8", stepFormat11: "11 vs 11",
        required: "obbligatorio",
        matchNotFound: "Partita non trovata.", backHome: "Torna alla home",
        toastPublished: "Partita pubblicata", toastApplied: "Candidatura inviata",
        toastApprovedPlayer: "Giocatore approvato", toastRejectedPlayer: "Candidatura rifiutata",
        toastCancelled: "Hai rinunciato al posto", toastJoinedWaitlist: "Sei entrato in lista d'attesa",
        toastAttendanceSaved: "Presenza registrata", toastLangChanged: "Lingua cambiata",
        footerPayoff: "Never play one short.",
        euroPerPlayer: "€ a testa", free: "Gratis",
        lookingFor: "Cerca", within: "Entro", maxCost: "Costo massimo",
        applyFilters: "Applica filtri", resetFilters: "Azzera",
        yourReliabilityInfo: "Basata su presenze, puntualità e conferme rispettate. Non peggiora per una singola rinuncia anticipata.",
        organizerOf: "Organizzata da",
        seeProfile: "Vedi profilo",
        matchWith: "con",
        newHere: "Nuovo su JOGU",
      },
      en: {
        appName: "JOGU",
        payoffIt: "Manca uno? JOGU.",
        payoffEn: "Never play one short.",
        landingSub: "The network that keeps amateur football matches from falling through.",
        login: "Log in", register: "Sign up", logout: "Log out",
        email: "Email", password: "Password", continueGoogle: "Continue with Google",
        continueFacebook: "Continue with Facebook", or: "or",
        noAccount: "No account yet?", hasAccount: "Already have an account?",
        name: "Name", zone: "Area", level: "Level", position: "Preferred position",
        photo: "Photo", createAccount: "Create account", welcomeBack: "Welcome back",
        loginSub: "Log in to find your next match.",
        registerSub: "Join the network. Zero cancelled matches.",
        whatToDo: "What do you want to do?",
        missingPlayersTitle: "I NEED PLAYERS",
        missingPlayersSub: "Create a match and find who's missing.",
        wantToPlayTitle: "I WANT TO PLAY",
        wantToPlaySub: "Find a match that needs you.",
        home: "Home", discover: "Discover", create: "Create", myMatches: "Matches", profile: "Profile",
        notifications: "Notifications",
        yourMatchEmpty: "Your match still has {{n}} empty spots.",
        yourMatchOne: "Your match still has 1 empty spot.",
        nextMatch: "Next match",
        opportunitiesNear: "{{n}} matches need you",
        noMatchYet: "Got a match coming up?",
        noMatchYetSub: "Organize one or find who needs you.",
        needsYouSection: "Matches that need you",
        seeAll: "See all",
        format: "Format", date: "Date", time: "Time", place: "Venue",
        totalPlayers: "Total players", alreadyIn: "Players already in",
        howManyMissing: "How many players are missing?",
        youAre: "You're {{filled}}/{{total}}",
        missingN: "🔥 {{n}} players missing", missingOne: "🔥 1 player missing",
        costOptional: "Cost per player (optional)", preferredPosOptional: "Position needed (optional)",
        notes: "Notes", phoneOptional: "Phone (optional)",
        showPhoneApproved: "Show my number to approved players",
        publish: "Publish match",
        matchOnline: "YOUR MATCH IS LIVE",
        shareFind: "SHARE & FIND PLAYERS",
        seeApplications: "VIEW APPLICATIONS",
        shareMsg: "⚽ {{missingText}} for a match.\n📍 {{place}}\n🕗 {{when}}\n\nJoin JOGU and apply 👇\n{{link}}",
        shareOneMissing: "We're missing 1 player",
        shareNMissing: "We're missing {{n}} players",
        linkCopied: "Link copied to clipboard",
        matchesNeedYou: "MATCHES THAT NEED YOU",
        matchPercent: "{{n}}% MATCH",
        wantToPlayCta: "I WANT TO PLAY",
        filters: "Filters", within1: "Within 1 km", within3: "Within 3 km", within5: "Within 5 km",
        today: "Today", tomorrow: "Tomorrow", thisWeek: "This week",
        missing1: "1 missing", missing2plus: "2+ missing",
        applyConfirmTitle: "Sure you can make it?",
        applyConfirmBody: "If approved, the spot is yours. Your reliability score tracks confirmed, honored matches.",
        confirmApplication: "CONFIRM APPLICATION",
        applicationSent: "Application sent",
        applicationSentSub: "Waiting for the organizer's approval.",
        statusPending: "Pending", statusApproved: "Approved", statusConfirmed: "Confirmed",
        statusCompleted: "Completed", statusRejected: "Rejected",
        approve: "APPROVE", reject: "DECLINE",
        playerApproved: "Player approved",
        applicationsReceived: "Applications received",
        noApplications: "No applications yet. Share the match to find some.",
        reliability: "Reliability", matchesPlayedLbl: "Matches", presenceLbl: "Attendance",
        confirmsRespectedLbl: "Honored confirmations",
        cantComeAnymore: "I CAN'T MAKE IT", cancelConfirmTitle: "Confirm you're dropping out?",
        cancelConfirmBody: "Your spot will open up for the first compatible player on the waitlist.",
        confirmCancel: "Confirm drop out", back: "Back",
        joinWaitlist: "JOIN WAITLIST", inWaitlist: "You're on the waitlist",
        spotFreed: "A spot opened up", matchComplete: "MATCH FULL",
        matchCompleteCelebrate: "🎉 MATCH FULL!",
        matchCompleteSub: "All spots have been filled.",
        yourNumbers: "Your numbers", matchesOrganized: "Matches organized",
        completionRate: "% completion", cancellations: "Cancellations",
        editProfile: "Edit profile", save: "Save", cancel: "Cancel",
        badges: "Badges", recentMatches: "Recent matches", preferredFormat: "Preferred format",
        goalkeeper: "Goalkeeper", defender: "Defender", midfielder: "Midfielder",
        forward: "Forward", wildcard: "Wildcard",
        beginner: "Beginner", casual: "Casual", intermediate: "Intermediate", advanced: "Advanced",
        rookie: "Rookie", regular: "Regular", reliableLvl: "Reliable", veteran: "Veteran", legend: "Legend",
        gameSaverCta: "YOU CAN SAVE THIS MATCH", gameSaverMinutes: "{{n}} minutes left",
        saveMatch: "SAVE THE MATCH",
        markAttendance: "Verify attendance", didShow: "Did this player show up?",
        yes: "Yes", no: "No", onTime: "On time", correct: "Correct", levelConsistent: "Level as expected",
        inviteTeam: "BRING YOUR TEAM TO JOGU",
        inviteTeamSub: "Next time you're short one, don't cancel the match.",
        inviteFriends: "INVITE FRIENDS",
        demoDataNote: "Demo data",
        spotsFilledToday: "spots filled today", matchesCompletedWeek: "matches completed this week",
        activePlayersZone: "active players in your area",
        noMatches: "No matches found", tryDifferentFilters: "Try different filters.",
        applyingAs: "Applying as",
        organizer: "Organizer", km: "km", spots: "{{filled}}/{{total}}",
        urgencyLow: "LOW", urgencyMid: "MEDIUM", urgencyHigh: "URGENT",
        loginRequired: "Log in or sign up to apply to this match.",
        viewMatch: "View match",
        demoSimulateApproval: "Simulate: organizer approval (demo)",
        yourPhoneVisible: "Your number is visible to approved players.",
        phoneVisibleAfterApproval: "The number will be visible only after approval.",
        organizerPhone: "Organizer's phone",
        custom: "Custom",
        notifApproved: "✅ You've been approved.",
        notifComplete: "🎉 The match is full.",
        notifBadge: "🏆 You earned the {{badge}} badge.",
        notifGameSaver: "⚡ You can save a match starting in {{n}} minutes.",
        notifNearby: "⚡ 1 player missing {{km}} km from you.",
        notifYourMatch: "🔥 Your match still has {{n}} empty spot(s).",
        markAllRead: "Mark all as read",
        noNotifications: "No notifications yet.",
        applicantsList: "Applicants", myApplications: "My applications",
        upcoming: "Upcoming", history: "History", organizing: "Organizing",
        applied: "Applied to",
        distanceFromYou: "{{km}} km away",
        why92: "Why this match", reasonNear: "📍 Close to you", reasonLevel: "⚽ Compatible level",
        reasonAvail: "🕗 You're available", reasonFormat: "🎯 Format you like",
        reasonReliable: "🤝 Reliable organizer", reasonPref: "🧭 Requested position matches",
        heroPayoffLead: "Missing one?",
        heroPayoffAccent: "JOGU.",
        getStarted: "Get started", alreadyMember: "I already have an account",
        stepFormat5: "5-a-side", stepFormat7: "7-a-side", stepFormat8: "8-a-side", stepFormat11: "11-a-side",
        required: "required",
        matchNotFound: "Match not found.", backHome: "Back home",
        toastPublished: "Match published", toastApplied: "Application sent",
        toastApprovedPlayer: "Player approved", toastRejectedPlayer: "Application declined",
        toastCancelled: "You dropped out", toastJoinedWaitlist: "You joined the waitlist",
        toastAttendanceSaved: "Attendance saved", toastLangChanged: "Language changed",
        footerPayoff: "Never play one short.",
        euroPerPlayer: "per player", free: "Free",
        lookingFor: "Look for", within: "Within", maxCost: "Max cost",
        applyFilters: "Apply filters", resetFilters: "Reset",
        yourReliabilityInfo: "Based on attendance, punctuality and honored confirmations. One early drop-out won't hurt it.",
        organizerOf: "Organized by",
        seeProfile: "View profile",
        matchWith: "with",
        newHere: "New to JOGU",
      }
    };
    let current = "it";
    function t(key, vars) {
      let str = (dict[current] && dict[current][key]) || dict.it[key] || key;
      if (vars) Object.keys(vars).forEach(k => { str = str.replace(new RegExp("{{" + k + "}}", "g"), vars[k]); });
      return str;
    }
    function setLang(l) { if (dict[l]) current = l; }
    function getLang() { return current; }
    return { t, setLang, getLang };
  })();
  const t = I18N.t;

  /* ==========================================================================
     STORE — dati demo in memoria (Milano) + stato applicazione
     ========================================================================== */
  const STORE = (function () {
    const ZONES = {
      "Porta Romana": [45.451, 9.201], "Navigli": [45.4508, 9.1739],
      "Isola": [45.487, 9.190], "City Life": [45.478, 9.156],
      "Bicocca": [45.515, 9.212], "Lambrate": [45.483, 9.238],
      "Città Studi": [45.478, 9.226], "Corvetto": [45.438, 9.220],
      "Bovisa": [45.505, 9.166], "San Siro": [45.478, 9.122],
      "Porta Venezia": [45.476, 9.207], "Sempione": [45.474, 9.174],
      "Tortona": [45.454, 9.166], "Ripamonti": [45.440, 9.201],
      "Centro": [45.4642, 9.190]
    };

    function km(a, b) {
      const R = 6371, dLat = (b[0] - a[0]) * Math.PI / 180, dLon = (b[1] - a[1]) * Math.PI / 180;
      const s = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * Math.PI / 180) * Math.cos(b[0] * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
    }

    const POSITIONS = ["goalkeeper", "defender", "midfielder", "forward", "wildcard"];
    const LEVELS = ["beginner", "casual", "intermediate", "advanced"];

    // 20 utenti demo — dati fissi, non generati a runtime
    const USER_SEED = [
      ["Marco Ferrari", "Porta Romana", "casual", "midfielder", 4.9, 27, 96, 24, 1, ["reliableB", "organizerB"], true],
      ["Luca Bianchi", "Navigli", "intermediate", "forward", 4.6, 19, 91, 16, 2, ["gameSaverB"], false],
      ["Davide Colombo", "Isola", "casual", "defender", 4.3, 12, 88, 9, 3, [], false],
      ["Alessandro Ricci", "City Life", "advanced", "wildcard", 4.8, 41, 95, 36, 1, ["teamPlayerB", "reliableB", "organizerB"], true],
      ["Matteo Romano", "Bicocca", "beginner", "goalkeeper", 4.2, 6, 83, 4, 2, [], false],
      ["Simone Greco", "Lambrate", "casual", "midfielder", 4.5, 22, 92, 18, 2, ["teamPlayerB"], false],
      ["Andrea Bruno", "Città Studi", "intermediate", "forward", 4.7, 30, 94, 27, 1, ["reliableB", "ironManB"], false],
      ["Francesco Gallo", "Corvetto", "casual", "defender", 4.1, 9, 79, 6, 4, [], false],
      ["Lorenzo Conti", "Bovisa", "advanced", "midfielder", 4.9, 55, 97, 50, 0, ["legendB", "organizerB", "reliableB"], true],
      ["Riccardo De Luca", "San Siro", "casual", "forward", 4.4, 15, 90, 12, 2, ["lastMinuteB"], false],
      ["Giulia Marino", "Porta Venezia", "intermediate", "wildcard", 4.6, 17, 93, 15, 1, ["reliableB"], false],
      ["Chiara Costa", "Sempione", "casual", "midfielder", 4.0, 5, 80, 3, 2, [], false],
      ["Sara Rizzo", "Tortona", "beginner", "defender", 3.9, 3, 75, 2, 1, [], false],
      ["Elena Moretti", "Ripamonti", "advanced", "forward", 4.8, 34, 96, 30, 1, ["teamPlayerB", "reliableB"], false],
      ["Federica Barbieri", "Centro", "casual", "goalkeeper", 4.3, 11, 86, 8, 3, [], false],
      ["Valentina Fontana", "Porta Romana", "intermediate", "midfielder", 4.7, 26, 95, 22, 1, ["reliableB", "ironManB"], false],
      ["Martina Serra", "Navigli", "casual", "defender", 4.2, 8, 85, 6, 2, [], false],
      ["Alice Villa", "Isola", "advanced", "wildcard", 4.9, 48, 98, 45, 0, ["legendB", "reliableB"], false],
      ["Giorgia Leone", "City Life", "beginner", "forward", 3.8, 2, 70, 1, 2, [], false],
      ["Sofia Longo", "Bicocca", "casual", "midfielder", 4.4, 14, 89, 11, 2, ["gameSaverB"], false],
    ];

    function makeUsers() {
      return USER_SEED.map((u, i) => {
        const [name, zone, level, position, rating, matchesPlayed, presenceRate, confirmsRespected, cancellations, badges, showPhone] = u;
        const initials = name.split(" ").map(p => p[0]).join("").toUpperCase();
        return {
          id: "u" + (i + 1), name, initials, city: "Milano", zone, latlng: ZONES[zone],
          level, position, rating, matchesPlayed, presenceRate, confirmsRespected, cancellations,
          badges: badges.slice(), phone: "+39 3" + (20000000 + i * 137931), showPhone,
          matchesOrganized: (i % 4 === 0) ? Math.max(1, Math.round(matchesPlayed / 6)) : Math.round(matchesPlayed / 12),
          orgCompletionRate: 78 + (i * 3) % 20,
          preferredFormat: ["5v5", "7v7", "8v8", "11v11"][i % 4],
          preferredDays: [0, 1, 2, 3, 4, 5, 6].filter((d) => (i + d) % 3 !== 0),
        };
      });
    }

    function hoursFromNow(h) { return new Date(Date.now() + h * 3600 * 1000); }

    function makeMatches(users) {
      const byName = (n) => users.find(u => u.name === n);
      const raw = [
        // organizerName, format, total, baseFilled, zone, hOffset, level, cost, prefPos, notes, showPhone
        { org: "Marco Ferrari", format: "5v5", total: 10, base: 8, zone: "Porta Romana", h: 6, level: "casual", cost: 5, pref: "", notes: "Campo in erba sintetica, spogliatoi disponibili.", showPhone: true },
        { org: "Luca Bianchi", format: "7v7", total: 14, base: 13, zone: "Navigli", h: 1.25, level: "intermediate", cost: 7, pref: "goalkeeper", notes: "Portiere titolare infortunato, cerchiamo sostituto.", showPhone: true },
        { org: "Davide Colombo", format: "8v8", total: 16, base: 14, zone: "Isola", h: 22, level: "casual", cost: 6, pref: "", notes: "", showPhone: false },
        { org: "Alessandro Ricci", format: "11v11", total: 22, base: 18, zone: "City Life", h: 118, level: "advanced", cost: 10, pref: "defender", notes: "Partita amichevole seria, si gioca ogni domenica.", showPhone: true },
        { org: "Matteo Romano", format: "5v5", total: 10, base: 9, zone: "Bicocca", h: 4.5, level: "beginner", cost: 4, pref: "", notes: "Gruppo tranquillo, ideale per chi inizia.", showPhone: false },
        { org: "Simone Greco", format: "7v7", total: 14, base: 12, zone: "Lambrate", h: 46, level: "casual", cost: 6, pref: "midfielder", notes: "", showPhone: true },
        { org: "Andrea Bruno", format: "5v5", total: 10, base: 10, zone: "Città Studi", h: -20, level: "intermediate", cost: 5, pref: "", notes: "Partita conclusa, grazie a tutti!", showPhone: false, forcePast: true },
        { org: "Francesco Gallo", format: "8v8", total: 16, base: 10, zone: "Corvetto", h: 70, level: "intermediate", cost: 6, pref: "", notes: "Ci vuole un bel gruppo, tanti posti liberi.", showPhone: false },
        { org: "Lorenzo Conti", format: "11v11", total: 22, base: 22, zone: "Bovisa", h: 30, level: "advanced", cost: 9, pref: "", notes: "Al completo, si accettano solo riserve in lista d'attesa.", showPhone: true },
        { org: "Riccardo De Luca", format: "5v5", total: 10, base: 9, zone: "San Siro", h: 0.75, level: "casual", cost: 5, pref: "forward", notes: "Si comincia tra pochissimo, chi c'è c'è.", showPhone: true },
      ];
      return raw.map((r, i) => {
        const organizer = byName(r.org);
        const date = hoursFromNow(r.h);
        const applications = [];
        // pre-seed alcune candidature pendenti sulla partita di Marco per testare subito approvazione
        if (i === 0) {
          applications.push({ userId: "u11", status: "pending", appliedAt: hoursFromNow(-3) });
          applications.push({ userId: "u16", status: "pending", appliedAt: hoursFromNow(-1) });
        }
        if (i === 6) { // partita passata, Marco ha partecipato: per testare verifica presenza
          applications.push({ userId: "u1", status: "completed", appliedAt: hoursFromNow(-26) });
          applications.push({ userId: "u11", status: "completed", appliedAt: hoursFromNow(-25) });
        }
        return {
          id: "match-jogu-" + (100 + i).toString(36),
          sport: "calcio", format: r.format, total: r.total, base: r.base,
          zone: r.zone, city: "Milano", latlng: ZONES[r.zone],
          place: r.zone + (i % 2 === 0 ? " — Centro Sportivo Comunale" : " — Campo San Faustino"),
          date, level: r.level, cost: r.cost, pref: r.pref, notes: r.notes,
          organizerId: organizer.id, showPhone: r.showPhone,
          applications, waitlist: [],
          createdAt: hoursFromNow(-Math.abs(r.h) - 5),
        };
      });
    }

    const users = makeUsers();
    const matches = makeMatches(users);

    const notificationsSeed = [
      { icon: "⚡", key: "notifNearby", vars: { km: "1,6" }, read: false, h: -2 },
      { icon: "🏆", key: "notifBadge", vars: { badge: "Reliable" }, read: true, h: -30 },
    ];

    return {
      ZONES, km, POSITIONS, LEVELS, users, matches, notificationsSeed,
      findUser: (id) => users.find(u => u.id === id),
      findMatch: (id) => matches.find(m => m.id === id),
    };
  })();

  /* ==========================================================================
     STATE — stato runtime dell'app (in memoria)
     ========================================================================== */
  const State = {
    currentUser: null,           // oggetto utente loggato (o null)
    lang: "it",
    users: STORE.users,
    matches: STORE.matches,
    notifications: STORE.notificationsSeed.map((n, i) => ({ id: "n" + i, ...n, at: new Date(Date.now() + n.h * 3600000) })),
    filters: { distance: null, quick: new Set(), date: null, format: null, level: null, maxCost: null, missing: null },
    pendingMatchAfterAuth: null, // se un ospite prova a candidarsi, dopo login/registrazione torna qui
  };

  /* ==========================================================================
     AUTH — autenticazione simulata (nessun backend)
     ========================================================================== */
  const AUTH = {
    loginDemo() {
      State.currentUser = STORE.findUser("u1"); // Marco Ferrari, persona demo
      NOTIFY.push("⚡", "notifGameSaver", { n: 45 });
    },
    register({ name, email, zone, level, position }) {
      const initials = name.trim().split(/\s+/).map(p => p[0]).join("").toUpperCase().slice(0, 2) || "TU";
      const newUser = {
        id: "u" + (State.users.length + 1), name: name.trim() || "Nuovo Giocatore", initials,
        city: "Milano", zone: zone || "Centro", latlng: STORE.ZONES[zone] || STORE.ZONES["Centro"],
        level: level || "casual", position: position || "wildcard",
        rating: 0, matchesPlayed: 0, presenceRate: 100, confirmsRespected: 0, cancellations: 0,
        badges: [], phone: "", showPhone: false, matchesOrganized: 0, orgCompletionRate: 0,
        preferredFormat: "5v5", preferredDays: [0, 1, 2, 3, 4, 5, 6], isNew: true,
        email: email || "",
      };
      State.users.push(newUser);
      State.currentUser = newUser;
    },
    logout() { State.currentUser = null; location.hash = "#/"; },
    isAuthed() { return !!State.currentUser; },
  };

  /* ==========================================================================
     MATCHING — punteggio deterministico con pesi configurabili
     ========================================================================== */
  const MATCHING_WEIGHTS = { distance: 0.30, availability: 0.20, level: 0.20, format: 0.10, reliability: 0.10, preferences: 0.10 };
  const LEVEL_ORDER = ["beginner", "casual", "intermediate", "advanced"];

  const MATCHING = {
    distanceKm(user, match) { return STORE.km(user.latlng, match.latlng); },
    scoreDistance(km) { return Math.max(0, 1 - km / 8); },
    scoreAvailability(user, match) {
      const day = match.date.getDay();
      return (user.preferredDays || []).includes(day) ? 1 : 0.5;
    },
    scoreLevel(user, match) {
      const d = Math.abs(LEVEL_ORDER.indexOf(user.level) - LEVEL_ORDER.indexOf(match.level));
      return d === 0 ? 1 : d === 1 ? 0.7 : d === 2 ? 0.4 : 0.2;
    },
    scoreFormat(user, match) {
      const fmt = match.format;
      return user.preferredFormat === fmt ? 1 : 0.6;
    },
    scoreReliability(match) {
      const org = STORE.findUser(match.organizerId);
      return org ? Math.min(1, org.orgCompletionRate / 100) : 0.6;
    },
    scorePreferences(user, match) {
      if (!match.pref) return 1;
      return user.position === match.pref ? 1 : 0.5;
    },
    compute(user, match) {
      const dKm = this.distanceKm(user, match);
      const s = {
        distance: this.scoreDistance(dKm),
        availability: this.scoreAvailability(user, match),
        level: this.scoreLevel(user, match),
        format: this.scoreFormat(user, match),
        reliability: this.scoreReliability(match),
        preferences: this.scorePreferences(user, match),
      };
      const total = Object.keys(MATCHING_WEIGHTS).reduce((acc, k) => acc + s[k] * MATCHING_WEIGHTS[k], 0);
      return { percent: Math.round(total * 100), sub: s, km: dKm };
    },
    reasons(sub, match) {
      const r = [];
      if (sub.distance >= 0.6) r.push(t("reasonNear"));
      if (sub.level >= 0.7) r.push(t("reasonLevel"));
      if (sub.availability >= 1) r.push(t("reasonAvail"));
      if (sub.format >= 1) r.push(t("reasonFormat"));
      if (sub.reliability >= 0.85) r.push(t("reasonReliable"));
      if (match && match.pref && sub.preferences >= 1) r.push(t("reasonPref"));
      return r.slice(0, 3);
    }
  };

  /* ==========================================================================
     MATCH HELPERS — stato slot, urgenza, ordinamento
     ========================================================================== */
  const MATCH = {
    filled(match) {
      const approved = match.applications.filter(a => ["approved", "confirmed", "completed"].includes(a.status)).length;
      return Math.min(match.total, match.base + approved);
    },
    missing(match) { return Math.max(0, match.total - this.filled(match)); },
    isComplete(match) { return this.missing(match) <= 0; },
    isPast(match) { return match.date.getTime() < Date.now(); },
    hoursToStart(match) { return (match.date.getTime() - Date.now()) / 3600000; },
    urgency(match) {
      const missing = this.missing(match), h = this.hoursToStart(match);
      if (h < 0) return "past";
      if (missing <= 1 && h <= 2) return "high";
      if (missing <= 2 && h <= 48) return "mid";
      return "low";
    },
    urgencyLabel(level) { return { high: t("urgencyHigh"), mid: t("urgencyMid"), low: t("urgencyLow") }[level] || ""; },
    isGameSaver(match, user) {
      if (!user) return false;
      if (match.organizerId === user.id) return false;
      if (this.isParticipant(match, user.id)) return false;
      return this.urgency(match) === "high" && this.missing(match) === 1;
    },
    isParticipant(match, userId) {
      if (match.organizerId === userId) return true;
      return match.applications.some(a => a.userId === userId && ["approved", "confirmed", "completed"].includes(a.status));
    },
    myApplication(match, userId) { return match.applications.find(a => a.userId === userId); },
    whenLabel(match) {
      const h = this.hoursToStart(match);
      const opts = { hour: "2-digit", minute: "2-digit" };
      const timeStr = match.date.toLocaleTimeString(I18N.getLang() === "it" ? "it-IT" : "en-GB", opts);
      const now = new Date();
      const sameDay = match.date.toDateString() === now.toDateString();
      const tmr = new Date(now); tmr.setDate(now.getDate() + 1);
      const isTomorrow = match.date.toDateString() === tmr.toDateString();
      if (h < 0) return match.date.toLocaleDateString(I18N.getLang() === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "short" }) + " — " + timeStr;
      if (sameDay) return t("today") + " — " + timeStr;
      if (isTomorrow) return t("tomorrow") + " — " + timeStr;
      return match.date.toLocaleDateString(I18N.getLang() === "it" ? "it-IT" : "en-GB", { weekday: "short", day: "numeric", month: "short" }) + " — " + timeStr;
    },
    sortForDiscover(matches, user) {
      return matches
        .map(m => ({ m, score: user ? MATCHING.compute(user, m) : { percent: 0, km: 0 }, urg: this.urgency(m), miss: this.missing(m) }))
        .sort((a, b) => {
          if (b.score.percent !== a.score.percent) return b.score.percent - a.score.percent;
          if (a.score.km !== b.score.km) return a.score.km - b.score.km;
          const rank = { high: 2, mid: 1, low: 0 };
          if (rank[b.urg] !== rank[a.urg]) return rank[b.urg] - rank[a.urg];
          return a.miss - b.miss;
        })
        .map(x => x.m);
    }
  };

  /* ==========================================================================
     REPUTATION — presenze, affidabilità, livelli
     ========================================================================== */
  const REPUTATION = {
    // aggiorna la presenza con media pesata sullo storico: un singolo voto non stravolge il punteggio
    recordAttendance(user, showedUp) {
      const weight = 0.12;
      const eventVal = showedUp ? 100 : 0;
      user.presenceRate = Math.round(user.presenceRate * (1 - weight) + eventVal * weight);
      user.matchesPlayed += 1;
      if (showedUp) user.confirmsRespected += 1;
      user.rating = Math.max(1, Math.min(5, +(user.rating * 0.85 + (showedUp ? 5 : 2.5) * 0.15).toFixed(1)));
      BADGES.evaluate(user);
    },
    recordCancellation(user) {
      // una singola rinuncia anticipata non penalizza in modo significativo
      user.cancellations += 1;
      if (user.cancellations % 3 === 0) user.presenceRate = Math.max(0, user.presenceRate - 4);
    },
    levelTag(user) {
      const m = user.matchesPlayed, p = user.presenceRate;
      if (m >= 50 && p >= 95) return "legend";
      if (m >= 30 && p >= 90) return "veteran";
      if (m >= 15 && p >= 85) return "reliableLvl";
      if (m >= 5) return "regular";
      return "rookie";
    },
    levelIcon(tag) { return { rookie: "🥉", regular: "🥈", reliableLvl: "🥇", veteran: "🔥", legend: "👑" }[tag] || "🥉"; },
    levelProgress(user) {
      const thresholds = [0, 5, 15, 30, 50];
      const m = user.matchesPlayed;
      let idx = 0;
      thresholds.forEach((th, i) => { if (m >= th) idx = i; });
      return Math.min(4, idx);
    }
  };

  /* ==========================================================================
     BADGES
     ========================================================================== */
  const BADGE_DEFS = {
    ironManB: { icon: "🛡️", nameIt: "Iron Man", nameEn: "Iron Man", descIt: "10 partite consecutive senza assenze.", descEn: "10 straight matches with no no-shows." },
    gameSaverB: { icon: "⚡", nameIt: "Game Saver", nameEn: "Game Saver", descIt: "Ha salvato una partita urgente.", descEn: "Saved an urgent match." },
    teamPlayerB: { icon: "🤝", nameIt: "Team Player", nameEn: "Team Player", descIt: "25 partite completate.", descEn: "25 completed matches." },
    reliableB: { icon: "🎯", nameIt: "Reliable", nameEn: "Reliable", descIt: "95%+ di presenza.", descEn: "95%+ attendance." },
    lastMinuteB: { icon: "🔥", nameIt: "Last Minute", nameEn: "Last Minute", descIt: "Completata con candidatura dell'ultimo momento.", descEn: "Completed a match with a last-minute application." },
    organizerB: { icon: "👑", nameIt: "Organizer", nameEn: "Organizer", descIt: "Numerose partite organizzate e completate.", descEn: "Organized many completed matches." },
    legendB: { icon: "🌟", nameIt: "Legend", nameEn: "Legend", descIt: "Livello Legend raggiunto.", descEn: "Reached Legend level." },
  };
  const BADGES = {
    def: BADGE_DEFS,
    label(id) { const d = BADGE_DEFS[id]; if (!d) return ""; return I18N.getLang() === "it" ? d.nameIt : d.nameEn; },
    evaluate(user) {
      const before = new Set(user.badges);
      if (user.presenceRate >= 95 && !before.has("reliableB")) user.badges.push("reliableB");
      if (user.matchesPlayed >= 25 && !before.has("teamPlayerB")) user.badges.push("teamPlayerB");
      if (user.matchesOrganized >= 5 && !before.has("organizerB")) user.badges.push("organizerB");
      if (REPUTATION.levelTag(user) === "legend" && !before.has("legendB")) user.badges.push("legendB");
      const gained = user.badges.filter(b => !before.has(b));
      gained.forEach(b => NOTIFY.push("🏆", "notifBadge", { badge: this.label(b) }));
      return gained;
    },
    award(user, id) {
      if (!user.badges.includes(id)) { user.badges.push(id); NOTIFY.push("🏆", "notifBadge", { badge: this.label(id) }); }
    }
  };

  /* ==========================================================================
     NOTIFY — notifiche poche e pertinenti
     ========================================================================== */
  const NOTIFY = {
    push(icon, key, vars) {
      State.notifications.unshift({ id: "n" + Date.now() + Math.random().toString(36).slice(2, 6), icon, key, vars: vars || {}, read: false, at: new Date() });
    },
    unreadCount() { return State.notifications.filter(n => !n.read).length; },
    markAllRead() { State.notifications.forEach(n => n.read = true); }
  };

  /* ==========================================================================
     SHARE — condivisione nativa con fallback clipboard
     ========================================================================== */
  const SHARE = {
    matchLink(match) { return location.origin + location.pathname + "#/match/" + match.id; },
    async shareMatch(match) {
      const missing = MATCH.missing(match);
      const missingText = missing <= 1 ? t("shareOneMissing") : t("shareNMissing", { n: missing });
      const text = t("shareMsg", { missingText, place: match.zone + ", " + match.city, when: MATCH.whenLabel(match), link: this.matchLink(match) });
      if (navigator.share) {
        try { await navigator.share({ title: "JOGU", text }); return true; } catch (e) { return false; }
      }
      try { await navigator.clipboard.writeText(text); UI.toast(t("linkCopied"), "success"); return true; }
      catch (e) { UI.toast(t("linkCopied"), "success"); return true; }
    },
    async inviteFriends() {
      const text = I18N.getLang() === "it"
        ? "La prossima volta che vi manca qualcuno, non fate saltare la partita. Entra su JOGU 👇\n" + location.origin + location.pathname
        : "Next time you're short one, don't cancel the match. Join JOGU 👇\n" + location.origin + location.pathname;
      if (navigator.share) { try { await navigator.share({ title: "JOGU", text }); return; } catch (e) { } }
      try { await navigator.clipboard.writeText(text); UI.toast(t("linkCopied"), "success"); } catch (e) { }
    }
  };

  /* ==========================================================================
     ROUTER — hash routing
     ========================================================================== */
  const ROUTER = {
    start() {
      window.addEventListener("hashchange", () => this.render());
      if (!location.hash) location.hash = "#/";
      this.render();
    },
    parse() {
      const hash = location.hash.replace(/^#/, "") || "/";
      const parts = hash.split("/").filter(Boolean);
      return { path: parts[0] || "", param: parts[1] || null };
    },
    go(path) { location.hash = "#" + path; },
    render() {
      const { path, param } = this.parse();
      const authed = AUTH.isAuthed();

      if (path === "match" && param) { UI.renderMatchDetail(param); return; }
      if (!authed) {
        if (path === "login") { UI.renderLogin(); return; }
        if (path === "register") { UI.renderRegister(); return; }
        UI.renderLanding();
        return;
      }
      switch (path) {
        case "": case "home": UI.renderHome(); break;
        case "discover": UI.renderDiscover(); break;
        case "create": UI.renderCreate(); break;
        case "my-matches": UI.renderMyMatches(); break;
        case "profile": UI.renderProfile(param || State.currentUser.id); break;
        case "notifications": UI.renderNotifications(); break;
        default: UI.renderHome();
      }
    }
  };

  /* ==========================================================================
     UI — rendering di tutte le schermate
     ========================================================================== */
  const app = document.getElementById("app");
  const toastStack = document.getElementById("toast-stack");

  function esc(s) { return (s || "").toString().replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function fmtDate(d) { return d.toLocaleDateString(I18N.getLang() === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "long" }); }
  function fmtTime(d) { return d.toLocaleTimeString(I18N.getLang() === "it" ? "it-IT" : "en-GB", { hour: "2-digit", minute: "2-digit" }); }

  const UI = {
    toast(msg, type) {
      const el = document.createElement("div");
      el.className = "toast " + (type || "");
      el.textContent = msg;
      toastStack.appendChild(el);
      setTimeout(() => el.remove(), 2600);
    },

    celebrate() {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const overlay = document.createElement("div");
      overlay.className = "celebrate-overlay";
      overlay.innerHTML = `<div class="celebrate-card"><div class="big">🎉</div><h2>${t("matchCompleteCelebrate")}</h2><p>${t("matchCompleteSub")}</p></div>`;
      document.body.appendChild(overlay);
      overlay.addEventListener("click", () => overlay.remove());
      setTimeout(() => overlay.remove(), reduced ? 900 : 2200);
    },

    openSheet(innerHtml) {
      const overlay = document.createElement("div");
      overlay.className = "overlay";
      overlay.id = "sheet-overlay";
      overlay.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><div class="sheet-handle"></div>${innerHtml}</div>`;
      overlay.addEventListener("click", (e) => { if (e.target === overlay) UI.closeSheet(); });
      document.body.appendChild(overlay);
      const first = overlay.querySelector("[data-autofocus]") || overlay.querySelector("button,input");
      if (first) first.focus();
      document.addEventListener("keydown", UI._escHandler = (e) => { if (e.key === "Escape") UI.closeSheet(); });
      return overlay;
    },
    closeSheet() {
      const el = document.getElementById("sheet-overlay");
      if (el) el.remove();
      if (UI._escHandler) document.removeEventListener("keydown", UI._escHandler);
    },

    /* ---------------- Chrome comune (topbar + bottom nav) ---------------- */
    chrome(activePath, innerHtml) {
      const u = State.currentUser;
      const unread = NOTIFY.unreadCount();
      const langBtns = ["it", "en"].map(l => `<button class="${I18N.getLang() === l ? "active" : ""}" data-lang="${l}">${l.toUpperCase()}</button>`).join("");
      return `
      <header class="topbar">
        <a href="#/home" class="brand" aria-label="JOGU home"><img src="icon.svg" alt=""/> JOGU</a>
        <div class="topbar-right">
          <div class="lang-switch" role="group" aria-label="Lingua">${langBtns}</div>
          <button class="icon-btn" data-nav="notifications" aria-label="${t("notifications")}">🔔${unread ? '<span class="badge-dot"></span>' : ""}</button>
          <a class="topbar-user" href="#/profile" aria-label="${t("profile")}">
            <span class="avatar sm">${esc(u.initials)}</span>
            <span class="lvl">${REPUTATION.levelIcon(REPUTATION.levelTag(u))} ${u.rating || "—"}</span>
          </a>
        </div>
      </header>
      <main class="screen">${innerHtml}</main>
      <nav class="bottom-nav" aria-label="Navigazione principale">
        <a href="#/home" class="${activePath === "home" ? "active" : ""}"><span class="ic">🏠</span>${t("home")}</a>
        <a href="#/discover" class="${activePath === "discover" ? "active" : ""}"><span class="ic">🔎</span>${t("discover")}</a>
        <a href="#/create" class="create"><span class="ic">⚽</span>${t("create")}</a>
        <a href="#/my-matches" class="${activePath === "my-matches" ? "active" : ""}"><span class="ic">📋</span>${t("myMatches")}</a>
        <a href="#/profile" class="${activePath === "profile" ? "active" : ""}"><span class="ic">👤</span>${t("profile")}</a>
      </nav>`;
    },

    mount(html) {
      app.innerHTML = html;
      app.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => {
        I18N.setLang(b.dataset.lang); State.lang = b.dataset.lang; ROUTER.render(); UI.toast(t("toastLangChanged"));
      }));
      app.querySelectorAll("[data-nav]").forEach(b => b.addEventListener("click", () => ROUTER.go("/" + b.dataset.nav)));
    },

    /* ---------------- LANDING (non autenticato) ---------------- */
    renderLanding() {
      const html = `
      <div class="landing">
        <div class="landing-nav">
          <div class="brand"><img src="icon.svg" alt=""/> JOGU</div>
          <div class="flex gap-8">
            <div class="lang-switch">
              <button class="${I18N.getLang() === "it" ? "active" : ""}" data-lang="it">IT</button>
              <button class="${I18N.getLang() === "en" ? "active" : ""}" data-lang="en">EN</button>
            </div>
            <button class="btn btn-ghost btn-sm" data-nav2="login">${t("login")}</button>
          </div>
        </div>
        <div class="landing-hero">
          <span class="eyebrow">⚽ ${t("appName")} — Amateur football, completed.</span>
          <h1 class="payoff">${t("heroPayoffLead")} <span class="accent">${t("heroPayoffAccent")}</span></h1>
          <p class="sub">${t("landingSub")}</p>
          <div class="landing-cta-row">
            <button class="btn btn-primary" data-nav2="register">${t("getStarted")}</button>
            <button class="btn btn-ghost" data-nav2="login">${t("alreadyMember")}</button>
          </div>
        </div>
        <div class="landing-strip">
          <div class="card">🔥 <b>12</b> ${t("spotsFilledToday")}</div>
          <div class="card">⚡ <b>7</b> ${t("matchesCompletedWeek")}</div>
          <div class="card">👥 <b>24</b> ${t("activePlayersZone")}</div>
          <div class="card text-muted text-sm">${t("demoDataNote")} · Milano</div>
        </div>
      </div>`;
      app.innerHTML = html;
      app.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => { I18N.setLang(b.dataset.lang); UI.renderLanding(); }));
      app.querySelectorAll("[data-nav2]").forEach(b => b.addEventListener("click", () => ROUTER.go("/" + b.dataset.nav2)));
    },

    /* ---------------- LOGIN ---------------- */
    renderLogin() {
      const html = `
      <div class="auth-wrap">
        <div class="auth-card">
          <div class="auth-hero">
            <div class="logo-row"><img src="icon.svg" alt=""/><strong style="font-family:var(--font-display);font-size:1.3rem;">JOGU</strong></div>
            <h1>${t("welcomeBack")}</h1>
            <p>${t("loginSub")}</p>
          </div>
          <div class="card">
            <form id="login-form">
              <div class="field"><label for="l-email">${t("email")}</label><input data-autofocus id="l-email" type="email" required placeholder="marco@email.it"/></div>
              <div class="field"><label for="l-pass">${t("password")}</label><input id="l-pass" type="password" required placeholder="••••••••"/></div>
              <button class="btn btn-primary btn-block" type="submit">${t("login")}</button>
            </form>
            <div class="divider-text">${t("or")}</div>
            <div class="social-row">
              <button class="btn btn-ghost btn-block" id="google-login">🟢 ${t("continueGoogle")}</button>
              <button class="btn btn-ghost btn-block" id="fb-login">🔵 ${t("continueFacebook")}</button>
            </div>
          </div>
          <div class="auth-switch">${t("noAccount")} <button class="link-btn" data-nav2="register">${t("register")}</button></div>
        </div>
      </div>`;
      app.innerHTML = html;
      const doLogin = () => {
        AUTH.loginDemo();
        UI.toast(t("welcomeBack") + ", " + State.currentUser.name.split(" ")[0], "success");
        ROUTER.go(State.pendingMatchAfterAuth ? "/match/" + State.pendingMatchAfterAuth : "/home");
        State.pendingMatchAfterAuth = null;
      };
      app.querySelector("#login-form").addEventListener("submit", (e) => { e.preventDefault(); doLogin(); });
      app.querySelector("#google-login").addEventListener("click", doLogin);
      app.querySelector("#fb-login").addEventListener("click", doLogin);
      app.querySelectorAll("[data-nav2]").forEach(b => b.addEventListener("click", () => ROUTER.go("/" + b.dataset.nav2)));
    },

    /* ---------------- REGISTER ---------------- */
    renderRegister() {
      const levelOpts = STORE.LEVELS.map(l => `<option value="${l}">${t(l)}</option>`).join("");
      const posOpts = STORE.POSITIONS.map(p => `<option value="${p}">${t(p)}</option>`).join("");
      const zoneOpts = Object.keys(STORE.ZONES).map(z => `<option value="${z}">${z}</option>`).join("");
      const html = `
      <div class="auth-wrap">
        <div class="auth-card">
          <div class="auth-hero">
            <div class="logo-row"><img src="icon.svg" alt=""/><strong style="font-family:var(--font-display);font-size:1.3rem;">JOGU</strong></div>
            <h1>${t("createAccount")}</h1>
            <p>${t("registerSub")}</p>
          </div>
          <div class="card">
            <form id="reg-form">
              <div class="field"><label for="r-name">${t("name")}</label><input data-autofocus id="r-name" type="text" required placeholder="Il tuo nome"/></div>
              <div class="field"><label for="r-email">${t("email")}</label><input id="r-email" type="email" required placeholder="tuo@email.it"/></div>
              <div class="field"><label for="r-pass">${t("password")}</label><input id="r-pass" type="password" required placeholder="••••••••"/></div>
              <div class="field"><label for="r-zone">${t("zone")}</label><select id="r-zone">${zoneOpts}</select></div>
              <div class="field"><label for="r-level">${t("level")}</label><select id="r-level">${levelOpts}</select></div>
              <div class="field"><label for="r-pos">${t("position")}</label><select id="r-pos">${posOpts}</select></div>
              <button class="btn btn-primary btn-block" type="submit">${t("createAccount")}</button>
            </form>
          </div>
          <div class="auth-switch">${t("hasAccount")} <button class="link-btn" data-nav2="login">${t("login")}</button></div>
        </div>
      </div>`;
      app.innerHTML = html;
      app.querySelector("#reg-form").addEventListener("submit", (e) => {
        e.preventDefault();
        AUTH.register({
          name: app.querySelector("#r-name").value, email: app.querySelector("#r-email").value,
          zone: app.querySelector("#r-zone").value, level: app.querySelector("#r-level").value,
          position: app.querySelector("#r-pos").value,
        });
        UI.toast(t("createAccount") + " ✓", "success");
        ROUTER.go(State.pendingMatchAfterAuth ? "/match/" + State.pendingMatchAfterAuth : "/home");
        State.pendingMatchAfterAuth = null;
      });
      app.querySelectorAll("[data-nav2]").forEach(b => b.addEventListener("click", () => ROUTER.go("/" + b.dataset.nav2)));
    },

    /* ---------------- HOME ---------------- */
    renderHome() {
      const u = State.currentUser;
      const myOpenMatch = State.matches.find(m => m.organizerId === u.id && !MATCH.isComplete(m) && !MATCH.isPast(m));
      const myUpcomingApproved = State.matches.find(m => MATCH.myApplication(m, u.id) && ["approved", "confirmed"].includes(MATCH.myApplication(m, u.id).status) && !MATCH.isPast(m));
      const opportunities = State.matches.filter(m => !MATCH.isPast(m) && !MATCH.isComplete(m) && m.organizerId !== u.id && !MATCH.isParticipant(m, u.id));
      const gameSaverMatch = opportunities.find(m => MATCH.isGameSaver(m, u));

      let banner = "";
      if (myOpenMatch) {
        const missing = MATCH.missing(myOpenMatch);
        banner = `<div class="status-banner urgent"><div class="txt"><strong>🔴 ${missing === 1 ? t("yourMatchOne") : t("yourMatchEmpty", { n: missing })}</strong><span>${myOpenMatch.zone} · ${MATCH.whenLabel(myOpenMatch)}</span></div><button class="btn btn-urgent btn-sm" data-go="/match/${myOpenMatch.id}">${t("seeApplications")}</button></div>`;
      } else if (myUpcomingApproved) {
        banner = `<div class="status-banner ok"><div class="txt"><strong>⚽ ${t("nextMatch")}</strong><span>${MATCH.whenLabel(myUpcomingApproved)} — ${MATCH.filled(myUpcomingApproved)}/${myUpcomingApproved.total}</span></div><button class="btn btn-primary btn-sm" data-go="/match/${myUpcomingApproved.id}">${t("viewMatch")}</button></div>`;
      } else if (opportunities.length) {
        banner = `<div class="status-banner neutral"><div class="txt"><strong>🔥 ${t("opportunitiesNear", { n: opportunities.length })}</strong><span>${t("demoDataNote")} · Milano</span></div><button class="btn btn-primary btn-sm" data-go="/discover">${t("discover")}</button></div>`;
      } else {
        banner = `<div class="status-banner neutral"><div class="txt"><strong>${t("noMatchYet")}</strong><span>${t("noMatchYetSub")}</span></div></div>`;
      }

      const gameSaverBlock = gameSaverMatch ? `
        <div class="card mt-16" style="border-color:rgba(255,154,61,0.5);box-shadow:var(--shadow-glow-orange);">
          <span class="eyebrow">⚡ ${t("gameSaverCta")}</span>
          <h3 class="mt-8">${t(gameSaverMatch.format === "5v5" ? "stepFormat5" : gameSaverMatch.format === "7v7" ? "stepFormat7" : gameSaverMatch.format === "8v8" ? "stepFormat8" : "stepFormat11")} · ${gameSaverMatch.zone}</h3>
          <p class="text-muted text-sm mt-8">${MATCHING.distanceKm(u, gameSaverMatch).toFixed(1)} km · ${t("gameSaverMinutes", { n: Math.max(1, Math.round(MATCH.hoursToStart(gameSaverMatch) * 60)) })}</p>
          <button class="btn btn-urgent btn-block mt-16" data-go="/match/${gameSaverMatch.id}">${t("saveMatch")}</button>
        </div>` : "";

      const needSection = opportunities.length ? `
        <div class="section-title"><h2>🔥 ${t("needsYouSection")}</h2><span class="see-all" data-go="/discover">${t("seeAll")} →</span></div>
        <div class="match-list">${MATCH.sortForDiscover(opportunities, u).slice(0, 3).map(m => UI.matchCardHtml(m, u)).join("")}</div>
      ` : "";

      const html = UI.chrome("home", `
        <div class="home-greeting">
          <h1>${t("welcomeBack")}, ${esc(u.name.split(" ")[0])}</h1>
          <p>${t("whatToDo")}</p>
        </div>
        ${banner}
        <div class="cta-grid">
          <button class="cta-big fire" data-go="/create"><span class="cta-icon">🔥</span><h3>${t("missingPlayersTitle")}</h3><p>${t("missingPlayersSub")}</p></button>
          <button class="cta-big play" data-go="/discover"><span class="cta-icon">⚽</span><h3>${t("wantToPlayTitle")}</h3><p>${t("wantToPlaySub")}</p></button>
        </div>
        ${gameSaverBlock}
        ${needSection}
        <div class="section-title"><h2>${t("demoDataNote")}</h2></div>
        <div class="social-proof-row">
          <div class="card">🔥 <b>12</b> ${t("spotsFilledToday")}</div>
          <div class="card">⚡ <b>7</b> ${t("matchesCompletedWeek")}</div>
          <div class="card">👥 <b>24</b> ${t("activePlayersZone")}</div>
        </div>
      `);
      UI.mount(html);
      app.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => ROUTER.go(b.dataset.go)));
    },

    /* ---------------- MATCH CARD (componente riusabile) ---------------- */
    matchCardHtml(m, user) {
      const filled = MATCH.filled(m), total = m.total, missing = MATCH.missing(m);
      const urg = MATCH.urgency(m);
      const pct = Math.round((filled / total) * 100);
      const score = user ? MATCHING.compute(user, m) : null;
      const saver = MATCH.isGameSaver(m, user);
      const formatKey = { "5v5": "stepFormat5", "7v7": "stepFormat7", "8v8": "stepFormat8", "11v11": "stepFormat11" }[m.format] || "custom";
      return `
      <article class="match-card ${saver ? "saver" : ""}" data-go="/match/${m.id}" tabindex="0" role="button" aria-label="${esc(m.zone)}">
        <div class="match-card-top">
          <span class="pill ${urg === "high" ? "high" : urg === "mid" ? "mid" : "low"}">${missing === 1 ? "🔥 " + t("missingOne") : missing === 0 ? "✅ " + t("matchComplete") : "🔥 " + t("missingN", { n: missing })}</span>
          ${score ? `<span class="match-badge match-score">${t("matchPercent", { n: score.percent })}</span>` : ""}
        </div>
        <div class="match-card-meta">
          <span>⚽ ${t(formatKey)}</span>
          <span>📍 ${score ? score.km.toFixed(1) + " km" : m.zone}</span>
          <span>🕗 ${MATCH.whenLabel(m)}</span>
          <span>🎯 ${t(m.level)}</span>
        </div>
        <div class="match-card-bottom">
          <div class="progress-wrap">
            <div class="progress-track"><div class="progress-fill ${missing > 0 && missing <= 1 ? "high-need" : ""}" style="width:${pct}%"></div></div>
            <span class="progress-count">${filled}/${total}</span>
          </div>
        </div>
      </article>`;
    },

    /* ---------------- CREATE MATCH ---------------- */
    renderCreate() {
      const state = { format: "5v5", total: 10, base: 8, level: "casual", showPhone: true };
      const formats = [["5v5", "stepFormat5"], ["7v7", "stepFormat7"], ["8v8", "stepFormat8"], ["11v11", "stepFormat11"], ["custom", "custom"]];
      const levels = STORE.LEVELS;
      const zoneOpts = Object.keys(STORE.ZONES).map(z => `<option value="${z}">${z}</option>`).join("");
      const posOpts = `<option value="">—</option>` + STORE.POSITIONS.map(p => `<option value="${p}">${t(p)}</option>`).join("");

      const inner = `
        <h1>${t("missingPlayersTitle")}</h1>
        <form id="create-form" class="mt-16">
          <div class="field"><label>${t("format")}</label>
            <div class="chip-group" id="fmt-chips">${formats.map(([v, k]) => `<button type="button" class="chip ${v === state.format ? "active" : ""}" data-fmt="${v}">${t(k)}</button>`).join("")}</div>
          </div>
          <div class="filters-panel">
            <div class="row2">
              <div class="field"><label for="c-date">${t("date")}</label><input id="c-date" type="date" required/></div>
              <div class="field"><label for="c-time">${t("time")}</label><input id="c-time" type="time" required value="20:30"/></div>
            </div>
          </div>
          <div class="field"><label for="c-place">${t("place")}</label><input id="c-place" type="text" placeholder="Centro Sportivo..." required/></div>
          <div class="field"><label for="c-zone">${t("zone")}</label><select id="c-zone">${zoneOpts}</select></div>
          <div class="row2">
            <div class="field"><label for="c-total">${t("totalPlayers")}</label><input id="c-total" type="number" min="2" max="30" value="10"/></div>
            <div class="field"><label for="c-base">${t("alreadyIn")}</label><input id="c-base" type="number" min="0" max="30" value="8"/></div>
          </div>
          <div class="card text-center">
            <span class="eyebrow">${t("howManyMissing")}</span>
            <div class="stepper">
              <button type="button" id="dec">−</button>
              <span class="value" id="missing-val">2</span>
              <button type="button" id="inc">+</button>
            </div>
            <p id="youare-line">${t("youAre", { filled: 8, total: 10 })}<br><strong>${t("missingN", { n: 2 })}</strong></p>
          </div>
          <div class="field mt-16"><label>${t("level")}</label>
            <div class="chip-group">${levels.map(l => `<button type="button" class="chip ${l === state.level ? "active" : ""}" data-level="${l}">${t(l)}</button>`).join("")}</div>
          </div>
          <div class="row2">
            <div class="field"><label for="c-cost">${t("costOptional")}</label><input id="c-cost" type="number" min="0" placeholder="5"/></div>
            <div class="field"><label for="c-pos">${t("preferredPosOptional")}</label><select id="c-pos">${posOpts}</select></div>
          </div>
          <div class="field"><label for="c-notes">${t("notes")}</label><textarea id="c-notes" placeholder="..."></textarea></div>
          <div class="field"><label for="c-phone">${t("phoneOptional")}</label><input id="c-phone" type="tel" placeholder="+39 3xxxxxxxxx"/></div>
          <div class="checkbox-row mt-8"><input type="checkbox" id="c-showphone" checked/><label for="c-showphone">${t("showPhoneApproved")}</label></div>
          <button class="btn btn-primary btn-block mt-24" type="submit">${t("publish")}</button>
        </form>`;

      UI.mount(UI.chrome("create", inner));

      const totalInput = app.querySelector("#c-total"), baseInput = app.querySelector("#c-base");
      const missingVal = app.querySelector("#missing-val"), youareLine = app.querySelector("#youare-line");
      function syncStepper() {
        const total = Math.max(1, +totalInput.value || 0);
        let base = Math.min(total, Math.max(0, +baseInput.value || 0));
        baseInput.value = base;
        const missing = total - base;
        missingVal.textContent = missing;
        youareLine.innerHTML = `${t("youAre", { filled: base, total })}<br><strong>${missing === 1 ? t("missingOne") : t("missingN", { n: missing })}</strong>`;
      }
      totalInput.addEventListener("input", syncStepper);
      baseInput.addEventListener("input", syncStepper);
      app.querySelector("#dec").addEventListener("click", () => { baseInput.value = Math.min(+totalInput.value, (+baseInput.value || 0) + 1); syncStepper(); });
      app.querySelector("#inc").addEventListener("click", () => { baseInput.value = Math.max(0, (+baseInput.value || 0) - 1); syncStepper(); });
      syncStepper();

      app.querySelectorAll("[data-fmt]").forEach(b => b.addEventListener("click", () => {
        app.querySelectorAll("[data-fmt]").forEach(x => x.classList.remove("active")); b.classList.add("active"); state.format = b.dataset.fmt;
      }));
      app.querySelectorAll("[data-level]").forEach(b => b.addEventListener("click", () => {
        app.querySelectorAll("[data-level]").forEach(x => x.classList.remove("active")); b.classList.add("active"); state.level = b.dataset.level;
      }));

      // default alla data odierna
      const dateInput = app.querySelector("#c-date");
      dateInput.value = new Date().toISOString().slice(0, 10);

      app.querySelector("#create-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const total = Math.max(1, +totalInput.value || 10);
        const base = Math.min(total, Math.max(0, +baseInput.value || 0));
        const dateStr = app.querySelector("#c-date").value, timeStr = app.querySelector("#c-time").value || "20:30";
        const dt = new Date(dateStr + "T" + timeStr + ":00");
        const zone = app.querySelector("#c-zone").value;
        const newMatch = {
          id: "match-jogu-" + Math.random().toString(36).slice(2, 8),
          sport: "calcio", format: state.format, total, base, zone, city: "Milano",
          latlng: STORE.ZONES[zone], place: app.querySelector("#c-place").value || zone,
          date: dt, level: state.level, cost: app.querySelector("#c-cost").value ? +app.querySelector("#c-cost").value : null,
          pref: app.querySelector("#c-pos").value, notes: app.querySelector("#c-notes").value,
          organizerId: State.currentUser.id, showPhone: app.querySelector("#c-showphone").checked,
          phone: app.querySelector("#c-phone").value, applications: [], waitlist: [], createdAt: new Date(),
        };
        State.matches.unshift(newMatch);
        State.currentUser.matchesOrganized += 1;
        UI.toast(t("toastPublished"), "success");
        UI.renderPublished(newMatch);
      });
    },

    renderPublished(m) {
      const filled = MATCH.filled(m), missing = MATCH.missing(m);
      const formatKey = { "5v5": "stepFormat5", "7v7": "stepFormat7", "8v8": "stepFormat8", "11v11": "stepFormat11" }[m.format] || "custom";
      const inner = `
        <div class="text-center mt-16">
          <span class="eyebrow">✅ ${t("matchOnline")}</span>
          <div class="match-hero mt-16 text-center">
            <h1>⚽ ${t(formatKey)}</h1>
            <p class="text-muted">📍 ${esc(m.zone)}, ${esc(m.city)}<br>📅 ${fmtDate(m.date)} · 🕗 ${fmtTime(m.date)}</p>
            <div class="big-count mt-16">${filled}/${m.total}</div>
            <span class="pill ${missing <= 1 ? "high" : missing <= 2 ? "mid" : "low"}">${missing === 1 ? "🔥 " + t("missingOne") : "🔥 " + t("missingN", { n: missing })}</span>
          </div>
          <button class="btn btn-primary btn-block" id="share-btn">${t("shareFind")}</button>
          <button class="btn btn-ghost btn-block mt-12" data-go="/match/${m.id}">${t("seeApplications")}</button>
        </div>`;
      UI.mount(UI.chrome("create", inner));
      app.querySelector("#share-btn").addEventListener("click", () => SHARE.shareMatch(m));
      app.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => ROUTER.go(b.dataset.go)));
    },

    /* ---------------- DISCOVER ---------------- */
    renderDiscover() {
      const u = State.currentUser;
      const f = State.filters;
      let pool = State.matches.filter(m => !MATCH.isPast(m) && !MATCH.isComplete(m) && m.organizerId !== u.id);

      if (f.quick.has("d1")) pool = pool.filter(m => MATCHING.distanceKm(u, m) <= 1);
      if (f.quick.has("d3")) pool = pool.filter(m => MATCHING.distanceKm(u, m) <= 3);
      if (f.quick.has("d5")) pool = pool.filter(m => MATCHING.distanceKm(u, m) <= 5);
      if (f.quick.has("today")) pool = pool.filter(m => m.date.toDateString() === new Date().toDateString());
      if (f.quick.has("tomorrow")) { const tmr = new Date(); tmr.setDate(tmr.getDate() + 1); pool = pool.filter(m => m.date.toDateString() === tmr.toDateString()); }
      if (f.quick.has("week")) { const weekMs = 7 * 24 * 3600 * 1000; pool = pool.filter(m => m.date.getTime() - Date.now() <= weekMs); }
      if (f.quick.has("m1")) pool = pool.filter(m => MATCH.missing(m) === 1);
      if (f.quick.has("m2")) pool = pool.filter(m => MATCH.missing(m) >= 2);
      if (f.level) pool = pool.filter(m => m.level === f.level);
      if (f.format) pool = pool.filter(m => m.format === f.format);
      if (f.maxCost) pool = pool.filter(m => !m.cost || m.cost <= f.maxCost);

      const sorted = MATCH.sortForDiscover(pool, u);
      const quick = [["d1", "within1"], ["d3", "within3"], ["d5", "within5"], ["today", "today"], ["tomorrow", "tomorrow"], ["week", "thisWeek"], ["m1", "missing1"], ["m2", "missing2plus"]];

      const inner = `
        <h1>${t("wantToPlayTitle")}</h1>
        <div class="filters-bar mt-16">${quick.map(([k, lbl]) => `<button class="chip ${f.quick.has(k) ? "active" : ""}" data-quick="${k}">${t(lbl)}</button>`).join("")}</div>
        <div class="section-title"><h2>🔥 ${t("matchesNeedYou")}</h2></div>
        <div class="match-list">
          ${sorted.length ? sorted.map(m => UI.matchCardHtml(m, u)).join("") : `<div class="empty-state"><div class="ic">🔍</div><p>${t("noMatches")}</p><p class="text-sm">${t("tryDifferentFilters")}</p></div>`}
        </div>`;
      UI.mount(UI.chrome("discover", inner));
      app.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => ROUTER.go(b.dataset.go)));
      app.querySelectorAll("[data-quick]").forEach(b => b.addEventListener("click", () => {
        const k = b.dataset.quick;
        if (f.quick.has(k)) f.quick.delete(k); else f.quick.add(k);
        UI.renderDiscover();
      }));
    },

    /* ---------------- MATCH DETAIL ---------------- */
    renderMatchDetail(id) {
      const m = STORE.findMatch(id);
      const authed = AUTH.isAuthed();
      if (!m) {
        const inner = `<div class="empty-state"><div class="ic">⚽</div><h2>${t("matchNotFound")}</h2><button class="btn btn-primary mt-16" data-go="/home">${t("backHome")}</button></div>`;
        if (authed) { UI.mount(UI.chrome("", inner)); app.querySelector("[data-go]").addEventListener("click", () => ROUTER.go("/home")); }
        else { app.innerHTML = `<div class="screen">${inner}</div>`; app.querySelector("[data-go]").addEventListener("click", () => ROUTER.go("/")); }
        return;
      }
      const org = STORE.findUser(m.organizerId);
      const u = State.currentUser;
      const filled = MATCH.filled(m), missing = MATCH.missing(m), complete = MATCH.isComplete(m);
      const urg = MATCH.urgency(m);
      const formatKey = { "5v5": "stepFormat5", "7v7": "stepFormat7", "8v8": "stepFormat8", "11v11": "stepFormat11" }[m.format] || "custom";
      const score = u ? MATCHING.compute(u, m) : null;
      const isOrganizer = u && u.id === m.organizerId;
      const myApp = u && MATCH.myApplication(m, u.id);
      const isParticipant = u && MATCH.isParticipant(m, u.id);
      const isPast = MATCH.isPast(m);

      let ctaBlock = "";
      if (!authed) {
        ctaBlock = `<p class="text-muted text-sm mt-8">${t("loginRequired")}</p><button class="btn btn-primary btn-block mt-12" id="cta-login">${t("wantToPlayCta")}</button>`;
      } else if (isOrganizer && !isPast) {
        ctaBlock = `<button class="btn btn-primary btn-block" id="share-btn">${t("shareFind")}</button>`;
      } else if (isParticipant && !isPast) {
        ctaBlock = `<button class="btn btn-danger btn-block" id="cancel-btn">${t("cantComeAnymore")}</button>`;
      } else if (myApp && myApp.status === "pending" && !isPast) {
        ctaBlock = `<div class="pill mid">⏳ ${t("statusPending")}</div><button class="link-btn mt-12" id="sim-approve">${t("demoSimulateApproval")}</button>`;
      } else if (myApp && myApp.status === "rejected") {
        ctaBlock = `<div class="pill high">${t("statusRejected")}</div>`;
      } else if (complete && !isPast) {
        ctaBlock = `<button class="btn btn-ghost btn-block" id="waitlist-btn">${t("joinWaitlist")}</button>`;
      } else if (!isPast) {
        ctaBlock = `<button class="btn btn-primary btn-block" id="apply-btn">${t(missing === 1 ? "wantToPlayCta" : "wantToPlayCta")}</button>`;
      }

      const phoneBlock = (isParticipant && m.showPhone && org && org.phone)
        ? `<p class="text-sm mt-8">📞 ${t("organizerPhone")}: <strong>${esc(org.phone)}</strong></p>`
        : (u && !isParticipant && !isOrganizer ? `<p class="text-sm text-muted mt-8">🔒 ${t("phoneVisibleAfterApproval")}</p>` : "");

      const applicantsBlock = isOrganizer ? `
        <div class="section-title"><h2>${t("applicationsReceived")}</h2></div>
        ${m.applications.filter(a => a.status !== "completed").length === 0 ? `<p class="text-muted text-sm">${t("noApplications")}</p>` :
          m.applications.filter(a => a.status !== "completed").map(a => {
            const applicant = STORE.findUser(a.userId);
            if (!applicant) return "";
            const dist = MATCHING.distanceKm(applicant, m).toFixed(1);
            return `<div class="applicant-card">
              <span class="avatar md">${esc(applicant.initials)}</span>
              <div class="info">
                <div class="name">${esc(applicant.name)}</div>
                <div class="sub">
                  <span>${t(applicant.level)}</span><span>⭐ ${applicant.rating}</span>
                  <span>${applicant.matchesPlayed} ${t("matchesPlayedLbl").toLowerCase()}</span>
                  <span>${applicant.presenceRate}% ${t("presenceLbl").toLowerCase()}</span>
                  <span>${dist} km</span>
                  <span>${t(applicant.position)}</span>
                </div>
              </div>
              ${a.status === "pending" ? `<div class="applicant-actions">
                  <button class="btn btn-primary btn-sm" data-approve="${a.userId}">${t("approve")}</button>
                  <button class="btn btn-ghost btn-sm" data-reject="${a.userId}">${t("reject")}</button>
                </div>` : `<span class="pill low">${t("status" + a.status.charAt(0).toUpperCase() + a.status.slice(1))}</span>`}
            </div>`;
          }).join("")}
      ` : "";

      const attendanceBlock = (isPast && u && isParticipant) ? `
        <div class="section-title"><h2>${t("markAttendance")}</h2></div>
        ${m.applications.filter(a => a.userId !== u.id && ["completed"].includes(a.status)).map(a => {
          const p = STORE.findUser(a.userId);
          return `<div class="applicant-card"><span class="avatar md">${esc(p.initials)}</span><div class="info"><div class="name">${esc(p.name)}</div><div class="sub">${t("didShow")}</div></div>
            <div class="applicant-actions"><button class="btn btn-primary btn-sm" data-att-yes="${p.id}">✅</button><button class="btn btn-ghost btn-sm" data-att-no="${p.id}">❌</button></div></div>`;
        }).join("") || `<p class="text-muted text-sm">—</p>`}
      ` : "";

      const inner = `
        <div class="match-hero">
          <span class="pill ${urg === "high" ? "high" : urg === "mid" ? "mid" : "low"} sport-tag">${complete ? "🟢 " + t("matchComplete") : missing === 1 ? "🔥 " + t("missingOne") : "🔥 " + t("missingN", { n: missing })}</span>
          <h1 class="mt-12">⚽ ${t(formatKey)} — ${esc(m.zone)}</h1>
          <div class="meta-list">
            <span>📍 ${esc(m.place)}, ${esc(m.city)}</span>
            <span>📅 ${fmtDate(m.date)} · 🕗 ${fmtTime(m.date)}</span>
            <span>🎯 ${t(m.level)}</span>
            ${m.cost ? `<span>💶 ${m.cost} ${t("euroPerPlayer")}</span>` : `<span>💶 ${t("free")}</span>`}
            ${m.pref ? `<span>🧭 ${t(m.pref)}</span>` : ""}
            <span>${t("organizerOf")}: <a href="#/profile/${org.id}" style="text-decoration:underline;">${esc(org.name)}</a></span>
          </div>
          <div class="flex gap-16" style="align-items:center;">
            <div class="big-count">${filled}/${m.total}</div>
            ${score ? `<span class="match-badge match-score">${t("matchPercent", { n: score.percent })}</span>` : ""}
          </div>
          <div class="progress-track mt-12"><div class="progress-fill ${missing > 0 && missing <= 1 ? "high-need" : ""}" style="width:${Math.round(filled / m.total * 100)}%"></div></div>
          ${score ? `<div class="mt-12 flex gap-8" style="flex-wrap:wrap;">${MATCHING.reasons(score.sub, m).map(r => `<span class="pill">${r}</span>`).join("")}</div>` : ""}
          ${m.notes ? `<p class="text-sm text-muted mt-16">${esc(m.notes)}</p>` : ""}
          ${phoneBlock}
          <div class="mt-16">${ctaBlock}</div>
        </div>
        ${applicantsBlock}
        ${attendanceBlock}
      `;

      if (authed) {
        UI.mount(UI.chrome("", inner));
      } else {
        app.innerHTML = `<div class="landing-nav"><a href="#/" class="brand"><img src="icon.svg" alt=""/> JOGU</a><button class="btn btn-ghost btn-sm" data-go="/login">${t("login")}</button></div><main class="screen">${inner}</main>`;
      }

      app.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => ROUTER.go(b.dataset.go)));
      const shareBtn = app.querySelector("#share-btn"); if (shareBtn) shareBtn.addEventListener("click", () => SHARE.shareMatch(m));

      const loginCta = app.querySelector("#cta-login");
      if (loginCta) loginCta.addEventListener("click", () => { State.pendingMatchAfterAuth = m.id; ROUTER.go("/register"); });

      const applyBtn = app.querySelector("#apply-btn");
      if (applyBtn) applyBtn.addEventListener("click", () => UI.openApplySheet(m));

      const waitlistBtn = app.querySelector("#waitlist-btn");
      if (waitlistBtn) waitlistBtn.addEventListener("click", () => {
        if (!m.waitlist.includes(u.id)) m.waitlist.push(u.id);
        UI.toast(t("toastJoinedWaitlist"), "success");
        UI.renderMatchDetail(m.id);
      });

      const cancelBtn = app.querySelector("#cancel-btn");
      if (cancelBtn) cancelBtn.addEventListener("click", () => UI.openCancelSheet(m));

      const simApprove = app.querySelector("#sim-approve");
      if (simApprove) simApprove.addEventListener("click", () => {
        const a = MATCH.myApplication(m, u.id); a.status = "approved";
        NOTIFY.push("✅", "notifApproved", {});
        UI.toast(t("toastApprovedPlayer"), "success");
        if (m.waitlist.length) { const w = m.waitlist.shift(); NOTIFY.push("⚡", "notifNearby", { km: MATCHING.distanceKm(STORE.findUser(w), m).toFixed(1) }); }
        UI.renderMatchDetail(m.id);
      });

      app.querySelectorAll("[data-approve]").forEach(b => b.addEventListener("click", () => {
        const a = m.applications.find(x => x.userId === b.dataset.approve);
        a.status = "approved";
        UI.toast(t("toastApprovedPlayer"), "success");
        if (MATCH.isComplete(m)) { UI.celebrate(); }
        UI.renderMatchDetail(m.id);
      }));
      app.querySelectorAll("[data-reject]").forEach(b => b.addEventListener("click", () => {
        const a = m.applications.find(x => x.userId === b.dataset.reject);
        a.status = "rejected";
        UI.toast(t("toastRejectedPlayer"));
        UI.renderMatchDetail(m.id);
      }));
      app.querySelectorAll("[data-att-yes]").forEach(b => b.addEventListener("click", () => {
        REPUTATION.recordAttendance(STORE.findUser(b.dataset.attYes), true);
        UI.toast(t("toastAttendanceSaved"), "success"); UI.renderMatchDetail(m.id);
      }));
      app.querySelectorAll("[data-att-no]").forEach(b => b.addEventListener("click", () => {
        REPUTATION.recordAttendance(STORE.findUser(b.dataset.attNo), false);
        UI.toast(t("toastAttendanceSaved")); UI.renderMatchDetail(m.id);
      }));
    },

    openApplySheet(m) {
      const overlay = UI.openSheet(`
        <h2>${t("applyConfirmTitle")}</h2>
        <p class="text-muted text-sm mt-8">${t("applyConfirmBody")}</p>
        <button class="btn btn-primary btn-block mt-24" id="confirm-apply" data-autofocus>${t("confirmApplication")}</button>
        <button class="link-btn mt-12" id="cancel-apply" style="display:block;text-align:center;">${t("back")}</button>
      `);
      overlay.querySelector("#cancel-apply").addEventListener("click", UI.closeSheet);
      overlay.querySelector("#confirm-apply").addEventListener("click", () => {
        const u = State.currentUser;
        m.applications.push({ userId: u.id, status: "pending", appliedAt: new Date() });
        UI.closeSheet();
        UI.toast(t("toastApplied"), "success");
        UI.renderMatchDetail(m.id);
        setTimeout(() => UI.openSheet(`<h2>✅ ${t("applicationSent")}</h2><p class="text-muted text-sm mt-8">${t("applicationSentSub")}</p><button class="btn btn-primary btn-block mt-24" data-autofocus onclick="this.closest('.overlay').remove()">OK</button>`), 150);
      });
    },
    openCancelSheet(m) {
      const overlay = UI.openSheet(`
        <h2>${t("cancelConfirmTitle")}</h2>
        <p class="text-muted text-sm mt-8">${t("cancelConfirmBody")}</p>
        <button class="btn btn-danger btn-block mt-24" id="confirm-cancel" data-autofocus>${t("confirmCancel")}</button>
        <button class="link-btn mt-12" id="cancel-cancel" style="display:block;text-align:center;">${t("back")}</button>
      `);
      overlay.querySelector("#cancel-cancel").addEventListener("click", UI.closeSheet);
      overlay.querySelector("#confirm-cancel").addEventListener("click", () => {
        const u = State.currentUser;
        const a = MATCH.myApplication(m, u.id);
        if (a) a.status = "rejected"; else if (m.organizerId === u.id) { /* organizer non rinuncia da qui */ }
        REPUTATION.recordCancellation(u);
        UI.closeSheet();
        UI.toast(t("toastCancelled"));
        if (m.waitlist.length) {
          const nextId = m.waitlist.shift();
          m.applications.push({ userId: nextId, status: "approved", appliedAt: new Date() });
          UI.toast(t("spotFreed"));
        }
        UI.renderMatchDetail(m.id);
      });
    },

    /* ---------------- MY MATCHES ---------------- */
    renderMyMatches() {
      const u = State.currentUser;
      const organizing = State.matches.filter(m => m.organizerId === u.id);
      const applied = State.matches.filter(m => MATCH.myApplication(m, u.id) && m.organizerId !== u.id);
      const section = (title, arr) => `
        <div class="section-title"><h2>${title}</h2></div>
        <div class="match-list">${arr.length ? arr.map(m => UI.matchCardHtml(m, u)).join("") : `<div class="empty-state"><p class="text-sm">—</p></div>`}</div>`;
      const inner = `<h1>${t("myMatches")}</h1>${section(t("organizing"), organizing)}${section(t("applied"), applied)}`;
      UI.mount(UI.chrome("my-matches", inner));
      app.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => ROUTER.go(b.dataset.go)));
    },

    /* ---------------- PROFILE ---------------- */
    renderProfile(userId) {
      const p = STORE.findUser(userId) || State.currentUser;
      const isMe = p.id === State.currentUser.id;
      const lvlTag = REPUTATION.levelTag(p);
      const progress = REPUTATION.levelProgress(p);
      const allBadges = Object.keys(BADGE_DEFS);
      const recent = State.matches.filter(m => m.applications.some(a => a.userId === p.id) || m.organizerId === p.id).slice(0, 5);

      const inner = `
        <div class="profile-head">
          <span class="avatar lg">${esc(p.initials)}</span>
          <div class="p-info">
            <h1>${esc(p.name)}</h1>
            <p>${esc(p.zone)}, ${esc(p.city)} · ${t(p.level)} · ${t(p.position)}</p>
            <span class="badge-chip mt-8">${REPUTATION.levelIcon(lvlTag)} ${t(lvlTag)}</span>
          </div>
        </div>
        <div class="level-track">${[0, 1, 2, 3, 4].map(i => `<span class="seg ${i <= progress ? "done" : ""}"></span>`).join("")}</div>
        <div class="stat-grid">
          <div class="stat-box"><b>⭐ ${p.rating || "—"}</b><span>${t("reliability")}</span></div>
          <div class="stat-box"><b>${p.matchesPlayed}</b><span>${t("matchesPlayedLbl")}</span></div>
          <div class="stat-box"><b>${p.presenceRate}%</b><span>${t("presenceLbl")}</span></div>
          <div class="stat-box"><b>${p.confirmsRespected}</b><span>${t("confirmsRespectedLbl")}</span></div>
          <div class="stat-box"><b>${p.matchesOrganized}</b><span>${t("matchesOrganized")}</span></div>
          <div class="stat-box"><b>${p.cancellations}</b><span>${t("cancellations")}</span></div>
        </div>
        <p class="text-muted text-sm">${t("yourReliabilityInfo")}</p>
        <div class="section-title"><h2>${t("badges")}</h2></div>
        <div class="badges-grid">
          ${allBadges.map(bid => {
            const has = p.badges.includes(bid); const d = BADGE_DEFS[bid];
            return `<div class="badge-tile ${has ? "" : "locked"}" title="${esc(I18N.getLang() === "it" ? d.descIt : d.descEn)}"><span class="ic">${d.icon}</span><span>${esc(BADGES.label(bid))}</span></div>`;
          }).join("")}
        </div>
        <div class="section-title"><h2>${t("recentMatches")}</h2></div>
        <div class="match-list">${recent.length ? recent.map(m => UI.matchCardHtml(m, State.currentUser)).join("") : `<p class="text-muted text-sm">—</p>`}</div>
        ${isMe ? `
        <div class="card mt-24 text-center">
          <span class="eyebrow">🤝 ${t("inviteTeam")}</span>
          <p class="text-muted text-sm mt-8">${t("inviteTeamSub")}</p>
          <button class="btn btn-primary btn-block mt-16" id="invite-btn">${t("inviteFriends")}</button>
        </div>
        <button class="btn btn-ghost btn-block mt-16" id="logout-btn">${t("logout")}</button>
        ` : ""}
      `;
      UI.mount(UI.chrome("profile", inner));
      app.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => ROUTER.go(b.dataset.go)));
      const inviteBtn = app.querySelector("#invite-btn"); if (inviteBtn) inviteBtn.addEventListener("click", () => SHARE.inviteFriends());
      const logoutBtn = app.querySelector("#logout-btn"); if (logoutBtn) logoutBtn.addEventListener("click", () => AUTH.logout());
    },

    /* ---------------- NOTIFICATIONS ---------------- */
    renderNotifications() {
      const list = State.notifications;
      const inner = `
        <div class="section-title"><h1>${t("notifications")}</h1>${list.length ? `<span class="see-all" id="mark-read">${t("markAllRead")}</span>` : ""}</div>
        ${list.length ? list.map(n => `
          <div class="notif-item ${n.read ? "" : "unread"}">
            <span class="ic">${n.icon}</span>
            <div class="txt"><div class="msg">${t(n.key, n.vars)}</div><div class="time">${fmtTime(n.at)} · ${fmtDate(n.at)}</div></div>
          </div>`).join("") : `<div class="empty-state"><div class="ic">🔔</div><p>${t("noNotifications")}</p></div>`}
      `;
      UI.mount(UI.chrome("", inner));
      const markRead = app.querySelector("#mark-read");
      if (markRead) markRead.addEventListener("click", () => { NOTIFY.markAllRead(); UI.renderNotifications(); });
    },
  };

  /* ==========================================================================
     BOOTSTRAP
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => { ROUTER.start(); });
})();
