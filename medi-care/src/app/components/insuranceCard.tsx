'use client'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { CurrencyRupeeIcon, EllipsisVerticalIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react'

function classNames(...classes: string[]) {
return classes.filter(Boolean).join(' ')
}

function InsuranceCard() {
  return (
    <div className="bg-gray-100 rounded-md mx-1 my-2 border ">
    <div className="flex justify-between items-center flex-wrap sm:flex-nowrap border-b">
      <div className="ml-4 my-4">
        <div className="flex items-center gap-4">
            <div className='border p-3 rounded-md bg-white'>
                <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
            </div>
            <p className="text-md leading-6 font-medium text-gray-700 text-base">
              Campaign Id: 
            </p>
        </div>
      </div>
      
      <Menu as="div" className="ml-3 relative">
        <MenuButton className="bg-white mr-2 rounded-full flex text-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {/* <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            /> */}
            <EllipsisVerticalIcon className="h-7 w-7 p-1 rounded-full bg-gray-100" />
        </MenuButton>
        <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        >
        <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem>
            {({ active }) => (
                <a
                href="#"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                Your Profile
                </a>
            )}
            </MenuItem>
            <MenuItem>
            {({ active }) => (
                <a
                href="#"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                Settings
                </a>
            )}
            </MenuItem>
            <MenuItem>
            {({ active }) => (
                <a
                href="#"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                Sign out
                </a>
            )}
            </MenuItem>
        </MenuItems>
        </Transition>
      </Menu>   
    </div>
    <div className="divide-y divide-gray-100 px-4 pt-2 pb-3 bg-gray-50"> 
            <div className="flex pt-1 pb-1 border-b border-gray-300 justify-between items-center flex-wrap sm:flex-nowrap min-w-0 gap-x-4">
                <p className="text-sm leading-6 font-medium text-gray-700">
                Crop Type
                </p>
                <p className="text-sm leading-6 font-medium text-gray-500"> 
                
                </p>
            </div>
            <div className="flex pt-1 pb-1 justify-between items-center flex-wrap sm:flex-nowrap min-w-0 gap-x-4">
                <p className="text-sm leading-6 font-medium text-gray-700">
                Fund Raised
                </p>
                <p className="text-sm leading-6 font-medium text-gray-700"> 
                ₹
                </p>
            </div>
    </div>
  </div>
  )
}

export default InsuranceCard