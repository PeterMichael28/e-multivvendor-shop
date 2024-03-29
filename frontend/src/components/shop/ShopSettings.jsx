import React, { useState } from "react";

import { AiOutlineCamera } from "react-icons/ai";

import axios from "axios";

import { toast } from "react-toastify";
import { server } from "../../../server";
import styles from "../../styles/style";
import { useSellersStore } from "../../store/useSellersStore";
import { shallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";

const ShopSettings = () => {
  
    const { seller, loadSeller } = useSellersStore(
        ( state ) => ( { seller: state.seller, loadSeller: state.loadSeller } ),
        shallow
      )
    
      const navigate = useNavigate()

  const [avatar,setAvatar] = useState();
  const [name,setName] = useState(seller && seller.name);
  const [description,setDescription] = useState(seller && seller.description ? seller.description : "");
  const [address,setAddress] = useState(seller && seller.address);
  const [phoneNumber,setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode,setZipcode] = useState(seller && seller.zipCode);



  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    
    await axios.put(`${server}/shop/update-shop-avatar`, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    }).then((res) => {
       loadSeller();
        toast.success("Avatar updated successfully!")
    }).catch((error) => {
        toast.error(error.response.data.message);
    })

  };

  const updateHandler = async (e) => {
    e.preventDefault();
    
    await axios.put(`${server}/shop/update-seller-info`, {
        name,
        address,
        zipCode,
        phoneNumber,
        description,
    }, {withCredentials: true}).then((res) => {
        toast.success("Shop info updated successfully!");
        navigate('/dashboard')
        loadSeller()
    }).catch((error)=> {
        toast.error(error.response.data.message);
    })
  };



  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar ? URL.createObjectURL(avatar) : `${seller.avatar?.url}`
              }
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* shop info */}
        <form
          aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <textarea
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              rows={7}
            ></textarea>
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
             <button
                type="submit"
                
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                Update Shop
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
