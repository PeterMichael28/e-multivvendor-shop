import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestedProduct from "../components/productCard/SuggestedProduct";
import ProductDetails from "../components/productCard/ProductDetails";
import { useProductStore } from "../store/useProductStore";
import { useEventStore } from "../store/useEventStore";

const ProductDetailsPage = () => {
//   const { allProducts } = useSelector((state) => state.products);
//   const { allEvents } = useSelector((state) => state.events);


  const { id } = useParams();
  const allProducts = useProductStore(state => state.allProducts)
  const allEvents = useEventStore(state => state.allEvents)
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find( ( i ) => i._id == id );
    
      setData(data);
    }
  }, []);



  return (
    <div>
      {/*  */}
      <ProductDetails data={data} />
        {
          !eventData && (
            <>
            {data && <SuggestedProduct data={data} />}
            </>
          )
        }
        
    </div>
  );
};

export default ProductDetailsPage;