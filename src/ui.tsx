import type { ReactNode } from "react";
import { classTime, dayName } from "./data";
import type { PetClass } from "./types";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  color?: "orange" | "teal";
  variant?: "solid" | "outline";
  disabled?: boolean;
}

export const Button = ({ children, onClick, color = "orange", variant = "solid", disabled }: ButtonProps) => (
  <button className={`btn ${variant} ${color}`} onClick={onClick} disabled={disabled}>{children}</button>
);

export const Header = ({ title, subtitle, onBack }: { title: string; subtitle?: string; onBack?: () => void }) => (
  <div className="header">
    {onBack && <button className="back" aria-label="Back" onClick={onBack}>←</button>}
    <div>
      <h1>{title}</h1>
      {subtitle && <p className="muted">{subtitle}</p>}
    </div>
  </div>
);

export const Check = ({ text }: { text: string }) => (
  <div className="check"><span>✔</span>{text}</div>
);

export const Logo = ({ size = 96, bg = "#fff" }: { size?: number; bg?: string }) => (
  <div className="logo" style={{ width: size, height: size, fontSize: size / 2, background: bg }}>🐾</div>
);

export const Badge = ({ text }: { text: string }) => <span className="badge">{text}</span>;

export const ClassCard = ({ c, onClick }: { c: PetClass; onClick: () => void }) => (
  <button className="card class-card" onClick={onClick}>
    <div className="class-icon">{c.emoji}</div>
    <div className="grow">
      {c.popular && <Badge text="POPULAR" />}
      <strong>{c.name}</strong>
      <div className="muted small">{c.level} · {c.weeks} weeks</div>
      <div className="muted small">{c.venue} · {dayName(c)} {classTime(c)}</div>
    </div>
    <span className="price">R{c.price}</span>
  </button>
);

export const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className={`row ${bold ? "bold" : ""}`}><span>{label}</span><span>{value}</span></div>
);
