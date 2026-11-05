export type Role = "owner" | "trainer";
export type Screen = "welcome" | "learn" | "join" | "auth" | "main" | "detail" | "book" | "payment" | "confirmed";
export type Tab = "home" | "classes" | "progress" | "profile";

export interface PetClass {
  id: number;
  name: string;
  level: string;
  weeks: number;
  price: number;
  venue: string;
  day: number; // 0 = Sunday ... 6 = Saturday
  hour: number;
  age: string;
  learn: string[];
  popular?: boolean;
  emoji: string;
}

export interface Booking {
  cls: PetClass;
  date: Date;
  pets: number;
  total: number;
}

export interface User {
  name: string;
  email: string;
}

export interface Ctx {
  go: (s: Screen) => void;
  tab: Tab;
  setTab: (t: Tab) => void;
  role: Role;
  setRole: (r: Role) => void;
  user: User;
  setUser: (u: User) => void;
  query: string;
  setQuery: (q: string) => void;
  selected: PetClass;
  open: (c: PetClass) => void;
  pets: number;
  setPets: (n: number) => void;
  date: Date;
  setDate: (d: Date) => void;
  bookings: Booking[];
  total: number;
  pay: () => void;
  logout: () => void;
}
