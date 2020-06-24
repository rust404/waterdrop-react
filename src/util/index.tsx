export type ValueOf<T> = T[keyof T];
interface ICompareFn {
  (element: Element): boolean
}
export function findParent(element: Element, compareFn: ICompareFn): Element | null {
  let target: Node | null = element
  while (target instanceof Element) {
    if (compareFn(target)) {
      return target
    }
    target = target.parentNode
  }
  return null
}

export function formatTime(time: Date) {
  return {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    day: time.getDay()
  }
}
