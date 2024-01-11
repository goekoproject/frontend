export const isObjectEmpty = (obj: object) => {
  return Boolean(Object.keys(obj).length === 0);
};
