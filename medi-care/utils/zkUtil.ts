import { groth16 } from 'snarkjs';
// import x from '../circuits/'

export async function generateProof(input: any, wasmFile: string, zkeyFile: string) {
  const { proof, publicSignals } = await groth16.fullProve(input, wasmFile, zkeyFile);
  return { proof, publicSignals };
}

export async function verifyProof(verificationKey: any, proof: any, publicSignals: any) {
  const verified = await groth16.verify(verificationKey, publicSignals, proof);
  return verified;
}