import { useParams } from "react-router-dom";
import ShopInfo from "../../components/shop/ShopInfo";
import ShopProfileData from "../../components/shop/ShopProfileData";
import styles from "../../styles/style";

const ShopHomePage = () => {
    const {id} = useParams();
    return (
      <div className={`${styles.section} bg-[#f5f5f5]`}>
           <div className="w-full flex py-10 justify-between">
            <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
              <ShopInfo isOwner={true} id={ id }/>
            </div>
            <div className="w-[72%] rounded-[4px]">
                <ShopProfileData isOwner={ true } id={ id } />
            </div>
           </div>
      </div>
    )
  }
  
  export default ShopHomePage