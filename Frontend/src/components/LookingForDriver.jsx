import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div className='py-1'>
            <h5 onClick={(e)=>{props.setVehicleFound(false)}}
            className='text-2xl text-center' >
          <i className="ri-arrow-down-wide-line"></i> 
          </h5>
          <h3 className='text-2xl font-semibold p-1' >Looking for Driver</h3>
          <img className='h-32 p-1 m-auto ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
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

export default LookingForDriver