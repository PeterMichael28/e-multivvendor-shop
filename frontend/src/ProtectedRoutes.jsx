
import { Navigate } from "react-router-dom";
import { userStore } from "./store/userStore";
import { shallow } from "zustand/shallow";

const ProtectedRoutes = ({ children }) => {
   
 const { isAuthenticated, loading } = userStore(
    (state) => ({isAuthenticated: state.isAuthenticated, loading:state.loading}),
    shallow
  )
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};

export default ProtectedRoutes;