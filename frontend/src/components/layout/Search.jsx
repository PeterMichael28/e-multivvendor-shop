/* eslint-disable react/prop-types */
import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';


const Search = ({handleSearchChange, searchTerm, setSearchTerm, searchData, setSearchData}) => {
   

   
  return (
<div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className={`absolute max-h-[70vh] bg-slate-100 shadow-sm-2 z-[9] p-4 overflow-y-auto ${searchTerm ? 'block' : 'hidden'}`}>
                {searchData && searchTerm &&
                  searchData.map((i, index) => {
                   
                    return (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt="product-image"
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

  )
}

export default Search