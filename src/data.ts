import type { Booking, PetClass } from "./types";

export const classes: PetClass[] = [
  { id: 1, name: "Puppy Basics", level: "Beginner", weeks: 4, price: 250, venue: "Polokwane Pet Park", day: 6, hour: 10,
    age: "Age: 8–16 weeks · Max 8 pups", learn: ["Sit, Stay, Come commands", "Potty training basics", "Socialisation skills"], popular: true, emoji: "🐶" },
  { id: 2, name: "Obedience Level 1", level: "Intermediate", weeks: 6, price: 380, venue: "Bendor Park", day: 0, hour: 9,
    age: "Age: 6 months+ · Max 10 dogs", learn: ["Loose-lead walking", "Heel and recall", "Impulse control"], emoji: "🐕" },
  { id: 3, name: "Adult Dog Agility", level: "Intermediate", weeks: 5, price: 300, venue: "Polokwane Pet Park", day: 6, hour: 14,
    age: "Age: 1 year+ · Max 8 dogs", learn: ["Tunnels and weaves", "Jumps and balance", "Handler focus"], emoji: "🐕‍🦺" },
  { id: 4, name: "Kitten & Cat Care", level: "Beginner", weeks: 3, price: 200, venue: "Pawsitive Studio", day: 3, hour: 17,
    age: "Age: 8 weeks+ · Max 6 cats", learn: ["Handling and grooming", "Litter and scratching habits", "Safe introductions"], emoji: "🐱" },
];

export const classTime = (c: PetClass) => `${String(c.hour).padStart(2, "0")}:00`;
export const dayName = (c: PetClass) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][c.day];

export function upcomingDates(c: PetClass): Date[] {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (d.getDay() !== c.day) d.setDate(d.getDate() + 1);
  return [0, 1, 2, 3].map((i) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + i * 7));
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

export function downloadIcs(b: Booking) {
  const start = new Date(b.date);
  start.setHours(b.cls.hour, 0, 0, 0);
  const end = new Date(start.getTime() + 3600000);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT",
    `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:${b.cls.name}`, `LOCATION:${b.cls.venue}, Polokwane`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "pawsitive-class.ics";
  a.click();
  URL.revokeObjectURL(a.href);
}
