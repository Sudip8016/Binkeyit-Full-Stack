import React from 'react'
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center'>
       <div className='bg-white w-full max-w-md p-4 rounded'>
           <div className='flex justify-between items-center gap-3'>
              <h1 className='font-semibold'>Delete Category</h1>
              <button onClick={close}>
                  <IoClose size={25}/>
              </button>
           </div>
           <p className='my-4'>Are you sure to delete this category ?</p>
           <div className='w-fit ml-auto gap-3 flex items-center'>
              <button onClick={cancel} className='px-4 py-1 border rounded border-red-500 text-red-600 hover:bg-red-500 hover:text-white'>Cancel</button>
              <button onClick={confirm} className='px-4 py-1 border rounded border-green-500 text-green-600 hover:bg-green-500 hover:text-white'>Confirm</button>
           </div>
       </div>
    </div>
  )
}

export default ConfirmBox
