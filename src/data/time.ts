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
