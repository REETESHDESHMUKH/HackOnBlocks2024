import React, { useContext, useState } from 'react'
import Toggle from './toggle';
import web3Context from '../../../context/web3-context';
import { KeyPair } from '../../../utils/keyPair';
import { generateKeyPair } from '../../../utils/crypto';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

const walletOptions = [
    { name: 'MetaMask', icon: 'metaMask.png' },
    { name: 'WalletConnect', icon: 'walletConnect.png' },
    { name: 'Coinbase Wallet', icon: 'coinBase.png' },
  ];

function Signin({ isOpen, onClose }: any) {
    const { account, contract, connectWallet } = useContext(web3Context);
    const [isConnecting, setIsConnecting] = useState(false);
    const [name,setName] = useState("");
    const [age,setAge] = useState(0);
    const [gender,setGender] = useState("");
    const [enableRecord,setEnableRecord] = useState(false);

    const handleConnectWallet = async (walletType: string) => {
        setIsConnecting(true);
        try {
            await connectWallet(walletType);
            onClose();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        } finally {
            const {privateKey,publicKey}: KeyPair =  generateKeyPair();
            try {
                await contract?.registerUser(name,age,gender,enableRecord,publicKey)
            } catch (error) {
                console.error('registration failed', error);
            } finally {
                alert("sucessfully registered");
            }
            setIsConnecting(false);
        }
    };
  if (!isOpen) return null;
  return (
    <div id="login-popup" tabIndex={-1}
    className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-100 h-full items-center justify-center flex">
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
            <button type="button" onClick={onClose}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close">
                <svg
                    aria-hidden="true" className="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"></path>
                </svg>

                <span className="sr-only">Close popup</span>
            </button>

            <div className="p-5">
                <h3 className="text-2xl mb-0.5 font-medium"></h3>
                <p className="mb-4 text-sm font-normal text-gray-800"></p>

                <div className="text-center">
                    <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                        Create account
                    </p>
                    <p className="mt-2 text-sm leading-4 text-slate-600">
                        You must create account to avail services.
                    </p>
                </div>


                    <div className="mt-7 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                        <label
                            htmlFor="name"
                            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full focus:outline-none border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            placeholder="Jane Doe"
                        />
                    </div>
                    
                    <div className='mt-7 flex flex-row gap-3'>
                        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            <label
                                htmlFor="age"
                                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                            >
                                Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                id="age"
                                onChange={(e) => setAge(Number(e.target.value))}
                                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
                                placeholder="23"
                            />
                        </div>

                        <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                            <label
                                htmlFor="gender"
                                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                            >
                                Gender
                            </label>
                            <input
                                type="name"
                                name="gender"
                                id="gender"
                                onChange={(e) => setGender(e.target.value)}
                                className="block focus:outline-none w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                placeholder="23"
                            />
                        </div>
                    </div>
                    
                    <Toggle enabled={enableRecord} onEnableChange={setEnableRecord}/>

                    <div className="flex flex-row gap-3 mt-7">
                        {walletOptions.map((wallet) => (
                        <button
                            key={wallet.name}
                            onClick={() => handleConnectWallet(wallet.name)}
                            disabled={isConnecting}
                            className="w-full flex items-center justify-between border-2 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <img src={wallet.icon} className='w-15 h-15'>
                            </img>
                        </button>
                        ))}
                    </div>


                <div className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?
                    <a href="/signup" className="font-medium text-[#4285f4]">Sign in</a>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Signin