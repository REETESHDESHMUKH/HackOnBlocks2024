// Web3Provider.tsx
"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import Web3Context from "./web3-context";
import { ethers } from 'ethers';
import { Lock as LockType } from '../typechain-types';
import LockDeploymentAddress from '../ignition/deployments/chain-2442/deployed_addresses.json';
import LockAbi from '../artifacts/contracts/Lock.sol/Lock.json';

interface Web3ProviderProps {
    children: ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  const [contract, setContract] = useState<LockType | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const connectWallet = async (walletType: string) => {
    let provider;
    switch (walletType) {
      case 'MetaMask':
        if (typeof window.ethereum !== 'undefined') {
          provider = new ethers.BrowserProvider(window.ethereum);
        } else {
          throw new Error('MetaMask not installed');
        }
        break;
      case 'WalletConnect':
        // Implement WalletConnect logic
        throw new Error('WalletConnect not implemented');
      case 'Coinbase Wallet':
        // Implement Coinbase Wallet logic
        throw new Error('Coinbase Wallet not implemented');
      default:
        throw new Error('Unsupported wallet type');
    }

    setProvider(provider);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);

    // Initialize contract
    const deployedAddress = LockDeploymentAddress['LockModule#Lock'];
    const contract = new ethers.Contract(deployedAddress, LockAbi.abi, signer) as unknown as LockType;
    setContract(contract);
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setContract(null);
  };

  useEffect(() => {
    if (provider && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, [provider]);

  return (
    <Web3Context.Provider value={{provider, account, contract, connectWallet, disconnectWallet}}>
        {children}
    </Web3Context.Provider>
  );
}