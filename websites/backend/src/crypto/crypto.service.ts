import { x86 as murmur } from 'murmurhash3js';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export class CryptoService {
  static async hash(toHash: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(toHash, saltOrRounds);
  }

  static sha256(plainText: string) {
    return crypto.createHash('sha256').update(plainText).digest('base64');
  }

  static async isHashEqual(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  static murmurhash(toHash: string): number {
    return murmur.hash32(toHash, 1);
  }
}
