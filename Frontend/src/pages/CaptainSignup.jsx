import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const {setCaptain} = React.useContext(CaptainDataContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname : {
        firstname : firstName,
        lastname: lastName
      },
      email : email,
      password : password,
      vehicle : {
        color : vehicleColor,
        plate : vehiclePlate,
        capacity : vehicleCapacity,
        vehicleType : vehicleType
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,newCaptain)
    if(response.status == 201){
      const data = response.data
      setCaptain(data.captain);
      localStorage.setItem('token',data.token)
      navigate('/captain-home');
    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div className='p-8 h-screen flex flex-col justify-between'>
      <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" className='h-15  w-[150px] py-4' />
        <form onSubmit={(e) => { onSubmitHandler(e) }}>
          <h3 className='text-2xl font-semibold my-3'>What's your name</h3>
          <div className='flex gap-4'>
            <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required type="text" placeholder='firstname' className='bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg ' />
            <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} required type="text" placeholder='lastname' className=' bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg ' />
          </div>
          <h3 className='text-2xl font-semibold my-3'>What's your email</h3>
          <input value={email} onChange={(e) => { setEmail(e.target.value) }} required type="email" placeholder='john@ex.com' className='block bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg ' />
          <h3 className='text-2xl font-semibold my-3' >Enter Password</h3>
          <input value={password} onChange={(e) => { setPassword(e.target.value) }} required type="password" placeholder='password' className=' bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg' />
          <h3 className='text-2xl font-semibold my-3'>Vechicle Information</h3>
          <div className='flex flex-col gap-5'>
            <input required type="text" placeholder='Vehicle Color' value={vehicleColor}
             className=' bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg' 
             onChange={(e)=>{
              setVehicleColor(e.target.value)
             }} />
            <input required type="text" placeholder='Vehicle Plate' value={vehiclePlate}
             className=' bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg'
             onChange={(e)=>{
              setVehiclePlate(e.target.value)
             }} />
            <input required type="number" placeholder='Vehicle Capacity' value={vehicleCapacity} 
            className=' bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg'
            onChange={(e)=>{
              setVehicleCapacity(e.target.value)
             }} />
            <select required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="scotter">Scotter</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <button className='bg-black text-white w-full py-2 text-lg my-6 rounded-md'>Create Captain Account</button>
        </form>
        <div className='flex gap-2 text-lg'>
          <p className='m-auto'>Already have a account? <Link to="/captain-login" className='text-blue-600 mx-auto' >Login as a Captain</Link> </p>
        </div>
      </div>
      <div>
        <p className='text-sm font-light'>By proceeding, you consent to receiving calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
      </div>
    </div>
  )
}

export default CaptainSignup