import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/captain-home');
        } else {
            axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/captain-login');
                }
            })
            .catch(error => {
                localStorage.removeItem('token');
                navigate('/captain-login');
            });
        }
    }, []);

    return <div>CaptainLogout</div>;
};

export default CaptainLogout;
