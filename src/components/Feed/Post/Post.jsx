import React from 'react';
import moment from 'moment';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { LikeIcon, ReplyIcon, ShareIcon } from './Icons';
import Rune from './Rune';

const Post = ({post}) => {
  return (
    <>
      <div className="border-t-[1px] px-4 pt-3 pb-2 hover:bg-neutral-100 transition-colors duration-500 ease-out">
        <div className="grid grid-cols-[auto,1fr] gap-3">
          <div className="w-12 h-12 overflow-hidden rounded-full">
            <img
              src={post?.userId.avatar}
              alt="logo"
              className="w-full"
            />
          </div>
          <div>
            <div className="w-full">
              <div className="flex gap-1 items-center">
                <h1 className="font-bold">{post?.userId?.username}</h1>
                <span className="text-neutral-500"></span>
                <h2 className="text-sm text-blue-500">{moment(post?.createdAt).format('L')}</h2>
                <div className="p-2 hover:bg-sky-100 ml-auto rounded-full group cursor-pointer transition-colors duration-500 ease-out">
                  <DotsHorizontalIcon className="w-4 h-4 text-neutral-400 group-hover:text-sky-500" />
                </div>
              </div>
              <img
                src={post?.image}
                alt="post"
              />
            </div>
            <p className="mt-2"> <span className='font-medium'>{post?.userId.fullname}</span> <span className='font-thin'>{post?.caption}</span></p>
            <div className="flex justify-between mt-3 max-w-md cursor-pointer">
              <div className="flex items-center group tablet:pr-4">
                <Rune
                  Icon={<ReplyIcon fill="group-hover:fill-white" />}
                  color="group-hover:bg-blue-500"
                />
                <p className="text-xs group-hover:text-blue-500">{post?.comments.length}</p>
              </div>
              <div className="flex gap-1 items-center group tabletpx-4">
                <Rune
                  Icon={<LikeIcon fill="group-hover:fill-white" />}
                  color="group-hover:bg-blue-500"
                />
                <p className="text-xs group-hover:text-blue-500">{post?.likes.length}</p>
              </div>
              <div className="flex gap-1 items-center group tabletpl-4">
                <Rune
                  Icon={<ShareIcon fill="group-hover:fill-blue-500" />}
                  color="group-hover:bg-sky-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
