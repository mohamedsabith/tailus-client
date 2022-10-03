import React from 'react'
import { Button } from '@material-tailwind/react';

const Trend = ({users}) => {

  return (
    <>
     <div className="py-4 px-4 flex items-center justify-between hover:bg-gray-200 cursor-pointer hover-transition">
     <img src={users.avatar} className='w-12 h-12 rounded-full' alt="avatar" />
      <div className='ml-3'>
        <h5 className="font-semibold text-sm">{users.username}</h5>
        <h3 className="font-thin text-sm italic">{users.fullname}</h3>
      </div>
      <div className="p-2 hover:bg-sky-100 ml-auto rounded-full group cursor-pointer hover-transition">
        <Button
            type='submit' 
            className="bg-blue-500 hover:bg-blue-600 focus:bg-sky-600 active:bg-blue-800 hover-transition px-5 py-2 text-white font-bold w-full mobile:w-auto">
            Follow
        </Button>
      </div>
    </div>
    </>
  )
}

export default Trend