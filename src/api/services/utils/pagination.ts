export const createPagination = (totalItems: number, itemsPerPage = 6) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return { totalPages, pages };
};
