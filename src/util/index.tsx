export type ValueOf<T> = T[keyof T];

export function formatTime(time: Date) {
  return {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    day: time.getDay()
  }
}

export const getStyle = (elm: HTMLElement, key: string) => {
  return getComputedStyle(elm, null).getPropertyValue(key)
}
