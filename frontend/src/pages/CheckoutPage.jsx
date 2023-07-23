import React from 'react'
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import Checkout from '../components/checkout/Checkout';

const CheckoutPage = () => {
  return (
    <div>
   
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
    
    </div>
  )
}

export default CheckoutPage