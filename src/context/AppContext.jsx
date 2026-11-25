import React, { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_TOURNAMENTS,
  INITIAL_USER,
  INITIAL_TEAMS,
  INITIAL_GAMES,
  INITIAL_LEADERBOARD_PLAYERS,
  INITIAL_LEADERBOARD_TEAMS,
  RECENT_WINNERS
} from "../data/mockData";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  USER: "gdt_current_user",
  USERS: "gdt_all_users",
  TOURNAMENTS: "gdt_tournaments",
  TEAMS: "gdt_teams",
  SAVED: "gdt_saved_tournaments",
  CHEAT_REPORTS: "gdt_cheat_reports"
};

function readStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Storage error:", e);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage write error:", e);
  }
}

export function AppProvider({ children }) {
  // Pre-seed users
  const [users, setUsers] = useState(() => {
    const saved = readStorage(STORAGE_KEYS.USERS, null);
    if (saved && saved.length > 0) return saved;
    const defaultUsers = [
      {
        ...INITIAL_USER,
        password: "password123"
      },
      {
        id: "usr-admin-01",
        name: "Tournament Director",
        gamertag: "AdminOne",
        email: "admin@tournaments.com",
        password: "admin123",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        bio: "Official Tournament Administrator & Esports Operations Manager.",
        primaryGame: "All Titles",
        rankTier: "Tournament Admin",
        stats: {
          totalWins: 0,
          totalLosses: 0,
          winRate: 0,
          tournamentsPlayed: 0,
          tournamentsWon: 0,
          totalEarnings: "$0"
        },
        registeredTournaments: [],
        recentMatches: [],
        notifications: []
      }
    ];
    writeStorage(STORAGE_KEYS.USERS, defaultUsers);
    return defaultUsers;
  });

  // Active current user session (starts with demo user for instant visual excellence)
  const [user, setUser] = useState(() => {
    return readStorage(STORAGE_KEYS.USER, INITIAL_USER);
  });

  // Tournaments state
  const [tournaments, setTournaments] = useState(() => {
    return readStorage(STORAGE_KEYS.TOURNAMENTS, INITIAL_TOURNAMENTS);
  });

  // Teams state
  const [teams, setTeams] = useState(() => {
    return readStorage(STORAGE_KEYS.TEAMS, INITIAL_TEAMS);
  });

  // Saved tournament bookmarks
  const [savedTournamentIds, setSavedTournamentIds] = useState(() => {
    return readStorage(STORAGE_KEYS.SAVED, ["TRN-VAL-01", "TRN-CS2-02"]);
  });

  // Trust & safety records for the local demo. Production deployments should
  // use the protected API endpoints in server/src/routes/moderation.js.
  const [cheatReports, setCheatReports] = useState(() =>
    readStorage(STORAGE_KEYS.CHEAT_REPORTS, [])
  );

  // Sync to localStorage
  useEffect(() => {
    writeStorage(STORAGE_KEYS.USER, user);
  }, [user]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.TOURNAMENTS, tournaments);
  }, [tournaments]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.TEAMS, teams);
  }, [teams]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.SAVED, savedTournamentIds);
  }, [savedTournamentIds]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.USERS, users);
  }, [users]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.CHEAT_REPORTS, cheatReports);
  }, [cheatReports]);

  // Auth methods
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (!found) {
      return { success: false, error: "Invalid email or password. Use demo credentials or register." };
    }

    const { password: _, ...cleanUser } = found;
    setUser(cleanUser);
    return { success: true, user: cleanUser };
  };

  const register = ({ name, gamertag, email, password, primaryGame }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      gamertag: gamertag.trim() || name.trim(),
      email: normalizedEmail,
      password,
      role: "player",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(gamertag)}`,
      bio: "Aspiring esports competitor on GameDev Tournament Hub.",
      primaryGame: primaryGame || "Valorant",
      secondaryGame: "Counter-Strike 2",
      rankTier: "Diamond Contender",
      region: "North America",
      country: "Global",
      joinedDate: "Today",
      stats: {
        totalWins: 0,
        totalLosses: 0,
        winRate: 0,
        tournamentsPlayed: 0,
        tournamentsWon: 0,
        totalEarnings: "$0",
        kdRatio: 1.0,
        headshotPercentage: 25.0,
        matchesPlayed: 0
      },
      registeredTournaments: [],
      recentMatches: [],
      performanceHistory: [
        { month: "Current", winRate: 0, earnings: 0, rating: 1000 }
      ],
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: "Welcome to GameDev Tournament Portal",
          message: "Explore tournaments, create or join a team, and conquer the bracket!",
          time: "Just now",
          read: false
        }
      ]
    };

    setUsers((prev) => [...prev, newUser]);
    const { password: _, ...cleanUser } = newUser;
    setUser(cleanUser);
    return { success: true, user: cleanUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
  };

  const updateProfile = (fields) => {
    if (!user) return;
    const updated = { ...user, ...fields };
    setUser(updated);
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, ...fields } : u))
    );
  };

  // Tournament registration
  const registerForTournament = (tournamentId, teamNameInput) => {
    if (!user) return { success: false, error: "Please log in to register." };

    const targetTournament = tournaments.find((t) => t.id === tournamentId);
    if (!targetTournament) return { success: false, error: "Tournament not found." };

    if (user.registeredTournaments?.includes(tournamentId)) {
      return { success: false, error: "You or your team is already registered for this tournament." };
    }

    if (targetTournament.registeredParticipants >= targetTournament.maxParticipants) {
      return { success: false, error: "Tournament has reached maximum capacity." };
    }

    const teamName = teamNameInput || (teams[0] ? teams[0].name : `${user.gamertag}'s Squad`);
    const selectedRoster = teams.find((team) => team.name.trim().toLowerCase() === String(teamName).trim().toLowerCase());
    if (selectedRoster?.isBanned) {
      return { success: false, error: `This team is banned and cannot register. Reason: ${selectedRoster.banReason || "Administrative restriction"}` };
    }
    const newRegisteredTeam = {
      id: `reg-tm-${Date.now()}`,
      name: teamName,
      tag: teamName.slice(0, 4).toUpperCase(),
      captain: user.gamertag,
      seed: targetTournament.registeredParticipants + 1,
      avatar: teamName.slice(0, 2).toUpperCase()
    };

    // Update tournament
    const updatedTournaments = tournaments.map((t) => {
      if (t.id === tournamentId) {
        return {
          ...t,
          registeredParticipants: t.registeredParticipants + 1,
          registeredTeams: [...(t.registeredTeams || []), newRegisteredTeam]
        };
      }
      return t;
    });

    setTournaments(updatedTournaments);

    // Update user's registered list and notifications
    const newNotification = {
      id: `n-${Date.now()}`,
      title: "Tournament Registration Confirmed",
      message: `You successfully registered for ${targetTournament.title}. Match schedule has been added to your dashboard.`,
      time: "Just now",
      read: false
    };

    const updatedUser = {
      ...user,
      registeredTournaments: [...(user.registeredTournaments || []), tournamentId],
      notifications: [newNotification, ...(user.notifications || [])]
    };

    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));

    return { success: true };
  };

  const leaveTournament = (tournamentId) => {
    if (!user) return;

    // Decrement tournament participants
    const updatedTournaments = tournaments.map((t) => {
      if (t.id === tournamentId) {
        return {
          ...t,
          registeredParticipants: Math.max(0, t.registeredParticipants - 1),
          registeredTeams: (t.registeredTeams || []).filter(
            (tm) => tm.captain !== user.gamertag
          )
        };
      }
      return t;
    });
    setTournaments(updatedTournaments);

    // Update user
    const updatedUser = {
      ...user,
      registeredTournaments: (user.registeredTournaments || []).filter(
        (id) => id !== tournamentId
      )
    };
    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
  };

  const toggleSaveTournament = (tournamentId) => {
    setSavedTournamentIds((prev) =>
      prev.includes(tournamentId)
        ? prev.filter((id) => id !== tournamentId)
        : [...prev, tournamentId]
    );
  };

  // Admin: create a tournament and persist it through the existing
  // tournaments state/localStorage synchronization.
  const createTournament = (formData) => {
    if (!user || user.role !== "admin") {
      return {
        success: false,
        error: "Only an administrator can create tournaments. Please sign in with the admin account."
      };
    }

    const title = String(formData.title || "").trim();
    const game = String(formData.game || "").trim();
    const region = String(formData.region || "").trim();
    const description = String(formData.description || "").trim();
    const registrationDeadline = String(formData.registrationDeadline || "");
    const tournamentDate = String(formData.tournamentDate || "");
    const time = String(formData.time || "18:00");
    const entryFee = Number(formData.entryFee);
    const prizePool = Number(formData.prizePool);
    const maxParticipants = Number(formData.maxParticipants);

    if (!title || !game || !region || !description) {
      return { success: false, error: "Please complete all required fields." };
    }
    if (!registrationDeadline || !tournamentDate || !time) {
      return { success: false, error: "Please provide the registration deadline, tournament date, and start time." };
    }
    if (registrationDeadline > tournamentDate) {
      return { success: false, error: "Registration deadline cannot be after the tournament date." };
    }
    if (!Number.isFinite(entryFee) || entryFee < 0 || !Number.isFinite(prizePool) || prizePool < 0) {
      return { success: false, error: "Entry fee and prize pool must be valid non-negative numbers." };
    }
    if (!Number.isInteger(maxParticipants) || maxParticipants < 1) {
      return { success: false, error: "Maximum participants must be a whole number greater than zero." };
    }

    const formatCurrency = (amount) => `$${amount.toLocaleString("en-US")}`;
    const tournamentId = `TRN-${Date.now()}`;
    const newTournament = {
      id: tournamentId,
      title,
      game,
      gameId: game.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      mode: formData.mode || "Squad",
      format: formData.format || "5v5 Single Elimination",
      entryFee: entryFee === 0 ? "Free Entry" : formatCurrency(entryFee),
      entryFeeNumber: entryFee,
      prizePool: formatCurrency(prizePool),
      prizePoolNumber: prizePool,
      maxParticipants,
      registeredParticipants: 0,
      registrationDeadline,
      tournamentDate,
      date: tournamentDate,
      time,
      status: "Open",
      featured: false,
      region,
      platform: "PC",
      minRank: "Open to all",
      banner: String(formData.banner || "").trim() || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
      description,
      rules: [],
      prizes: [],
      schedule: [],
      registeredTeams: [],
      createdBy: user.id,
      createdAt: new Date().toISOString()
    };

    setTournaments((previous) => [newTournament, ...previous]);
    return { success: true, tournament: newTournament };
  };

  // Admin trust & safety controls (local demo persistence).
  const banTeam = (teamId, reason) => {
    if (!user || user.role !== "admin") return { success: false, error: "Administrator access required." };
    const cleanReason = String(reason || "").trim();
    if (!cleanReason) return { success: false, error: "A ban reason is required." };
    const team = teams.find((item) => item.id === teamId);
    if (!team) return { success: false, error: "Team not found." };
    setTeams((previous) => previous.map((item) => item.id === teamId ? {
      ...item, isBanned: true, banReason: cleanReason,
      bannedAt: new Date().toISOString(), bannedBy: user.gamertag || user.name
    } : item));
    return { success: true };
  };

  const unbanTeam = (teamId) => {
    if (!user || user.role !== "admin") return { success: false, error: "Administrator access required." };
    setTeams((previous) => previous.map((item) => item.id === teamId ? {
      ...item, isBanned: false, unbannedAt: new Date().toISOString(),
      unbannedBy: user.gamertag || user.name
    } : item));
    return { success: true };
  };

  const createCheatReport = (details) => {
    if (!user || user.role !== "admin") return { success: false, error: "Administrator access required." };
    const player = String(details.player || "").trim();
    const game = String(details.game || "").trim();
    const category = String(details.category || "").trim();
    const description = String(details.description || "").trim();
    if (!player || !game || !category || !description) {
      return { success: false, error: "Complete all required incident fields." };
    }
    const report = {
      id: `cheat-${Date.now()}`,
      player, game, category, severity: details.severity || "Medium",
      description, evidence: String(details.evidence || "").trim(),
      status: "Pending Review",
      createdAt: new Date().toISOString(),
      createdBy: user.gamertag || user.name,
      reviewedBy: "", resolution: ""
    };
    setCheatReports((previous) => [report, ...previous]);
    return { success: true, report };
  };

  const updateCheatReport = (reportId, status, resolution = "") => {
    if (!user || user.role !== "admin") return { success: false, error: "Administrator access required." };
    const allowed = ["Under Review", "Resolved", "Dismissed"];
    if (!allowed.includes(status)) return { success: false, error: "Invalid report status." };
    setCheatReports((previous) => previous.map((report) => report.id === reportId ? {
      ...report, status, resolution: String(resolution || "").trim(),
      reviewedBy: user.gamertag || user.name,
      reviewedAt: new Date().toISOString()
    } : report));
    return { success: true };
  };

  // Team Management
  const createTeam = ({ name, tag, game, bio }) => {
    if (!user) return { success: false, error: "Please log in first." };

    const newTeam = {
      id: `team-${Date.now()}`,
      name: name.trim(),
      tag: tag.trim().toUpperCase(),
      game: game || "Valorant",
      logo: name.slice(0, 2).toUpperCase(),
      bio: bio || "Competitive roster striving for tournament championships.",
      ownerId: user.id,
      createdDate: new Date().toISOString().slice(0, 10),
      stats: {
        matches: 0,
        wins: 0,
        losses: 0,
        winRate: 0,
        trophies: 0
      },
      members: [
        {
          id: `m-${Date.now()}`,
          gamertag: user.gamertag,
          name: user.name,
          role: "Team Captain / IGL",
          joinDate: "Joined Today",
          isLeader: true,
          avatar: user.avatar
        }
      ]
    };

    setTeams((prev) => [newTeam, ...prev]);
    return { success: true, team: newTeam };
  };

  const addTeamMember = (teamId, { gamertag, name, role }) => {
    const targetTeam = teams.find((team) => team.id === teamId);
    if (targetTeam?.isBanned) return { success: false, error: "Banned teams cannot add players." };
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === teamId) {
          const newMember = {
            id: `m-${Date.now()}`,
            gamertag: gamertag.trim(),
            name: name ? name.trim() : gamertag.trim(),
            role: role || "Fragger",
            joinDate: "Joined Today",
            isLeader: false,
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(gamertag)}`
          };
          return {
            ...t,
            members: [...t.members, newMember]
          };
        }
        return t;
      })
    );
    return { success: true };
  };

  const removeTeamMember = (teamId, memberId) => {
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === teamId) {
          return {
            ...t,
            members: t.members.filter((m) => m.id !== memberId)
          };
        }
        return t;
      })
    );
  };

  const markNotificationRead = (notifId) => {
    if (!user) return;
    const updated = {
      ...user,
      notifications: (user.notifications || []).map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      )
    };
    setUser(updated);
  };

  const clearAllNotifications = () => {
    if (!user) return;
    const updated = {
      ...user,
      notifications: []
    };
    setUser(updated);
  };

  const value = {
    user,
    users,
    login,
    register,
    logout,
    updateProfile,
    tournaments,
    games: INITIAL_GAMES,
    teams,
    banTeam,
    unbanTeam,
    cheatReports,
    createCheatReport,
    updateCheatReport,
    savedTournamentIds,
    toggleSaveTournament,
    registerForTournament,
    leaveTournament,
    createTournament,
    createTeam,
    addTeamMember,
    removeTeamMember,
    markNotificationRead,
    clearAllNotifications,
    leaderboardPlayers: INITIAL_LEADERBOARD_PLAYERS,
    leaderboardTeams: INITIAL_LEADERBOARD_TEAMS,
    recentWinners: RECENT_WINNERS
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
