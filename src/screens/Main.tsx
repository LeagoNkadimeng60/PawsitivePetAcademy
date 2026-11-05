import { useState } from "react";
import { classes, classTime, fmtDate } from "../data";
import type { Ctx, Tab } from "../types";
import { Button, ClassCard, Header, Logo } from "../ui";

const PET = { name: "Buddy", breed: "Golden Labrador" };

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "classes", label: "Classes", icon: "📚" },
  { id: "progress", label: "Progress", icon: "⭐" },
  { id: "profile", label: "Profile", icon: "👤" },
];

export const Main = ({ ctx }: { ctx: Ctx }) => (
  <div className="screen cream with-tabs">
    <div className="scroll grow">
      {ctx.tab === "home" && <Home ctx={ctx} />}
      {ctx.tab === "classes" && <Classes ctx={ctx} />}
      {ctx.tab === "progress" && <Progress />}
      {ctx.tab === "profile" && <Profile ctx={ctx} />}
    </div>
    <nav className="tabbar">
      {tabs.map((t) => (
        <button key={t.id} className={ctx.tab === t.id ? "on" : ""} onClick={() => ctx.setTab(t.id)}>
          <span>{t.icon}</span>{t.label}
        </button>
      ))}
    </nav>
  </div>
);

// 05 Home dashboard
const Home = ({ ctx }: { ctx: Ctx }) => {
  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  const next = ctx.bookings[0];
  const c = next?.cls ?? classes[0];
  return (
    <>
      <div className="home-top">
        <div className="loc">📍 Polokwane, SA</div>
        <h1 className="big left">{greeting}, {ctx.user.name.split(" ")[0] || "there"}!</h1>
        <button className="search" onClick={() => ctx.setTab("classes")}>Search classes, trainers… <span>🔍</span></button>
      </div>
      <div className="pad stack">
        <h3>Upcoming class</h3>
        <div className="card">
          <div className="class-card-inner">
            <span className="emoji-lg">{c.emoji}</span>
            <div>
              <strong>{c.name}</strong>
              <div className="muted">{next ? `${fmtDate(next.date)} · ${classTime(c)}` : "Today · 14:00"}</div>
              <div className="muted small">{next ? c.venue : "Trainer: Sarah · 1 hr"}</div>
            </div>
          </div>
          <div className="gap" />
          <Button color="teal" onClick={() => ctx.open(c)}>View details</Button>
        </div>
        <h3>Quick actions</h3>
        <div className="quick">
          <button className="orange" onClick={() => ctx.setTab("classes")}>Classes</button>
          <button className="teal" onClick={() => ctx.setTab("profile")}>Bookings</button>
          <button className="orange" onClick={() => ctx.setTab("progress")}>Progress</button>
        </div>
        <h3>Popular classes</h3>
        {classes.slice(0, 2).map((x) => <ClassCard key={x.id} c={x} onClick={() => ctx.open(x)} />)}
      </div>
    </>
  );
};

// 06 Classes list
const Classes = ({ ctx }: { ctx: Ctx }) => {
  const q = ctx.query.toLowerCase();
  const list = classes.filter((c) => [c.name, c.venue, c.level].some((s) => s.toLowerCase().includes(q)));
  return (
    <>
      <Header title="Classes" subtitle="Find the right class for your pet" />
      <div className="pad stack">
        <input className="searchbox" placeholder="🔍 Search classes, trainers…" value={ctx.query} onChange={(e) => ctx.setQuery(e.target.value)} />
        {list.length === 0 && <p className="muted">No classes match “{ctx.query}”. Try a class name, level or venue.</p>}
        {list.map((c) => <ClassCard key={c.id} c={c} onClick={() => ctx.open(c)} />)}
      </div>
    </>
  );
};

// 11 Progress
const Progress = () => (
  <>
    <Header title="Your progress" subtitle={`${PET.name} · ${PET.breed}`} />
    <div className="pad stack">
      <div className="card">
        <div className="row bold"><span>🐾 Puppy Basics</span><span className="teal-text">60%</span></div>
        <div className="bar"><div style={{ width: "60%" }} /></div>
        <div className="muted small">3/5 lessons complete</div>
      </div>
      <div className="tiles">
        <div className="orange"><b>5/5</b>Attendance</div>
        <div className="teal"><b>12</b>Skills learned</div>
        <div className="orange"><b>7 days</b>Streak</div>
      </div>
      <h3>Achievements</h3>
      <div className="chips">
        {["🐾 First class", "🏅 Good boy!", "🔥 7-day streak"].map((a) => <span key={a} className="pill">{a}</span>)}
      </div>
    </div>
  </>
);

// 12 Profile & settings
const Profile = ({ ctx }: { ctx: Ctx }) => {
  const [show, setShow] = useState(false);
  const items = ["Pet profiles", `${PET.name} — Labrador`, "Preferences", "Help & support", "About Pawsitive Pet Academy"];
  return (
    <div className="pad stack center-col">
      <Logo size={88} bg="var(--teal)" />
      <h1 className="big">{ctx.user.name}</h1>
      <p className="muted">{ctx.user.email}</p>
      <div className="card full">
        <strong className="teal-text">Account</strong>
        <button className="setting" onClick={() => setShow(!show)}>My bookings ({ctx.bookings.length}) <span>›</span></button>
        {show && (ctx.bookings.length === 0
          ? <p className="muted small">No bookings yet. Browse classes to book your first one.</p>
          : ctx.bookings.map((b, i) => (
              <p key={i} className="small">• {b.cls.name} · {fmtDate(b.date)} · {b.pets} pet(s) · R{b.total}</p>
            )))}
        {items.map((s) => <button key={s} className="setting">{s} <span>›</span></button>)}
      </div>
      <div className="full"><Button variant="outline" onClick={ctx.logout}>Log out</Button></div>
      <p className="muted small">Version 1.0 · Polokwane, South Africa</p>
    </div>
  );
};

