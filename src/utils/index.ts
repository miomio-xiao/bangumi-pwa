export const deepClone = (obj: any) => {
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return Array.isArray(obj)
    ? (clone.length = obj.length) && Array.from(clone)
    : clone;
};

export const offset = <T>(arr: T[], offset: number): T[] => [
  ...arr.slice(offset),
  ...arr.slice(0, offset)
];
