import React from 'react'

import CheckoutSteps from '../components/checkout/CheckoutSteps';
import Payment from '../components/payment/Payment';

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
      
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
      
    </div>
  )
}

export default PaymentPage