import React from 'react'

const Category = ({children}) => {
  return (
    <button className=" text-blue-600 px-2 bg-[#F0F0F0] border-[1px] font-serif rounded-lg capitalize">
    {children}
  </button>
  )
}

export default Category