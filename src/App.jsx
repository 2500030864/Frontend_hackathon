import React, { useState, useMemo } from "react";
import { Routes, Route, Link, NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import "./App.css";
import GamingScene from "./components/GamingScene";
import GlobalArenaScene from "./components/GlobalArenaScene";
import RulebookPage from "./pages/RulebookPage";
// Lucide React Icons
import {
  Trophy,
  Swords,
  Shield,
  Gamepad2,
  Users,
  Calendar,
  Clock,
  ArrowUpRight,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  ChevronRight,
  Bookmark,
  Share2,
  Medal,
  Flame,
  Globe,
  Bell,
  Sparkles,
  TrendingUp,
  X,
  Menu,
  Check,
  ChevronDown,
  Ban,
  RotateCcw,
  ShieldCheck
} from "lucide-react";

// Recharts components for analytics
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

/* =========================================================
   NAVIGATION / HEADER COMPONENT
   ========================================================= */

function NavigationBar() {
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = user?.notifications?.filter((n) => !n.read).length || 0;

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-box">
            <Trophy size={20} />
          </div>
          <div className="brand-text">
            <span>
              ESPORTS<b>ARENA</b>
            </span>
            <span className="brand-tagline">TOURNAMENT PORTAL</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/tournaments"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Tournaments
          </NavLink>
          <NavLink
            to="/rulebook"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Rulebook
          </NavLink>
          <NavLink
            to="/teams"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Teams
          </NavLink>
          <NavLink
            to="/leaderboards"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Leaderboards
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Right Navigation Actions */}
        <div className="nav-actions">
          {user ? (
            <>
              {/* Notification Bell */}
              <div style={{ position: "relative" }}>
                <button
                  className="btn-glass btn-sm"
                  style={{ position: "relative", borderRadius: "50%", width: 38, height: 38, padding: 0 }}
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  aria-label="Notifications"
                >
                  <Bell size={17} />
                  {unreadCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: -3,
                        right: -3,
                        background: "var(--danger)",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 800,
                        width: 17,
                        height: 17,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifDropdownOpen && (
                  <div
                    className="glass-panel"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 48,
                      width: 320,
                      padding: 18,
                      zIndex: 1100,
                      borderRadius: "var(--radius-md)",
                      boxShadow: "0 14px 40px rgba(15, 23, 42, 0.12)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <h4 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase" }}>Notifications</h4>
                      <span style={{ fontSize: 11, color: "var(--accent-blue)", fontWeight: 700 }}>
                        {unreadCount} new
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 240, overflowY: "auto" }}>
                      {user.notifications?.length > 0 ? (
                        user.notifications.slice(0, 4).map((n) => (
                          <div
                            key={n.id}
                            style={{
                              padding: "10px 12px",
                              borderRadius: "var(--radius-sm)",
                              background: n.read ? "rgba(241, 245, 249, 0.6)" : "var(--accent-blue-subtle)",
                              border: "1px solid rgba(226, 232, 240, 0.7)",
                              fontSize: 12
                            }}
                          >
                            <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>
                              {n.title}
                            </div>
                            <div style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}>{n.message}</div>
                            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>{n.time}</div>
                          </div>
                        ))
                      ) : (
                        <div style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", padding: 12 }}>
                          No notifications yet.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Chip */}
              <Link to="/dashboard" className="user-chip">
                <img src={user.avatar} alt={user.gamertag} className="user-avatar-sm" />
                <span className="user-chip-name">{user.gamertag}</span>
              </Link>

              {/* Logout Button */}
              <button
                className="btn-glass btn-sm"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                title="Log out"
              >
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-glass btn-sm">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Register Team
              </Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-btn btn-glass"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   FOOTER COMPONENT
   ========================================================= */

function Footer() {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo">
              <div className="brand-icon-box">
                <Trophy size={18} />
              </div>
              <div className="brand-text">
                <span>
                  ESPORTS<b>ARENA</b>
                </span>
                <span className="brand-tagline">TOURNAMENT PORTAL</span>
              </div>
            </Link>
            <p>
              The next-generation competitive esports tournament platform. Join leagues, assemble teams, compete for
              verified cash prizes, and build your gaming legacy.
            </p>
          </div>

          {/* Tournaments Links */}
          <div className="footer-col">
            <h4>Tournaments</h4>
            <div className="footer-links-list">
              <Link to="/tournaments?game=Valorant">Valorant Masters</Link>
              <Link to="/tournaments?game=Counter-Strike+2">CS2 Major Circuit</Link>
              <Link to="/tournaments?game=League+of+Legends">Summoner's Rift</Link>
              <Link to="/tournaments?game=Apex+Legends">Apex Trios</Link>
              <Link to="/tournaments">All Tournaments</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Platform</h4>
            <div className="footer-links-list">
              <Link to="/teams">Team Management</Link>
              <Link to="/leaderboards">Global Leaderboards</Link>
              <Link to="/dashboard">Player Dashboard</Link>
              <Link to="/tournaments">Prize Verification</Link>
              <a href="#rules">Rules & Integrity</a>
            </div>
          </div>

          {/* Esports Status */}
          <div className="footer-col">
            <h4>Tournament Integrity</h4>
            <div
              style={{
                padding: "16px",
                background: "rgba(241, 245, 249, 0.7)",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                fontSize: 13
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--success)", fontWeight: 700 }}>
                <CheckCircle2 size={16} /> Anti-Cheat Verified
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>
                Official sub-tick server integrations, automated bracket resolution, and escrow prize pool payouts.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>© 2026 EsportsArena Portal. Powered by Liquid Glass Light UI Architecture.</div>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#support">Tournament Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   PAGE A: LANDING PAGE
   ========================================================= */

function LandingPage() {
  const { tournaments, games, leaderboardPlayers, leaderboardTeams, recentWinners } = useApp();
  const navigate = useNavigate();

  const featuredTournaments = tournaments.filter((t) => t.featured || t.status === "Open").slice(0, 3);
  const featuredHeroTournament = tournaments[0];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="hero-section container">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="section-tag">
              <Flame size={14} /> WINTER 2026 ESPORTS CHAMPIONSHIPS
            </span>

            <h1 className="hero-headline">
              COMPETE. CONQUER. <br />
              <span className="gradient">CLAIM GLORY.</span>
            </h1>

            <p className="hero-subtext">
              The premier competitive gaming tournament portal. Discover high-stakes community and professional
              tournaments, register your squad, dominate the live bracket, and take home verified prize pools.
            </p>

            <div className="hero-cta-group">
              <Link to="/tournaments" className="btn btn-primary btn-lg">
                Explore Tournaments <ArrowUpRight size={17} />
              </Link>
              <Link to="/teams" className="btn btn-glass btn-lg">
                <Users size={17} /> Register Your Team
              </Link>
            </div>

            {/* Live Stats Strip */}
            <div className="hero-stats-strip">
              <div className="hero-stat-item">
                <span className="hero-stat-value">$240K+</span>
                <span className="hero-stat-label">Prize Pools Awarded</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-value">1,450+</span>
                <span className="hero-stat-label">Active Esports Rosters</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-value">64</span>
                <span className="hero-stat-label">Weekly Cups</span>
              </div>
            </div>
          </div>

          {/* Interactive Three.js Arena Showcase */}
          <div className="hero-card-showcase arena-hero-showcase">
            <GamingScene />
            <div className="arena-hero-overlay">
              <span className="arena-live-label"><span className="arena-live-dot" /> ESPORTS ARENA // ONLINE</span>
              <div className="arena-overlay-bottom">
                <div>
                  <p className="arena-kicker">NEXT-GEN COMPETITIVE GAMING</p>
                  <h2>ENTER THE <span>ARENA</span></h2>
                  <p>One platform. Multiple titles. One championship mindset.</p>
                </div>
                <Link to="/rulebook" className="arena-rulebook-link">Read Rulebook <ArrowUpRight size={16} /></Link>
              </div>
              <div className="arena-game-chips">
                <span>VALORANT</span><span>CS2</span><span>BGMI</span><span>FREE FIRE</span><span>APEX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Games Section */}
      <section className="container" style={{ padding: "40px 24px 60px" }}>
        <div style={{ marginBottom: 32 }}>
          <span className="section-tag section-tag-violet">
            <Gamepad2 size={14} /> SUPPORTED TITLES
          </span>
          <h2 className="section-title">
            Popular <span>Esports Arenas</span>
          </h2>
          <p className="section-subtitle">
            Compete in verified tournament ecosystems across the world's leading competitive game titles.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
          {games.map((g) => (
            <Link
              key={g.id}
              to={`/tournaments?game=${encodeURIComponent(g.name)}`}
              className="glass-card"
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 12
              }}
            >
              <img
                src={g.icon}
                alt={g.name}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "var(--radius-md)",
                  objectFit: "cover",
                  boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)"
                }}
              />
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>{g.name}</h4>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{g.genre}</div>
              </div>
              <div
                style={{
                  marginTop: "auto",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--accent-blue-subtle)",
                  color: "var(--accent-blue)",
                  fontSize: 11,
                  fontWeight: 700
                }}
              >
                {g.activeTournaments} Active Tournaments
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Tournaments Cards */}
      <section className="container" style={{ padding: "40px 24px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="section-tag">
              <Trophy size={14} /> BATTLE FOR SUPREMACY
            </span>
            <h2 className="section-title">
              Featured <span>Tournaments</span>
            </h2>
            <p className="section-subtitle">
              Registration is currently open for top competitive championships and invitational cups.
            </p>
          </div>
          <Link to="/tournaments" className="btn btn-glass">
            View All Tournaments <ChevronRight size={16} />
          </Link>
        </div>

        <div className="tournaments-grid">
          {featuredTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>

      {/* 4. Prize Pool Highlights & Recent Winners */}
      <section className="container" style={{ padding: "40px 24px 70px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
          {/* Recent Winners */}
          <div className="glass-panel" style={{ padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div className="badge-trophy-icon" style={{ background: "rgba(245, 158, 11, 0.12)", color: "#d97706" }}>
                <Medal size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: 19, fontWeight: 800 }}>Recent Champions</h3>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Verified tournament winner payouts</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {recentWinners.map((w) => (
                <div
                  key={w.id}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(226, 232, 240, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 14, color: "var(--text-primary)", display: "block" }}>
                      {w.winnerTeam}
                    </strong>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {w.tournament} · {w.game}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--accent-blue)", fontSize: 16 }}>
                      {w.prize}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--text-light)", display: "block" }}>
                      MVP: {w.mvp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="glass-panel" style={{ padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="badge-trophy-icon">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 19, fontWeight: 800 }}>Top Ranked Players</h3>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Overall season points & win-rate</p>
                </div>
              </div>
              <Link to="/leaderboards" style={{ fontSize: 13, fontWeight: 700, color: "var(--accent-blue)" }}>
                View All
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {leaderboardPlayers.slice(0, 3).map((p) => (
                <div
                  key={p.rank}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(226, 232, 240, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: 14
                  }}
                >
                  <span
                    className={`rank-badge ${p.rank === 1 ? "gold" : p.rank === 2 ? "silver" : "bronze"}`}
                  >
                    {p.rank}
                  </span>
                  <img
                    src={p.avatar}
                    alt={p.tag}
                    style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "var(--text-primary)" }}>{p.tag}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{p.team}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: "var(--success)", fontSize: 14 }}>{p.winRate}% WR</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{p.earnings}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   REUSABLE TOURNAMENT CARD
   ========================================================= */

function TournamentCard({ tournament }) {
  const { savedTournamentIds, toggleSaveTournament } = useApp();
  const isSaved = savedTournamentIds.includes(tournament.id);

  const percentage = Math.min(
    100,
    Math.round((tournament.registeredParticipants / tournament.maxParticipants) * 100)
  );

  return (
    <article className="tournament-card">
      <div className="tournament-banner-wrap">
        <img src={tournament.banner} alt={tournament.title} className="tournament-banner-img" />

        <div className="tournament-overlay-badges">
          <span className="game-tag-badge">{tournament.game}</span>
          <button
            className={`bookmark-btn ${isSaved ? "saved" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              toggleSaveTournament(tournament.id);
            }}
            title={isSaved ? "Remove from bookmarks" : "Save tournament"}
          >
            <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="tournament-card-body">
        <div className="tournament-status-row">
          <span className="mode-chip">{tournament.mode}</span>
          <span className={`status-indicator ${tournament.status.toLowerCase()}`}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "currentColor"
              }}
            />
            {tournament.status}
          </span>
        </div>

        <h3 className="tournament-card-title">{tournament.title}</h3>

        <div className="tournament-info-grid">
          <div className="info-item">
            <span className="info-label">Prize Pool</span>
            <span className="info-value prize">{tournament.prizePool}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Entry Fee</span>
            <span className="info-value">{tournament.entryFee}</span>
          </div>
        </div>

        {/* Participants Progress Bar */}
        <div className="participants-progress">
          <div className="participants-header">
            <span>Participants</span>
            <span>
              {tournament.registeredParticipants} / {tournament.maxParticipants} Teams
            </span>
          </div>
          <div className="progress-track-glass">
            <div className="progress-fill" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        <div className="tournament-card-footer">
          <div className="tournament-date-hint">
            <Calendar size={14} />
            <span>{tournament.tournamentDate}</span>
          </div>

          <Link to={`/tournaments/${tournament.id}`} className="btn btn-primary btn-sm">
            View Details <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   PAGE B: TOURNAMENT EXPLORER
   ========================================================= */

function TournamentExplorerPage() {
  const { tournaments } = useApp();
  const location = useLocation();

  // URL query parameter for quick game filter
  const queryParams = new URLSearchParams(location.search);
  const initialGameFilter = queryParams.get("game") || "All";

  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState(initialGameFilter);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedMode, setSelectedMode] = useState("All");
  const [sortBy, setSortBy] = useState("prize-high");

  const gamesList = ["All", "Valorant", "Counter-Strike 2", "League of Legends", "Apex Legends", "Rocket League"];
  const statusList = ["All", "Open", "Ongoing", "Upcoming"];
  const modeList = ["All", "Squad", "Solo"];

  // Filtered & Sorted Tournament List
  const filteredTournaments = useMemo(() => {
    return tournaments
      .filter((t) => {
        const matchesSearch =
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.game.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase());

        const matchesGame = selectedGame === "All" || t.game === selectedGame;
        const matchesStatus = selectedStatus === "All" || t.status === selectedStatus;
        const matchesMode = selectedMode === "All" || t.mode === selectedMode;

        return matchesSearch && matchesGame && matchesStatus && matchesMode;
      })
      .sort((a, b) => {
        if (sortBy === "prize-high") return b.prizePoolNumber - a.prizePoolNumber;
        if (sortBy === "prize-low") return a.prizePoolNumber - b.prizePoolNumber;
        if (sortBy === "date-soon") return new Date(a.tournamentDate) - new Date(b.tournamentDate);
        if (sortBy === "participants") return b.registeredParticipants - a.registeredParticipants;
        return 0;
      });
  }, [tournaments, search, selectedGame, selectedStatus, selectedMode, sortBy]);

  return (
    <div className="container page-wrapper">
      <div style={{ marginBottom: 32 }}>
        <span className="section-tag">
          <Search size={14} /> TOURNAMENT DIRECTORY
        </span>
        <h1 className="section-title">
          Explore <span>Championships</span>
        </h1>
        <p className="section-subtitle">
          Find and enter open gaming brackets. Filter by competitive title, tournament format, and prize pool.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel filter-toolbar">
        {/* Search Input */}
        <div className="search-input-wrap">
          <Search size={18} className="search-icon-inside" />
          <input
            type="text"
            className="glass-input"
            placeholder="Search tournaments by name, game, or rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Row */}
        <div className="filter-actions-row">
          {/* Game Category Filter Pills */}
          <div className="pill-group">
            {gamesList.map((g) => (
              <button
                key={g}
                className={`filter-pill ${selectedGame === g ? "active" : ""}`}
                onClick={() => setSelectedGame(g)}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)" }}>Sort by:</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="prize-high">Highest Prize Pool</option>
              <option value="prize-low">Lowest Entry Fee</option>
              <option value="date-soon">Earliest Date</option>
              <option value="participants">Most Participants</option>
            </select>
          </div>
        </div>

        {/* Secondary filters (Status & Mode) */}
        <div style={{ display: "flex", gap: 20, paddingTop: 14, borderTop: "1px solid rgba(226, 232, 240, 0.7)", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>Status:</span>
            {statusList.map((st) => (
              <button
                key={st}
                className={`filter-pill ${selectedStatus === st ? "active" : ""}`}
                style={{ padding: "4px 12px", fontSize: 12 }}
                onClick={() => setSelectedStatus(st)}
              >
                {st}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>Format:</span>
            {modeList.map((m) => (
              <button
                key={m}
                className={`filter-pill ${selectedMode === m ? "active" : ""}`}
                style={{ padding: "4px 12px", fontSize: 12 }}
                onClick={() => setSelectedMode(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tournaments Grid */}
      {filteredTournaments.length > 0 ? (
        <div className="tournaments-grid">
          {filteredTournaments.map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: "60px 20px", textAlign: "center" }}>
          <Gamepad2 size={42} style={{ color: "var(--text-muted)", marginBottom: 16 }} />
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>No Tournaments Found</h3>
          <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14 }}>
            Try adjusting your search query or reset the game and status filters.
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 20 }}
            onClick={() => {
              setSearch("");
              setSelectedGame("All");
              setSelectedStatus("All");
              setSelectedMode("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PAGE C: TOURNAMENT DETAILS
   ========================================================= */

function TournamentDetailsPage() {
  const { id } = useParams();
  const { tournaments, user, registerForTournament, leaveTournament } = useApp();
  const [activeTab, setActiveTab] = useState("bracket");
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [teamNameInput, setTeamNameInput] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const navigate = useNavigate();

  const tournament = tournaments.find((t) => t.id === id);

  if (!tournament) {
    return (
      <div className="container page-wrapper" style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2>Tournament Not Found</h2>
        <p style={{ color: "var(--text-muted)", margin: "14px 0 24px" }}>
          The tournament ID you requested does not exist or has concluded.
        </p>
        <Link to="/tournaments" className="btn btn-primary">
          Back to Tournaments
        </Link>
      </div>
    );
  }

  const isUserRegistered = user?.registeredTournaments?.includes(tournament.id);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError("");
    const res = registerForTournament(tournament.id, teamNameInput);
    if (res.success) {
      setRegSuccess("Successfully registered! Match schedule has been added to your dashboard.");
      setTimeout(() => {
        setRegisterModalOpen(false);
        setRegSuccess("");
      }, 1500);
    } else {
      setRegError(res.error);
    }
  };

  return (
    <div className="container page-wrapper">
      {/* 1. Header Banner */}
      <div className="details-hero">
        <img src={tournament.banner} alt={tournament.title} className="details-banner-bg" />
        <div className="details-hero-overlay">
          <div className="details-hero-left">
            <span className="game-tag-badge">{tournament.game}</span>
            <h1>{tournament.title}</h1>
            <div className="details-quick-tags">
              <span className="quick-tag-item">
                <Calendar size={14} /> {tournament.tournamentDate}
              </span>
              <span className="quick-tag-item">
                <Clock size={14} /> {tournament.time}
              </span>
              <span className="quick-tag-item">
                <Globe size={14} /> {tournament.region}
              </span>
              <span className="quick-tag-item">
                <Users size={14} /> {tournament.mode} ({tournament.format})
              </span>
            </div>
          </div>

          <div>
            {isUserRegistered ? (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span className="btn btn-glass" style={{ cursor: "default", color: "var(--success)" }}>
                  <CheckCircle2 size={16} /> Registered
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => leaveTournament(tournament.id)}
                >
                  Withdraw
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else if (localStorage.getItem("esportsarena_rulebook_accepted") !== "true") {
                    alert("Please read and acknowledge the tournament rulebook before registering.");
                    navigate("/rulebook");
                  } else {
                    setRegisterModalOpen(true);
                  }
                }}
              >
                Register Team Now <ArrowUpRight size={17} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Details Tabs Nav */}
      <div className="details-tabs-nav">
        <button
          className={`details-tab-btn ${activeTab === "bracket" ? "active" : ""}`}
          onClick={() => setActiveTab("bracket")}
        >
          Tournament Bracket
        </button>
        <button
          className={`details-tab-btn ${activeTab === "rules" ? "active" : ""}`}
          onClick={() => setActiveTab("rules")}
        >
          Rules & Regulations
        </button>
        <button
          className={`details-tab-btn ${activeTab === "prizes" ? "active" : ""}`}
          onClick={() => setActiveTab("prizes")}
        >
          Prize Distribution
        </button>
        <button
          className={`details-tab-btn ${activeTab === "schedule" ? "active" : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule & Timeline
        </button>
        <button
          className={`details-tab-btn ${activeTab === "teams" ? "active" : ""}`}
          onClick={() => setActiveTab("teams")}
        >
          Registered Teams ({tournament.registeredParticipants})
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* Tab: Bracket View */}
      {activeTab === "bracket" && (
        <div className="glass-panel" style={{ padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>Championship Elimination Bracket</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                Live bracket progression. Best of 3 single elimination format.
              </p>
            </div>
            <span className="mode-chip">Official Bracket</span>
          </div>

          <div className="bracket-container">
            <div className="bracket-rounds-wrapper">
              {/* Quarter-Finals */}
              <div className="bracket-round">
                <div className="bracket-round-title">Quarter-Finals</div>
                {tournament.brackets?.quarters?.length > 0 ? (
                  tournament.brackets.quarters.map((m) => (
                    <div key={m.id} className="bracket-match-node">
                      <div className={`bracket-team-slot ${m.winner === m.team1 ? "winner" : ""}`}>
                        <span>{m.team1}</span>
                        <span className="bracket-score">{m.score1}</span>
                      </div>
                      <div className={`bracket-team-slot ${m.winner === m.team2 ? "winner" : ""}`}>
                        <span>{m.team2}</span>
                        <span className="bracket-score">{m.score2}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", padding: 20 }}>
                    Brackets generated upon roster lock.
                  </div>
                )}
              </div>

              {/* Semi-Finals */}
              <div className="bracket-round">
                <div className="bracket-round-title">Semi-Finals</div>
                {tournament.brackets?.semis?.length > 0 ? (
                  tournament.brackets.semis.map((m) => (
                    <div key={m.id} className="bracket-match-node">
                      <div className={`bracket-team-slot ${m.winner === m.team1 ? "winner" : ""}`}>
                        <span>{m.team1}</span>
                        <span className="bracket-score">{m.score1}</span>
                      </div>
                      <div className={`bracket-team-slot ${m.winner === m.team2 ? "winner" : ""}`}>
                        <span>{m.team2}</span>
                        <span className="bracket-score">{m.score2}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", padding: 20 }}>
                    Awaiting Quarter-Final results.
                  </div>
                )}
              </div>

              {/* Grand Finals */}
              <div className="bracket-round">
                <div className="bracket-round-title">Grand Finals</div>
                {tournament.brackets?.finals?.length > 0 ? (
                  tournament.brackets.finals.map((m) => (
                    <div key={m.id} className="bracket-match-node" style={{ borderColor: "var(--accent-blue)" }}>
                      <div className={`bracket-team-slot ${m.winner === m.team1 ? "winner" : ""}`}>
                        <span>{m.team1}</span>
                        <span className="bracket-score">{m.score1}</span>
                      </div>
                      <div className={`bracket-team-slot ${m.winner === m.team2 ? "winner" : ""}`}>
                        <span>{m.team2}</span>
                        <span className="bracket-score">{m.score2}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", padding: 20 }}>
                    Awaiting Championship Finalists.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Rules */}
      {activeTab === "rules" && (
        <div className="glass-panel" style={{ padding: 32 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>Official Rulebook & Requirements</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
            {tournament.description}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 28 }}>
            <div style={{ padding: 18, background: "rgba(241, 245, 249, 0.7)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Minimum Rank</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "var(--accent-blue)", marginTop: 4 }}>{tournament.minRank}</div>
            </div>
            <div style={{ padding: 18, background: "rgba(241, 245, 249, 0.7)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Eligible Region</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>{tournament.region}</div>
            </div>
            <div style={{ padding: 18, background: "rgba(241, 245, 249, 0.7)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Platform & Hardware</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>{tournament.platform}</div>
            </div>
          </div>

          <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>General Match Rules</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 12, paddingLeft: 20, color: "var(--text-secondary)", fontSize: 14 }}>
            {tournament.rules?.map((rule, idx) => (
              <li key={idx} style={{ lineHeight: 1.6 }}>{rule}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tab: Prizes */}
      {activeTab === "prizes" && (
        <div className="glass-panel" style={{ padding: 32 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="section-tag">
              <Trophy size={14} /> GUARANTEED POOL
            </span>
            <h3 style={{ fontSize: 26, fontWeight: 800 }}>Prize Distribution: {tournament.prizePool}</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
              Distributed within 48 hours of match completion to team captain balances.
            </p>
          </div>

          <div className="prizes-grid">
            {tournament.prizes?.map((p, idx) => (
              <div key={idx} className="glass-card prize-tier-card">
                <div className={`prize-icon-circle ${idx === 0 ? "prize-gold" : idx === 1 ? "prize-silver" : "prize-bronze"}`}>
                  <Trophy size={24} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>
                  {p.place}
                </div>
                <div className="prize-amount-big">{p.amount}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>{p.badge}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Schedule */}
      {activeTab === "schedule" && (
        <div className="glass-panel" style={{ padding: 32 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Tournament Schedule & Timeline</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {tournament.schedule?.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(241, 245, 249, 0.6)",
                  border: "1px solid rgba(226, 232, 240, 0.7)"
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "var(--accent-blue-subtle)",
                    color: "var(--accent-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 13,
                    flexShrink: 0
                  }}
                >
                  {idx + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>{s.round}</div>
                  <div style={{ fontSize: 12, color: "var(--accent-blue)", fontWeight: 700, margin: "2px 0 4px" }}>
                    {s.date}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Teams */}
      {activeTab === "teams" && (
        <div className="glass-panel" style={{ padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800 }}>Registered Teams</h3>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)" }}>
              {tournament.registeredTeams?.length || 0} Rosters Confirmed
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {tournament.registeredTeams?.length > 0 ? (
              tournament.registeredTeams.map((tm) => (
                <div
                  key={tm.id}
                  style={{
                    padding: "16px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(226, 232, 240, 0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-sm)",
                      background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 14
                    }}
                  >
                    {tm.avatar || tm.tag}
                  </div>
                  <div>
                    <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>{tm.name}</strong>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Captain: {tm.captain}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: "var(--text-muted)", fontSize: 14 }}>No teams registered yet. Be the first!</div>
            )}
          </div>
        </div>
      )}

      {/* Team Registration Modal */}
      {registerModalOpen && (
        <div className="modal-backdrop" onClick={() => setRegisterModalOpen(false)}>
          <div className="modal-glass-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Confirm Tournament Registration</h3>
              <button
                className="btn-glass btn-sm"
                style={{ borderRadius: "50%", width: 32, height: 32, padding: 0 }}
                onClick={() => setRegisterModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 20 }}>
              You are registering for <strong>{tournament.title}</strong>. Your team will be entered into the seed bracket.
            </p>

            {regError && (
              <div
                style={{
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--danger-bg)",
                  color: "var(--danger)",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 14
                }}
              >
                {regError}
              </div>
            )}

            {regSuccess && (
              <div
                style={{
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--success-bg)",
                  color: "var(--success)",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 14
                }}
              >
                {regSuccess}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Team / Squad Name</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="e.g. Team Liquid Glass"
                  value={teamNameInput}
                  onChange={(e) => setTeamNameInput(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-muted)" }}>
                <span>Entry Fee:</span>
                <strong style={{ color: "var(--text-primary)" }}>{tournament.entryFee}</strong>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <button type="submit" className="btn btn-primary btn-full">
                  Confirm Registration
                </button>
                <button
                  type="button"
                  className="btn btn-glass"
                  onClick={() => setRegisterModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PAGE E: USER DASHBOARD
   ========================================================= */

function UserDashboardPage() {
  const { user, tournaments, updateProfile, leaveTournament } = useApp();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    gamertag: user?.gamertag || "",
    bio: user?.bio || "",
    primaryGame: user?.primaryGame || "Valorant",
    rankTier: user?.rankTier || "Immortal 3"
  });

  if (!user) {
    return (
      <div className="container page-wrapper" style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2>Sign In Required</h2>
        <p style={{ color: "var(--text-muted)", margin: "14px 0 24px" }}>
          Log in with your demo account or register to view your player dashboard.
        </p>
        <Link to="/login" className="btn btn-primary">
          Log In
        </Link>
      </div>
    );
  }

  // Get user's registered tournament objects
  const myTournaments = tournaments.filter((t) =>
    user.registeredTournaments?.includes(t.id)
  );

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setProfileModalOpen(false);
  };

  return (
    <div className="container page-wrapper">
      {/* 1. Dashboard User Hero */}
      <div className="glass-panel dashboard-hero">
        <div className="dashboard-user-meta">
          <img src={user.avatar} alt={user.gamertag} className="dashboard-avatar-lg" />
          <div className="dashboard-user-info">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2>{user.gamertag}</h2>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  background: "var(--accent-blue-subtle)",
                  color: "var(--accent-blue)",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)"
                }}
              >
                {user.rankTier}
              </span>
            </div>
            <p>
              {user.name} · {user.primaryGame} Player · Joined {user.joinedDate}
            </p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, maxWidth: 500 }}>
              "{user.bio}"
            </p>
          </div>
        </div>

        <button className="btn btn-glass" onClick={() => setProfileModalOpen(true)}>
          <Edit3 size={15} /> Edit Profile
        </button>
      </div>

      {/* 2. KPI Metrics Grid */}
      <div className="kpi-stats-grid">
        <div className="glass-card kpi-card">
          <div className="kpi-icon-wrap kpi-icon-blue">
            <Trophy size={24} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Tournament Wins</span>
            <span className="kpi-value">{user.stats?.tournamentsWon || 0}</span>
            <span className="kpi-extra">{user.stats?.tournamentsPlayed || 0} played</span>
          </div>
        </div>

        <div className="glass-card kpi-card">
          <div className="kpi-icon-wrap kpi-icon-green">
            <TrendingUp size={24} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Win Rate</span>
            <span className="kpi-value">{user.stats?.winRate || 0}%</span>
            <span className="kpi-extra">
              {user.stats?.totalWins}W / {user.stats?.totalLosses}L
            </span>
          </div>
        </div>

        <div className="glass-card kpi-card">
          <div className="kpi-icon-wrap kpi-icon-violet">
            <Sparkles size={24} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Total Earnings</span>
            <span className="kpi-value">{user.stats?.totalEarnings || "$0"}</span>
            <span className="kpi-extra">Verified Escrow</span>
          </div>
        </div>

        <div className="glass-card kpi-card">
          <div className="kpi-icon-wrap kpi-icon-cyan">
            <Swords size={24} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">K/D Ratio</span>
            <span className="kpi-value">{user.stats?.kdRatio || "1.0"}</span>
            <span className="kpi-extra">{user.stats?.headshotPercentage}% HS</span>
          </div>
        </div>
      </div>

      {/* 3. Analytics Chart + Upcoming Matches Agenda */}
      <div className="dashboard-split-layout">
        {/* Recharts Analytics Panel */}
        <div className="glass-panel analytics-card">
          <div className="chart-header">
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>Performance & Earnings Growth</h3>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Monthly win-rate % and prize earnings</p>
            </div>
            <span className="mode-chip">Recharts Engine</span>
          </div>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={user.performanceHistory || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    borderRadius: "10px",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                    fontSize: 12
                  }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" name="Earnings ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Matches Agenda */}
        <div className="glass-panel analytics-card">
          <div className="chart-header">
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>Upcoming Tournament Matches</h3>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Check in 30 minutes prior to match launch</p>
            </div>
          </div>

          <div className="matches-agenda-list">
            <div className="glass-card match-agenda-item">
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-blue)", textTransform: "uppercase" }}>
                  Apex Masters · Round of 16
                </div>
                <strong style={{ fontSize: 15, color: "var(--text-primary)", display: "block", marginTop: 2 }}>
                  vs Sentinels Prime
                </strong>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Map: Haven (Best of 3)</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="live-badge" style={{ padding: "3px 8px", fontSize: 10 }}>
                  Today 18:00 EST
                </span>
                <Link to="/tournaments/TRN-VAL-01" className="btn btn-glass btn-sm" style={{ marginTop: 8, display: "inline-flex" }}>
                  Lobby
                </Link>
              </div>
            </div>

            <div className="glass-card match-agenda-item">
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-violet)", textTransform: "uppercase" }}>
                  Global Major Circuit · Group B
                </div>
                <strong style={{ fontSize: 15, color: "var(--text-primary)", display: "block", marginTop: 2 }}>
                  vs G2 Army
                </strong>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Map: Mirage (MR12)</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)" }}>Dec 18, 17:00 CET</span>
                <Link to="/tournaments/TRN-CS2-02" className="btn btn-glass btn-sm" style={{ marginTop: 8, display: "inline-flex" }}>
                  Lobby
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Registered Tournaments List */}
      <div className="glass-panel" style={{ padding: 28, marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800 }}>My Registered Tournaments</h3>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
              Manage your active registrations and team check-ins
            </p>
          </div>
          <Link to="/tournaments" className="btn btn-primary btn-sm">
            <Plus size={14} /> Join More
          </Link>
        </div>

        {myTournaments.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {myTournaments.map((t) => (
              <div key={t.id} className="glass-card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="game-tag-badge">{t.game}</span>
                  <span className={`status-indicator ${t.status.toLowerCase()}`}>{t.status}</span>
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 800 }}>{t.title}</h4>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Date: {t.tournamentDate} · Prize: <b style={{ color: "var(--accent-blue)" }}>{t.prizePool}</b>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: "auto", paddingTop: 10 }}>
                  <Link to={`/tournaments/${t.id}`} className="btn btn-glass btn-sm" style={{ flexGrow: 1 }}>
                    View Bracket
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => leaveTournament(t.id)}
                    title="Withdraw from tournament"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "30px 20px", color: "var(--text-muted)", fontSize: 14 }}>
            You haven't registered for any active tournaments yet.
          </div>
        )}
      </div>

      {/* 5. Match History */}
      <div className="glass-panel" style={{ padding: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 18 }}>Recent Match Results</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {user.recentMatches?.map((m) => (
            <div
              key={m.id}
              style={{
                padding: "14px 18px",
                borderRadius: "var(--radius-md)",
                background: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(226, 232, 240, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 14,
                flexWrap: "wrap"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    background: m.result === "Victory" ? "var(--success-bg)" : "var(--danger-bg)",
                    color: m.result === "Victory" ? "var(--success)" : "var(--danger)"
                  }}
                >
                  {m.result}
                </span>
                <div>
                  <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>
                    vs {m.opponent}
                  </strong>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {m.tournamentTitle} · Map: {m.map} ({m.date})
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16 }}>{m.score}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {m.kills}K / {m.deaths}D / {m.assists}A · <b style={{ color: "var(--accent-blue)" }}>{m.rating} Rating</b>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {profileModalOpen && (
        <div className="modal-backdrop" onClick={() => setProfileModalOpen(false)}>
          <div className="modal-glass-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Edit Player Profile</h3>
              <button
                className="btn-glass btn-sm"
                style={{ borderRadius: "50%", width: 32, height: 32, padding: 0 }}
                onClick={() => setProfileModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="glass-input"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gamer Tag</label>
                <input
                  type="text"
                  className="glass-input"
                  value={editForm.gamertag}
                  onChange={(e) => setEditForm({ ...editForm, gamertag: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Game</label>
                <select
                  className="glass-input"
                  value={editForm.primaryGame}
                  onChange={(e) => setEditForm({ ...editForm, primaryGame: e.target.value })}
                >
                  <option value="Valorant">Valorant</option>
                  <option value="Counter-Strike 2">Counter-Strike 2</option>
                  <option value="League of Legends">League of Legends</option>
                  <option value="Apex Legends">Apex Legends</option>
                  <option value="Rocket League">Rocket League</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Rank / Tier</label>
                <input
                  type="text"
                  className="glass-input"
                  value={editForm.rankTier}
                  onChange={(e) => setEditForm({ ...editForm, rankTier: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bio / Tagline</label>
                <textarea
                  className="glass-input"
                  rows="3"
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <button type="submit" className="btn btn-primary btn-full">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-glass"
                  onClick={() => setProfileModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PAGE F: TEAM MANAGEMENT
   ========================================================= */

function TeamManagementPage() {
  const { teams, user, createTeam, addTeamMember, removeTeamMember, banTeam, unbanTeam } = useApp();
  const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id || null);

  const [newTeam, setNewTeam] = useState({ name: "", tag: "", game: "Valorant", bio: "" });
  const [newMember, setNewMember] = useState({ gamertag: "", name: "", role: "Entry Fragger" });

  const activeTeam = teams.find((t) => t.id === selectedTeamId) || teams[0];

  const handleCreateTeamSubmit = (e) => {
    e.preventDefault();
    const res = createTeam(newTeam);
    if (res.success) {
      setSelectedTeamId(res.team.id);
      setCreateTeamModalOpen(false);
      setNewTeam({ name: "", tag: "", game: "Valorant", bio: "" });
    }
  };

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (activeTeam) {
      addTeamMember(activeTeam.id, newMember);
      setAddMemberModalOpen(false);
      setNewMember({ gamertag: "", name: "", role: "Entry Fragger" });
    }
  };

  const handleTeamBanToggle = () => {
    if (!activeTeam || user?.role !== "admin") return;
    if (activeTeam.isBanned) {
      const confirmed = window.confirm(`Unban ${activeTeam.name}? This restores its team status.`);
      if (confirmed) {
        const result = unbanTeam(activeTeam.id);
        if (!result?.success) window.alert(result?.error || "Unable to unban this team.");
      }
      return;
    }
    const reason = window.prompt(`Enter the reason for banning ${activeTeam.name}:`);
    if (reason === null) return;
    if (!reason.trim()) {
      window.alert("A ban reason is required.");
      return;
    }
    const result = banTeam(activeTeam.id, reason.trim());
    if (!result?.success) window.alert(result?.error || "Unable to ban this team.");
  };

  return (
    <div className="container page-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <span className="section-tag">
            <Users size={14} /> ESPORTS ROSTER
          </span>
          <h1 className="section-title">
            Team <span>Management</span>
          </h1>
          <p className="section-subtitle">
            Assemble competitive squads, assign in-game roles, and enter squad championships together.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setCreateTeamModalOpen(true)}>
          <Plus size={16} /> Create New Team
        </button>
      </div>

      {user?.role === "admin" && teams.length > 1 && (
        <div className="admin-team-picker">
          <label htmlFor="admin-team-select">Manage team</label>
          <select id="admin-team-select" value={activeTeam?.id || ""} onChange={(e) => setSelectedTeamId(e.target.value)}>
            {teams.map((team) => <option key={team.id} value={team.id}>{team.name}{team.isBanned ? " — BANNED" : ""}</option>)}
          </select>
        </div>
      )}

      {activeTeam ? (
        <>
          {/* Team Hero Card */}
          <div className="glass-panel team-hero-card">
            <div className="team-brand-left">
              <div className="team-logo-big">{activeTeam.logo}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 800 }}>{activeTeam.name}</h2>
                  <span className="mode-chip">[{activeTeam.tag}]</span>
                  {activeTeam.isBanned && <span className="team-banned-chip"><Ban size={12} /> BANNED</span>}
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 4 }}>
                  {activeTeam.game} Competitive Roster · Established {activeTeam.createdDate}
                </p>
                <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4, maxWidth: 550 }}>
                  "{activeTeam.bio}"
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--accent-blue)" }}>
                  {activeTeam.stats?.winRate}%
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>Win Rate</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--success)" }}>
                  {activeTeam.stats?.trophies}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>Trophies</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>
                  {activeTeam.members?.length || 0}/5
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>Roster</div>
              </div>
            </div>
          </div>

          {/* Admin moderation controls */}
          {user?.role === "admin" && (
            <div className={`team-moderation-panel ${activeTeam.isBanned ? "is-banned" : ""}`}>
              <div className="team-moderation-copy">
                {activeTeam.isBanned ? <Ban size={19} /> : <ShieldCheck size={19} />}
                <div>
                  <strong>{activeTeam.isBanned ? "Team currently banned" : "Team moderation"}</strong>
                  <span>{activeTeam.isBanned ? `Reason: ${activeTeam.banReason || "No reason recorded"}` : "Admin controls for tournament eligibility"}</span>
                </div>
              </div>
              <button type="button" className={`team-ban-action ${activeTeam.isBanned ? "unban" : "ban"}`} onClick={handleTeamBanToggle}>
                {activeTeam.isBanned ? <><RotateCcw size={16} /> Unban Team</> : <><Ban size={16} /> Ban Team</>}
              </button>
            </div>
          )}

          {/* Roster Section Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>Active Roster ({activeTeam.members?.length || 0})</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>Assigned player roles and tournament eligibility</p>
            </div>
            <button className="btn btn-glass btn-sm" onClick={() => setAddMemberModalOpen(true)} disabled={!!activeTeam.isBanned} title={activeTeam.isBanned ? "Banned teams cannot add players" : "Add a player"}>
              <Plus size={14} /> Add Player
            </button>
          </div>

          {/* Roster Cards Grid */}
          <div className="roster-grid">
            {activeTeam.members?.map((member) => (
              <div key={member.id} className="glass-card player-roster-card">
                <img src={member.avatar} alt={member.gamertag} className="player-roster-avatar" />
                <div className="player-roster-info">
                  <span className="player-gamertag">{member.gamertag}</span>
                  <span className="player-role-badge">{member.role}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{member.name}</span>
                </div>

                {!member.isLeader && (
                  <button
                    className="remove-member-btn"
                    onClick={() => removeTeamMember(activeTeam.id, member.id)}
                    title="Remove from roster"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="glass-panel" style={{ padding: 60, textAlign: "center" }}>
          <h3>No Teams Created Yet</h3>
          <p style={{ color: "var(--text-muted)", margin: "8px 0 20px" }}>
            Create your first competitive esports team to enter squad tournaments.
          </p>
          <button className="btn btn-primary" onClick={() => setCreateTeamModalOpen(true)}>
            Create Team
          </button>
        </div>
      )}

      {/* Create Team Modal */}
      {createTeamModalOpen && (
        <div className="modal-backdrop" onClick={() => setCreateTeamModalOpen(false)}>
          <div className="modal-glass-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Create Esports Team</h3>
              <button
                className="btn-glass btn-sm"
                style={{ borderRadius: "50%", width: 32, height: 32, padding: 0 }}
                onClick={() => setCreateTeamModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateTeamSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Team Name</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="e.g. Sentinels Prime"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Team Tag (3-4 characters)</label>
                <input
                  type="text"
                  maxLength={4}
                  className="glass-input"
                  placeholder="e.g. SENP"
                  value={newTeam.tag}
                  onChange={(e) => setNewTeam({ ...newTeam, tag: e.target.value.toUpperCase() })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Game</label>
                <select
                  className="glass-input"
                  value={newTeam.game}
                  onChange={(e) => setNewTeam({ ...newTeam, game: e.target.value })}
                >
                  <option value="Valorant">Valorant</option>
                  <option value="Counter-Strike 2">Counter-Strike 2</option>
                  <option value="League of Legends">League of Legends</option>
                  <option value="Apex Legends">Apex Legends</option>
                  <option value="Rocket League">Rocket League</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Team Bio</label>
                <textarea
                  className="glass-input"
                  rows="3"
                  placeholder="Tell tournament organizers about your squad..."
                  value={newTeam.bio}
                  onChange={(e) => setNewTeam({ ...newTeam, bio: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <button type="submit" className="btn btn-primary btn-full">
                  Create Team
                </button>
                <button
                  type="button"
                  className="btn btn-glass"
                  onClick={() => setCreateTeamModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {addMemberModalOpen && (
        <div className="modal-backdrop" onClick={() => setAddMemberModalOpen(false)}>
          <div className="modal-glass-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Add Player to Roster</h3>
              <button
                className="btn-glass btn-sm"
                style={{ borderRadius: "50%", width: 32, height: 32, padding: 0 }}
                onClick={() => setAddMemberModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Gamer Tag</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="e.g. ShadowAim"
                  value={newMember.gamertag}
                  onChange={(e) => setNewMember({ ...newMember, gamertag: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Real Name (Optional)</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="e.g. Jason Scott"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">In-Game Role</label>
                <select
                  className="glass-input"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                >
                  <option value="Entry Fragger">Entry Fragger</option>
                  <option value="IGL / Caller">IGL / Caller</option>
                  <option value="Sniper / AWPer">Sniper / AWPer</option>
                  <option value="Support / Smokes">Support / Smokes</option>
                  <option value="Anchor / Sentinel">Anchor / Sentinel</option>
                  <option value="Flex Sub">Flex Sub</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                <button type="submit" className="btn btn-primary btn-full">
                  Add Member
                </button>
                <button
                  type="button"
                  className="btn btn-glass"
                  onClick={() => setAddMemberModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PAGE G: LEADERBOARDS
   ========================================================= */

function LeaderboardPage() {
  const { leaderboardPlayers, leaderboardTeams } = useApp();
  const [boardType, setBoardType] = useState("players"); // "players" or "teams"
  const [selectedGame, setSelectedGame] = useState("All");

  const filteredPlayers = leaderboardPlayers.filter(
    (p) => selectedGame === "All" || p.game === selectedGame
  );

  return (
    <div className="container page-wrapper">
      <div style={{ marginBottom: 32 }}>
        <span className="section-tag section-tag-violet">
          <Medal size={14} /> HALL OF CHAMPIONS
        </span>
        <h1 className="section-title">
          Esports <span>Leaderboards</span>
        </h1>
        <p className="section-subtitle">
          Global rankings tracked across verified tournament placements, win ratios, and tournament earnings.
        </p>
      </div>

      {/* Leaderboard Controls Toolbar */}
      <div className="glass-panel" style={{ padding: "16px 20px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        {/* Type Toggle */}
        <div className="pill-group">
          <button
            className={`filter-pill ${boardType === "players" ? "active" : ""}`}
            onClick={() => setBoardType("players")}
          >
            Player Rankings
          </button>
          <button
            className={`filter-pill ${boardType === "teams" ? "active" : ""}`}
            onClick={() => setBoardType("teams")}
          >
            Team Rankings
          </button>
        </div>

        {/* Game Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)" }}>Game:</span>
          <select
            className="sort-select"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="All">All Games</option>
            <option value="Valorant">Valorant</option>
            <option value="Counter-Strike 2">Counter-Strike 2</option>
            <option value="League of Legends">League of Legends</option>
            <option value="Apex Legends">Apex Legends</option>
          </select>
        </div>
      </div>

      {/* Players Table */}
      {boardType === "players" ? (
        <div className="glass-panel leaderboard-table-wrap">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Rank</th>
                <th>Player / Gamertag</th>
                <th>Team</th>
                <th>Game</th>
                <th>Win Rate</th>
                <th>K/D Ratio</th>
                <th>Tournaments Won</th>
                <th style={{ textAlign: "right" }}>Total Earnings</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((p) => (
                <tr key={p.rank}>
                  <td>
                    <span className={`rank-badge ${p.rank === 1 ? "gold" : p.rank === 2 ? "silver" : p.rank === 3 ? "bronze" : ""}`}>
                      {p.rank}
                    </span>
                  </td>
                  <td>
                    <div className="leaderboard-user-cell">
                      <img
                        src={p.avatar}
                        alt={p.tag}
                        style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }}
                      />
                      <div>
                        <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>{p.tag}</strong>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{p.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{p.team}</td>
                  <td>
                    <span className="mode-chip">{p.game}</span>
                  </td>
                  <td style={{ color: "var(--success)", fontWeight: 700 }}>{p.winRate}%</td>
                  <td style={{ color: "var(--text-secondary)" }}>{p.kdRatio}</td>
                  <td style={{ fontWeight: 700 }}>
                    {p.tournamentsWon} / {p.tournamentsPlayed}
                  </td>
                  <td style={{ textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--accent-blue)" }}>
                    {p.earnings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Teams Table */
        <div className="glass-panel leaderboard-table-wrap">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Rank</th>
                <th>Team Roster</th>
                <th>Game Focus</th>
                <th>Captain</th>
                <th>Win Rate</th>
                <th>Trophies</th>
                <th style={{ textAlign: "right" }}>Prize Money</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardTeams.map((t) => (
                <tr key={t.rank}>
                  <td>
                    <span className={`rank-badge ${t.rank === 1 ? "gold" : t.rank === 2 ? "silver" : t.rank === 3 ? "bronze" : ""}`}>
                      {t.rank}
                    </span>
                  </td>
                  <td>
                    <div className="leaderboard-user-cell">
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "var(--radius-sm)",
                          background: "linear-gradient(135deg, var(--accent-blue), var(--accent-violet))",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 13
                        }}
                      >
                        {t.logo}
                      </div>
                      <div>
                        <strong style={{ fontSize: 14, color: "var(--text-primary)" }}>{t.name}</strong>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{t.status}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="mode-chip">{t.game}</span>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{t.captain}</td>
                  <td style={{ color: "var(--success)", fontWeight: 700 }}>{t.winRate}%</td>
                  <td style={{ fontWeight: 800 }}>{t.trophies} 🏆</td>
                  <td style={{ textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--accent-blue)" }}>
                    {t.earnings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PAGE D: AUTHENTICATION (LOGIN & SIGNUP)
   ========================================================= */

function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const res = login(email, password);
    if (res.success) {
      navigate(res.user?.role === "admin" ? "/admin" : "/dashboard");
    } else {
      setError(res.error);
    }
  };

  const handleUseDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    const res = login(demoEmail, demoPass);
    if (res.success) {
      navigate(res.user?.role === "admin" ? "/admin" : "/dashboard");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="glass-panel auth-glass-box">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div className="brand-icon-box" style={{ margin: "0 auto 12px" }}>
            <Trophy size={20} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800 }}>Welcome Back</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
            Sign in to access your tournament brackets and dashboard
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              borderRadius: "var(--radius-sm)",
              background: "var(--danger-bg)",
              color: "var(--danger)",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 16
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="glass-input"
              style={{ paddingLeft: 16 }}
              placeholder="alex@esports.pro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                className="glass-input"
                style={{ paddingLeft: 16 }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 8 }}>
            Sign In to Portal
          </button>
        </form>

        {/* Demo Account Box */}
        <div className="demo-account-box">
          <div style={{ fontWeight: 800 }}>Quick Demo Sign-In:</div>
          <div>
            Player: <strong>alex@esports.pro</strong> / <strong>password123</strong>
          </div>
          <button
            className="btn btn-glass btn-sm"
            style={{ marginTop: 8 }}
            onClick={() => handleUseDemo("alex@esports.pro", "password123")}
          >
            Auto Sign-In as Player
          </button>
          <div style={{ marginTop: 10, fontSize: 12 }}>
            Admin: <strong>admin@tournaments.com</strong> / <strong>admin123</strong>
          </div>
          <button
            className="btn btn-primary btn-sm"
            style={{ marginTop: 8 }}
            onClick={() => handleUseDemo("admin@tournaments.com", "admin123")}
          >
            Auto Sign-In as Admin
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 22, fontSize: 13, color: "var(--text-muted)" }}>
          Don't have an account yet?{" "}
          <Link to="/signup" style={{ color: "var(--accent-blue)", fontWeight: 700 }}>
            Register Team
          </Link>
        </div>
      </div>
    </div>
  );
}

function SignupPage() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gamertag: "",
    email: "",
    password: "",
    primaryGame: "Valorant"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const res = register(formData);
    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="glass-panel auth-glass-box">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div className="brand-icon-box" style={{ margin: "0 auto 12px" }}>
            <Trophy size={20} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800 }}>Create Player Account</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 4 }}>
            Join thousands of esports competitors and claim your bracket spot
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px",
              borderRadius: "var(--radius-sm)",
              background: "var(--danger-bg)",
              color: "var(--danger)",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 16
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="glass-input"
              style={{ paddingLeft: 16 }}
              placeholder="e.g. Alexander Vance"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gamer Tag (Display Name)</label>
            <input
              type="text"
              className="glass-input"
              style={{ paddingLeft: 16 }}
              placeholder="e.g. ViperX"
              value={formData.gamertag}
              onChange={(e) => setFormData({ ...formData, gamertag: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="glass-input"
              style={{ paddingLeft: 16 }}
              placeholder="you@esports.pro"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                className="glass-input"
                style={{ paddingLeft: 16 }}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <span className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Primary Competitive Game</label>
            <select
              className="glass-input"
              style={{ paddingLeft: 16 }}
              value={formData.primaryGame}
              onChange={(e) => setFormData({ ...formData, primaryGame: e.target.value })}
            >
              <option value="Valorant">Valorant</option>
              <option value="Counter-Strike 2">Counter-Strike 2</option>
              <option value="League of Legends">League of Legends</option>
              <option value="Apex Legends">Apex Legends</option>
              <option value="Rocket League">Rocket League</option>
              <option value="Dota 2">Dota 2</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: 8 }}>
            Create Account & Enter Portal
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 22, fontSize: 13, color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--accent-blue)", fontWeight: 700 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN DASHBOARD — CREATE AND VIEW TOURNAMENTS
   Requires createTournament(formData) from AppContext.
   ========================================================= */
function AdminDashboardPage() {
  const { user, tournaments, createTournament } = useApp();
  const initialForm = {
    title: "", game: "Valorant", mode: "Squad", format: "5v5 Single Elimination",
    entryFee: "0", prizePool: "1000", maxParticipants: "16",
    registrationDeadline: "", tournamentDate: "", time: "18:00",
    region: "India", banner: "", description: ""
  };
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user || user.role !== "admin") {
    return (
      <div className="container page-wrapper">
        <div className="glass-panel" style={{ maxWidth: 620, margin: "50px auto", padding: 30, textAlign: "center" }}>
          <Shield size={34} style={{ color: "var(--accent-blue)" }} />
          <h2 style={{ margin: "14px 0 8px" }}>Administrator access required</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 18 }}>Sign in with an administrator account to create tournaments.</p>
          <Link to="/login" className="btn btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (form.registrationDeadline > form.tournamentDate) {
      setError("Registration deadline cannot be after the tournament date.");
      return;
    }
    if (typeof createTournament !== "function") {
      setError("Create tournament is not connected yet. Update AppContext.jsx with createTournament().");
      return;
    }
    const result = createTournament(form);
    if (!result?.success) {
      setError(result?.error || "Unable to create tournament.");
      return;
    }
    setSuccess(`Tournament “${result.tournament.title}” created successfully.`);
    setForm(initialForm);
  };

  const fieldStyle = { width: "100%", padding: "12px 14px", border: "1px solid #b8cce8", borderRadius: 9, background: "#fff", color: "#17345d", font: "inherit" };
  const labelStyle = { display: "block", marginBottom: 7, color: "#29496f", fontSize: 13, fontWeight: 800 };
  const groupStyle = { display: "flex", flexDirection: "column", minWidth: 0 };
  const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 };
  const inputField = (label, name, type = "text", extra = {}) => (
    <div style={groupStyle}>
      <label htmlFor={`admin-${name}`} style={labelStyle}>{label}</label>
      <input id={`admin-${name}`} name={name} type={type} value={form[name]} onChange={handleChange} style={fieldStyle} {...extra} />
    </div>
  );
  const selectField = (label, name, options) => (
    <div style={groupStyle}>
      <label htmlFor={`admin-${name}`} style={labelStyle}>{label}</label>
      <select id={`admin-${name}`} name={name} value={form[name]} onChange={handleChange} style={fieldStyle}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );

  return (
    <div className="container page-wrapper" style={{ paddingTop: 42, paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
        <div>
          <span className="section-tag"><Shield size={14} /> ADMIN CONTROL CENTER</span>
          <h1 className="section-title">Tournament <span>Management</span></h1>
          <p className="section-subtitle">Create and publish tournaments on EsportsArena.</p>
        </div>
        <span style={{ background: "#dceaff", color: "#174b91", borderRadius: 30, padding: "10px 16px", fontWeight: 800 }}>Administrator</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16, marginBottom: 22 }}>
        <div className="glass-panel" style={{ padding: 20 }}><Trophy color="var(--accent-blue)" /><div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8 }}>Total Tournaments</div><strong style={{ fontSize: 26 }}>{tournaments.length}</strong></div>
        <div className="glass-panel" style={{ padding: 20 }}><CheckCircle2 color="var(--success)" /><div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8 }}>Open Tournaments</div><strong style={{ fontSize: 26 }}>{tournaments.filter((item) => item.status === "Open").length}</strong></div>
      </div>

      <section className="glass-panel" style={{ padding: 26, marginBottom: 24 }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}><Plus size={21} /> Create New Tournament</h2>
        {error && <div role="alert" style={{ padding: 12, borderRadius: 8, background: "#ffe8e8", color: "#a32121", marginBottom: 16, fontWeight: 700 }}>{error}</div>}
        {success && <div role="status" style={{ padding: 12, borderRadius: 8, background: "#e2f8eb", color: "#176b3a", marginBottom: 16, fontWeight: 700 }}>{success}</div>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {inputField("Tournament Name *", "title", "text", { placeholder: "Enter tournament name", required: true })}
          <div style={gridStyle}>
            {selectField("Game", "game", ["Valorant", "Counter-Strike 2", "League of Legends", "Apex Legends", "Dota 2"])}
            {selectField("Mode", "mode", ["Squad", "Solo"])}
            {selectField("Format", "format", ["5v5 Single Elimination", "5v5 Double Elimination", "Battle Royale", "1v1 Knockout", "Round Robin"])}
          </div>
          <div style={gridStyle}>
            {inputField("Entry Fee ($)", "entryFee", "number", { min: 0, required: true })}
            {inputField("Prize Pool ($)", "prizePool", "number", { min: 0, required: true })}
            {inputField("Maximum Participants", "maxParticipants", "number", { min: 1, required: true })}
          </div>
          <div style={gridStyle}>
            {inputField("Registration Deadline *", "registrationDeadline", "date", { required: true })}
            {inputField("Tournament Date *", "tournamentDate", "date", { min: form.registrationDeadline || undefined, required: true })}
            {inputField("Start Time", "time", "time", { required: true })}
          </div>
          {inputField("Region", "region", "text", { required: true, placeholder: "India, Asia, Global..." })}
          {inputField("Banner Image URL (optional)", "banner", "url", { placeholder: "https://example.com/banner.jpg" })}
          <div style={groupStyle}>
            <label htmlFor="admin-description" style={labelStyle}>Description *</label>
            <textarea id="admin-description" name="description" rows={4} value={form.description} onChange={handleChange} required placeholder="Describe tournament details and rules..." style={{ ...fieldStyle, resize: "vertical" }} />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: "flex-start" }}><Plus size={18} /> Create Tournament</button>
        </form>
      </section>

      <section className="glass-panel" style={{ padding: 26 }}>
        <h2 style={{ marginBottom: 18 }}>Existing Tournaments</h2>
        {tournaments.length === 0 ? <p>No tournaments created yet.</p> : tournaments.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, padding: "15px 0", borderBottom: "1px solid #dce7f5" }}>
            <div><strong>{item.title}</strong><p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>{item.game} · {item.tournamentDate} · {item.status}</p></div>
            <span className="mode-chip">{item.prizePool}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

/* =========================================================
   MAIN APP ROUTER COMPONENT
   ========================================================= */

export default function App() {
  return (
    <AppProvider>
      <GlobalArenaScene />
      <NavigationBar />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tournaments" element={<TournamentExplorerPage />} />
          <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/teams" element={<TeamManagementPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/rulebook" element={<RulebookPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </AppProvider>
  );
}
