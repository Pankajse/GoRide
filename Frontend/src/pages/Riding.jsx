import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {}
  const {socket} = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on('ride-completed', ride =>{
    navigate("/home");
  });

  return (
    <div className=' h-screen max-w-md mx-auto bg-white shadow-lg flex flex-col'>
        <Link to='/Home' className='fixed right-4 top-4 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md'>
            <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
        
        {/* <img className='h-1/2 w-full' src="https://www.google.com/maps/d/thumbnail?mid=1T1x34Dkar68cCACFNqoj31gPKvc" alt="Map" /> */}
        <LiveTracking  />
        <div className='flex justify-between items-center p-4  '>
            <img className='h-24' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="Uber Logo" />
            <div>
                <h2 className='text-xl font-medium'>{ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname}</h2>
                <h3 className='text-2xl font-medium'>{ride?.captain.vehicle.plate}</h3>
                <p className='text-base text-gray-600 font-normal'>{ride?.captain.vehicle.color}</p>
            </div>
        </div>

        <hr />

        <div className='flex items-center gap-4 p-3'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
                <h4 className='text-xl font-semibold'>678gft</h4>
                <p>{ride?.destination}</p>
            </div>
        </div>

        <hr />

        <div className='flex items-center gap-4 p-3'>
            <i className="text-lg ri-cash-line"></i>
            <div>
                <h3 className='text-xl font-semibold'>₹{ride?.fare}</h3>
                <p>Cash</p>
            </div>
        </div>

        <button className='bg-green-600 px-6 py-2 rounded-xl m-3'>
            Make a Payment
        </button>
    </div>
  )
}

export default Riding
