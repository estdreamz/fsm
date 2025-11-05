import { Config } from "../config";
import { Buffer } from "buffer";

import { enc, AES, mode, pad } from "crypto-ts";
import type { BufferedBlockAlgorithmConfig } from "crypto-ts/src/lib/BufferedBlockAlgorithmConfig";
import type { WordArray } from "crypto-ts/src/lib/WordArray";

class Secure {
  private static keySize = 16;

  private static a = 5;

  private static b = 9;

  private static char = "0123456789";

  static createKeyId = () => {
    const keyId: string[] = [];

    for (let i = 0; i < this.keySize; i++) {
      const value = Math.floor(Math.random() * 10);

      keyId.push(this.char[Math.floor(value)]);
    }

    return keyId.join("");
  };

  static createKey = (keyId: string) => {
    const crKey: number[] = [];

    for (let i = 0; i < this.keySize; i++) {
      crKey.push(Number(this.a ** Number(keyId[i])) % this.b);
    }

    return crKey.join("");
  };

  static createDymanicKey = (keyId: string, pk: string) => {
    const key: number[] = [];

    for (let i = 0; i < this.keySize; i++) {
      key.push(Number(Number(pk[i]) ** Number(keyId[i])) % this.b);
    }

    return key.join("");
  };

  static toBase64Length16 = (text: string) => {
    if (!text.length) return "";
    const b64 = Buffer.from(encodeURI(text)).toString("base64");

    return b64.substring(0, 16);
  };
}

class Cryp {
  readonly algorithm = "AES-128-CBC";

  ivText: string;

  key: string;

  keyEnc: string;

  keyBff: WordArray;

  iv: WordArray;

  cfg: BufferedBlockAlgorithmConfig;

  constructor(props: { iv?: string; key?: string }) {
    this.ivText = props.iv && props.iv.length === 16 ? props.iv : Config.API_IV;
    this.key = props.key && props.key.length === 16 ? props.key : Config.API_KEY ?? "";
    this.keyEnc = props.key && props.key.length === 16 ? Secure.toBase64Length16(this.key) : this.key;
    this.keyBff = enc.Utf8.parse(this.keyEnc);
    this.iv = enc.Utf8.parse(this.ivText);
    this.cfg = { mode: mode.CBC, padding: pad.PKCS7, iv: this.iv };
  }

  static n(iv?: string) {
    return new Cryp({ iv });
  }

  encrypt(txt: string) {
    if (!txt.length) return txt;
    const cipher = AES.encrypt(txt, this.keyBff, this.cfg);

    return cipher.toString();
  }

  decrypt<T>(txt: string): T | null {
    if (!txt.length) return null;
    const decval = AES.decrypt(txt, this.keyBff, this.cfg);
    const data = decval.toString(enc.Utf8);

    return JSON.parse(data) as T;
  }

  decryptTxt(txt: string): string {
    if (!txt.length) return txt;
    const decval = AES.decrypt(txt, this.keyBff, this.cfg);

    return decval.toString(enc.Utf8);
  }
}

export { Secure, Cryp };
