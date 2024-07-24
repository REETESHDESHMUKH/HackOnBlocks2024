import { Lock as LockType } from '../typechain-types';
import { createContext } from 'react';
import { ethers } from 'ethers';

interface Web3ContextProps {
    provider: ethers.BrowserProvider | null,
    account : string | null,
    contract : LockType | null,
    connectWallet: (walletType: string) => Promise<void>;
    disconnectWallet: () => void;
}

const web3Context = createContext<Web3ContextProps> ({
    provider: null,
    account: null,
    contract: null,
    connectWallet: async () => {},
    disconnectWallet: () => {},
});

export default web3Context;