import * as RNFS from 'react-native-fs';

function Err(name: string) {
  return class extends Error {
    public code = name;
    constructor(...args: any) {
      super(...args);
      if (this.message) {
        this.message = name + ": " + this.message;
      } else {
        this.message = name;
      }
    }
  };
}

const EEXIST = Err("EEXIST");
const ENOENT = Err("ENOENT");
const ENOTDIR = Err("ENOTDIR");
const ENOTEMPTY = Err("ENOTEMPTY");

export const readdir = async (path: string) => {
  try {
    return await RNFS.readdir(path);
  } catch (err) {
    switch (err.message) {
      case 'Attempt to get length of null array': {
        throw new ENOTDIR(path)
      }
      case 'Folder does not exist': {
        throw new ENOENT(path)
      }
      default:
        throw err
    }
  }
};

export const mkdir = async (path: string) => {
  return RNFS.mkdir(path)
}

