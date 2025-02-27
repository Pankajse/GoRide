import { useGSAP } from '@gsap/react';
import React, { useState, useRef } from 'react'
import FinishRide from '../components/FinishRide';
import gsap from 'gsap';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef();

    useGSAP(() => {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div>
            <img className='h-[35px] absolute left-4 top-4' src="https://assets.website-files.com/5ee732bebd9839b494ff27cd/5ef0d5158e94c8cf501f5ea3_Uber_logo_2018-p-800.png" alt="" />
            <img className=' w-full h-screen' src="https://www.google.com/maps/d/thumbnail?mid=1T1x34Dkar68cCACFNqoj31gPKvc" alt="" />
            <div className='w-full bg-yellow-400 absolute bottom-0 py-10 px-4 justify-center flex gap-6 items-center'>
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {

                }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
                <p className='text-2xl font-bold mx-2'>4km away</p>
                <button onClick={()=>{setFinishRidePanel(true)}} className='py-1 px-2 rounded-xl text-xl font-semibold bg-green-500'>Complete Ride</button>
            </div>

            <div ref={finishRidePanelRef} className='fixed w-full  z-10 bottom-0 translate-y-full bg-white px-3 py-3'>
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}

export default CaptainRiding