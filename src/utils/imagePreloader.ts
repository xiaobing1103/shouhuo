import FastImage from 'react-native-fast-image';

export const preloadImages = async (urls: string[]) => {
  const sources = urls.map((url) => ({ uri: url }));
  await FastImage.preload(sources);
};
