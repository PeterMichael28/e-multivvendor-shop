import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import ShopLogin from '../../components/shop/ShopLogin';
import { shallow } from 'zustand/shallow';
import { useSellersStore } from '../../store/useSellersStore';


const ShopLoginPage = () => {
  const navigate = useNavigate();
  
  const { isSeller,  loading, seller } = useSellersStore(
    (state) => ({isSeller: state.isSeller, loading:state.loading, seller:state.seller }),
    shallow
  )


  useEffect(() => {
    if(isSeller === true){
      navigate(`/dashboard`);
    }
  }, [loading, isSeller, navigate, seller])
  return (
    <div>
        <ShopLogin />
    </div>
  )
}

export default ShopLoginPage