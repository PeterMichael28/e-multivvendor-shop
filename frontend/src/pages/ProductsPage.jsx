import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { userStore } from "../store/userStore";
import styles from "../styles/style";
import ProductCard from "../components/productCard/ProductCard";
import Loader from "../components/layout/Loader";
import { useProductStore } from "../store/useProductStore";
const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const allProducts = useProductStore(state => state.allProducts)
  const [data, setData] = useState([]);

   
  const loading = userStore((state) => state.loading)


  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
      allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allProducts, categoryData]);

  return (
  <>
  {
   loading ? (
      <Loader />
    ) : (
      <div>
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
    </div>
    )
  }
  </>
  );
};

export default ProductsPage;