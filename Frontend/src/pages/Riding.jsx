import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className=' h-screen max-w-md mx-auto bg-white shadow-lg'>
        <Link to='/Home' className='fixed right-4 top-4 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md'>
            <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
        
        <img className='h-1/2 w-full' src="https://www.google.com/maps/d/thumbnail?mid=1T1x34Dkar68cCACFNqoj31gPKvc" alt="Map" />
        
        <div className='flex justify-between items-center p-4'>
            <img className='h-24' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="Uber Logo" />
            <div>
                <h2 className='text-xl font-medium'>Pankaj</h2>
                <h3 className='text-2xl font-medium'>JK02BC6584</h3>
                <p className='text-base text-gray-600 font-normal'>Honda Civic</p>
            </div>
        </div>

        <hr />

        <div className='flex items-center gap-4 p-3'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
                <h4 className='text-xl font-semibold'>562/11-A</h4>
                <p>kukatpally, Hyderabad</p>
            </div>
        </div>

        <hr />

        <div className='flex items-center gap-4 p-3'>
            <i className="text-lg ri-cash-line"></i>
            <div>
                <h3 className='text-xl font-semibold'>₹193.20</h3>
                <p>Cash</p>
            </div>
        </div>

        <button className='w-11/12 py-2 mx-auto block rounded-xl bg-green-500 text-2xl font-semibold fixed bottom-4 left-1/2 transform -translate-x-1/2'>
            Make a Payment
        </button>
    </div>
  )
}

export default Riding
