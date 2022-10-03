import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';

import Trend from './Trend';
import { suggestionUsers } from '../../api/index';
import Spinner from '../Spinner/Spinner';

const Trends = () => {

  const Navigate = useNavigate()
  const {user} = useSelector((state)=>state.auth)
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUserDataAsync = async () => {
   
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await suggestionUsers(token,user._id);
      if (!data) {
        throw new Error('No user data found');
      }
      setSuggestedUsers(data);
    } catch (error) {
      toast.error('🦄 Something went wrong!', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  
  };

  useEffect(() => {
    if(!user){
      Navigate('/')
    }
    getUserDataAsync();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <section className="bg-gray-100 py-4 rounded-2xl sticky -top-80 mt-3">
        <h1 className="text-[1.25rem] font-black px-4 pb-4">Suggested For You</h1>
        <div>
          {suggestedUsers.map((users,index) => (
            <Trend key={index} users={users} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Trends;
