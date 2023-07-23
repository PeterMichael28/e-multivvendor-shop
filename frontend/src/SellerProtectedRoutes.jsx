/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";
import { useSellersStore } from "./store/useSellersStore";
import { shallow } from "zustand/shallow";
import Loader from "./components/layout/Loader";


const SellerProtectedRoutes = ({ children }) => {
    const { isSeller,  loading } = useSellersStore(
        (state) => ({isSeller: state.isSeller, loading:state.loading }),
        shallow
      )
    
 
  if (loading === true) {
    return <Loader />;
  } else {
    if (!isSeller) {
      return <Navigate to={`/shop-login`} replace />;
    }
    return children;
  }
};

export default SellerProtectedRoutes;
