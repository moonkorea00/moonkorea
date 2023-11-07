export const convertToSlug = (str: string) => {
  const slug = decodeURI(str).toLowerCase().trim().replaceAll(' ', '-');

  return slug;
};
