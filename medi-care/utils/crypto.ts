import NodeRSA from 'node-rsa';
import { KeyPair } from './keyPair';

export function generateKeyPair(): KeyPair {
  const key = new NodeRSA({b: 2048});
  return {
    privateKey: key.exportKey('private'),
    publicKey: key.exportKey('public')
  };
}

export function encryptMessage(publicKey: string, message: string): string {
  const key = new NodeRSA(publicKey);
  return key.encrypt(message, 'base64');
}

export function decryptMessage(privateKey: string, encryptedMessage: string): string {
  const key = new NodeRSA(privateKey);
  return key.decrypt(encryptedMessage, 'utf8');
}