import { encode as base64Encode, decode as base64Decode } from 'base-64';

interface LoginCredentials {
  serverUrl: string;
  warehouse_id: string;
  employee_id: string;
  password: string;
}

export class EncryptionUtil {
  static encode(data: string): string {
    return base64Encode(data);
  }

  static decode(data: string): string {
    return base64Decode(data);
  }

  static encryptCredentials(credentials: LoginCredentials): string {
    const jsonString = JSON.stringify(credentials);
    return this.encode(jsonString);
  }

  static decryptCredentials(encrypted: string): LoginCredentials {
    const jsonString = this.decode(encrypted);
    return JSON.parse(jsonString) as LoginCredentials;
  }
}
