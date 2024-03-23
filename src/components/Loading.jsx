import React from 'react'
import loader from '../../public/giphy.gif'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='w-[60%]' src={loader} alt="" />
    </div>
  )
}

export default Loading