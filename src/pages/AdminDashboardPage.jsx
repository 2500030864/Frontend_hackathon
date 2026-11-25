
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Trophy, Users, History, Plus, Search,
  CalendarDays, Gamepad2, IndianRupee, UserRound,
  LogOut, Menu, X, ShieldCheck, Activity, Eye, Ban, ShieldAlert,
  Flag, CheckCircle2, AlertTriangle, RotateCcw
} from "lucide-react";
import { useApp } from "../context/AppContext";
import "./AdminDashboardPage.css";

const initialForm = {
  title: "",
  game: "Valorant",
  mode: "Squad",
  format: "5v5 Single Elimination",
  entryFee: "0",
  prizePool: "10000",
  maxParticipants: "16",
  registrationDeadline: "",
  tournamentDate: "",
  time: "18:00",
  region: "India",
  description: "",
  banner: ""
};

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(amount || 0));

const formatDate = (date) => {
  if (!date) return "Not available";
  return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const {
    user,
    users = [],
    tournaments = [],
    teams = [],
    banTeam,
    unbanTeam,
    cheatReports = [],
    createCheatReport,
    updateCheatReport,
    createTournament,
    logout
  } = useApp();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [incidentForm, setIncidentForm] = useState({
    player: "", game: "Valorant", category: "Aimbot / aim assistance",
    severity: "Medium", description: "", evidence: ""
  });
  const [moderationMessage, setModerationMessage] = useState("");
  const [moderationError, setModerationError] = useState("");

  const players = users.filter((item) => item.role !== "admin");

  const totalRegistrations = tournaments.reduce(
    (sum, item) => sum + Number(item.registeredParticipants || 0),
    0
  );

  const totalPrizePool = tournaments.reduce(
    (sum, item) => sum + Number(item.prizePoolNumber || 0),
    0
  );

  const openTournaments = tournaments.filter(
    (item) => item.status === "Open"
  );

  const filteredUsers = players.filter((item) => {
    const term = search.toLowerCase();
    return (
      (item.name || "").toLowerCase().includes(term) ||
      (item.gamertag || "").toLowerCase().includes(term) ||
      (item.email || "").toLowerCase().includes(term) ||
      (item.primaryGame || "").toLowerCase().includes(term)
    );
  });

  const filteredTournaments = tournaments.filter((item) => {
    const term = search.toLowerCase();
    return (
      (item.title || "").toLowerCase().includes(term) ||
      (item.game || "").toLowerCase().includes(term) ||
      (item.status || "").toLowerCase().includes(term)
    );
  });

  // Build a readable activity history from saved project records.
  const history = useMemo(() => {
    const events = [];

    users.forEach((player) => {
      if (player.role !== "admin") {
        events.push({
          id: `user-${player.id}`,
          type: "User Signup",
          title: `${player.gamertag || player.name} created an account`,
          detail: player.email,
          date: player.createdAt || player.joinedDate || "",
          icon: "user"
        });

        (player.registeredTournaments || []).forEach((tournamentId, index) => {
          const tournament = tournaments.find(
            (item) => item.id === tournamentId
          );

          events.push({
            id: `registration-${player.id}-${tournamentId}-${index}`,
            type: "Tournament Registration",
            title: `${player.gamertag || player.name} registered`,
            detail: tournament?.title || tournamentId,
            date: player.registrationHistory?.find(
              (entry) => entry.tournamentId === tournamentId
            )?.date || "",
            icon: "trophy"
          });
        });
      }
    });

    tournaments.forEach((tournament) => {
      if (tournament.createdAt) {
        events.push({
          id: `created-${tournament.id}`,
          type: "Tournament Created",
          title: tournament.title,
          detail: `${tournament.game} • ${tournament.status}`,
          date: tournament.createdAt,
          icon: "trophy"
        });
      }
    });

    return events.sort(
      (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
    );
  }, [users, tournaments]);

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tournaments", label: "Tournaments", icon: Trophy },
    { id: "create", label: "Create Tournament", icon: Plus },
    { id: "users", label: "Users", icon: Users },
    { id: "teams", label: "Team Bans", icon: Ban },
    { id: "cheating", label: "Cheating Detection", icon: ShieldAlert },
    { id: "history", label: "User History", icon: History }
  ];

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSearch("");
    setMessage("");
    setError("");
    setMobileMenu(false);
  };

  const handleBanTeam = (team) => {
    const reason = window.prompt(`Reason for banning ${team.name}:`);
    if (reason === null) return;
    const result = banTeam?.(team.id, reason);
    if (!result?.success) {
      setModerationError(result?.error || "Unable to ban team.");
      setModerationMessage("");
      return;
    }
    setModerationError("");
    setModerationMessage(`${team.name} has been banned. The reason is recorded.`);
  };

  const handleUnbanTeam = (team) => {
    if (!window.confirm(`Unban ${team.name}?`)) return;
    const result = unbanTeam?.(team.id);
    if (!result?.success) {
      setModerationError(result?.error || "Unable to unban team.");
      setModerationMessage("");
      return;
    }
    setModerationError("");
    setModerationMessage(`${team.name} has been unbanned.`);
  };

  const handleCreateIncident = (event) => {
    event.preventDefault();
    setModerationError("");
    setModerationMessage("");
    const result = createCheatReport?.(incidentForm);
    if (!result?.success) {
      setModerationError(result?.error || "Unable to create incident report.");
      return;
    }
    setModerationMessage("Incident logged for administrator review. This is a review flag, not a confirmed cheating verdict.");
    setIncidentForm({
      player: "", game: "Valorant", category: "Aimbot / aim assistance",
      severity: "Medium", description: "", evidence: ""
    });
  };

  const handleIncidentStatus = (report, status) => {
    const resolution = status === "Dismissed"
      ? (window.prompt("Why is this report being dismissed?") || "")
      : status === "Resolved"
        ? (window.prompt("Resolution notes (e.g. evidence reviewed, action taken):") || "")
        : "";
    if ((status === "Dismissed" || status === "Resolved") && !resolution.trim()) return;
    const result = updateCheatReport?.(report.id, status, resolution);
    if (!result?.success) {
      setModerationError(result?.error || "Unable to update report.");
      setModerationMessage("");
      return;
    }
    setModerationError("");
    setModerationMessage(`Report ${report.id} updated to ${status}.`);
  };

  const handleCreateTournament = (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!createTournament) {
      setError("createTournament() is missing from AppContext.jsx.");
      return;
    }

    const result = createTournament(form);

    if (!result.success) {
      setError(result.error || "Unable to create tournament.");
      return;
    }

    setMessage("Tournament created successfully!");
    setForm(initialForm);
    setActiveTab("tournaments");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="admin-access-denied">
        <ShieldCheck size={48} />
        <h2>Administrator access required</h2>
        <p>Please log in with your administrator account.</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  const StatCard = ({ title, value, note, icon: Icon, color }) => (
    <div className="admin-stat-card">
      <div className={`admin-stat-icon ${color}`}>
        <Icon size={21} />
      </div>
      <div className="admin-stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </div>
  );

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${mobileMenu ? "mobile-open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark">E</div>
          <span>Esports<span>Arena</span></span>
          <button
            className="admin-mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-sidebar-user">
          <div className="admin-avatar">
            {(user.name || "A").charAt(0).toUpperCase()}
          </div>
          <div>
            <small>Logged in as</small>
            <strong>{user.name || "Administrator"}</strong>
            <span>Administrator</span>
          </div>
        </div>

        <nav className="admin-navigation">
          <p className="admin-nav-heading">WORKSPACE</p>

          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`admin-nav-item ${activeTab === id ? "active" : ""}`}
              onClick={() => changeTab(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-profile">
            <div className="admin-avatar small">
              {(user.name || "A").charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{user.gamertag || user.name}</strong>
              <small>Admin Account</small>
            </div>
          </div>
          <button className="admin-logout" onClick={handleLogout}>
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="admin-mobile-overlay"
          onClick={() => setMobileMenu(false)}
          aria-label="Close navigation"
        />
      )}

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-mobile-toggle"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div>
            <strong>EsportsArena</strong>
            <span>Administration Center</span>
          </div>
          <div className="admin-topbar-right">
            <span className="admin-online-dot" />
            <span>Admin Panel</span>
            <div className="admin-avatar top-avatar">
              {(user.name || "A").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <p>WELCOME BACK, ADMIN</p>
              <h1>
                {navigation.find((item) => item.id === activeTab)?.label}
              </h1>
              <span>Manage your esports platform from one place.</span>
            </div>

            <button
              className="admin-primary-button"
              onClick={() => changeTab("create")}
            >
              <Plus size={18} /> Create Tournament
            </button>
          </div>

          {message && <div className="admin-success">{message}</div>}
          {error && <div className="admin-error">{error}</div>}

          {activeTab === "dashboard" && (
            <>
              <section className="admin-stats-grid">
                <StatCard
                  title="Total Players"
                  value={players.length}
                  note="Registered player accounts"
                  icon={Users}
                  color="blue"
                />
                <StatCard
                  title="Open Tournaments"
                  value={openTournaments.length}
                  note="Accepting registrations"
                  icon={Trophy}
                  color="green"
                />
                <StatCard
                  title="Total Registrations"
                  value={totalRegistrations}
                  note="Across all tournaments"
                  icon={Activity}
                  color="red"
                />
                <StatCard
                  title="Total Prize Pool"
                  value={formatMoney(totalPrizePool)}
                  note="Combined tournament prizes"
                  icon={IndianRupee}
                  color="purple"
                />
              </section>

              <section className="admin-panel">
                <div className="admin-panel-heading">
                  <div>
                    <h2>Recent Tournaments</h2>
                    <p>Overview of your latest competitions</p>
                  </div>
                  <button
                    className="admin-text-button"
                    onClick={() => changeTab("tournaments")}
                  >
                    View all
                  </button>
                </div>

                <TournamentTable
                  tournaments={tournaments.slice(0, 5)}
                  onOpen={(id) => navigate(`/tournaments/${id}`)}
                />
              </section>

              <section className="admin-panel">
                <div className="admin-panel-heading">
                  <div>
                    <h2>Recent Activity</h2>
                    <p>Latest user and tournament activity</p>
                  </div>
                  <button
                    className="admin-text-button"
                    onClick={() => changeTab("history")}
                  >
                    View history
                  </button>
                </div>
                <HistoryList items={history.slice(0, 5)} />
              </section>
            </>
          )}

          {activeTab === "create" && (
            <section className="admin-panel admin-form-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Create a new tournament</h2>
                  <p>Publish a competition for players to join.</p>
                </div>
                <Trophy size={26} />
              </div>

              <form
                className="admin-tournament-form"
                onSubmit={handleCreateTournament}
              >
                <label>
                  Tournament name *
                  <input
                    required
                    value={form.title}
                    placeholder="e.g. India Championship 2026"
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </label>

                <div className="admin-form-grid">
                  <label>
                    Game *
                    <select
                      value={form.game}
                      onChange={(e) =>
                        setForm({ ...form, game: e.target.value })
                      }
                    >
                      <option>Valorant</option>
                      <option>Counter-Strike 2</option>
                      <option>League of Legends</option>
                      <option>Apex Legends</option>
                      <option>Rocket League</option>
                      <option>Dota 2</option>
                    </select>
                  </label>

                  <label>
                    Tournament mode
                    <select
                      value={form.mode}
                      onChange={(e) =>
                        setForm({ ...form, mode: e.target.value })
                      }
                    >
                      <option>Squad</option>
                      <option>Solo</option>
                      <option>Duo</option>
                    </select>
                  </label>

                  <label>
                    Format
                    <select
                      value={form.format}
                      onChange={(e) =>
                        setForm({ ...form, format: e.target.value })
                      }
                    >
                      <option>5v5 Single Elimination</option>
                      <option>Double Elimination</option>
                      <option>Round Robin</option>
                      <option>Battle Royale</option>
                      <option>1v1 Single Elimination</option>
                      <option>2v2 Single Elimination</option>
                    </select>
                  </label>

                  <label>
                    Maximum teams / participants *
                    <input
                      required
                      type="number"
                      min="1"
                      value={form.maxParticipants}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          maxParticipants: e.target.value
                        })
                      }
                    />
                  </label>

                  <label>
                    Entry fee (₹)
                    <input
                      type="number"
                      min="0"
                      value={form.entryFee}
                      onChange={(e) =>
                        setForm({ ...form, entryFee: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    Prize pool (₹)
                    <input
                      type="number"
                      min="0"
                      value={form.prizePool}
                      onChange={(e) =>
                        setForm({ ...form, prizePool: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    Registration deadline *
                    <input
                      required
                      type="date"
                      value={form.registrationDeadline}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          registrationDeadline: e.target.value
                        })
                      }
                    />
                  </label>

                  <label>
                    Tournament date *
                    <input
                      required
                      type="date"
                      value={form.tournamentDate}
                      onChange={(e) =>
                        setForm({ ...form, tournamentDate: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    Start time
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) =>
                        setForm({ ...form, time: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    Region
                    <input
                      required
                      value={form.region}
                      onChange={(e) =>
                        setForm({ ...form, region: e.target.value })
                      }
                    />
                  </label>
                </div>

                <label>
                  Tournament banner URL
                  <input
                    type="url"
                    value={form.banner}
                    placeholder="https://example.com/banner.jpg"
                    onChange={(e) =>
                      setForm({ ...form, banner: e.target.value })
                    }
                  />
                </label>

                <label>
                  Description *
                  <textarea
                    required
                    rows="4"
                    value={form.description}
                    placeholder="Describe the tournament, rules and requirements..."
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </label>

                <div className="admin-form-actions">
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() => setForm(initialForm)}
                  >
                    Reset
                  </button>
                  <button type="submit" className="admin-primary-button">
                    <Plus size={18} /> Publish Tournament
                  </button>
                </div>
              </form>
            </section>
          )}

          {activeTab === "tournaments" && (
            <section className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Tournament Management</h2>
                  <p>{tournaments.length} tournaments in the platform</p>
                </div>
                <button
                  className="admin-primary-button"
                  onClick={() => changeTab("create")}
                >
                  <Plus size={17} /> New Tournament
                </button>
              </div>

              <SearchBox value={search} onChange={setSearch} />

              <TournamentTable
                tournaments={filteredTournaments}
                onOpen={(id) => navigate(`/tournaments/${id}`)}
              />
            </section>
          )}

          {activeTab === "users" && (
            <section className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Registered Players</h2>
                  <p>View and search player accounts</p>
                </div>
                <div className="admin-count-pill">
                  {players.length} Players
                </div>
              </div>

              <SearchBox value={search} onChange={setSearch} />

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Player</th>
                      <th>Email</th>
                      <th>Primary Game</th>
                      <th>Registrations</th>
                      <th>Account</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((player) => (
                      <tr key={player.id}>
                        <td>
                          <div className="admin-player-cell">
                            <div className="admin-player-avatar">
                              {(player.gamertag || player.name || "P")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div>
                              <strong>{player.gamertag || player.name}</strong>
                              <small>{player.name}</small>
                            </div>
                          </div>
                        </td>
                        <td>{player.email}</td>
                        <td>{player.primaryGame || "Not specified"}</td>
                        <td>
                          {(player.registeredTournaments || []).length}
                        </td>
                        <td>
                          <span className="admin-status active">Player</span>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan="5" className="admin-empty">
                          No players found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "teams" && (
            <section className="admin-panel moderation-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Team Ban Management</h2>
                  <p>Restrict teams that violate tournament policies. Every ban requires a reason.</p>
                </div>
                <div className="moderation-stat"><Ban size={18}/><strong>{teams.filter((team) => team.isBanned).length}</strong><span>Banned teams</span></div>
              </div>
              {moderationMessage && <div className="moderation-message success"><CheckCircle2 size={16}/>{moderationMessage}</div>}
              {moderationError && <div className="moderation-message error"><AlertTriangle size={16}/>{moderationError}</div>}
              <div className="moderation-notice"><ShieldCheck size={18}/><span>Use bans only after reviewing reports and evidence. Ban status is saved in this browser in demo mode.</span></div>
              <div className="admin-table-wrap">
                <table className="admin-table moderation-table">
                  <thead><tr><th>Team</th><th>Game</th><th>Captain</th><th>Status</th><th>Ban reason</th><th>Action</th></tr></thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.id}>
                        <td><strong>{team.name}</strong><small className="moderation-subline">#{team.tag || "TEAM"}</small></td>
                        <td>{team.game || "—"}</td>
                        <td>{team.captain || team.ownerName || "—"}</td>
                        <td><span className={`moderation-status ${team.isBanned ? "banned" : "active"}`}>{team.isBanned ? "Banned" : "Active"}</span></td>
                        <td className="moderation-reason">{team.isBanned ? team.banReason : "—"}</td>
                        <td>{team.isBanned
                          ? <button className="moderation-action unban" onClick={() => handleUnbanTeam(team)}><RotateCcw size={14}/> Unban</button>
                          : <button className="moderation-action ban" onClick={() => handleBanTeam(team)}><Ban size={14}/> Ban team</button>}
                        </td>
                      </tr>
                    ))}
                    {teams.length === 0 && <tr><td colSpan="6" className="admin-empty">No teams have been created yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "cheating" && (
            <section className="admin-panel moderation-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Cheating Detection Center</h2>
                  <p>Log suspicious match activity, review evidence and document decisions.</p>
                </div>
                <div className="moderation-stat"><ShieldAlert size={18}/><strong>{cheatReports.filter((item) => item.status === "Pending Review").length}</strong><span>Pending review</span></div>
              </div>
              {moderationMessage && <div className="moderation-message success"><CheckCircle2 size={16}/>{moderationMessage}</div>}
              {moderationError && <div className="moderation-message error"><AlertTriangle size={16}/>{moderationError}</div>}
              <div className="moderation-notice warning"><AlertTriangle size={18}/><span>Detection is evidence-led and human-reviewed. This module does not inspect game memory, run anti-cheat software, or automatically prove cheating.</span></div>

              <form className="incident-form" onSubmit={handleCreateIncident}>
                <div className="incident-form-heading"><Flag size={18}/><strong>Log suspicious activity</strong></div>
                <div className="incident-grid">
                  <label>Player / Gamertag *<input required value={incidentForm.player} onChange={(e) => setIncidentForm({...incidentForm, player:e.target.value})} placeholder="Enter player gamertag"/></label>
                  <label>Game *<select value={incidentForm.game} onChange={(e) => setIncidentForm({...incidentForm, game:e.target.value})}><option>Valorant</option><option>Counter-Strike 2</option><option>BGMI</option><option>Free Fire</option><option>Apex Legends</option><option>Other</option></select></label>
                  <label>Suspicion category *<select value={incidentForm.category} onChange={(e) => setIncidentForm({...incidentForm, category:e.target.value})}><option>Aimbot / aim assistance</option><option>Wallhack / ESP</option><option>Movement or recoil exploit</option><option>Account sharing / smurfing</option><option>Match fixing / collusion</option><option>Unauthorized software</option><option>Other suspicious activity</option></select></label>
                  <label>Review priority<select value={incidentForm.severity} onChange={(e) => setIncidentForm({...incidentForm, severity:e.target.value})}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label>
                  <label className="incident-wide">Incident description *<textarea required rows="3" value={incidentForm.description} onChange={(e) => setIncidentForm({...incidentForm, description:e.target.value})} placeholder="Describe the match, time, observed behavior and why it needs review."/></label>
                  <label className="incident-wide">Evidence reference / URL<input value={incidentForm.evidence} onChange={(e) => setIncidentForm({...incidentForm, evidence:e.target.value})} placeholder="Match ID, VOD URL, screenshot location or evidence notes"/></label>
                </div>
                <button className="admin-primary-button" type="submit"><Flag size={16}/> Create review report</button>
              </form>

              <div className="incident-list-heading"><h3>Incident queue</h3><span>{cheatReports.length} reports</span></div>
              <div className="incident-list">
                {cheatReports.map((report) => (
                  <article className="incident-card" key={report.id}>
                    <div className="incident-card-top">
                      <div><strong>{report.player}</strong><span>{report.game} · {report.category}</span></div>
                      <div className="incident-tags"><span className={`severity-tag ${String(report.severity).toLowerCase()}`}>{report.severity}</span><span className={`report-status ${String(report.status).toLowerCase().replaceAll(" ","-")}`}>{report.status}</span></div>
                    </div>
                    <p>{report.description}</p>
                    {report.evidence && <div className="incident-evidence"><strong>Evidence:</strong> {report.evidence}</div>}
                    <div className="incident-meta">Logged by {report.createdBy || "Admin"} · {new Date(report.createdAt).toLocaleString()}</div>
                    {report.resolution && <div className="incident-resolution"><strong>Review notes:</strong> {report.resolution}</div>}
                    {report.status !== "Resolved" && report.status !== "Dismissed" && <div className="incident-actions">
                      {report.status === "Pending Review" && <button className="moderation-action review" onClick={() => handleIncidentStatus(report, "Under Review")}>Start review</button>}
                      <button className="moderation-action unban" onClick={() => handleIncidentStatus(report, "Resolved")}>Resolve</button>
                      <button className="moderation-action ban" onClick={() => handleIncidentStatus(report, "Dismissed")}>Dismiss</button>
                    </div>}
                  </article>
                ))}
                {cheatReports.length === 0 && <div className="admin-empty">No suspicious activity reports. Log a report when you have a specific incident and evidence to review.</div>}
              </div>
            </section>
          )}

          {activeTab === "history" && (
            <section className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>User & Platform History</h2>
                  <p>Account and tournament activity records</p>
                </div>
                <History size={25} />
              </div>
              <HistoryList items={history} />
              {history.length === 0 && (
                <div className="admin-empty">
                  No activity history is available yet.
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

function SearchBox({ value, onChange }) {
  return (
    <div className="admin-search">
      <Search size={18} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}

function TournamentTable({ tournaments, onOpen }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Tournament</th>
            <th>Game</th>
            <th>Participants</th>
            <th>Prize Pool</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="admin-tournament-cell">
                  <div className="admin-tournament-icon">
                    <Trophy size={17} />
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.id}</small>
                  </div>
                </div>
              </td>
              <td>{item.game}</td>
              <td>
                {item.registeredParticipants || 0} / {item.maxParticipants}
              </td>
              <td>{item.prizePool || "—"}</td>
              <td>
                <span
                  className={`admin-status ${
                    item.status === "Open" ? "active" : "pending"
                  }`}
                >
                  {item.status || "Unknown"}
                </span>
              </td>
              <td>
                <button
                  className="admin-view-button"
                  onClick={() => onOpen(item.id)}
                  title="View tournament"
                >
                  <Eye size={17} />
                </button>
              </td>
            </tr>
          ))}
          {tournaments.length === 0 && (
            <tr>
              <td colSpan="6" className="admin-empty">
                No tournaments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function HistoryList({ items }) {
  return (
    <div className="admin-history-list">
      {items.map((item) => (
        <div className="admin-history-item" key={item.id}>
          <div className="admin-history-icon">
            {item.icon === "user" ? (
              <UserRound size={18} />
            ) : (
              <Trophy size={18} />
            )}
          </div>
          <div className="admin-history-text">
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
            <small>{item.type}</small>
          </div>
          <time>
            {item.date
              ? new Date(item.date).toLocaleDateString("en-IN")
              : "Date not recorded"}
          </time>
        </div>
      ))}
    </div>
  );
}
