import { useState } from "react"
import { useNavigate } from "react-router-dom"
import React from "react"
import {FaSearch} from "react-icons/fa"


function Search (){
     const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword]=useState("")

  const handleSearch = ()=>{
    navigate('/?keyword='+searchKeyword)
  }
    return(
        <div className="hidden md:flex flex-1">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e)=>setSearchKeyword(e.target.value)}
            onBlur={handleSearch}
          />
          <button 
          className="px-6 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
          onClick={handleSearch}
          >
            <FaSearch/>
          </button>
        </div>
    )
}

export default Search