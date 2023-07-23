import React from "react";
import DashboardSideBar from "../../components/shop/layout/DashboardSideBar";
import ShopSettings from "../../components/shop/ShopSettings";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";


const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px] fixed left-0 top-[80px] overflow-y-scroll">
          <DashboardSideBar active={11} className='py-10'/>
        </div>
        <div className='ml-[80px] 800px:ml-[330px] w-full'>
            <ShopSettings />
        </div>
        
      </div>
    </div>
  );
};

export default ShopSettingsPage;
