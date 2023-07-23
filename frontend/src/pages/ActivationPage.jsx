import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";


const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
            setLoading(false);
            // toast.success(res.data.message)
          })
          .catch((err) => {
            setError(true);
            toast.error(err)
            console.log(err)
            setLoading(false);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="text-center"
    >
       
              { loading ? <p>loading...</p> : (
    
                       
        <div className="w-full mx-auto px-7 sm:w-11/12 md:w-2/3 lg:w-8/12 space-y-4">
            <h1 className="text-6xl font-bold font-Roboto">Account Activation</h1>
          { error ? (
            <>
            <div className=" px-8 py-3 bg-blue-600/40 max-w-[40rem] mx-auto rounded-md text-center">
            <p className="text-white font-semibold text-[1.2rem]">Your token is expired!</p>
        </div>
              <p className="max-w-[40rem] mx-auto">There was an error activating your account {  }, go back to <Link to='/sign-up' className="font-semibold text-blue-700">Sign Up</Link> and try again</p>
        </>
          ) : (
            <>
            <div className="text-left px-8 py-3 bg-blue-600/40 max-w-[40rem] rounded-md">
                <p className="text-white font-semibold text-[1.2rem]">Your account is now active!</p>
            </div>
            <p className="max-w-[40rem]">Your account has been created successfully! You can now <Link to='/login' className="font-semibold text-blue-600">login</Link> with your email and password to continue</p></> ) }
           
           </div>
 
                
            )}
   
    </div>
  );
};

export default ActivationPage;