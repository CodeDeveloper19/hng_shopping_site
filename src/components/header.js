"use client";

import React, { useState, useEffect, useContext } from 'react';
import { Plus_Jakarta_Sans } from "next/font/google";
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { CartContext } from './cart_context';
import { FavoriteContext } from './favorite_context.';

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
  const [[numberOfCartItems, setNumberOfCartItems], [showCartNotification, setShowCartNotification]] = useContext(CartContext);
  const [[numberOfFavoriteItems, setNumberOfFavoriteItems], [showFavoriteNotification, setShowFavoriteNotification]] = useContext(FavoriteContext);


  useEffect(() => {
    let storedData = localStorage.getItem('homeAffairsCart');
    let storedDataFavorites = localStorage.getItem('homeAffairsFavorites');
    if (storedData) {
        try {
            let parsedData = JSON.parse(storedData);
            if(parsedData.length > 0){
              setNumberOfCartItems(parsedData.length);
              setShowCartNotification('flex');
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    } else {
      setNumberOfCartItems(null);
    }

    if (storedDataFavorites) {
      try {
          let parsedData = JSON.parse(storedDataFavorites);
          if(parsedData.length > 0){
            setNumberOfFavoriteItems(parsedData.length);
            setShowFavoriteNotification('flex');
          }
      } catch (error) {
          console.error("Error parsing JSON:", error);
      }
  } else {
    setNumberOfFavoriteItems(null);
  }
  }, []);

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
            <li className='mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D] w-fit'><Link href='/'>Home</Link></li>
            <li className='mt-[20px] minTablet:mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D] w-fit'><Link href='/'>Shop</Link></li>
            <li className='mt-[20px] minTablet:mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D] w-fit'><Link href='/'>About</Link></li>
            <li className='mt-[20px] minTablet:mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D] w-fit'><Link href='/'>Blog</Link></li>
            <li className='mt-[20px] minTablet:mt-0 mx-0 minTablet:mx-[30px] hover:border-b-[1px] border-[#31514D] w-fit'><Link href='/'>Contact Us</Link></li>
          </ul>
        </nav>
        <Link className='absolute right-[25px]' href='/favorites'> 
            <button className='hover:opacity-[0.5] flex items-center relative mr-[20px]'>
              <Image width={18} height={18} src='/header/favorites.png' alt='favorite icon'/>
              <div className='absolute rounded-full w-[12px] h-[12px] bg-[#FF0000] top-[-3px] right-[-3px] text-white text-[8px] justify-center items-center' style={{display: showFavoriteNotification}}>
                {
                  numberOfFavoriteItems
                }
              </div>
            </button>
        </Link>
        <Link href='/cart'> 
          <button className='hover:opacity-[0.5] flex items-center relative'>
            <Image width={18} height={18} src='/header/cart_icon.svg' alt='cart icon'/>
            <div className='absolute rounded-full w-[12px] h-[12px] bg-[#FF0000] top-[-3px] right-[-3px] text-white text-[8px] justify-center items-center' style={{display: showCartNotification}}>
              {
                numberOfCartItems
              }
            </div>
          </button>
        </Link>
      </section>
    </header>
    </>
  );
}