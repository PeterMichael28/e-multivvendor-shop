import React from 'react'
import styles from '../../styles/style';
import { AiOutlineDelete } from 'react-icons/ai';

const PaymentMethod = () => {
  return (
    <div className='w-full px-5'>
        <div className="flex w-full items-center justify-between">
            <h1 className='text-[25px] font-semibold text-[#000000ba] pb-2'>Payment Methods</h1>
            <div className={`${styles.button} rounded-md`}>
                <span className='text-white'>Add New</span>
          </div>    
        </div>
        <br />
              
        <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
            <div className="flex items-center">
                <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="payment-Method" />
                <h5 className='pl-5 font-semibold text-lg'>Michael Peter</h5>
            </div>
              <div className="pl-8 flex items-center">
                  <h6>1234 **** **** ****</h6>
                  <h5 className='pl-6'>09/2023</h5>
            </div>
            <div className='min-w-[10%] flex items-center justify-between pl-6'>
                <AiOutlineDelete size={25} className='cursor-pointer' title='Delete Card'/>
            </div>
        </div>
    </div>
  )
}

export default PaymentMethod