import { useState } from "react";
import type { Ctx, Role } from "../types";
import { Button, Check, Logo } from "../ui";

// 01 Welcome
export const Welcome = ({ ctx }: { ctx: Ctx }) => (
  <div className="screen peach center-col">
    <div className="grow" />
    <Logo size={120} />
    <h1 className="big">Welcome to Pawsitive Pet Academy</h1>
    <p className="muted">Train your pet with trusted local trainers in Polokwane, SA</p>
    <div className="bones">🦴 🦴 🦴</div>
    <div className="grow" />
    <Button onClick={() => ctx.go("learn")}>Get started</Button>
    <p className="muted small">Trusted by 200+ pet parents in Polokwane</p>
  </div>
);

// 02 Learn
export const Learn = ({ ctx }: { ctx: Ctx }) => (
  <div className="screen orange-bg">
    <div className="hero">🐕 🐶</div>
    <div className="sheet">
      <h2>Learn pet care &amp; training</h2>
      <Check text="Expert trainers, certified courses" />
      <Check text="Positive reinforcement methods" />
      <Check text="Flexible classes for all pets" />
      <div className="gap" />
      <Button color="teal" onClick={() => ctx.go("join")}>Continue</Button>
    </div>
  </div>
);

// 03 Join
export const Join = ({ ctx }: { ctx: Ctx }) => {
  const roles: { id: Role; label: string }[] = [
    { id: "owner", label: "Pet owner" },
    { id: "trainer", label: "Trainer" },
  ];
  return (
    <div className="screen peach">
      <div className="grow" />
      <div className="sheet">
        <h2>Ready to join?</h2>
        <p className="muted">Build good habits.<br />Strengthen your bond.<br />Have fun!</p>
        <strong>I am a…</strong>
        <div className="chips">
          {roles.map((r) => (
            <button key={r.id} className={`chip ${ctx.role === r.id ? "on" : ""}`} onClick={() => ctx.setRole(r.id)}>
              {r.label}
            </button>
          ))}
        </div>
        {ctx.role === "trainer" && (
          <p className="muted small">Trainer tools are coming soon. You can explore the app as a pet owner for now.</p>
        )}
        <div className="gap" />
        <Button onClick={() => ctx.go("auth")}>Let's start</Button>
      </div>
    </div>
  );
};

// 04 Sign up / Log in
export const Auth = ({ ctx }: { ctx: Ctx }) => {
  const [signUp, setSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (signUp && !name.trim()) return setError("Enter your full name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (pass.length < 6) return setError("Use a password with at least 6 characters.");
    setError("");
    const display = signUp ? name.trim() : email.split("@")[0].replace(/^./, (c) => c.toUpperCase());
    ctx.setUser({ name: display, email: email.trim() });
    ctx.go("main");
  };

  return (
    <div className="screen cream scroll pad">
      <Logo size={72} bg="var(--peach)" />
      <h1 className="big left">{signUp ? "Create your account" : "Welcome back"}</h1>
      {signUp && (
        <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
      )}
      <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
      <label>Password<input type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" /></label>
      {error && <p className="error">{error}</p>}
      <div className="gap" />
      <Button onClick={submit}>{signUp ? "Create account" : "Log in"}</Button>
      <button className="link" onClick={() => { setSignUp(!signUp); setError(""); }}>
        {signUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </button>
    </div>
  );
};
