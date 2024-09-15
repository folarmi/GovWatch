"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const UserProfileHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='flex mx-16 gap-96'>
      <div>
        <Image src="logo.svg" alt='Govwatch logo' height={80} width={80} />
      </div>
      <div className='flex ml-60'>
        <div className='flex gap-20 items-center border-r-2 pr-7'>
            <h1 className='font-bold text-md'>Dashboard</h1>
            <Image src="notificationBell.svg" alt='Notification icon' height={25} width={24} />
        </div>
        <div className='relative flex gap-9 items-center border-l-2 pl-7'>
            <Image src="profilePic.svg" alt='Profile pic' height={70} width={70} />
            <div>
                <h1 className='font-bold'>Jane Doe</h1>
                <p>User</p>
            </div>
            <div className='cursor-pointer' onClick={toggleDropdown}>
                <Image src="dropDownIcon.svg" alt='Drop down icon' height={30} width={30} />
            </div>

            {isDropdownOpen && (
              <div className='absolute top-full right-0 mt-2 w-72 text-gray-200 bg-green-800 border-none shadow-lg rounded-lg'>
                <ul className='py-9 flex flex-col justify-center items-center gap-3'>
                  <div className='flex flex-col items-center mb-6'>
                    <h1 className='font-bold text-3xl'>Jane Doe</h1>
                    <p className='text-xl'>Contributor</p>
                  </div>
                  <Link href="/userProfileAbout">
                    <p className='px-8 py-2 cursor-pointer text-xl border border-primary rounded-3xl mb-6 hover:bg-green-700'>View Profile</p>
                  </Link>
                  <li className='px-7 py-2 cursor-pointer font-semibold border-t border-gray-300 hover:bg-green-700'>Change to dark mode</li>
                  <li className='px-20 py-2 cursor-pointer font-semibold border-t border-gray-300 hover:bg-green-700'>Sign out</li>
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
