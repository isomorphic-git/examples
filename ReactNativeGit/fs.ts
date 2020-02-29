import * as RNFS from 'react-native-fs';

export const readDir = async (path: string) => {
  const files = await RNFS.readDir(path);
  return files.map(f => f.name);
};


