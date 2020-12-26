export const replaceWithSpaces = (string) => string.replace(/[^a-zA-Z0-9 ]/g, ' ');

export const customIncludes = (title, query) => {
  const newQuery = replaceWithSpaces(query);

  const words = newQuery.split(' ');

  return words.every((item) => title.includes(item));
};

export const getAnimeTitle = (anime, preferEnglish) => {
  if (preferEnglish && anime.alt_title) return anime.alt_title;

  return anime.title;
};

export const millisToTime = (millis) => {
  let seconds = Math.floor((millis / 1000) % 60);
  let minutes = Math.floor((millis / 60000) % 60);
  let hours = Math.floor((millis / 3600000) % 24);

  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;

  if (hours > 0) {
    hours = (hours < 10) ? `0${hours}` : hours;

    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
};
