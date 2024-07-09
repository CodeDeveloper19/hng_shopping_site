"use client";

import React, { Component } from 'react';
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

export class Header extends Component {
  render() {
    return (
      <>
      <header className='w-full px-[70px]'>
        <div className='w-full flex justify-center pt-[49px] pb-[30px] border-b-[1px] border-[#31514D]'>
          <h1 className={`text-[38px] text-[#31514D] ${plus_jakarta_sans.className}`} >HOME AFFAIRS</h1>
        </div>
        <section className='flex flex-row justify-between py-[50px]'>
          <button className='hover:opacity-[0.5]'><Image width={18} height={18} src='/header/search_icon.svg' alt='search icon'/></button>
          <nav className=''>
            <ul className={`${poppins.className} text-[12px] text-[#000000] leading-[18px] uppercase flex flex-row justify-between`}>
              <li className='mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>Home</Link></li>
              <li className='mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>Shop</Link></li>
              <li className='mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>About</Link></li>
              <li className='mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>Blog</Link></li>
              <li className='mx-[30px] hover:border-b-[1px] border-[#31514D]'><Link href='/'>Contact Us</Link></li>
            </ul>
          </nav>
          <Link href='/cart'><button className='hover:opacity-[0.5]'><Image width={18} height={18} src='/header/cart_icon.svg' alt='cart icon'/></button></Link>
        </section>
      </header>
      </>
    )
  }
}

export default Header