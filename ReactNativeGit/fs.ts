import * as RNFS from 'react-native-fs';
import { Buffer } from 'buffer';

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

export const readFile = async (path: string, opts?: string | { [key: string]: string }) => {
  let encoding
  let binary = false
  if (typeof opts === 'string') {
    encoding = opts
  } else if (typeof opts === 'object') {
    encoding = opts.encoding
  } else {
    encoding = 'base64'
    binary = true
  }
  let result: string | Buffer = await RNFS.readFile(path, encoding)
  if (binary) {
    result = Buffer.from(result, 'base64')
  }
  return result
}

export const writeFile = async (path: string, content: string | Buffer, opts?: string | { [key: string]: string }) => {
  let encoding
  if (typeof opts === 'string') {
    encoding = opts
  } else if (typeof opts === 'object') {
    encoding = opts.encoding
  } else if (typeof content === 'string') {
    encoding = 'utf8'
  } else if (Buffer.isBuffer(content)) {
    encoding = 'base64'
    content = content.toString('base64')
  }

  await RNFS.writeFile(path, content as string, encoding)
}

