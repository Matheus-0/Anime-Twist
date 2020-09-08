export const replaceWithSpaces = (string) => string.replace(/[^a-zA-Z0-9 ]/g, ' ');

export const customIncludes = (title, query) => {
  const newQuery = replaceWithSpaces(query);

  const words = newQuery.split(' ');

  return words.every((item) => title.includes(item));
};
