import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      <h3 className='text-2xl font-semibold p-1' >Confirm your Ride</h3>
      <img className='h-32 p-0 m-auto ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
      
      <div className='flex items-center  gap-4 p-2'>
        <i className="text-lg ri-map-pin-user-fill"></i>
        <div>
        <h4 className='text-xl font-semibold'>562/11-A</h4>
        <p className='text-sm '>kukatpally, Hyderabad</p>
        </div>
      </div>
      
      <div className='flex items-center  gap-4 p-2'>
      <i className="text-lg ri-map-pin-2-fill"></i>
      <div>
        <h4 className='text-xl font-semibold'>562/11-A</h4>
        <p className='text-sm '>kukatpally, Hyderabad</p>
        </div>
      </div>

      <div className='flex items-center  gap-4 p-2'>
      <i className="text-lg ri-cash-line"></i>
      <div>
      <h3 className='text-xl font-semibold'>₹193.20</h3>
      <p>Cash</p>
      </div>
      </div>
      <button onClick={()=>{
        props.setConfirmRidePanel(false);
        props.setVehicleFound(true);
      }} className='w-full py-2 px-3 rounded-xl bg-green-600 text-2xl font-semibold'>Confirm</button>
    </div>
  )
}

export default ConfirmRide