export const replaceWithSpaces = (string) => (
  string.replace(/:/g, ' ').replace(/_/g, ' ').replace(/-/g, ' ').replace(/\./g, ' ')
);

export const customIncludes = (title, query) => {
  const newQuery = replaceWithSpaces(query);

  const words = newQuery.split(' ');

  return words.every((item) => title.includes(item));
};
