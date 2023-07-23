/* eslint-disable react/prop-types */
import React from "react";
import { Link, useNavigate } from "react-router-dom";



const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  // const submitHandle = (i) => {
  //   navigate(`/products?category=${i.title}`);
  //   setDropDown(false);
  //   // window.location.reload();
  // };
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-md max-h-[70vh] overflow-y-auto">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <Link to={`/products?category=${i.title}`}
            key={index}
            className='items-center flex'
            
          >
            <img
              src={i.image_Url}
             
              alt="image"
              className="w-[25px] h-[25px] object-contain ml-[10px] select-none"
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </Link>
        ))}
    </div>
  );
};

export default DropDown;