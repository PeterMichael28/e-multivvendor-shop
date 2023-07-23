import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";
import { server } from "../../../server";
import styles from "../../styles/style";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const passwordChangeHandler = async (e) => {
      e.preventDefault();
      setIsLoading(true)
      await axios
        .put(
          `${server}/user/update-user-password`,
          { oldPassword, newPassword, confirmPassword },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Password updated successfully!");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setIsLoading(false)
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false)
        });
    };
    return (
      <div className="w-full px-5">
        <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
          Change Password
        </h1>
        <div className="w-full">
          <form
            aria-required
            onSubmit={passwordChangeHandler}
            className="flex flex-col items-center"
          >
            <div className=" w-[100%] 800px:w-[50%] mt-5">
              <label className="block pb-2">Enter your old password</label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%] mt-2">
              <label className="block pb-2">Enter your new password</label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className=" w-[100%] 800px:w-[50%] mt-2">
              <label className="block pb-2">Enter your confirm password</label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className={`w-[250px] h-[40px] border-none outline-none bg-[#3a24db] text-center text-white text-lg font-semibold rounded-[3px] mt-8 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed`}
                
                type="submit"
                disabled={!confirmPassword || !newPassword || !oldPassword || isLoading}
              >Update Password</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default ChangePassword;