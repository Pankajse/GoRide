import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className='py-3'>
        <h5 onClick={(e)=>{props.setWaitingForDriver(false)}}
            className='text-2xl text-center' >
          <i className="ri-arrow-down-wide-line"></i> 
          </h5>
          <div className='flex justify-between items-center'>
          <img className='h-24 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div>
          <h2 className='text-xl font-medium'>Pankaj</h2>
          <h3 className='text-2xl font-medium'>JK02BC6584</h3>
          <p className='text-base text-gray-600 font-normal'>Honda Civic</p>
          </div>
          </div>
          <hr />

          <div className='flex items-center  gap-4 p-2'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
            <h4 className='text-xl font-semibold'>562/11-A</h4>
            <p>kukatpally, Hyderabad</p>
            </div>
          </div>
          <hr />
          <div className='flex items-center  gap-4 p-2'>
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h4 className='text-xl font-semibold'>562/11-A</h4>
            <p>kukatpally, Hyderabad</p>
            </div>
          </div>
          <hr />
          <div className='flex items-center  gap-4 p-2'>
          <i className="text-lg ri-cash-line"></i>
          <div>
          <h3 className='text-xl font-semibold'>₹193.20</h3>
          <p>Cash</p>
          </div>
          </div>
        </div>
  )
}

export default WaitingForDriver