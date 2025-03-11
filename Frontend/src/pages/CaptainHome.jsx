import React, { useContext, useEffect, useRef, useState } from 'react';
import CaptainDetails from '../components/CaptainDetails';
import RidePopup from '../components/RidePopup';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopup from '../components/ConfirmRidePopup';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import LiveTracking from './../components/LiveTracking';

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const [newRideData, setNewRideData] = useState(null);

    const ridePopupPanelRef = useRef();
    const confirmRidePopupPanelRef = useRef();

    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);

    useEffect(() => {
        console.log(captain._id);
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        });

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                });
            }
        };

        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();

        return () => clearInterval(locationInterval);
    }, []);

    socket.on('new-ride', (data) => {
        console.log(data);
        setNewRideData(data);
        setRidePopupPanel(true);
    });

    useGSAP(() => {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [ridePopupPanel]);

    useGSAP(() => {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [confirmRidePopupPanel]);

    return (
        <div>
            <img
                className='h-[35px] absolute left-4 top-10 z-20'
                src="https://assets.website-files.com/5ee732bebd9839b494ff27cd/5ef0d5158e94c8cf501f5ea3_Uber_logo_2018-p-800.png"
                alt=""
            />
            <LiveTracking  className='w-screen h-screen ' /> {/* Remove h-screen */}
            <div>
                <CaptainDetails />
            </div>

            <div
                ref={ridePopupPanelRef}
                className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-3'
            >
                <RidePopup
                    newRideData={newRideData}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                />
            </div>

            <div
                ref={confirmRidePopupPanelRef}
                className='fixed w-full h-[90%] z-10 bottom-0 translate-y-full bg-white px-3 py-3'
            >
                <ConfirmRidePopup
                    newRideData={newRideData}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                />
            </div>
        </div>
    );
};

export default CaptainHome;