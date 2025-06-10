import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`https://reqres.in/api/users/2`);
                if (response.data) {
                    setUser(response.data.data); // Set user data directly
                } else {
                    setError('User not found');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Error fetching user details');
            }
        };
        getUser();
    }, []);

    const handleLogout = () => {
        setUser(null);
        navigate('/');
        localStorage.removeItem('token');
    };

    return (
        <div>
            <nav className='flex justify-around bg-indigo-600 items-center p-2'>
                <div>
                    {user ? (
                        <div className='flex gap-4'> 
                            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={user?.avatar} alt="" />
                            <h1 className='text-white text-3xl'>Welcome User!</h1>
                        </div>
                    ) : error ? (
                        <h1 className='text-red-500 text-3xl'>{error}</h1>
                    ) : (
                        <h1 className='text-white text-3xl'>Loading...</h1>
                    )}
                </div>
                <div>
                    <h1 className='text-white text-3xl'>Dashboard</h1>
                </div>
                <div className='flex gap-5 '>
                    <button onClick={handleLogout} className='text-white text-3xl'>
                        <CiLogout />
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Header;
