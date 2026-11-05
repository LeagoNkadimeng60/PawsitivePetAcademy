import { useState } from "react";
import { classes, upcomingDates } from "./data";
import { Auth, Join, Learn, Welcome } from "./screens/Onboarding";
import { Main } from "./screens/Main";
import { Book, Confirmed, Detail, Payment } from "./screens/Booking";
import type { Booking, Ctx, PetClass, Role, Screen, Tab, User } from "./types";

export default function App() {
  const [screen, go] = useState<Screen>("welcome");
  const [tab, setTab] = useState<Tab>("home");
  const [role, setRole] = useState<Role>("owner");
  const [user, setUser] = useState<User>({ name: "Alex Moroka", email: "alex@email.co.za" });
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<PetClass>(classes[0]);
  const [pets, setPets] = useState(1);
  const [date, setDate] = useState<Date>(upcomingDates(classes[0])[0]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const total = selected.price * pets;

  const ctx: Ctx = {
    go, tab, setTab, role, setRole, user, setUser, query, setQuery, selected, pets, setPets, date, setDate, bookings, total,
    open: (c) => { setSelected(c); setPets(1); setDate(upcomingDates(c)[0]); go("detail"); },
    pay: () => { setBookings((b) => [{ cls: selected, date, pets, total }, ...b]); go("confirmed"); },
    logout: () => { setBookings([]); setTab("home"); setQuery(""); go("welcome"); },
  };

  const screens: Record<Screen, JSX.Element> = {
    welcome: <Welcome ctx={ctx} />,
    learn: <Learn ctx={ctx} />,
    join: <Join ctx={ctx} />,
    auth: <Auth ctx={ctx} />,
    main: <Main ctx={ctx} />,
    detail: <Detail ctx={ctx} />,
    book: <Book ctx={ctx} />,
    payment: <Payment ctx={ctx} />,
    confirmed: <Confirmed ctx={ctx} />,
  };

  return <div className="phone">{screens[screen]}</div>;
}
