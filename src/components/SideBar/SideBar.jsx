import React from 'react';
import Path from './Path';
import { HomeIcon } from '@heroicons/react/solid';
import { Button } from "@material-tailwind/react";
import {
  HashtagIcon,
  BellIcon,
  MailIcon,
  BookmarkIcon,
  ViewListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline';

const Sidebar = () => {
  return (
    <>
      <nav className="flex-col gap-5 px-2 py-4 min-h-screen justify-between items-center hidden tablet:flex">
        <div className="flex flex-col gap-5 items-center desktop:items-stretch w-full">
          <div className="space-y-3">
            <Path Icon={HomeIcon} name="Home" active={true} />
            <Path Icon={HashtagIcon} name="Explore" active={false} />
            <Path Icon={BellIcon} name="Notifications" active={false} />
            <Path Icon={MailIcon} name="Messages" active={false} />
            <Path Icon={BookmarkIcon} name="Bookmarks" active={false} />
            <Path Icon={ViewListIcon} name="Lists" active={false} />
            <Path Icon={UserIcon} name="Profile" active={false} />
            <Path Icon={DotsCircleHorizontalIcon} name="More" active={false} />
          </div>
          <Button variant="gradient" className=''>Logout</Button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
