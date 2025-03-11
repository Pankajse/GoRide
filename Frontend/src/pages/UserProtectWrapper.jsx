import axios from 'axios';
import React, { useContext, useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate();
    const { user,setUser } = useContext(UserDataContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(
            (response) => {
                if (response.status === 200) {
                    setUser(response.data);
                    setLoading(false);
                }
            }
        ).catch(
            (error) => {
                localStorage.removeItem('token');
                navigate('/login');
            }
        )
    }, [navigate])

    if(loading){
        return <div>Loading...</div>
    }
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper