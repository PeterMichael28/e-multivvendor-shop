import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../../server";
import { userStore } from "../../store/userStore";
import { shallow } from "zustand/shallow";
const Login = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [visible, setVisible] = useState(false);
 const [loading, setLoading] = useState(false)

 
 const { isAuthenticated, loadUserSuccess, loadUserFail, loadUserRequest } = userStore(
   (state) => ({isAuthenticated: state.isAuthenticated, loadUserSuccess:state.loadUserSuccess, loadUserFail:state.loadUserFail, loadUserRequest:state.loadUserRequest }),
   shallow
 )

 useEffect(() => {
 

     const timer = setTimeout( () => {
       if ( isAuthenticated === true ) {
         navigate( "/" );
       }
     }, 200)
   

     return () => clearTimeout(timer)
 }, [isAuthenticated, navigate])



 const handleSubmit = async (e) => {
  e.preventDefault();
  loadUserRequest()
  setLoading(true)

  await axios
    .post(
      `${server}/user/login-user`,
      {
        email,
        password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      loadUserSuccess(res?.data?.user)
      toast.success("Login Success!");
      setLoading(false)
      // navigate("/");
      // window.location.reload(true); 
      
   
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
      loadUserFail( {error: err?.response?.data?.message})
      console.log(err)
      setLoading(false)
    
    });
};

 return (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
     Login to your account
    </h2>
   </div>

   <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
         <LoginForm email={ email } setEmail={ setEmail } password={ password } setPassword={ setPassword } visible={ visible } setVisible={ setVisible } handleSubmit={ handleSubmit } loading={loading}/>
    </div>
   </div>
  </div>
 );
};

export default Login;
