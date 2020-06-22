export type ValueOf<T> = T[keyof T];
interface ICompareFn {
  (element: Element): boolean
}
export function findParent(element: Element, compareFn: ICompareFn): Element | null {
  let target = element
  while (target instanceof Element) {
    if (compareFn(target)) {
      return target
    }
    if (!(target.parentNode instanceof Element)) break;
    target = target.parentNode
  }
  return null
}
