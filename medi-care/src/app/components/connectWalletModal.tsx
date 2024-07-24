// ConnectWalletModal.tsx
import React, { useContext, useState } from 'react';
import web3Context from '../../../context/web3-context';


const walletOptions = [
  { name: 'MetaMask', icon: '🦊' },
  { name: 'WalletConnect', icon: '🔗' },
  { name: 'Coinbase Wallet', icon: '🏦' },
];

export default function ConnectWalletModal({ isOpen, onClose }: any) {
  const { account, connectWallet, disconnectWallet } = useContext(web3Context);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async (walletType: string) => {
    setIsConnecting(true);
    try {
      await connectWallet(walletType);
      onClose();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
        {account ? (
          <div>
            <p className="mb-4">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <button
              onClick={disconnectWallet}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleConnectWallet(wallet.name)}
                disabled={isConnecting}
                className="w-full flex items-center justify-between bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{wallet.name}</span>
                <span>{wallet.icon}</span>
              </button>
            ))}
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}