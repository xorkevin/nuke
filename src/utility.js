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

export {formatStr, randomID};
