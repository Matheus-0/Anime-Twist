export const replaceWithSpaces = (string) => (
  string.replace(/:/g, ' ').replace(/_/g, ' ').replace(/-/g, ' ').replace(/\./g, ' ')
);

export const customIncludes = (title, query) => {
  const newQuery = replaceWithSpaces(query);

  const words = newQuery.split(' ');

  return words.every((item) => title.includes(item));
};

export const getAnimeAlternativeTitle = (anime) => anime.alt_title;
export const getAnimeSlug = (anime) => anime.slug.slug;
export const getAnimeTitle = (anime) => anime.title;
