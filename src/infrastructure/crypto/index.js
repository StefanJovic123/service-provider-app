import Base64 from 'crypto-js/enc-base64';
import AES from 'crypto-js/aes';
import sha256 from 'crypto-js/sha256';
import { substring } from '@common/utils';

class Cypher {
  constructor(secrets) {
    this.secrets = secrets;
  }

  sha256(data) {
    const hashObj = sha256(data);
    const hash = hashObj.toString();
    return hash;
  }

  compareHashes(hash1, hash2) {
    return hash1.toString() === hash2.toString();
  }

  decrypt(rawData) {
    const key = sha256(this.secrets?.key).toString();
    console.log({ keyLen: key.length, key }, this.secrets?.key, key.toString());

    const hashIv = sha256(this.secrets?.iv).toString();
    const iv = substring(hashIv, 0, 8);
    console.log({ hashIv, hashIvLen: iv.length, iv }, this.secrets?.iv);

    const decoded = Base64.parse(rawData); // we need WordArray instance because clamp fn that exists there
    console.log({ decoded });
    // const decrypted = AES.decrypt(decoded, key, { iv });
    const bytes = AES.decrypt(decoded.toString(), key, { iv });
    console.log({ bytes });
    // return bytes.toString();
    return bytes.toString(Base64);
  }
}

export default Cypher;
