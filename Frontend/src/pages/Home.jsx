import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from './../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from './../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const panelOpenRef = useRef();
  const panelCloseRef = useRef();
  const vehiclePanelRef = useRef();
  const ConfirmRidePanelRef = useRef();
  const vehicleFoundRef = useRef();
  const waitingForDriverRef = useRef();
  
  const onSubmitHandler = (e) => {
    e.preventDefault();

  }
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelOpenRef.current, {
        height: '70%',

      })
      gsap.to(panelCloseRef.current,{
        opacity : 1
      })
    } else {
      gsap.to(panelOpenRef.current, {
        height: '0%',
        padding: 0
      })
      gsap.to(panelCloseRef.current,{
        opacity : 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)',
        })
    } else {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ vehiclePanel ])


  useGSAP(function () {
    if (confirmRidePanel) {
        gsap.to(ConfirmRidePanelRef.current, {
            transform: 'translateY(0)',
        })
    } else {
        gsap.to(ConfirmRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ confirmRidePanel ])

useGSAP(function () {
  if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(0)',
      })
  } else {
      gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ vehicleFound ])

useGSAP(function () {
  if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(0)',
      })
  } else {
      gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ waitingForDriver ])

  return (
    <div>
      <img className='h-[35px] absolute left-4 top-4' src="https://assets.website-files.com/5ee732bebd9839b494ff27cd/5ef0d5158e94c8cf501f5ea3_Uber_logo_2018-p-800.png" alt="" />
      <img className=' w-full h-screen' src="https://www.google.com/maps/d/thumbnail?mid=1T1x34Dkar68cCACFNqoj31gPKvc" alt="" />
      <div className='h-screen absolute top-0 w-full flex flex-col justify-end overflow-hidden'>
        <div className='p-7 bg-white w-full rounded-3xl relative h-[30%] '>
          <h5 ref={panelCloseRef} onClick={(e)=>{setPanelOpen(false)}}
            className='absolute right-3 top-3 text-2xl' >
          <i className="ri-arrow-down-wide-line"></i> 
          </h5>
          <h3 className='text-3xl font-semibold '>Find a trip</h3>
          <form className='flex flex-col gap-3 '
            onSubmit={(e) => {
              onSubmitHandler(e);
            }}
          >
            <div className=' h-2 w-1 bg-gray-800 absolute left-[10%] top-[33%] rounded-full '></div>
            <div className=' h-16 w-1 bg-gray-800 absolute left-[10%] top-[39%] rounded-full '></div>
            <div className=' h-2 w-1 bg-gray-800 absolute left-[10%] top-[67%] rounded-full '></div>
            <input onClick={()=>{setPanelOpen(true)}} onChange={(e) => { setPickup(e.target.value) }} value={pickup} className='w-full h-10 bg-[#E6E6E6] text-black text-lg font-medium px-5 py-6 rounded-lg mt-3' type="text" placeholder='Add a pick-up location' />
            <input onClick={()=>{setPanelOpen(true)}} onChange={(e) => { setDestination(e.target.value) }} value={destination} className='w-full h-10 bg-[#E6E6E6] text-black text-lg font-medium px-5 py-6 rounded-lg' type="text" placeholder='Enter your destination' />
          </form>
          <button className='flex justify-center items-center gap-3 bg-[#E6E6E6] p-2 my-3 rounded-full'>
            <img className='w-5' src="https://cdn-icons-png.flaticon.com/512/320/320233.png" alt="" />
            <p>Leave Now</p>
            <img className='w-5' src="https://static.vecteezy.com/system/resources/previews/014/455/895/non_2x/down-arrow-icon-on-transparent-background-free-png.png" alt="" />
          </button>
        </div>
        <div className='bg-white h-[0] ' ref={panelOpenRef}>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      {/* vechile Panel */}
      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 bg-white w-full p-2 translate-y-full'>
        <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />
      </div>
      {/* Confirm Ride Panel */}
      <div ref={ConfirmRidePanelRef} className='fixed z-10 bottom-0 bg-white w-full p-2 translate-y-full'>
        <ConfirmRide setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel}  />
      </div>

      <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 bg-white w-full p-2 translate-y-full'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 bg-white w-full p-2 translate-y-full'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
      
    </div>
  )
}

export default Home

