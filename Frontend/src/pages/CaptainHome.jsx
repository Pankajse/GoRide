import React, { useRef, useState } from 'react'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../components/ConfirmRidePopup'

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const ridePopupPanelRef = useRef()
  const confirmRidePopupPanelRef = useRef()

  useGSAP(()=>{
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current,{
        transform :'translateY(0)'
      })
    }else{
      gsap.to(ridePopupPanelRef.current,{
        transform : 'translateY(100%)'
      })
    }
  },[ridePopupPanel])

  useGSAP(()=>{
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupPanelRef.current,{
        transform : 'translateY(0)'
      })
    }else{
      gsap.to(confirmRidePopupPanelRef.current,{
        transform : 'translateY(100%)'
      })
    }
  },[confirmRidePopupPanel])

  return (
    <div>
      <img className='h-[35px] absolute left-4 top-4' src="https://assets.website-files.com/5ee732bebd9839b494ff27cd/5ef0d5158e94c8cf501f5ea3_Uber_logo_2018-p-800.png" alt="" />
      <img className=' w-full h-screen' src="https://www.google.com/maps/d/thumbnail?mid=1T1x34Dkar68cCACFNqoj31gPKvc" alt="" />

      <div>
        <CaptainDetails />
      </div>

      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-3'>
        <RidePopup setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>

      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-[90%] z-10 bottom-0 translate-y-full bg-white px-3 py-3'>
        <ConfirmRidePopup setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome