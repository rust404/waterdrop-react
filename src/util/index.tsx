export type ValueOf<T> = T[keyof T];

export const getStyle = (elm: HTMLElement, key: string) => {
  return getComputedStyle(elm, null).getPropertyValue(key)
}
