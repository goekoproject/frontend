export function filterNotNull(target: any, key: string) {
  let value: Array<any> | null = (target as any)[key]

  const setter = (val: Array<any>) => {
    value = val
  }
  const getter = () => {
    return value?.filter((item: any) => item[key] !== null)
  }

  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    set: setter,
    get: getter,
  })
}
export function _filterNotNull<T>(items: Array<T | null | undefined>): T[] {
  return items.filter((item): item is T => item !== null && item !== undefined);
}
