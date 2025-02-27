import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen flex flex-col justify-between w-full bg-cover bg-center bg-[url(https://th.bing.com/th/id/R.6f15d31e56bdcb95e479d1135c396a5d?rik=bhdLDnTbZCSWnw&riu=http%3a%2f%2fimages.thecarconnection.com%2flrg%2ftraffic-light_100316101_l.jpg&ehk=UlJZY8TgIeDe5Ov5AbeFkoqaQ8lDhpkpW8CRRt8kbvs%3d&risl=&pid=ImgRaw&r=0)]'>
      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" className='h-15 w-[150px] p-4 my-6 mx-3' />
      <div className='bg-white p-5'>
        <h1 className='text-2xl m-5 font-semibold'>Get Started with Uber</h1>
        <Link to='/login' className='text-xl block p-2 rounded-lg bg-black text-white text-center '  >Continue </Link>
      </div>
    </div>
    </div>
  )
}

export default Start