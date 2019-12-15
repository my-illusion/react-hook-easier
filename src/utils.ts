export const isString = (arg): arg is string => {
  return typeof arg === 'string';
};

export const isUndefined = (value): value is undefined => {
  return typeof value === undefined;
};
