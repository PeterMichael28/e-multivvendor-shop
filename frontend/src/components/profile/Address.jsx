import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import { useState } from "react";
import { userStore } from "../../store/userStore";
import { server } from "../../../server";
import axios from "axios";
import { shallow } from "zustand/shallow";
const Address = () => {
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const { user, updateUser } = userStore(
      (state) => ({ user: state.user, updateUser:state.updateUser}),
      shallow
    )
 
  
    const addressTypeData = [
      {
        name: "Default",
      },
      {
        name: "Home",
      },
      {
        name: "Office",
      },
    ];
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true)
      if (addressType === "" || country === "" || city === "" || state === "") {
        toast.error("Please fill all the fields!");

        return
      }

        try {
          const { data } = await axios.put(
            `${server}/user/update-user-addresses`,
            {
              country,
              city,
              state,
              address1,
              address2,
              zipCode,
              addressType,
            },
            { withCredentials: true }
          );
          updateUser(data.user)
        setIsLoading(false)
        toast.success('Address added Successfully!')
        } catch ( error ) {
          
          toast.error(error.response.data.message)
          setIsLoading(false)
        }
       
        setOpen(false);
        setCountry("");
        setCity("");
        setAddress1("");
        setAddress2("");
        setZipCode('');
        setAddressType("");
        setState("");
      }
    
  
    const handleDelete = async (item) => {
      const id = item._id;
      setIsLoading(true)
      try {
        const { data } = await axios.delete(
          `${server}/user/delete-user-address/${id}`,
          { withCredentials: true }
        );
        setIsLoading(false)
        updateUser(data.user)
        toast.success('Address Deleted Successfully!')
      } catch (error) {
        toast.error(error.response.data.message)
          setIsLoading(false)
      }
    //   dispatch(deleteUserAddress(id));
    };
  
    return (
      <div className="w-full px-5">
        {open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
            <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add New Address
              </h1>
              <div className="w-full">
                <form aria-required onSubmit={handleSubmit} className="w-full">
                  <div className="w-full block p-4">
                    <div className="w-full pb-2">
                      <label className="block pb-2" htmlFor='country'>Country</label>
                      <select
                        name="country"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          choose your country
                        </option>
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <option
                              className="block pb-2"
                              key={item.isoCode}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
  
                    <div className="w-full pb-2">
                      <label className="block pb-2" htmlFor="state">Choose your state</label>
                      <select
                        name="state"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          choose your state
                        </option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option
                              className="block pb-2"
                              key={item.isoCode}
                              value={item.isoCode}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-full pb-2">
                      <label className="block pb-2" htmlFor="state">Choose your city</label>
                      <select
                        name="city"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          choose your city
                        </option>
                        {City &&
                          City.getCitiesOfState(country, state).map((item) => (
                            <option
                              className="block pb-2"
                              key={item.name}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
  
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address </label>
                      <input
                        type="address"
                        className={`${styles.input}`}
                        required
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                  
  
                    <div className="w-full pb-2">
                      <label className="block pb-2">Zip Code</label>
                      <input
                        type="number"
                        className={`${styles.input}`}
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
  
                    <div className="w-full pb-2">
                      <label className="block pb-2">Address Type</label>
                      <select
                        name=""
                        id=""
                        value={addressType}
                        onChange={(e) => setAddressType(e.target.value)}
                        className="w-[95%] border h-[40px] rounded-[5px]"
                      >
                        <option value="" className="block border pb-2">
                          Choose your Address Type
                        </option>
                        {addressTypeData &&
                          addressTypeData.map((item) => (
                            <option
                              className="block pb-2"
                              key={item.name}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
  
                    <div className=" w-full pb-2">
                    <button
                className={`w-[250px] h-[40px] border-none outline-none bg-[#3a24db] text-center text-white text-lg font-semibold rounded-[3px] mt-8 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed`}
                
                type="submit"
                disabled={isLoading}
              >Add Address</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
            My Addresses
          </h1>
          <div
            className={`${styles.button} !rounded-md`}
            onClick={() => setOpen(true)}
          >
            <span className="text-[#fff]">Add New</span>
          </div>
        </div>
        <br />
        {user &&
          user.addresses.map((item, index) => (
            <div
              className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
              key={index}
            >
              <div className="flex items-center">
                <h5 className="pl-5 font-[600]">{item.addressType}</h5>
              </div>
              <div className="pl-8 flex items-center">
                <h6 className="text-[12px] 800px:text-[unset]">
                  {item.address1} {item.address2}
                </h6>
              </div>
              <div className="pl-8 flex items-center">
                <h6 className="text-[12px] 800px:text-[unset]">
                  {user && user.phoneNumber}
                </h6>
              </div>
              <div className="min-w-[10%] flex items-center justify-between pl-8">
                <AiOutlineDelete
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleDelete(item)}
                />
              </div>
            </div>
          ))}
  
        {user && user.addresses.length === 0 && (
          <h5 className="text-center pt-8 text-[18px]">
            You not have any saved address!
          </h5>
        )}
      </div>
    );
  };

  export default Address