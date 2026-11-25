import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShieldCheck, ChevronDown, Printer, CheckCircle2, Gamepad2, ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import "./RulebookPage.css";

const sections = [
  { title: "Eligibility & Accounts", rules: [
    "Players must provide accurate account, contact, and in-game identity details.",
    "Each participant may compete for only one team in a given tournament unless the event rules explicitly allow otherwise.",
    "Players must meet the age, region, platform, and rank requirements published on the tournament page."
  ]},
  { title: "Registration & Check-in", rules: [
    "Team captains are responsible for submitting a complete roster before the registration deadline.",
    "All players must complete check-in within the time window announced by tournament administrators.",
    "Roster changes after the roster-lock deadline require administrator approval."
  ]},
  { title: "Match Procedure", rules: [
    "Teams must join the assigned lobby or server at the scheduled match time.",
    "The tournament page and match lobby determine the game mode, map pool, format, and scoring rules.",
    "Teams must submit accurate match results and supporting evidence when requested."
  ]},
  { title: "Fair Play & Prohibited Conduct", rules: [
    "Cheats, scripts, exploits, unauthorized third-party tools, account sharing, and match-fixing are prohibited.",
    "Players must not intentionally exploit bugs or interfere with another participant's connection or equipment.",
    "Tournament administrators may request screenshots, recordings, or other evidence to investigate suspected violations."
  ]},
  { title: "Disconnects & Technical Issues", rules: [
    "A player experiencing a technical issue must notify the match administrator immediately.",
    "A pause or rematch is not automatic; the administrator decides based on the game, event rules, and available evidence.",
    "Participants are responsible for stable internet access, supported hardware, and required game updates."
  ]},
  { title: "Conduct, Disputes & Penalties", rules: [
    "Harassment, hate speech, threats, impersonation, and abusive communication are prohibited.",
    "Disputes must be submitted by the team captain with relevant evidence within the deadline set by the event administrator.",
    "Penalties may include a warning, score adjustment, match forfeit, suspension, or disqualification depending on severity."
  ]}
];

export default function RulebookPage() {
  const { tournaments } = useApp();
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(0);
  const [accepted, setAccepted] = useState(() => localStorage.getItem("esportsarena_rulebook_accepted") === "true");
  const filtered = useMemo(() => sections.map((section) => ({
    ...section,
    rules: section.rules.filter((rule) => `${section.title} ${rule}`.toLowerCase().includes(query.toLowerCase()))
  })).filter((section) => section.rules.length), [query]);

  const acknowledge = (checked) => {
    setAccepted(checked);
    localStorage.setItem("esportsarena_rulebook_accepted", String(checked));
  };

  return (
    <div className="rulebook-page container">
      <header className="rulebook-hero">
        <span className="section-tag"><ShieldCheck size={15} /> COMPETITIVE INTEGRITY</span>
        <h1>TOURNAMENT <span>RULEBOOK</span></h1>
        <p>One arena. One standard. Fair competition across every game and every bracket.</p>
        <button className="btn btn-glass btn-sm rulebook-download" onClick={() => window.print()}>
          <Printer size={15}/> Print / Save as PDF
        </button>
      </header>

      <div className="rulebook-layout">
        <section className="rulebook-main">
          <label className="rulebook-search"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search eligibility, match rules, penalties..." /></label>
          <div className="rulebook-accordions">
            {filtered.map((section, index) => (
              <article className={`rulebook-section ${expanded === index ? "expanded" : ""}`} key={section.title}>
                <button className="rulebook-section-trigger" onClick={() => setExpanded(expanded === index ? -1 : index)}>
                  <span><span className="rulebook-index">{String(index + 1).padStart(2, "0")}</span>{section.title}</span>
                  <ChevronDown size={18}/>
                </button>
                {expanded === index && <ol>{section.rules.map((rule, i) => <li key={i}>{rule}</li>)}</ol>}
              </article>
            ))}
            {!filtered.length && <p className="rulebook-empty">No rules match your search.</p>}
          </div>
        </section>

        <aside className="rulebook-sidebar">
          <div className="rulebook-side-card">
            <Gamepad2 size={24}/>
            <h3>Game-specific rules</h3>
            <p>Each event may publish additional game, platform, format, and region-specific rules. Review the event details before joining.</p>
            <div className="rulebook-game-list">{[...new Set(tournaments.map((t) => t.game))].map((game) => <span key={game}>{game}</span>)}</div>
            <Link to="/tournaments" className="btn btn-primary btn-sm">Browse tournaments <ArrowUpRight size={14}/></Link>
          </div>
          <div className="rulebook-side-card rulebook-accept">
            <ShieldCheck size={24}/>
            <h3>Player acknowledgement</h3>
            <p>Confirm that you have read the platform-wide rules. Tournament-specific rules may add to these standards.</p>
            <label className="rulebook-check"><input type="checkbox" checked={accepted} onChange={(e) => acknowledge(e.target.checked)}/><span>I have read and agree to follow the rulebook.</span></label>
            <div className="rulebook-accepted-state">{accepted ? <><CheckCircle2 size={16}/> Acknowledgement saved on this device</> : "Acknowledgement not yet recorded"}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
