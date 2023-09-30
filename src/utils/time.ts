export function parseISODate(date: Date): string {
  const ISO = date?.toISOString();
  return ISO?.split("T")?.[0] || "";
}

export function getSeasonForDate(date: Date): number {
    const year = date.getFullYear()

    if(new Date(`${year}-09-12`) >= new Date(date)) {
        return year
    }
    return year + 1
}

export function getTime(date: Date): string {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    
    if(minutes < 10) return `${hours}:0${minutes}`
    return `${hours}:${minutes}`
}

console.log(getTime(new Date()))