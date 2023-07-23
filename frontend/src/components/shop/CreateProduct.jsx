import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useSellersStore } from "../../store/useSellersStore";
import { categoriesData } from "../../static/data";
import { MdDelete } from "react-icons/md";
import { shallow } from "zustand/shallow";
import { useProductStore } from "../../store/useProductStore";
import { server } from "../../../server";
import axios from "axios";

const CreateProduct = () => {
    const seller = useSellersStore(state => state.seller)
  
  
  const navigate = useNavigate();
  const { loadProductsSuccess,  loadProductsFail, product } = useProductStore(
    (state) => ({loadProductsSuccess: state.loadProductsSuccess, loadProductsFail:state.loadProductsFail, product:state.product}),
    shallow
  )

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [loading, setLoading] = useState(false)



  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleImageDelete = (id) => {
    const imagesLeft = images.filter((image, i) => i !== id)
    setImages([...imagesLeft])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)


    try {
      

      const { data } = await axios.post(
        `${server}/product/create-product`,
        {
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          shopId: seller._id,
          images
        }
      );
      
      await loadProductsSuccess(data.product)
      setLoading(false)
      toast.success("Product created successfully!");
      navigate("/dashboard");
    } catch (error) {
      await loadProductsFail(error.response.data.message)
     toast.error(error.response.data.message)
    console.log(error)
     setLoading(false)
    }
   
   
    
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            required
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2" htmlFor="description">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            
            id="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2" htmlFor="category">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            required
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2" htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2" htmlFor="originalPrice">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            id="originalPrice"
            required
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2" htmlFor="discountPrice">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="discountPrice"
            id="discountPrice"
            required
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2" htmlFor="stock">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            required
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2" htmlFor="">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i, index) => (
                <div key={index} className="h-[120px] w-[120px] m-2 relative group cursor-pointer">
                  <img
                  src={i}
                  alt="images"
                  className="h-full w-full object-cover"
                />

                <div className="absolute w-full h-full left-0 top-0 bg-gray-300/90 flex justify-center items-center scale-0 transition-all duration-300 group-hover:scale-100">
                  <MdDelete size={30} color='crimson' onClick={() => handleImageDelete(index)}/>
                </div>
                </div>
                
              ))}
          </div>
          <br />
          <div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[45px] bg-[crimson] text-white rounded-[6px] text-[1.3rem] font-semibold focus:outline-none hover:opacity-80 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >{loading ? <span className='animate-pulse'>Creating...</span> : 'Create'}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
