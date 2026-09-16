const MINUTE = 60_000;

export const loadedAt = new Date();

export const minutesAgo = (n: number) => new Date(loadedAt.getTime() - n * MINUTE).toISOString();
export const minutesFromNow = (n: number) => new Date(loadedAt.getTime() + n * MINUTE).toISOString();
export const hoursAgo = (n: number) => minutesAgo(n * 60);
export const hoursFromNow = (n: number) => minutesFromNow(n * 60);
export const daysFromNow = (n: number) => minutesFromNow(n * 60 * 24);

export function todayAt(hour: number, minute = 0) {
  const d = new Date(loadedAt);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export function tomorrowAt(hour: number, minute = 0) {
  const d = new Date(loadedAt);
  d.setDate(d.getDate() + 1);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export function nextWeekdayAt(weekday: number, hour: number, minute = 0) {
  const d = new Date(loadedAt);
  const delta = (weekday - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + delta);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

export const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// "9am" · "2:30pm" — how a recurring pattern states its time.
export function formatHourMinute(hour: number, minute: number) {
  const ampm = hour >= 12 ? 'pm' : 'am';
  const h12 = hour % 12 || 12;
  return minute === 0 ? `${h12}${ampm}` : `${h12}:${String(minute).padStart(2, '0')}${ampm}`;
}

// "29 min ago" · "Arriving 16:40" · "Tomorrow, 9am" — never an ISO string.
export function relativeTime(iso: string, from: Date = new Date()) {
  const diff = Math.round((from.getTime() - Date.parse(iso)) / 60000);
  if (diff >= 0 && diff < 1) return 'just now';
  if (diff > 0 && diff < 60) return `${diff} min ago`;
  if (diff >= 60 && diff < 60 * 24) return `${Math.round(diff / 60)}h ago`;
  if (diff < 0 && diff > -60) return `in ${Math.abs(diff)} min`;
  return clockTime(iso);
}

export function clockTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// "September 16th, 11:12 AM" — the long form the request timeline uses.
export function longStamp(iso: string) {
  const d = new Date(iso);
  const month = d.toLocaleDateString([], { month: 'long' });
  const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${month} ${ordinal(d.getDate())}, ${time}`;
}
