
import { Navigate } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { userStore } from "./store/userStore";

const ProtectedAdminRoute = ({ children }) => {
     
 const { isAuthenticated, loading, user } = userStore(
  (state) => ({isAuthenticated: state.isAuthenticated, loading:state.loading, user: state.user}),
  shallow
)
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    } else if(user.role !== "Admin"){
        return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default ProtectedAdminRoute;
