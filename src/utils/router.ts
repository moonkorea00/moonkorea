export const getQueryParamAsPositiveNumber = (
  value: string | string[] | undefined
) => {
  if (!value) return undefined;

  const num = typeof value === 'string' ? Number(value) : Number(value[0]);

  if (Number.isNaN(num) || num < 1) return null;

  return num;
};

export const getQueryParamAsArray = (value: string | string[] | undefined) => {
  if (!value) return undefined;

  const arr = Array.isArray(value) ? value : [value];

  return arr;
};
