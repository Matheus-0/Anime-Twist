import { getAnimeSlug } from '../utils/anime';

import {
  accessToken, baseURL, CDN, key, userAgent,
} from '../constants';

const AES = require('crypto-js/aes');
const CryptoJS = require('crypto-js');

export const decryptSource = (source) => {
  const result = CDN + AES.decrypt(source, key).toString(CryptoJS.enc.Utf8).trim();

  // console.log(result);

  return result;
};

export const getAnimeList = async () => {
  try {
    const response = await fetch(`${baseURL}/api/anime`, {
      headers: {
        'user-agent': userAgent,
        'x-access-token': accessToken,
      },
    });

    return response.json();
  } catch (error) {
    return null;
  }
};

export const getAnimeSources = async (anime) => {
  try {
    const response = await fetch(`${baseURL}/api/anime/${getAnimeSlug(anime)}/sources`, {
      headers: {
        'user-agent': userAgent,
        'x-access-token': accessToken,
      },
    });

    return response.json();
  } catch (error) {
    return null;
  }
};
