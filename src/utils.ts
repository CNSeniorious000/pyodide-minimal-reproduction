export function cacheSingleton<T extends (...args: any[]) => any>(target: T): T {
  const UNSET = {};
  let result: any = UNSET;

  return ((...args) => {
    if (result !== UNSET)
      return result;

    result = target(...args);
    return result;
  }) as T;
}
