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
