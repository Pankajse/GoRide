import React from 'react'

const WaitingForDriver = (props) => {

  if (!props.ride || !props.ride.captain) {
    return <div>Loading...</div>; // or some other fallback UI
  }

  return (
    <div className='py-3'>
        <h5 onClick={(e)=>{props.setWaitingForDriver(false)}}
            className='text-2xl text-center' >
          <i className="ri-arrow-down-wide-line"></i> 
          </h5>
          <div className='flex justify-between items-center'>
          <div className='flex flex-col justify-center items-center'>
          <img className='h-24 ' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <h3 className='font-semibold text-xl p-2'>OTP - {props.ride.otp}</h3>
          </div>
          <div>
          <h2 className='text-xl font-medium'>{props.ride?.captain.fullname.firstname} {props.ride?.captain.fullname.lastname}</h2>
          <h3 className='text-2xl font-medium'>{props.ride?.captain.vehicle.plate}</h3>
          <p className='text-base text-gray-600 font-normal'>{props.ride?.captain.vehicle.color}</p>
          </div>
          </div>
          <hr />

          <div className='flex items-center  gap-4 p-2'>
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
            <h4 className='text-xl font-semibold'>562/11-A</h4>
            <p>{props.ride?.pickup}</p>
            </div>
          </div>
          <hr />
          <div className='flex items-center  gap-4 p-2'>
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h4 className='text-xl font-semibold'>562/11-A</h4>
            <p>{props.ride?.destination}</p>
            </div>
          </div>
          <hr />
          <div className='flex items-center  gap-4 p-2'>
          <i className="text-lg ri-cash-line"></i>
          <div>
          <h3 className='text-xl font-semibold'>₹{props.ride?.fare}</h3>
          <p>Cash</p>
          </div>
          </div>
        </div>
  )
}

export default WaitingForDriver