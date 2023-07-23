import AllUsersContent from "../../components/admin/AllUsers";
import AdminHeader from "../../components/admin/layout/AdminHeader";
import AdminSideBar from "../../components/admin/layout/AdminSideBar";




const AdminDashboardUsers = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={4} />
        </div>
        <AllUsersContent />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardUsers