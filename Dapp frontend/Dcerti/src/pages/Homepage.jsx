import React from 'react'

const Homepage = () => {
  return (
    <div>
        <div className='flex flex-row-reverse text-lg py-4 bg-slate-200'>
            <p className='text-black p-2 rounded-lg bg-gray-300 mr-12'><a href="">Issue Certificate</a></p>
            <p className='text-black p-2 rounded-lg bg-gray-300 mr-6'><a href="">Home</a></p>
        </div>
        <div className='flex justify-center mt-16 '>
          <img src="/src/images/online-course.png" alt="" className='w-[400px]'/>
        </div>
        <div className='flex justify-center pt-14 space-x-3'>
          <input type="text" placeholder='Enter Certificate Id to View' className='p-2 border-solid border-2 border-black rounded-md'/>
          <button type="button" className='bg-blue-500 p-2 rounded-lg w-36'>Search</button>
        </div>
    </div>
  )
}

export default Homepage