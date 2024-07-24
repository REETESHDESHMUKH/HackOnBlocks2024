"use client"
import React, { useContext, useEffect, useState } from 'react'
import web3Context from '../../../context/web3-context'
import { ethers } from 'ethers';
import { generateProof, verifyProof } from '../../../utils/zkUtil';
import verificationKey from '../../../public/circuits/verification_key.json';
// import verifc from '../../../circuits/healthCheck_js/'

function Profile() {
  const {provider, account, contract} = useContext(web3Context);
  const [unlockTime, setUnlockTime] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContractInfo() {
      if (contract) {
        try {
          const contractBalance = await provider!.getBalance(contract.target);
          setBalance(ethers.formatEther(contractBalance));
        } catch (error) {
          console.error("Error fetching contract info:", error);
        }
      }
    }

    fetchContractInfo();
  }, [contract, provider]);

  if (!contract) {
    return <div>Loading contract...</div>;
  }

  async function handleProofGeneration() {
    const input = { age: 101, bloodPressure: 120 };
    const { proof, publicSignals } = await generateProof(
      input,
      '/circuits/healthCheck_js/healthCheck.wasm',
      '/circuits/circuit_final.zkey'
    );
    console.log('Public Signals:', publicSignals);
  
    const verified = await verifyProof(verificationKey, proof, publicSignals);
    console.log('Proof verified:', verified);
    console.log('Is Healthy:', publicSignals[0] === '1');
    
    alert(`Proof verified: ${verified}, Is Healthy: ${publicSignals[0] === '1'}`);
  }
  
  return (
    <div className='flex flex-row'>
        <div className='mt-10 px-2'>
            <h2>Contract Info</h2>
            <p>Connected Account: {account}</p>
            <p>Unlock Time: {unlockTime}</p>
            <p>Owner: {owner}</p>
            <p>Balance: {balance} ETH</p>
            <button onClick={handleProofGeneration}>
                Verify
            </button>
        </div>
    </div>
  );
}

export default Profile;