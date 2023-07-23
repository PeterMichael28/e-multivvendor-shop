import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { useSellersStore } from '../../store/useSellersStore';
import { shallow } from 'zustand/shallow';
import ShopCreateContent from '../../components/shop/ShopCreateContent';


const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { seller, isSeller } = useSellersStore(
    (state) => ({seller: state.seller, isSeller:state.isSeller }),
    shallow
  )

  useEffect(() => {
    if(isSeller === true){
      navigate(`/dashboard`);
    }
  }, [])
  return (
    <div>
        <ShopCreateContent />
    </div>
  )
}

export default ShopCreatePage