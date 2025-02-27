import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [msg, setMsg] = useState('')

  const navigate = useNavigate();

  const {user, setUser} = useContext(UserDataContext)
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    const newUser = {
      fullname : {
        firstname : firstName,
        lastname : lastName
      },
      email : email,
      password : password
    }
    try {
      const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
      if(response.status == 201){
        const data = response.data
        setUser(data.user);
        localStorage.setItem('token',data.token)
        navigate('/Home');
    }
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.message || "Something went wrong")
        return
      }else{
        setMsg("Network error. Please try again.");
        return
      }
    }
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-8 h-screen flex flex-col justify-between'>
      <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" className='h-15  w-[150px] py-4' />
    <form onSubmit={(e)=>{onSubmitHandler(e)}}>
      <h3 className='text-2xl font-semibold my-3'>What's your name</h3>
      <div className='flex gap-4'>
      <input value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required type="text" placeholder='firstname' className='bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg '/>
      <input value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required type="text" placeholder='lastname' className=' bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg '/>
      </div>
      <h3 className='text-2xl font-semibold my-3'>What's your email</h3>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required type="email" placeholder='john@ex.com' className='block bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg '/>
      <h3 className='text-2xl font-semibold my-3' >Enter Password</h3>
      <input value={password} onChange={(e)=>{setPassword(e.target.value)}} required type="password" placeholder='password' className=' bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg' />
      <div className='h-[12px] text-red-500'>{msg}</div>
      <button className='bg-black text-white w-full py-2 text-lg my-6 rounded-md'>Create Account</button>
    </form>
    <div className='flex gap-2 text-lg'>
    <p className='m-auto'>Already have a account? <Link to="/login" className='text-blue-600 mx-auto' >Login as a User</Link> </p>
    </div>
    </div>
    <div>
    <p className='text-sm font-light'>By proceeding, you consent to receiving calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
    </div>
    </div>
  )
}

export default UserSignup