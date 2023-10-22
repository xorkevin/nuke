export const mapOption = <T>(v: T): NonNullable<T>[] => {
  if (v === null || v === undefined) {
    return [];
  }
  return [v];
};
