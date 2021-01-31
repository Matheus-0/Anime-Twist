import axios from 'axios';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

import {
  baseURL, CDN, key, token, userAgent,
} from '../constants';

const api = axios.create({
  baseURL,
  headers: {
    'User-Agent': userAgent,
    'X-Access-Token': token,
  },
  timeout: 10000,
});

export const decryptSource = (source) => (
  CDN + AES.decrypt(source, key).toString(CryptoJS.enc.Utf8).trim()
);

export const getAnimeList = async () => {
  try {
    const response = await api.get('api/anime');

    return response.data;
  } catch (error) {
    return null;
  }
};

export const getAnimeSources = async (anime) => {
  try {
    const response = await api.get(`/api/anime/${anime.slug.slug}/sources`);

    return response.data;
  } catch (error) {
    return null;
  }
};
