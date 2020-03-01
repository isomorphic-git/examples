import * as RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import { Alert } from 'react-native';

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
   console.log('readdir', path);
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
 console.log('mkdir', path)
  return RNFS.mkdir(path)
}

export const readFile = async (path: string, opts?: string | { [key: string]: string }) => {
 console.log('readFile', path + '\n\n' + JSON.stringify(opts))
  let encoding
  let binary = false
  if (typeof opts === 'string') {
    encoding = opts
  } else if (typeof opts === 'object') {
    encoding = opts.encoding
  }
  if (!encoding) {
    encoding = 'base64'
    binary = true
  }
  let result: string | Uint8Array = await RNFS.readFile(path, encoding)
  if (binary) {
    result = Buffer.from(result, 'base64')
  }
  return result
}

export const writeFile = async (path: string, content: string | Uint8Array, opts?: string | { [key: string]: string }) => {
  let encoding
  if (typeof opts === 'string') {
    encoding = opts
  } else if (typeof opts === 'object') {
    encoding = opts.encoding
  }

  if (typeof content === 'string') {
    encoding = encoding || 'utf8'
  } else {
    encoding = 'base64'
    content = Buffer.from(content).toString('base64')
  }

  await RNFS.writeFile(path, content as string, encoding)
}

export const stat = async (path: string) => {
  try {
   console.log('stat', path)
    const r = await RNFS.stat(path);
    // @ts-ignore
    r.isSymbolicLink = () => false;
    return r
  } catch (err) {
    switch (err.message) {
      case 'File does not exist': {
        throw new ENOENT(path)
      }
      default:
        throw err
    }
  }
}
export const lstat = stat;

export const unlink = async (path: string) => {
  try {
    await RNFS.unlink(path)
  } catch (err) {
    switch (err.message) {
      case 'File does not exist': {
        throw new ENOENT(path)
      }
      default:
        throw err
    }
  }
}

export const rmdir = unlink;

export const readlink = async () => { throw new Error('not implemented yet sory') };
export const symlink = async () => { throw new Error('not implemented yet sory') };
export const chmod = async () => { throw new Error('not implemented yet sory') };
