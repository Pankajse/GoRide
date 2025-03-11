import React from 'react'
import ConfirmRide from './ConfirmRide';

const VehiclePanel = (props) => {
  return (
    <div>
        <div className='flex justify-between items-center'>
          <h3 className='text-2xl font-semibold p-2'>Choose your Ride</h3>
          <i className="ri-arrow-down-wide-line text-xl font-medium" onClick={()=>{props.setVehiclePanel(false)}} ></i>
          </div>
        <div onClick={()=>{
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
          props.setVehicleSelected("car")
        }} className='flex items-start justify-between gap-2 p-2 my-2 border-2 active:border-black rounded-xl '>
          <img className='w-32' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className=''>
            <h3 className='text-xl font-semibold'>UberGo <i className="ri-user-fill"></i>4</h3>
            <h5 className='text-lg'>2 mins away</h5>
            <p className='text-xs text-gray-500'>Affordable, compact rides</p>
          </div>
          <h3 className='text-2xl font-semibold h-10'>₹{props.fares.car}</h3>
        </div>

        <div onClick={()=>{
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
          props.setVehicleSelected("moto")
        }} className='flex items-start justify-between gap-2 p-2 border-2 my-2 active:border-black rounded-xl '>
          <img className='w-32' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className=''>
            <h3 className='text-xl font-semibold'>Moto <i className="ri-user-fill"></i>1</h3>
            <h5 className='text-lg'>3 mins away</h5>
            <p className='text-xs text-gray-500'>Affordable motorcycle rides</p>
          </div>
          <h3 className='text-2xl font-semibold h-10'>₹{props.fares.moto}</h3>
        </div>

        <div onClick={()=>{
          props.setConfirmRidePanel(true);
          props.setVehiclePanel(false);
          props.setVehicleSelected("auto")
        }} className='flex items-start justify-between  gap-2 p-2 border-2 my-2 active:border-black rounded-xl '>
          <img className='w-32' src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
          <div className=''>
            <h3 className='text-xl font-semibold'>UberAuto <i className="ri-user-fill"></i>3</h3>
            <h5 className='text-lg'>3 mins away</h5>
            <p className='text-xs text-gray-500'>Affordable auto rides</p>
          </div>
          <h3 className='text-2xl font-semibold h-10'>₹{props.fares.auto}</h3>
        </div>
    </div>
  )
}

export default VehiclePanel