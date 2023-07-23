import React from 'react'
import AdminSideBar from '../../components/admin/layout/AdminSideBar';
import AllSellers from '../../components/admin/AllSellers';
import AdminHeader from '../../components/admin/layout/AdminHeader';


const AdminDashboardSellers = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={3} />
        </div>
        <AllSellers />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardSellers