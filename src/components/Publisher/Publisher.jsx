import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Button } from '@material-tailwind/react';
import { UilTimes } from '@iconscout/react-unicons';
import {toast} from 'react-toastify'

import { createNewPost } from '../../features/post/postSlice';

import Rune from '../Feed/Post/Rune';
import Spinner from '../Spinner/Spinner';
import Avatar from '../Feed/Post/Avatar';

import {
  EmojiIcon,
  GifIcon,
  LocationIcon,
  MediaIcon,
  PollIcon,
  ScheduleIcon,
} from '../Feed/Post/Icons';
import { reset } from '../../features/auth/authSlice';

const Publisher = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEmojis, setShowEmojis] = useState(false);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState();
  const imageRef = useRef();

  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.post);

  useEffect(()=>{
    if(isSuccess){
      toast.success('🦄 Post Created Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setImage(null) 
      setShowEmojis(false)
      setCaption('')
      dispatch(reset())
    }
    if(isError){
      toast.error(message)
    }
  },[Navigate, dispatch, isError, isSuccess, message])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setShowImage(img);
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.set('caption', caption);
    formData.set('image', showImage);
    formData.set('userId', user._id);

    dispatch(createNewPost(formData));
  };

  return (
    <>
      <section className="px-4 py-4 grid grid-cols-[auto,1fr] gap-4">
        {isLoading && <Spinner/>}
        <Avatar src="" alt="Profile" />
        <div className="space-y-10 w-full">
          <div className="flex-1">
            <input
              type="text"
              name="caption"
              value={caption}
              placeholder="What's happening?"
              className="w-full text-[1.25rem] rounded-lg focus:outline-none"
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          {showEmojis && (
            <div className="flex">
              <span onClick={() => setShowEmojis(!showEmojis)} className="cursor-pointer">
                <UilTimes />
              </span>
              <Picker data={data} onEmojiSelect={(e) => setCaption(caption + e.native)} />
            </div>
          )}
          {showEmojis === false && (
            <div className="flex items-center justify-between gap-4">
              <div
                onClick={() => imageRef.current.click()}
                className="hover:bg-sky-100 p-2 rounded-full transition-colors duration-500 ease-out cursor-pointer mobile:hidden"
              >
                <Rune Icon={<MediaIcon fill="fill-blue-500" />} color="hover:bg-blue-100" />
              </div>
              <div className="mobile:flex items-center hidden ">
                <Rune
                  Icon={<MediaIcon fill="fill-blue-500" />}
                  color="hover:bg-blue-100"
                  click={() => imageRef.current.click()}
                />
                <Rune
                  Icon={<GifIcon fill="fill-blue-500" />}
                  color="hover:bg-blue-100"
                  click={() => imageRef.current.click()}
                />
                <Rune Icon={<PollIcon fill="fill-blue-500" />} color="hover:bg-blue-100" />
                <div
                  onClick={() => setShowEmojis(true)}
                  className={
                    'hover:bg-blue-100 w-9 h-9 p-2 rounded-full hover-transition cursor-pointer'
                  }
                >
                  {' '}
                  <EmojiIcon fill="fill-blue-500" />
                </div>
                <Rune Icon={<ScheduleIcon fill="fill-blue-500" />} color="hover:bg-blue-100" />
                <Rune Icon={<LocationIcon fill="fill-blue-500" />} color="hover:bg-blue-100" />
                <div style={{ display: 'none' }}>
                  <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                </div>
              </div>
              <Button
                disabled={Boolean(image === null)}
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 focus:bg-sky-600 active:bg-blue-800 hover-transition px-5 py-2 text-white font-bold w-full mobile:w-auto"
              >
                Share
              </Button>
            </div>
          )}
        </div>
      </section>
      {image && (
        <div>
          <UilTimes onClick={() => setImage(null)} />
          <img src={image.image} alt="preview" />
        </div>
      )}
    </>
  );
};

export default Publisher;
