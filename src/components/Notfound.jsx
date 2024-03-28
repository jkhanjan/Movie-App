import React from 'react'
import notfound from '../../public/404.gif'
import { Link, useNavigate } from 'react-router-dom'

const Notfound = () => {
  const navigate = useNavigate()
  return (
    
    <div className='absolute top-0 left-0 bg-black opacity-[1] w-screen h-screen flex justify-center items-center bg-black'>
      <Link
          onClick={() => navigate(-1)}
          className="absolute hover:text-[#6556cd] text-3xl text-white right-[5%] top-[5%] mr-4 ri-close-fill"
        ></Link>
        <img className=' w-[50%]' src={notfound} alt="" />
    </div>
  )
}

export default Notfound