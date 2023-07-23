import { Country, State, City } from "country-state-city";
import styles from "../../styles/style";

/* eslint-disable react/prop-types */
const ShippingInfo = ({
    user,
    country,
    setCountry,
    city,
    setCity,
    userInfo,
    setUserInfo,
    address1,
    setAddress1,
    zipCode,
    setZipCode,
    state,
    setState
  }) => {
    return (
      <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
        <h5 className="text-[18px] font-[500]">Shipping Address</h5>
        <br />
        <form>
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                value={user && user.name}
                required
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="email"
                value={user && user.email}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>
  
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                required
                value={user && user.phoneNumber}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">Zip Code</label>
              <input
                type="number"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                className={`${styles.input}`}
              />
            </div>
          </div>
  
          <div className="w-full flex pb-3">
            <div className="w-[50%]">
              <label className="block pb-2">Country</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option className="block pb-2" value="">
                  Choose your country
                </option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-[50%]">
              <label className="block pb-2">State</label>
              <select
                className="w-[95%] border h-[40px] rounded-[5px]"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option className="block pb-2" value="">
                  Choose your state
                </option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
           
  
          <div className="w-full flex pb-3">
          <div className=" pb-2 w-[50%]">
                      <label className="block pb-2" htmlFor="state">City</label>
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
            <div className="w-[50%]">
              <label className="block pb-2">Address</label>
              <input
                type="text"
                required
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className={`${styles.input} !w-[95%]`}
              />
            </div>
           
          </div>
  
          <div></div>
        </form>
        <h5
          className="text-[18px] cursor-pointer inline-block"
          onClick={() => setUserInfo(!userInfo)}
        >
          Choose From saved address
        </h5>
        {userInfo && (
          <div>
            {user &&
              user.addresses.map((item, index) => (
                <div className="w-full flex mt-1" key={index}>
                  <input
                    type="radio"
                    className="mr-3"
                    name='address'
                    id={item.addressType}
                    value={item.addressType}
                    onClick={() =>
                      setAddress1(item.address1) ||
                      setZipCode(item.zipCode) ||
                      setCountry(item.country) ||
                      setCity(item.city) ||
                      setState(item.state)
                    }
                  />
                  <label htmlFor={item.addressType}>{item.addressType}</label>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

export default ShippingInfo;