import React,{useEffect} from 'react';
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar/Navbar';
import Posts from '../components/Feed/Posts';
import Publisher from '../components/Publisher/Publisher';
import Layout from '../components/Layout/Layout';
import Trends from '../components/Trends/Trends';

const Home = () => {
  const Navigate = useNavigate()
  const {user} = useSelector((state)=>state.auth)
  useEffect(()=>{
   if(!user){
    Navigate("/")
   }
  },[Navigate, user])
  return (
    <>
      <Navbar />
      <Layout>
        <div className="max-w-[37.5rem] border-x-[1px]">
          <Publisher />
          <Posts />
        </div>
        <div className="laptop:block hidden px-8 space-y-2">
          <Trends />
        </div>
      </Layout>
    </>
  );
};

export default Home;
