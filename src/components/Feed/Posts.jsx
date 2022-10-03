import React, { useEffect } from 'react';
import Post from './Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { timelinePosts } from '../../features/post/postSlice';
import Spinner from '../Spinner/Spinner';

const Posts = () => {

  const { post, isSuccess, isLoading, } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getTimelinePosts = () =>{
     setTimeout(()=>{
      dispatch(timelinePosts(user._id));
     },300)
  }

  useEffect(() => {
    getTimelinePosts()
  }, [isSuccess]);
  
  return (
    <>
        <section>
          {isLoading && <Spinner/> }
          {post.map((value, index) => (
            <Post post={value} key={index} />
          ))}
        </section>
    </>
  );
};

export default Posts;
