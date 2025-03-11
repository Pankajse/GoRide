import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const { setUser} = useContext(UserDataContext)

  const navigate = useNavigate();

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    const userdata = {
      email : email,
      password : password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userdata);
      if(response.status == 201){
        const { user } = response.data;
        console.log('User data from server:', user);
      setUser(user);
      localStorage.setItem('token', response.data.token);
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
    
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-8 h-screen flex flex-col justify-between'>
      <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" className='h-15  w-[150px] py-4' />
    <form onSubmit={(e)=>{onSubmitHandler(e)}}>
      <h3 className='text-2xl font-semibold my-3'>What's your email</h3>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required type="email" placeholder='john@ex.com' className='block bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg '/>
      <h3 className='text-2xl font-semibold my-3' >Enter Password</h3>
      <input value={password} onChange={(e)=>{setPassword(e.target.value)}} required type="password" placeholder='password' className=' bg-[#eeeeee] outline-2 outline-[#b39667] w-full rounded-md px-4 py-1 font-normal text-lg' />
      <div className='h-[12px] text-red-500'>{msg}</div>
      <button className='bg-black text-white w-full py-2 text-lg my-6 rounded-md'>Login</button>
    </form>
    <div className='flex gap-2 text-lg'>
    <p className='m-auto'>New user? <Link to="/signup" className='text-blue-600 mx-auto' >Create new account</Link> </p>
    </div>
    </div>
    <div>
    <Link to='/captain-login' className=' bg-green-500 flex justify-center items-center text-white w-full py-2 text-lg my-6 rounded-md ' >Sign in as a Captain</Link>
    </div>
    </div>
  )
}

export default UserLogin