"use client";

import React, { Component, useState } from 'react';
import { Plus_Jakarta_Sans } from "next/font/google";
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const plus_jakarta_sans = Plus_Jakarta_Sans({
    weight: '400',
    subsets: ['latin'],
});

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function Header() {
  const [showNavLinks, setShowNavLinks] = useState('none');

  return (
    <>
    <header className='w-full max-w-[1440px] px-[50px] minTablet:px-[70px]'>
      <div className='w-full flex justify-center pt-[49px] pb-[30px] border-b-[1px] border-[#31514D]'>
        <h1 className={`text-[38px] text-[#31514D] ${plus_jakarta_sans.className}`} >HOME AFFAIRS</h1>
      </div>
      <section className='flex flex-row justify-between py-[50px] relative'>
        <div className='flex flex-row'>
          <button className='hover:opacity-[0.5]'><Image width={18} height={18} src='/header/search_icon.svg' alt='search icon'/></button>
          <button onClick={() => {(showNavLinks == 'none') ? setShowNavLinks('flex') : setShowNavLinks('none')}} className='hover:opacity-[0.5] ml-[20px] block minTablet:hidden'><Image width={18} height={18} src='/header/hamburger_icon.png' alt='hamburger icon'/></button>
        </div>
        <nav>
          <ul style={{display: showNavLinks}}
          className={`${poppins.className} z-20 rounded-[5px] p-[30px] minTablet:p-0 bg-[#E0E0E0] minTablet:bg-transparent text-[12px] text-[#000000] leading-[18px] uppercase absolute left-[40px] minTablet:left-0 top-[90px] minTablet:top-0 minTablet:relative tablet:!flex flex-col minTablet:flex-row justify-between`}>
            <li className='mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>Home</Link></li>
            <li className='mt-[20px] minTablet:mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>Shop</Link></li>
            <li className='mt-[20px] minTablet:mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>About</Link></li>
            <li className='mt-[20px] minTablet:mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>Blog</Link></li>
            <li className='mt-[20px] minTablet:mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>Contact Us</Link></li>
          </ul>
        </nav>
        <Link href='/cart'><button className='hover:opacity-[0.5] flex items-center'><Image width={18} height={18} src='/header/cart_icon.svg' alt='cart icon'/></button></Link>
      </section>
    </header>
    </>
  );
}