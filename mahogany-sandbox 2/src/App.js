import React, { useState } from "react";
import {
  Search,
  Users,
  MessageSquare,
  User,
  Check,
  Clock,
  Send,
  ArrowLeft,
  Briefcase,
  MapPin,
} from "lucide-react";

const TOKENS = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
  .idx-page {
    background: radial-gradient(circle at 20% 0%, #3A1712 0%, #240D09 60%);
    padding: 48px 32px;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  .idx-root {
    --paper: #FBF6EE;
    --paper-alt: #F2E9DA;
    --ink: #241209;
    --ink-soft: #6E5947;
    --ink-faint: #A6907A;
    --wood: #7C2E22;
    --wood-dark: #4A1B15;
    --wood-tint: #F1DFD8;
    --brass: #96721F;
    --brass-strong: #7A5C18;
    --brass-tint: #F1E6C8;
    --line: #E4D7C0;
    --rail-bg: #2E110C;
    --rail-text: #E9D9C4;
    --rail-text-dim: #B29A82;
    color: var(--ink);
    background: var(--paper);
    border-radius: 16px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.45), 0 2px 0 rgba(150,114,31,0.35);
    overflow: hidden;
  }
  .idx-serif { font-family: 'Source Serif 4', serif; }
  .idx-root button { font-family: inherit; cursor: pointer; }
  .idx-root ::placeholder { color: var(--ink-faint); }
  .idx-card-row { transition: background 120ms ease; }
  .idx-card-row:hover { background: var(--paper-alt); }
  .idx-chip { transition: background 120ms ease, color 120ms ease, border-color 120ms ease; }
  .idx-nav-btn { transition: background 120ms ease, color 120ms ease; }
  .idx-nav-btn:hover { background: rgba(233,217,196,0.08); }
  .idx-connect-primary { transition: background 120ms ease, opacity 120ms ease; }
  .idx-connect-primary:hover { opacity: 0.88; }
`;

const PEOPLE = [
  {
    id: 1,
    name: "Priya Natarajan",
    initials: "PN",
    title: "VP, Leveraged Finance",
    company: "Halvorsen & Cross",
    sector: "Investment banking",
    location: "New York, NY",
    mutual: 6,
    bio: "Twelve years structuring leveraged loans and high-yield deals for mid-market sponsors. Previously at a bulge-bracket bank covering industrials.",
    experience: [
      { role: "VP, Leveraged Finance", org: "Halvorsen & Cross", years: "2022 – present" },
      { role: "Associate, Leveraged Finance", org: "Marchetti Capital", years: "2018 – 2022" },
    ],
    skills: ["Leveraged loans", "High-yield", "Credit structuring", "LBO modeling"],
  },
  {
    id: 2,
    name: "Marcus Webb",
    initials: "MW",
    title: "Executive Recruiter",
    company: "Webb Talent Partners",
    sector: "Talent and hiring",
    location: "Chicago, IL",
    mutual: 11,
    bio: "Runs retained searches for CFO, controller, and treasury roles at PE-backed companies. Placed 40+ finance leaders in the last three years.",
    experience: [
      { role: "Founder", org: "Webb Talent Partners", years: "2019 – present" },
      { role: "Senior Recruiter", org: "Ashford & Kline", years: "2014 – 2019" },
    ],
    skills: ["Executive search", "CFO placement", "PE-backed hiring", "Compensation benchmarking"],
  },
  {
    id: 3,
    name: "Elena Cho",
    initials: "EC",
    title: "Portfolio Manager",
    company: "Birchwood Asset Management",
    sector: "Asset management",
    location: "Boston, MA",
    mutual: 3,
    bio: "Manages a long-short equity book focused on financials and industrials. CFA charterholder.",
    experience: [
      { role: "Portfolio Manager", org: "Birchwood Asset Management", years: "2021 – present" },
      { role: "Senior Analyst", org: "Greyrock Capital", years: "2016 – 2021" },
    ],
    skills: ["Long-short equity", "Financials coverage", "Risk management"],
  },
  {
    id: 4,
    name: "David Okafor",
    initials: "DO",
    title: "Talent Acquisition Lead",
    company: "Ledgerline",
    sector: "Talent and hiring",
    location: "Austin, TX",
    mutual: 8,
    bio: "Builds hiring pipelines for a fintech scaling from 80 to 400 people. Focused on risk, compliance, and engineering.",
    experience: [
      { role: "Talent Acquisition Lead", org: "Ledgerline", years: "2023 – present" },
      { role: "Recruiter", org: "Northstar Bank", years: "2019 – 2023" },
    ],
    skills: ["Fintech hiring", "Compliance roles", "Pipeline building"],
  },
  {
    id: 5,
    name: "Sofia Reyes",
    initials: "SR",
    title: "Investment Banking Analyst",
    company: "Halvorsen & Cross",
    sector: "Investment banking",
    location: "New York, NY",
    mutual: 2,
    bio: "Second-year analyst covering M&A for consumer and retail clients.",
    experience: [{ role: "Analyst", org: "Halvorsen & Cross", years: "2024 – present" }],
    skills: ["M&A", "Valuation", "Pitch materials"],
  },
  {
    id: 6,
    name: "James Whitfield",
    initials: "JW",
    title: "Managing Director",
    company: "Corrigan Equity Partners",
    sector: "Private equity",
    location: "San Francisco, CA",
    mutual: 14,
    bio: "Leads growth-equity investments in vertical software. Sits on four portfolio company boards.",
    experience: [
      { role: "Managing Director", org: "Corrigan Equity Partners", years: "2017 – present" },
      { role: "Principal", org: "Fairmount Growth", years: "2011 – 2017" },
    ],
    skills: ["Growth equity", "Board governance", "Vertical software"],
  },
  {
    id: 7,
    name: "Aisha Bello",
    initials: "AB",
    title: "HR Business Partner",
    company: "Corrigan Equity Partners",
    sector: "Talent and hiring",
    location: "San Francisco, CA",
    mutual: 5,
    bio: "Partners with portfolio company leadership on org design and senior hiring across the fund's holdings.",
    experience: [{ role: "HR Business Partner", org: "Corrigan Equity Partners", years: "2020 – present" }],
    skills: ["Org design", "Senior hiring", "Portfolio company support"],
  },
  {
    id: 8,
    name: "Tom Larsen",
    initials: "TL",
    title: "Director, Credit Risk",
    company: "Meridian Trust Bank",
    sector: "Risk and credit",
    location: "Charlotte, NC",
    mutual: 1,
    bio: "Oversees credit risk policy for the commercial lending division.",
    experience: [{ role: "Director, Credit Risk", org: "Meridian Trust Bank", years: "2019 – present" }],
    skills: ["Credit policy", "Commercial lending", "Risk modeling"],
  },
];

const SECTORS = [
  "All",
  "Investment banking",
  "Private equity",
  "Asset management",
  "Talent and hiring",
  "Risk and credit",
];

const THREADS = [
  {
    id: 1,
    personId: 2,
    messages: [
      { from: "them", text: "Good connecting. I'm working a controller search at a PE-backed manufacturer — thought of your background." },
      { from: "me", text: "Appreciate you thinking of me. Send details when you have a minute." },
    ],
  },
  {
    id: 2,
    personId: 6,
    messages: [
      { from: "them", text: "Saw your note on leveraged loan pricing. Would value ten minutes this week if you have time." },
    ],
  },
];

function Avatar({ initials, size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--wood-tint)",
        color: "var(--wood-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: size * 0.36,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function SectorTag({ sector }) {
  return (
    <span
      style={{
        fontSize: 12,
        color: "var(--brass-strong)",
        background: "var(--brass-tint)",
        padding: "3px 9px",
        borderRadius: 3,
        whiteSpace: "nowrap",
      }}
    >
      {sector}
    </span>
  );
}

function ConnectButton({ status, onClick }) {
  const styles = {
    none: { border: "1px solid var(--brass)", color: "var(--paper)", background: "var(--brass)" },
    pending: { border: "1px solid var(--line)", color: "var(--ink-faint)", background: "transparent" },
    connected: { border: "1px solid var(--wood)", color: "var(--wood)", background: "transparent" },
  };
  const labels = { none: "Connect", pending: "Pending", connected: "Message" };
  return (
    <button
      onClick={onClick}
      disabled={status === "pending"}
      className={status === "none" ? "idx-connect-primary" : ""}
      style={{
        ...styles[status],
        padding: "7px 14px",
        borderRadius: 4,
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {labels[status]}
    </button>
  );
}

export default function MahoganyApp() {
  const [view, setView] = useState("discover");
  const [selectedId, setSelectedId] = useState(null);
  const [sector, setSector] = useState("All");
  const [query, setQuery] = useState("");
  const [connections, setConnections] = useState({ 2: "connected", 6: "connected", 4: "none" });
  const [activeThreadId, setActiveThreadId] = useState(1);
  const [draft, setDraft] = useState("");
  const [threads, setThreads] = useState(THREADS);

  const statusOf = (id) => connections[id] || "none";

  const toggleConnect = (id) => {
    setConnections((c) => {
      const cur = c[id] || "none";
      if (cur === "none") return { ...c, [id]: "pending" };
      return c;
    });
  };

  const openProfile = (id) => {
    setSelectedId(id);
    setView("profile");
  };

  const filtered = PEOPLE.filter((p) => {
    const matchesSector = sector === "All" || p.sector === sector;
    const matchesQuery =
      query.trim() === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.company.toLowerCase().includes(query.toLowerCase()) ||
      p.title.toLowerCase().includes(query.toLowerCase());
    return matchesSector && matchesQuery;
  });

  const selectedPerson = PEOPLE.find((p) => p.id === selectedId);
  const activeThread = threads.find((t) => t.id === activeThreadId);
  const threadPerson = activeThread ? PEOPLE.find((p) => p.id === activeThread.personId) : null;

  const sendMessage = () => {
    if (!draft.trim() || !activeThread) return;
    setThreads((ts) =>
      ts.map((t) =>
        t.id === activeThread.id
          ? { ...t, messages: [...t.messages, { from: "me", text: draft.trim() }] }
          : t
      )
    );
    setDraft("");
  };

  const navItems = [
    { key: "discover", icon: Search, label: "Discover" },
    { key: "connections", icon: Users, label: "Connections" },
    { key: "messages", icon: MessageSquare, label: "Messages" },
    { key: "profile", icon: User, label: "You" },
  ];

  return (
    <div className="idx-page">
      <style>{TOKENS}</style>
      <div className="idx-root" style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 28px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div>
            <div
              className="idx-serif"
              style={{ fontSize: 26, fontWeight: 600, letterSpacing: "0.01em", color: "var(--wood-dark)" }}
            >
              Mahogany
            </div>
            <div style={{ width: 34, height: 2, background: "var(--brass)", marginTop: 6 }} />
          </div>
          <div
            className="idx-serif"
            style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-faint)" }}
          >
            A private network for finance and hiring
          </div>
        </div>

        <div style={{ display: "flex" }}>
          {/* Left rail */}
          <div
            style={{
              width: 168,
              background: "var(--rail-bg)",
              padding: "24px 0",
              flexShrink: 0,
            }}
          >
            {navItems.map(({ key, icon: Icon, label }) => {
              return (
                <button
                  key={key}
                  className="idx-nav-btn"
                  onClick={() => {
                    setView(key);
                    if (key === "profile") setSelectedId(null);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                    width: "100%",
                    padding: "11px 24px",
                    background: view === key ? "rgba(233,217,196,0.1)" : "transparent",
                    border: "none",
                    borderLeft: view === key ? "2px solid var(--brass)" : "2px solid transparent",
                    color: view === key ? "var(--rail-text)" : "var(--rail-text-dim)",
                    fontSize: 13.5,
                    fontWeight: view === key ? 500 : 400,
                    letterSpacing: "0.01em",
                    textAlign: "left",
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
          {view === "discover" && (
            <div>
              <div style={{ padding: "20px 24px 12px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1px solid var(--line)",
                    borderRadius: 4,
                    padding: "8px 12px",
                  }}
                >
                  <Search size={15} color="var(--ink-faint)" strokeWidth={1.75} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, title, or company"
                    style={{ border: "none", outline: "none", flex: 1, fontSize: 13.5, background: "transparent" }}
                  />
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  {SECTORS.map((s) => (
                    <button
                      key={s}
                      className="idx-chip"
                      onClick={() => setSector(s)}
                      style={{
                        fontSize: 12.5,
                        padding: "6px 12px",
                        borderRadius: 4,
                        border: sector === s ? "1px solid var(--wood)" : "1px solid var(--line)",
                        color: sector === s ? "var(--wood-dark)" : "var(--ink-soft)",
                        background: sector === s ? "var(--wood-tint)" : "transparent",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--line)" }}>
                {filtered.length === 0 && (
                  <div style={{ padding: 32, textAlign: "center", color: "var(--ink-faint)", fontSize: 13.5 }}>
                    No one matches that search. Try a different sector or name.
                  </div>
                )}
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="idx-card-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 24px",
                      borderBottom: "1px solid var(--line)",
                      cursor: "pointer",
                    }}
                    onClick={() => openProfile(p.id)}
                  >
                    <Avatar initials={p.initials} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="idx-serif" style={{ fontSize: 15.5, fontWeight: 600 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                        {p.title} · {p.company}
                      </div>
                    </div>
                    <SectorTag sector={p.sector} />
                    <div style={{ fontSize: 12, color: "var(--ink-faint)", width: 88, textAlign: "right" }}>
                      {p.mutual} mutual
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <ConnectButton
                        status={statusOf(p.id)}
                        onClick={() => {
                          if (statusOf(p.id) === "connected") {
                            setView("messages");
                          } else {
                            toggleConnect(p.id);
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "profile" && selectedPerson && (
            <div style={{ padding: "20px 24px" }}>
              <button
                onClick={() => setView("discover")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: "none",
                  background: "transparent",
                  color: "var(--ink-soft)",
                  fontSize: 13,
                  marginBottom: 18,
                  padding: 0,
                }}
              >
                <ArrowLeft size={14} strokeWidth={1.75} /> Back to discover
              </button>

              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <Avatar initials={selectedPerson.initials} size={64} />
                <div style={{ flex: 1 }}>
                  <div className="idx-serif" style={{ fontSize: 24, fontWeight: 600 }}>
                    {selectedPerson.name}
                  </div>
                  <div style={{ fontSize: 14.5, color: "var(--ink-soft)", marginTop: 2 }}>
                    {selectedPerson.title} at {selectedPerson.company}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      marginTop: 8,
                      fontSize: 12.5,
                      color: "var(--ink-faint)",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={13} strokeWidth={1.75} /> {selectedPerson.location}
                    </span>
                    <SectorTag sector={selectedPerson.sector} />
                  </div>
                </div>
                <ConnectButton
                  status={statusOf(selectedPerson.id)}
                  onClick={() => {
                    if (statusOf(selectedPerson.id) === "connected") {
                      setView("messages");
                    } else {
                      toggleConnect(selectedPerson.id);
                    }
                  }}
                />
              </div>

              <div style={{ marginTop: 28 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink-soft)", marginBottom: 8 }}>
                  About
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6 }}>{selectedPerson.bio}</div>
              </div>

              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink-soft)", marginBottom: 10 }}>
                  Experience
                </div>
                {selectedPerson.experience.map((e, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <Briefcase size={15} color="var(--ink-faint)" strokeWidth={1.75} style={{ marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{e.role}</div>
                      <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
                        {e.org} · {e.years}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink-soft)", marginBottom: 10 }}>
                  Skills
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {selectedPerson.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: 12.5,
                        border: "1px solid var(--line)",
                        borderRadius: 4,
                        padding: "5px 10px",
                        color: "var(--ink-soft)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "connections" && (
            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink-soft)", marginBottom: 10 }}>
                Pending
              </div>
              {Object.entries(connections).filter(([, s]) => s === "pending").length === 0 && (
                <div style={{ fontSize: 13, color: "var(--ink-faint)", marginBottom: 20 }}>
                  No pending requests.
                </div>
              )}
              {Object.entries(connections)
                .filter(([, s]) => s === "pending")
                .map(([id]) => {
                  const p = PEOPLE.find((x) => x.id === Number(id));
                  return (
                    <div
                      key={id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 0",
                        borderBottom: "1px solid var(--line)",
                      }}
                    >
                      <Avatar initials={p.initials} size={36} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
                          {p.title} · {p.company}
                        </div>
                      </div>
                      <Clock size={15} color="var(--ink-faint)" strokeWidth={1.75} />
                      <span style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>Awaiting response</span>
                    </div>
                  );
                })}

              <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink-soft)", margin: "24px 0 10px" }}>
                Connected
              </div>
              {Object.entries(connections)
                .filter(([, s]) => s === "connected")
                .map(([id]) => {
                  const p = PEOPLE.find((x) => x.id === Number(id));
                  return (
                    <div
                      key={id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 0",
                        borderBottom: "1px solid var(--line)",
                      }}
                    >
                      <Avatar initials={p.initials} size={36} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>
                          {p.title} · {p.company}
                        </div>
                      </div>
                      <Check size={15} color="var(--wood)" strokeWidth={2} />
                      <button
                        onClick={() => setView("messages")}
                        style={{
                          border: "1px solid var(--line)",
                          background: "transparent",
                          borderRadius: 4,
                          padding: "6px 12px",
                          fontSize: 12.5,
                          color: "var(--ink-soft)",
                        }}
                      >
                        Message
                      </button>
                    </div>
                  );
                })}
            </div>
          )}

          {view === "messages" && (
            <div style={{ display: "flex", height: 440 }}>
              <div style={{ width: 220, borderRight: "1px solid var(--line)", overflowY: "auto" }}>
                {threads.map((t) => {
                  const p = PEOPLE.find((x) => x.id === t.personId);
                  const last = t.messages[t.messages.length - 1];
                  return (
                    <div
                      key={t.id}
                      onClick={() => setActiveThreadId(t.id)}
                      className="idx-card-row"
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--line)",
                        background: activeThreadId === t.id ? "var(--paper-alt)" : "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--ink-faint)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          marginTop: 2,
                        }}
                      >
                        {last.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {threadPerson && (
                  <>
                    <div
                      style={{
                        padding: "12px 18px",
                        borderBottom: "1px solid var(--line)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Avatar initials={threadPerson.initials} size={30} />
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{threadPerson.name}</div>
                    </div>
                    <div style={{ flex: 1, padding: "16px 18px", overflowY: "auto" }}>
                      {activeThread.messages.map((m, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: m.from === "me" ? "flex-end" : "flex-start",
                            marginBottom: 10,
                          }}
                        >
                          <div
                            style={{
                              maxWidth: "72%",
                              fontSize: 13.5,
                              lineHeight: 1.5,
                              padding: "9px 13px",
                              borderRadius: 6,
                              background: m.from === "me" ? "var(--wood-tint)" : "var(--paper-alt)",
                              color: m.from === "me" ? "var(--wood-dark)" : "var(--ink)",
                            }}
                          >
                            {m.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        padding: "12px 18px",
                        borderTop: "1px solid var(--line)",
                      }}
                    >
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Write a message"
                        style={{
                          flex: 1,
                          border: "1px solid var(--line)",
                          borderRadius: 4,
                          padding: "8px 12px",
                          fontSize: 13.5,
                          outline: "none",
                        }}
                      />
                      <button
                        onClick={sendMessage}
                        style={{
                          border: "1px solid var(--wood)",
                          background: "var(--wood)",
                          color: "white",
                          borderRadius: 4,
                          padding: "8px 14px",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                        }}
                      >
                        <Send size={13} strokeWidth={2} /> Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {view === "profile" && !selectedPerson && (
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <Avatar initials="JA" size={64} />
                <div>
                  <div className="idx-serif" style={{ fontSize: 24, fontWeight: 600 }}>
                    Jamie Abrams
                  </div>
                  <div style={{ fontSize: 14.5, color: "var(--ink-soft)", marginTop: 2 }}>
                    Co-founder, Mahogany
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 20, fontSize: 13.5, color: "var(--ink-faint)" }}>
                This is a placeholder for your own profile view — same layout as any other member.
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
