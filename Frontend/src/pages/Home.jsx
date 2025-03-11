import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from './../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from './../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pickupDescription, setPickupDescription] = useState({})
  const [destinationDescription, setDestinationDescription] = useState({})
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupData, setPickupData] = useState(true);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [fares, setFares] = useState({});
  const [vehicleSelected, setVehicleSelected] = useState('')
  const [ride, setRide] = useState()

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  const panelOpenRef = useRef();
  const panelCloseRef = useRef();
  const vehiclePanelRef = useRef();
  const ConfirmRidePanelRef = useRef();
  const vehicleFoundRef = useRef();
  const waitingForDriverRef = useRef();
  const inputPickupRef = useRef();
  const inputDestinationRef = useRef();

  const navigate = useNavigate();


  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

  //Socket logic
  useEffect(() => {
    socket.emit('join', { userId: user.user._id, userType: 'user' });
  }, [user]);


  useEffect(() => {
    const handleRideAccepted = (ride) => {
      setRide(ride);
      setVehiclePanel(false);
      setWaitingForDriver(true);
    };
  
    socket.on('ride-accepted', handleRideAccepted);
  
    return () => {
      socket.off('ride-accepted', handleRideAccepted);
    };
  }, [socket]);

  socket.on('ride-started', ride => {
    navigate("/Riding", { state: { ride } });
  })


  //pickup location suggestion
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: {
            input: pickup
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Ensure token is stored
          },
        });
        const { suggestions } = response.data;
        setLocationSuggestions(suggestions);
        setPickupData(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (pickup.length >= 3) {
      const timeoutId = setTimeout(fetchData, 600);
      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [pickup]);

  //destination location suggestion

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/maps/get-suggestions?input=${destination}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        const { suggestions } = response.data;
        setLocationSuggestions(suggestions);
        setPickupData(false);
      } catch (error) {
        console.log("Error fetching suggestions:", error);
      }
    }
    if (destination.length >= 3) {
      const timeoutId = setTimeout(fetchData, 600);
      return () => clearTimeout(timeoutId);
    }
  }, [destination])

  //create Ride in backend
  useEffect(() => {
    const createRide = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create-ride`, {
          pickup,
          destination,
          vehicleType: vehicleSelected
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const { ride } = response.data;
        setRide(ride)
      } catch (error) {
        console.log("Error while creating Ride " + error)
      }
    }
    if (vehicleFound) {
      createRide();
    }
  }, [vehicleFound])


  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelOpenRef.current, {
        height: '70%',

      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelOpenRef.current, {
        height: '0%',
        padding: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
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
  }, [vehiclePanel])


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
  }, [confirmRidePanel])

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
  }, [vehicleFound])

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
  }, [waitingForDriver])

  return (
    <div>
      <img className='h-[35px] absolute left-4 top-4' src="https://assets.website-files.com/5ee732bebd9839b494ff27cd/5ef0d5158e94c8cf501f5ea3_Uber_logo_2018-p-800.png" alt="" />
      {/* <img className=' w-full h-screen' src="https://www.google.com/maps/d/thumbnail?mid=1T1x34Dkar68cCACFNqoj31gPKvc" alt="" /> */}
      <LiveTracking />
      
      <div className='h-screen absolute top-0 w-full flex flex-col justify-end  overflow-hidden'>
        <div className='p-7 bg-white w-full rounded-3xl relative h-[30%] '>
          <h5 ref={panelCloseRef} onClick={(e) => { setPanelOpen(false) }}
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
            <input ref={inputPickupRef} onClick={() => { setPanelOpen(true) }} onChange={(e) => { setPickup(e.target.value) }} value={pickup} className='w-full h-10 bg-[#E6E6E6] text-black text-lg font-medium px-5 py-6 rounded-lg mt-3' type="text" placeholder='Add a pick-up location' />
            <input ref={inputDestinationRef} onClick={() => { setPanelOpen(true) }} onChange={(e) => { setDestination(e.target.value) }} value={destination} className='w-full h-10 bg-[#E6E6E6] text-black text-lg font-medium px-5 py-6 rounded-lg' type="text" placeholder='Enter your destination' />
          </form>
          <button className='flex justify-center items-center gap-3 bg-green-600 p-3 my-3 rounded-2xl w-full'
            onClick={
              async () => {
                if (!pickup) {
                  setPanelOpen(true);
                  inputPickupRef.current.focus();
                }
                else if (!destination) {
                  setPanelOpen(true);
                  inputDestinationRef.current.focus();
                }
                if (pickupDescription.main_text && destinationDescription.main_text) {
                  try {
                    const response = await axios.post(
                      'http://localhost:3000/rides/get-fare',
                      {
                        pickup: pickup,
                        destination: destination,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add the token from localStorage
                        },
                      }
                    );
                    const { fare } = response.data;
                    setFares(fare);
                    setPanelOpen(false)
                    setVehiclePanel(true)
                  } catch (error) {
                    console.error('Error fetching fare:', error);
                    throw error;
                  }
                }
              }
            }> Find a Vechile
          </button>
        </div>
        <div className='bg-white h-[0] ' ref={panelOpenRef}>
          <LocationSearchPanel pickup={pickup} destination={destination} setPickupDescription={setPickupDescription} setDestinationDescription={setDestinationDescription} setPanelOpen={setPanelOpen} setPickup={setPickup} setDestination={setDestination} pickupData={pickupData} setPickupData={setPickupData} inputPickupRef={inputPickupRef} inputDestinationRef={inputDestinationRef} locationSuggestions={locationSuggestions} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>
      {/* vechile Panel */}
      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 bg-white w-full p-2 translate-y-full'>
        <VehiclePanel setVehicleSelected={setVehicleSelected} setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} fares={fares} />
      </div>
      {/* Confirm Ride Panel */}
      <div ref={ConfirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 pt-12'>
        <ConfirmRide fares={fares[vehicleSelected]} pickupDescription={pickupDescription} destinationDescription={destinationDescription} setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} />
      </div>

      <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 bg-white w-full p-2 translate-y-full'>
        <LookingForDriver fares={fares[vehicleSelected]} pickupDescription={pickupDescription} destinationDescription={destinationDescription} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 bg-white w-full p-2 translate-y-full'>
        <WaitingForDriver ride={ride} setWaitingForDriver={setWaitingForDriver} />
      </div>

    </div>
  )
}

export default Home

