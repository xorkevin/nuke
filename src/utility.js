const formatStrArgs = (str, args) => {
  return str.replace(/{(\d+)}/g, (match, number) => {
    if (typeof args[number] != 'undefined') {
      return args[number];
    }
    return match;
  });
};

const formatStr = (str, ...args) => {
  return formatStrArgs(str, args);
};

const ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

const randomID = (len = 8) => {
  const idarr = [];
  for (let i = 0; i < len; i++) {
    idarr.push(ALPHABET[Math.floor(ALPHABET.length * Math.random())]);
  }
  return idarr.join('');
};

const COOKIE = {
  prev: false,
  map: new Map(),
};

const getCookie = (key) => {
  const cookies = document.cookie;
  if (cookies === COOKIE.prev) {
    return COOKIE.map.get(key);
  }
  const map = new Map(
    cookies.split(';').map((value) => {
      return value.trim().split('=');
    }),
  );
  COOKIE.prev = cookies;
  COOKIE.map = map;
  return map.get(key);
};

const setCookie = (key, value, path = '/', age = 31536000) => {
  document.cookie = `${key}=${value};path=${path};max-age=${age}`;
};

export {formatStr, randomID, getCookie, setCookie};
