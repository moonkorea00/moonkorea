export const generateId = (() => {
  let count = 0;
  return () => ++count;
})();
