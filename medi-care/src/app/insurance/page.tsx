import { CurrencyRupeeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react'
import InsuranceCard from '../components/insuranceCard';

function Insurance() {
  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-3 p-5 mt-5'>
        <InsuranceCard/>
        <InsuranceCard/>
        <InsuranceCard/>
        <InsuranceCard/>
        <InsuranceCard/>
        <InsuranceCard/>
        <InsuranceCard/>
        <InsuranceCard/>
    </div>
  )
}

export default Insurance