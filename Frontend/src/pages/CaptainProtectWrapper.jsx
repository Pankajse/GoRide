import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({children}) => {
    const { captain, setCaptain} = useContext(CaptainDataContext);
    const [loading , setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/captain-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then(
            (response) => {
                if(response.status == 200){
                    setCaptain(response.data.captain);
                    setLoading(false)
            }
        }
        ).catch(
            (error) => {
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        )
    },[navigate])
    if(loading){
        return <div>Loading...</div>
    }
  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectWrapper