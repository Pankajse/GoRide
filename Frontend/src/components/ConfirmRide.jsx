import React from 'react'

const ConfirmRide = (props) => {

  return (
    <div className='pb-5'>
      <h3 className='text-2xl font-semibold pt-1' >Confirm your Ride</h3>
      <img className='h-28 p-0 m-auto ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />

      <div className='flex items-center  gap-4 p-1'>
        <i className="text-lg ri-map-pin-user-fill"></i>
        <h4 className='text-base font-normal'>{props.pickupDescription.main_text}</h4>
      </div>

      <div className='flex items-center  gap-4 p-2'>
        <i className="text-lg ri-map-pin-2-fill"></i>
        <h4 className='text-base font-normal'>{props.destinationDescription.main_text}</h4>
      </div>

      <div className='flex items-center  gap-4 p-2'>
        <i className="text-lg ri-cash-line"></i>
        <div>
          <h3 className='text-xl font-semibold'>₹{props.fares}</h3>
          <p>Cash</p>
        </div>
      </div>
      <button onClick={() => {
        props.setConfirmRidePanel(false);
        props.setVehicleFound(true);
      }} className='w-full py-2 px-3 rounded-xl bg-green-600 text-2xl font-semibold'>Confirm</button>
    </div>
  )
}

export default ConfirmRide