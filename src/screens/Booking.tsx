import { useState } from "react";
import { classTime, dayName, downloadIcs, fmtDate, upcomingDates } from "../data";
import type { Ctx } from "../types";
import { Button, Check, Header, Row } from "../ui";

// 07 Class detail
export const Detail = ({ ctx }: { ctx: Ctx }) => {
  const c = ctx.selected;
  return (
    <div className="screen cream">
      <div className="scroll grow">
        <div className="detail-hero">
          <button className="back light" aria-label="Back" onClick={() => ctx.go("main")}>←</button>
          <span>{c.emoji}</span>
        </div>
        <div className="pad">
          <h1 className="big left">{c.name}</h1>
          <div className="price lg">R{c.price}</div>
          <p className="muted">Duration: {c.weeks} weeks · {c.level}<br />{c.age}<br />{c.venue} · {dayName(c)} {classTime(c)}</p>
          <h3>What you'll learn</h3>
          {c.learn.map((l) => <Check key={l} text={l} />)}
        </div>
      </div>
      <div className="footer"><Button onClick={() => ctx.go("book")}>Book now · R{c.price}</Button></div>
    </div>
  );
};

// 08 Book class
export const Book = ({ ctx }: { ctx: Ctx }) => {
  const c = ctx.selected;
  return (
    <div className="screen cream">
      <div className="scroll grow">
        <Header title="Book class" subtitle={`${c.name} — R${c.price}`} onBack={() => ctx.go("detail")} />
        <div className="pad stack">
          <strong>Choose a start date</strong>
          <div className="chips scroll-x">
            {upcomingDates(c).map((d) => (
              <button key={d.toISOString()} className={`chip ${ctx.date.getTime() === d.getTime() ? "on" : ""}`} onClick={() => ctx.setDate(d)}>
                {d.toLocaleDateString("en-ZA", { day: "numeric", month: "short" })}<br />{classTime(c)}
              </button>
            ))}
          </div>
          <div className="card">
            <p>📅 {fmtDate(ctx.date)} · {classTime(c)}</p>
            <p>📍 {c.venue}, Polokwane</p>
            <div className="row">
              <span>Pets per owner</span>
              <span className="stepper">
                <button aria-label="Fewer pets" onClick={() => ctx.setPets(Math.max(1, ctx.pets - 1))}>−</button>
                <b>{ctx.pets}</b>
                <button aria-label="More pets" onClick={() => ctx.setPets(Math.min(2, ctx.pets + 1))}>+</button>
              </span>
            </div>
          </div>
          <div className="card">
            <Row label="Subtotal" value={`R${ctx.total}`} />
            <Row label="Booking fee" value="R0" />
            <hr />
            <Row label="Total" value={`R${ctx.total}`} bold />
          </div>
        </div>
      </div>
      <div className="footer"><Button onClick={() => ctx.go("payment")}>Continue to payment</Button></div>
    </div>
  );
};

// 09 Payment
export const Payment = ({ ctx }: { ctx: Ctx }) => {
  const [paying, setPaying] = useState(false);
  const pay = () => {
    setPaying(true);
    window.setTimeout(ctx.pay, 1500);
  };
  return (
    <div className="screen cream">
      <div className="scroll grow">
        <Header title="Payment" onBack={() => ctx.go("book")} />
        <div className="pad stack">
          <div className="card row"><span>🔒 Card ···· 4242</span><span className="badge">DEFAULT</span></div>
          <div className="card">
            <Row label="Class" value={ctx.selected.name} />
            <Row label="Date" value={fmtDate(ctx.date)} />
            <Row label="Pets" value={String(ctx.pets)} />
            <hr />
            <Row label="Total amount" value={`R${ctx.total}`} bold />
          </div>
          <p className="teal-text small">Secure payment by PayFast (ZAR)</p>
        </div>
      </div>
      <div className="footer">
        <Button disabled={paying} onClick={pay}>{paying ? "Processing…" : `Pay R${ctx.total}`}</Button>
      </div>
    </div>
  );
};

// 10 Booking confirmed
export const Confirmed = ({ ctx }: { ctx: Ctx }) => {
  const b = ctx.bookings[0];
  if (!b) return null;
  return (
    <div className="screen cream center-col pad">
      <div className="grow" />
      <div className="tick">✔</div>
      <h1 className="big teal-text">Booking confirmed!</h1>
      <p className="muted">Your spot is secured for {b.cls.name}</p>
      <strong>{fmtDate(b.date)} · {classTime(b.cls)}</strong>
      <p className="muted">{b.cls.venue}, Polokwane</p>
      <p className="muted">Paid R{b.total}</p>
      <div className="grow" />
      <Button color="teal" onClick={() => { ctx.setTab("home"); ctx.go("main"); }}>View booking</Button>
      <div className="gap-s" />
      <Button variant="outline" color="teal" onClick={() => downloadIcs(b)}>Add to calendar</Button>
    </div>
  );
};
