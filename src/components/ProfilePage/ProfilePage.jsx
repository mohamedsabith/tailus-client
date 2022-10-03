import React,{ useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "@material-tailwind/react";

import Spinner from "../Spinner/Spinner";
import { getUserData } from "../../features/user/userSlice"
import "./style.css";

const ProfilePage = () => {
  const {user} = useSelector((state)=>state.auth)
  const {User, isLoading} = useSelector((state)=>state.user)

  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const getUserDetails = () =>{
    dispatch(getUserData(user._id))
  }
 
  useEffect(()=>{
    if(!user){
      Navigate("/")
    }
    getUserDetails()
  },[])

  return (
    <React.Fragment>
      {isLoading && <Spinner/>}
      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              <img
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                   border-2 border-blue-600 p-1"
                src={User?.userDetails.avatar}
                alt="avatar"
              />
            </div>

            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  {User?.userDetails.username}
                </h2>
                <Button className="bg-blue-500 px-2 py-1  text-white font-semibold text-sm rounded block text-center sm:inline-block sm:ml-4">Edit Profile</Button>
              </div>

              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">{User?.userDetails.posts.length}</span>
                  <span className="ml-1">posts</span>
                </li>

                <li>
                  <span className="font-semibold">{User?.userDetails.followers.length}</span> 
                  <span className="ml-1">followers</span>
                </li>
                <li>
                  <span className="font-semibold">{User?.userDetails.following.length}</span>
                   <span className="ml-1">following</span>
                </li>
              </ul>

              <div className="hidden md:block">
                <h1 className="font-semibold uppercase">{User?.userDetails.fullname}</h1>
                <span>{user?.bio}</span>
                <p className="text-blue-500">{User?.userDetails.email}</p>
              </div>
            </div>

            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">{User?.userDetails.fullname}</h1>
              <span>{user?.bio}</span>
              <p className="text-blue-500">{User?.userDetails.email}</p>
            </div>
          </header>

          <div className="px-px md:px-3">
            <ul
              className="flex md:hidden justify-around space-x-8 border-t 
              text-center p-2 text-gray-600 leading-snug text-sm"
            >
              <li>
                <span className="font-semibold text-gray-800 block">{User?.userDetails.posts.length}</span>
                posts
              </li>

              <li>
                <span className="font-semibold text-gray-800 block">{User?.userDetails.followers.length}</span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">{User?.userDetails.following.length}</span>
                following
              </li>
            </ul>

            <ul
              className="flex items-center justify-around md:justify-center space-x-12  
                  uppercase tracking-widest font-semibold text-xs text-gray-600
                  border-t"
            >
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="/">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline ml-1">post</span>
                </a>
              </li>
              <li>
                <a className="inline-block p-3" href="/">
                  <i className="far fa-bookmark text-xl md:text-xs"></i>
                  <span className="hidden md:inline ml-1">saved</span>
                </a>
              </li>
              <li>
                <a className="inline-block p-3" href="/">
                  <i className="fas fa-tag text-xl md:text-xs"></i>
                  <span className="hidden md:inline ml-1">tagged</span>
                </a>
              </li>
            </ul>

            <div className="flex flex-wrap -mx-px md:-mx-3">
              {
                User?.currentUserPosts.map((post,index)=>(
                  <div key={index} className="w-1/3 p-px md:px-3">
                  <a href="/">
                    <div className="post bg-gray-100 text-white relative pb-full md:mb-6">
                      <img
                        className="w-full h-full absolute left-0 top-0 object-cover"
                        src={post.image}
                        alt="post"
                      />
  
                      <i className="fas fa-square absolute right-0 top-0 m-1"></i>
  
                      <div
                        className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                                left-0 top-0 hidden"
                      >
                        <div
                          className="flex justify-center items-center 
                                    space-x-4 h-full"
                        >
                          <span className="p-2">
                            <i className="fas fa-heart"></i>
                            {post?.likes.length}
                          </span>
  
                          <span className="p-2">
                            <i className="fas fa-comment"></i>
                            {post?.likes.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                ))
              }
  
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ProfilePage;
