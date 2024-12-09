import CryptoJS from 'crypto-js';

export function decodeHash(hash: string): string | null {
    try {
      const originalPath = CryptoJS.enc.Base64.parse(hash).toString(CryptoJS.enc.Utf8);
      return originalPath;
    } catch (error) {
      console.error('Invalid hash:', error);
      return null;
    }
  }
export const generateHash = (path: string): string => {
    return CryptoJS.SHA256(path).toString(CryptoJS.enc.Base64);
  };
