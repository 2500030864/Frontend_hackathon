// Comprehensive Mock Data for Ultimate Gaming Tournament Portal

export const INITIAL_GAMES = [
  {
    id: "valorant",
    name: "Valorant",
    genre: "Tactical FPS",
    publisher: "Riot Games",
    icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    activeTournaments: 4,
    totalPrize: "$45,000",
    color: "#ff4655"
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    genre: "Tactical FPS",
    publisher: "Valve",
    icon: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    activeTournaments: 3,
    totalPrize: "$60,000",
    color: "#de9b35"
  },
  {
    id: "lol",
    name: "League of Legends",
    genre: "MOBA",
    publisher: "Riot Games",
    icon: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80",
    activeTournaments: 5,
    totalPrize: "$80,000",
    color: "#0ac8b9"
  },
  {
    id: "apex",
    name: "Apex Legends",
    genre: "Battle Royale",
    publisher: "Respawn / EA",
    icon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    activeTournaments: 2,
    totalPrize: "$25,000",
    color: "#da292a"
  },
  {
    id: "rocket-league",
    name: "Rocket League",
    genre: "Sports / Action",
    publisher: "Psyonix",
    icon: "https://images.unsplash.com/photo-1493711662062-fa541akw3?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1493711662062-fa541akw3?auto=format&fit=crop&w=1200&q=80",
    activeTournaments: 3,
    totalPrize: "$18,000",
    color: "#008dfb"
  },
  {
    id: "dota2",
    name: "Dota 2",
    genre: "MOBA",
    publisher: "Valve",
    icon: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    activeTournaments: 2,
    totalPrize: "$75,000",
    color: "#f43f5e"
  }
];

export const INITIAL_TOURNAMENTS = [
  {
    id: "TRN-VAL-01",
    title: "Apex Masters Invitational: Champions Cup",
    game: "Valorant",
    gameId: "valorant",
    mode: "Squad",
    format: "5v5 Single Elimination",
    entryFee: "Free Entry",
    entryFeeNumber: 0,
    prizePool: "$25,000",
    prizePoolNumber: 25000,
    maxParticipants: 16,
    registeredParticipants: 14,
    registrationDeadline: "2026-12-05",
    tournamentDate: "2026-12-10",
    time: "18:00 EST",
    status: "Open",
    featured: true,
    region: "North America & Europe",
    platform: "PC",
    minRank: "Ascendant 1+",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
    description: "The crown jewel of winter collegiate and amateur esports. 16 elite rosters battle in standard competitive ruleset on Haven, Ascent, Bind, and Sunset with official anticheat verification and broadcast coverage.",
    rules: [
      "Standard VCT 2026 Tournament Rulebook applies.",
      "All matches are Best of 3 (Bo3); Grand Finals are Best of 5 (Bo5).",
      "Vanguard Anticheat must be active; all players must join discord voice check 30 minutes prior.",
      "Tactical timeouts: 2 per map (60 seconds each). Disconnects allow a 5-minute technical pause.",
      "Map vetoes will be conducted on the portal 15 minutes before match start."
    ],
    prizes: [
      { place: "1st Place", amount: "$14,000", badge: "Gold Champion Trophy + Direct Pro Invite" },
      { place: "2nd Place", amount: "$6,500", badge: "Silver Medalist" },
      { place: "3rd Place", amount: "$3,000", badge: "Bronze Finalist" },
      { place: "4th Place", amount: "$1,500", badge: "Semi-Finalist Honor" }
    ],
    schedule: [
      { round: "Registration Deadline", date: "Dec 5, 2026 - 23:59 EST", desc: "Roster lock and check-in confirmation." },
      { round: "Round of 16", date: "Dec 10, 2026 - 18:00 EST", desc: "Best of 3 matches on dual streams." },
      { round: "Quarter-Finals", date: "Dec 11, 2026 - 19:00 EST", desc: "Top 8 bracket play." },
      { round: "Semi-Finals & Finals", date: "Dec 12, 2026 - 17:00 EST", desc: "Main stage broadcast and trophy ceremony." }
    ],
    registeredTeams: [
      { id: "tm-1", name: "Team Liquid Glass", tag: "TLG", captain: "ViperX", seed: 1, avatar: "TL" },
      { id: "tm-2", name: "Sentinels Prime", tag: "SENP", captain: "TenZing", seed: 2, avatar: "SP" },
      { id: "tm-3", name: "Cloud9 Velocity", tag: "C9V", captain: "Joxer", seed: 3, avatar: "C9" },
      { id: "tm-4", name: "Fnatic Rising", tag: "FNC", captain: "DerkeJr", seed: 4, avatar: "FN" },
      { id: "tm-5", name: "Karmine Corp Next", tag: "KCORP", captain: "ScreaM_V", seed: 5, avatar: "KC" },
      { id: "tm-6", name: "NaVi Prodigy", tag: "NAVIP", captain: "Simple_Aim", seed: 6, avatar: "NV" },
      { id: "tm-7", name: "Luminosity Eclipse", tag: "LG", captain: "Ares7", seed: 7, avatar: "LG" },
      { id: "tm-8", name: "Paper Rex Academy", tag: "PRX", captain: "f0rsakenFan", seed: 8, avatar: "PR" }
    ],
    brackets: {
      quarters: [
        { id: "m1", team1: "Team Liquid Glass", score1: 2, team2: "Paper Rex Academy", score2: 0, winner: "Team Liquid Glass", status: "Completed" },
        { id: "m2", team1: "Fnatic Rising", score1: 2, team2: "Karmine Corp Next", score2: 1, winner: "Fnatic Rising", status: "Completed" },
        { id: "m3", team1: "Sentinels Prime", score1: 2, team2: "Luminosity Eclipse", score2: 0, winner: "Sentinels Prime", status: "Completed" },
        { id: "m4", team1: "Cloud9 Velocity", score1: 1, team2: "NaVi Prodigy", score2: 2, winner: "NaVi Prodigy", status: "Completed" }
      ],
      semis: [
        { id: "m5", team1: "Team Liquid Glass", score1: 2, team2: "Fnatic Rising", score2: 1, winner: "Team Liquid Glass", status: "Completed" },
        { id: "m6", team1: "Sentinels Prime", score1: 2, team2: "NaVi Prodigy", score2: 0, winner: "Sentinels Prime", status: "Completed" }
      ],
      finals: [
        { id: "m7", team1: "Team Liquid Glass", score1: 3, team2: "Sentinels Prime", score2: 2, winner: "Team Liquid Glass", status: "Completed" }
      ]
    }
  },
  {
    id: "TRN-CS2-02",
    title: "Global Major Circuit: Summer Showdown",
    game: "Counter-Strike 2",
    gameId: "cs2",
    mode: "Squad",
    format: "5v5 Competitive MR12",
    entryFee: "$25 / team",
    entryFeeNumber: 25,
    prizePool: "$35,000",
    prizePoolNumber: 35000,
    maxParticipants: 32,
    registeredParticipants: 30,
    registrationDeadline: "2026-12-14",
    tournamentDate: "2026-12-18",
    time: "17:00 CET",
    status: "Open",
    featured: true,
    region: "Global / Multi-Region",
    platform: "PC",
    minRank: "Faceit Level 8+",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=85",
    description: "High-octane CS2 competitive showdown featuring 128-tick verified sub-tick servers in Frankfurt, Chicago, and Singapore. Full anti-cheat enforcement and HLTV stat coverage.",
    rules: [
      "Official Valve MR12 competitive settings with overtime (MR3 $10,000).",
      "Banned weapons: None. Coaches permitted on voice comms during timeouts.",
      "All players must record server demos and stream delays must be set to 120s if broadcasting."
    ],
    prizes: [
      { place: "1st Place", amount: "$20,000", badge: "Championship Trophy" },
      { place: "2nd Place", amount: "$9,000", badge: "Silver Cup" },
      { place: "3rd Place", amount: "$4,000", badge: "Bronze Cup" },
      { place: "4th Place", amount: "$2,000", badge: "Prize Share" }
    ],
    schedule: [
      { round: "Group Stage", date: "Dec 18, 2026", desc: "4 groups of 8 teams GSL format." },
      { round: "Playoffs", date: "Dec 19-20, 2026", desc: "Single elimination Bo3." }
    ],
    registeredTeams: [
      { id: "tm-cs-1", name: "Astralis Reborn", tag: "AST", captain: "Device_X", seed: 1, avatar: "AR" },
      { id: "tm-cs-2", name: "FaZe Elite", tag: "FAZE", captain: "KarriganFan", seed: 2, avatar: "FZ" },
      { id: "tm-cs-3", name: "G2 Army", tag: "G2", captain: "NiKo_Style", seed: 3, avatar: "G2" },
      { id: "tm-cs-4", name: "Vitality Force", tag: "VIT", captain: "ZywOo_Kin", seed: 4, avatar: "VT" }
    ],
    brackets: {
      quarters: [
        { id: "cs-m1", team1: "Astralis Reborn", score1: 2, team2: "G2 Army", score2: 0, winner: "Astralis Reborn", status: "Upcoming" },
        { id: "cs-m2", team1: "FaZe Elite", score1: 0, team2: "Vitality Force", score2: 0, winner: null, status: "Upcoming" }
      ],
      semis: [
        { id: "cs-m3", team1: "Astralis Reborn", score1: 0, team2: "TBD", score2: 0, winner: null, status: "Upcoming" }
      ],
      finals: [
        { id: "cs-m4", team1: "TBD", score1: 0, team2: "TBD", score2: 0, winner: null, status: "Upcoming" }
      ]
    }
  },
  {
    id: "TRN-LOL-03",
    title: "Summoner's Rift Continental Clash",
    game: "League of Legends",
    gameId: "lol",
    mode: "Squad",
    format: "5v5 Tournament Draft",
    entryFee: "Free Entry",
    entryFeeNumber: 0,
    prizePool: "$50,000",
    prizePoolNumber: 50000,
    maxParticipants: 16,
    registeredParticipants: 16,
    registrationDeadline: "2026-11-28",
    tournamentDate: "2026-12-02",
    time: "19:00 EST",
    status: "Ongoing",
    featured: true,
    region: "North America",
    platform: "PC",
    minRank: "Diamond 2+",
    banner: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=85",
    description: "The premier non-LCS tournament of the season. Highest tier amateur competition with live scout coverage from top North American and European organizations.",
    rules: [
      "Tournament Draft mode with 5 bans per side.",
      "Current live patch applies without disabled champion exceptions.",
      "Side selection determined by seed or coin toss in game 1."
    ],
    prizes: [
      { place: "1st Place", amount: "$28,000", badge: "Crown of Summoners" },
      { place: "2nd Place", amount: "$12,000", badge: "Runner-Up" },
      { place: "3rd Place", amount: "$6,000", badge: "Top 3" },
      { place: "4th Place", amount: "$4,000", badge: "Top 4" }
    ],
    schedule: [
      { round: "Round 1", date: "Dec 2, 2026", desc: "Round of 16 Bo3" },
      { round: "Semi & Finals", date: "Dec 4, 2026", desc: "Championship weekend" }
    ],
    registeredTeams: [
      { id: "tm-lol-1", name: "T1 Academy", tag: "T1A", captain: "FakerPupil", seed: 1, avatar: "T1" },
      { id: "tm-lol-2", name: "FlyQuest FAM", tag: "FLY", captain: "BwipoFan", seed: 2, avatar: "FQ" }
    ],
    brackets: {
      quarters: [
        { id: "lol-m1", team1: "T1 Academy", score1: 2, team2: "FlyQuest FAM", score2: 1, winner: "T1 Academy", status: "Completed" }
      ],
      semis: [
        { id: "lol-m2", team1: "T1 Academy", score1: 0, team2: "Team Liquid Glass", score2: 0, winner: null, status: "Ongoing" }
      ],
      finals: [
        { id: "lol-m3", team1: "TBD", score1: 0, team2: "TBD", score2: 0, winner: null, status: "Upcoming" }
      ]
    }
  },
  {
    id: "TRN-APEX-04",
    title: "Apex Predator Trio Gauntlet",
    game: "Apex Legends",
    gameId: "apex",
    mode: "Squad",
    format: "Trios 6-Match Point System",
    entryFee: "$15 / team",
    entryFeeNumber: 15,
    prizePool: "$15,000",
    prizePoolNumber: 15000,
    maxParticipants: 20,
    registeredParticipants: 17,
    registrationDeadline: "2026-12-15",
    tournamentDate: "2026-12-22",
    time: "20:00 EST",
    status: "Open",
    featured: false,
    region: "Americas",
    platform: "Cross-Play",
    minRank: "Master / Predator",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
    description: "20 squads drop into Storm Point and World's Edge. Every kill grants 1 point; match placement gives up to 12 points. Highest point aggregate after 6 matches takes the prize.",
    rules: [
      "ALGS official point structure applies.",
      "Kills = 1pt; 1st = 12pts, 2nd = 9pts, 3rd = 7pts, 4th = 5pts, 5th = 4pts.",
      "Tie-breakers: total match wins followed by total kills across all matches."
    ],
    prizes: [
      { place: "1st Place", amount: "$9,000", badge: "Apex Champion" },
      { place: "2nd Place", amount: "$4,000", badge: "Runner-Up" },
      { place: "3rd Place", amount: "$2,000", badge: "Top 3" }
    ],
    schedule: [
      { round: "Lobby Check-in", date: "Dec 22, 2026 - 19:30 EST", desc: "Codes distributed via portal." },
      { round: "Matches 1-6", date: "Dec 22, 2026 - 20:00 EST", desc: "Live match scoring." }
    ],
    registeredTeams: [
      { id: "tm-ap-1", name: "DarkZero Squad", tag: "DZ", captain: "ZeroAim", seed: 1, avatar: "DZ" }
    ],
    brackets: {
      quarters: [],
      semis: [],
      finals: []
    }
  },

  {
    id: "TRN-VAL-SOLO-06",
    title: "Valorant Aim Gods: 1v1 Deathmatch Arena",
    game: "Valorant",
    gameId: "valorant",
    mode: "Solo",
    format: "1v1 Custom Duel",
    entryFee: "$5",
    entryFeeNumber: 5,
    prizePool: "$5,000",
    prizePoolNumber: 5000,
    maxParticipants: 64,
    registeredParticipants: 58,
    registrationDeadline: "2026-12-11",
    tournamentDate: "2026-12-16",
    time: "19:00 EST",
    status: "Open",
    featured: false,
    region: "North America",
    platform: "PC",
    minRank: "Any Rank",
    banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1200&q=85",
    description: "Test raw mechanical headshot prowess in a fast-paced 1v1 custom duel. Vandal, Phantom, and Sheriff only across mid-Ascent and A-site Haven.",
    rules: [
      "First player to 15 eliminations advances to the next round.",
      "Weapon restrictions: Sheriff, Vandal, Phantom only. No abilities or utility.",
      "Cheating or macros results in immediate hardware ban from the portal."
    ],
    prizes: [
      { place: "1st Place", amount: "$3,000", badge: "Aim God Trophy" },
      { place: "2nd Place", amount: "$1,200", badge: "Sharpshooter" },
      { place: "3rd Place", amount: "$800", badge: "Bronze Hunter" }
    ],
    schedule: [
      { round: "Round of 64", date: "Dec 16, 2026", desc: "Simultaneous 1v1 duels." },
      { round: "Top 8 Finals", date: "Dec 17, 2026", desc: "Streamed showcase." }
    ],
    registeredTeams: [],
    brackets: {
      quarters: [],
      semis: [],
      finals: []
    }
  }
];

export const INITIAL_LEADERBOARD_PLAYERS = [
  {
    rank: 1,
    tag: "ViperX",
    name: "Alexander Vance",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    team: "Team Liquid Glass",
    game: "Valorant",
    winRate: 84.6,
    tournamentsPlayed: 28,
    tournamentsWon: 14,
    earnings: "$42,500",
    points: 4820,
    kdRatio: "1.52",
    badge: "Master Tier"
  },
  {
    rank: 2,
    tag: "Chronos",
    name: "Marcus Lindholm",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    team: "Sentinels Prime",
    game: "Valorant",
    winRate: 81.2,
    tournamentsPlayed: 32,
    tournamentsWon: 12,
    earnings: "$36,200",
    points: 4610,
    kdRatio: "1.44",
    badge: "Elite Pro"
  },
  {
    rank: 3,
    tag: "AuraBlade",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    team: "Astralis Reborn",
    game: "Counter-Strike 2",
    winRate: 79.5,
    tournamentsPlayed: 25,
    tournamentsWon: 9,
    earnings: "$31,800",
    points: 4390,
    kdRatio: "1.38",
    badge: "Grandmaster"
  },
  {
    rank: 4,
    tag: "Kage",
    name: "Kenji Sato",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    team: "Cloud9 Velocity",
    game: "Apex Legends",
    winRate: 76.8,
    tournamentsPlayed: 22,
    tournamentsWon: 7,
    earnings: "$24,500",
    points: 3980,
    kdRatio: "1.35",
    badge: "Predator"
  },
  {
    rank: 5,
    tag: "NyxRider",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    team: "T1 Academy",
    game: "League of Legends",
    winRate: 75.0,
    tournamentsPlayed: 20,
    tournamentsWon: 6,
    earnings: "$22,000",
    points: 3820,
    kdRatio: "4.8 KDA",
    badge: "Challenger"
  },
  {
    rank: 6,
    tag: "PulseZero",
    name: "Dmitri Volkov",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    team: "FaZe Elite",
    game: "Counter-Strike 2",
    winRate: 73.2,
    tournamentsPlayed: 19,
    tournamentsWon: 5,
    earnings: "$19,500",
    points: 3640,
    kdRatio: "1.29",
    badge: "Pro Contender"
  }
];

export const INITIAL_LEADERBOARD_TEAMS = [
  {
    rank: 1,
    name: "Team Liquid Glass",
    tag: "TLG",
    logo: "TL",
    captain: "ViperX",
    game: "Valorant & CS2",
    membersCount: 5,
    winRate: 83.3,
    trophies: 18,
    earnings: "$112,000",
    points: 8950,
    status: "Active Roster"
  },
  {
    rank: 2,
    name: "Sentinels Prime",
    tag: "SENP",
    logo: "SP",
    captain: "TenZing",
    game: "Valorant",
    membersCount: 5,
    winRate: 79.2,
    trophies: 15,
    earnings: "$88,500",
    points: 8210,
    status: "Active Roster"
  },
  {
    rank: 3,
    name: "Astralis Reborn",
    tag: "AST",
    logo: "AR",
    captain: "Device_X",
    game: "Counter-Strike 2",
    membersCount: 5,
    winRate: 78.0,
    trophies: 14,
    earnings: "$79,000",
    points: 7980,
    status: "Active Roster"
  },
  {
    rank: 4,
    name: "Cloud9 Velocity",
    tag: "C9V",
    logo: "C9",
    captain: "Joxer",
    game: "Multi-Title",
    membersCount: 6,
    winRate: 74.5,
    trophies: 11,
    earnings: "$64,200",
    points: 7120,
    status: "Recruiting"
  },
  {
    rank: 5,
    name: "T1 Academy",
    tag: "T1A",
    logo: "T1",
    captain: "FakerPupil",
    game: "League of Legends",
    membersCount: 5,
    winRate: 72.8,
    trophies: 10,
    earnings: "$58,000",
    points: 6890,
    status: "Active Roster"
  }
];

export const INITIAL_USER = {
  id: "usr-alex-01",
  name: "Alexander Vance",
  gamertag: "ViperX",
  email: "alex@esports.pro",
  role: "player",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  bio: "Competitive Valorant IGL & Initiator specialist. 4x Collegiate Champion. Seeking Tier 2 Challengers roster.",
  primaryGame: "Valorant",
  secondaryGame: "Counter-Strike 2",
  rankTier: "Immortal 3 (380 RR)",
  region: "North America",
  country: "United States",
  joinedDate: "January 2025",
  stats: {
    totalWins: 42,
    totalLosses: 8,
    winRate: 84.0,
    tournamentsPlayed: 14,
    tournamentsWon: 6,
    totalEarnings: "$28,500",
    kdRatio: 1.54,
    headshotPercentage: 36.8,
    matchesPlayed: 50
  },
  registeredTournaments: ["TRN-VAL-01", "TRN-CS2-02"],
  recentMatches: [
    {
      id: "rm-1",
      tournamentTitle: "Apex Masters Invitational",
      game: "Valorant",
      opponent: "Sentinels Prime",
      result: "Victory",
      score: "13 - 9",
      date: "Yesterday, 20:30",
      map: "Ascent",
      kills: 24,
      deaths: 11,
      assists: 8,
      rating: "1.65"
    },
    {
      id: "rm-2",
      tournamentTitle: "Apex Masters Invitational",
      game: "Valorant",
      opponent: "Fnatic Rising",
      result: "Victory",
      score: "13 - 11",
      date: "Nov 22, 2026",
      map: "Haven",
      kills: 22,
      deaths: 14,
      assists: 6,
      rating: "1.42"
    },
    {
      id: "rm-3",
      tournamentTitle: "Global Major Circuit",
      game: "Counter-Strike 2",
      opponent: "G2 Army",
      result: "Defeat",
      score: "10 - 13",
      date: "Nov 18, 2026",
      map: "Mirage",
      kills: 18,
      deaths: 16,
      assists: 4,
      rating: "1.08"
    },
    {
      id: "rm-4",
      tournamentTitle: "Challengers Open Cup",
      game: "Valorant",
      opponent: "Paper Rex Academy",
      result: "Victory",
      score: "13 - 7",
      date: "Nov 12, 2026",
      map: "Sunset",
      kills: 28,
      deaths: 9,
      assists: 10,
      rating: "1.89"
    }
  ],
  performanceHistory: [
    { month: "Jun", winRate: 72, earnings: 1800, rating: 1280 },
    { month: "Jul", winRate: 75, earnings: 3200, rating: 1350 },
    { month: "Aug", winRate: 78, earnings: 4500, rating: 1420 },
    { month: "Sep", winRate: 80, earnings: 6000, rating: 1510 },
    { month: "Oct", winRate: 82, earnings: 8500, rating: 1620 },
    { month: "Nov", winRate: 84, earnings: 4500, rating: 1740 }
  ],
  notifications: [
    { id: "n1", title: "Match Confirmed", message: "Your round of 16 match vs Sentinels Prime is scheduled for 18:00 EST.", time: "2 hours ago", read: false },
    { id: "n2", title: "Prize Credited", message: "Congratulations! $14,000 champion prize pool has been credited to your portal balance.", time: "1 day ago", read: false },
    { id: "n3", title: "New Team Invite", message: "Cloud9 Velocity has invited you to guest-play as IGL in the CS2 Major.", time: "3 days ago", read: true }
  ]
};

export const INITIAL_TEAMS = [
  {
    id: "team-tlg",
    name: "Team Liquid Glass",
    tag: "TLG",
    game: "Valorant",
    logo: "TL",
    bio: "Elite North American tactical squad formed in 2025. Known for disciplined set-plays and aggressive mid-round adaptation.",
    ownerId: "usr-alex-01",
    createdDate: "2025-06-12",
    stats: {
      matches: 34,
      wins: 29,
      losses: 5,
      winRate: 85.3,
      trophies: 6
    },
    members: [
      { id: "m-1", gamertag: "ViperX", name: "Alexander Vance", role: "IGL / Initiator", joinDate: "Jun 2025", isLeader: true, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" },
      { id: "m-2", gamertag: "Spectre", name: "Lucas Meyer", role: "Duelist / Entry", joinDate: "Jul 2025", isLeader: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
      { id: "m-3", gamertag: "CypherGod", name: "Rohan Patel", role: "Sentinel / Anchor", joinDate: "Aug 2025", isLeader: false, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
      { id: "m-4", gamertag: "OmenEcho", name: "Liam O'Connor", role: "Controller / Smokes", joinDate: "Sep 2025", isLeader: false, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80" },
      { id: "m-5", gamertag: "FlexNova", name: "Daniel Kim", role: "Flex / Secondary Duelist", joinDate: "Oct 2025", isLeader: false, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80" }
    ]
  }
];

export const RECENT_WINNERS = [
  { id: "w-1", tournament: "Challengers Invitational 2026", winnerTeam: "Team Liquid Glass", game: "Valorant", prize: "$14,000", date: "Nov 20, 2026", mvp: "ViperX" },
  { id: "w-2", tournament: "IEM Autumn Masters", winnerTeam: "Astralis Reborn", game: "Counter-Strike 2", prize: "$20,000", date: "Nov 15, 2026", mvp: "AuraBlade" },
  { id: "w-3", tournament: "Rift Continental Split", winnerTeam: "T1 Academy", game: "League of Legends", prize: "$28,000", date: "Nov 08, 2026", mvp: "NyxRider" }
];
