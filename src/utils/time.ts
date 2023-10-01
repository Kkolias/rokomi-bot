export function parseISODate(date: Date): string {
  const ISO = date?.toISOString();
  return ISO?.split("T")?.[0] || "";
}

export function getSeasonForDate(date: Date): number {
  const year = date.getFullYear();

  if (new Date(`${year}-09-12`) >= new Date(date)) {
    return year;
  }
  return year + 1;
}

export function getTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (minutes < 10) return `${hours}:0${minutes}`;
  return `${hours}:${minutes}`;
}

export function getNextDayISO(date: Date): string {
  const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  return parseISODate(nextDay);
}

export function parseDate(date: Date): string {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm: string | number = today.getMonth() + 1; // Months start at 0!
  let dd: string | number = today.getDate();

  const formattedToday = dd + "." + mm + "." + yyyy;

  return formattedToday;
}

console.log(parseDate(new Date()));
