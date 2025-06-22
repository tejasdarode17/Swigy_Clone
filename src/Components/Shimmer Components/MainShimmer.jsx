import React from 'react'

const MainShimmer = () => {
  return (
    <div className='w-full'>
      <div className='w-full relative flex justify-center items-center flex-col gap-5 h-80 bg-slate-900'>
        <img className='w-10' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
        <span className="loaderRound absolute top-25"></span>
        <h1 className='text-[#fff] text-4xl'>Looking Great food near you</h1>
      </div>
      <div className='w-[75%] mx-auto flex flex-wrap justify-center gap-2 my-10'>

        {
          Array(10).fill(0).map((data, i) => (
            <div key={i} className='w-[277px] h-[182px] rounded-2xl hover:scale-90 duration-100 myAnimation bg-gray-300 '></div>
          ))
        }


      </div>
    </div>
  )
}

export default MainShimmer
