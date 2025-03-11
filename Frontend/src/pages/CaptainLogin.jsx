import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {captain, setCaptain} = useContext(CaptainDataContext)

  const navigate = useNavigate();

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    const captainData = {
      email : email,
      password : password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captainData)
    if(response.status == 201){
      setCaptain(response.data.captain)
      localStorage.setItem('token',response.data.token)
      navigate('/captain-home')
    }
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-8 h-screen flex flex-col justify-between'>
      <div>
      <img src="https://static.vecteezy.com/system/resources/previews/027/127/451/original/uber-logo-uber-icon-transparent-free-png.png" alt="Uber" className='h-20  w-[150px]' />
    <form onSubmit={(e)=>{onSubmitHandler(e)}}>
      <h3 className='text-2xl font-semibold my-3'>What's your email</h3>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required type="email" placeholder='john@ex.com' className='block bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg '/>
      <h3 className='text-2xl font-semibold my-3' >Enter Password</h3>
      <input value={password} onChange={(e)=>{setPassword(e.target.value)}} required type="password" placeholder='password' className=' bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg' />
      <button className='bg-black text-white w-full py-2 text-lg my-6 rounded-md'>Login</button>
    </form>
    <div className='flex gap-2 text-lg'>
    <p className='m-auto'>Join a fleet? <Link to="/captain-signup" className='text-blue-600 mx-auto' >Register as a Captain</Link> </p>
    </div>
    </div>
    <div>
    <Link to='/login' className=' bg-[#eb7f00] flex justify-center items-center text-white w-full py-2 text-lg my-6 rounded-md ' >Sign in as a User</Link>
    </div>
    </div>
  )
}

export default CaptainLogin