"use client";
import React, { Component } from 'react'
import { Poppins } from 'next/font/google';
import { Plus_Jakarta_Sans } from "next/font/google";


const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: '600',
  subsets: ['latin'],
});

export default class Footer extends Component {
  render() {
    return (
      <div className='w-full bg-[#31514D] flex justify-center'>
        <footer className={`${poppins.className} text-[#FAFAFA] w-full h-fit flex flex-col minLaptop:flex-row items-start minLaptop:justify-between px-[50px] minTablet:px-[70px] py-[70px] max-w-[1440px]`}> 
          <section className='min-w-full phone:min-w-[300px] minLaptop:min-w-fit'>
            <h2 className={`${plus_jakarta_sans.className} leading-[18.9px] text-[15px] text-[#F3F3F3] mb-[20px] uppercase`}>Connect with us</h2>
            <ul className='uppercase leading-[35px] text-[12px]'>
              <li>Facebook: HomeAffairsFurniture</li>
              <li>Instagram: @HomeAffairsFurniture</li>
              <li>Twitter: @HomeAffairsFurn</li>
              <li>Pinterest: HomeAffairsFurniture</li>
            </ul>
          </section>
          <section className='min-w-full phone:min-w-[300px] minLaptop:min-w-fit mt-[40px] minLaptop:mt-0'>
            <h2 className={`${plus_jakarta_sans.className} leading-[18.9px] text-[15px] text-[#F3F3F3] mb-[20px] uppercase`}>Contact us</h2>
            <ul className='uppercase leading-[35px] text-[12px]'>
              <li>Phone: +1 (800) 123-4567</li>
              <li>FAQs</li>
              <li>Returns & Exchanges</li>
            </ul>
          </section>
          <section className='min-w-full phone:min-w-[300px] minLaptop:min-w-fit mt-[40px] minLaptop:mt-0'>
            <h2 className={`${plus_jakarta_sans.className} leading-[18.9px] text-[15px] text-[#F3F3F3] mb-[20px] uppercase`}>Explore</h2>
            <ul className='uppercase leading-[35px] text-[12px]'>
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Sale</li>
              <li>Gift Cards</li>
            </ul>
          </section>
          <section className='min-w-full phone:min-w-[300px] minLaptop:min-w-fit mt-[40px] minLaptop:mt-0'>
            <h2 className={`${plus_jakarta_sans.className} leading-[18.9px] text-[15px] text-[#F3F3F3] mb-[20px] uppercase`}>Newsletter</h2>
            <ul className='uppercase leading-[15.12px] text-[12px] mb-[20px]'>
              <li className='uppercase smartPhone:max-w-[300px] laptop:max-w-[390px] w-full'>Stay updated with our latest products, exclusive offers, and design tips.</li>
            </ul>
            <div className={`${plus_jakarta_sans.className} flex flex-col laptop:flex-row justify-between w-full smartPhone:w-fit`}>
              <input type='email' placeholder='YOUR EMAIL HERE' id='email' className='smartPhone:w-[262px] outline-none leading-[35px] px-[20px] h-[50px] text-[#8787879E] text-[12px]'/>
              <button className='bg-[#740000] hover:bg-[#A52B2B] h-[50px] uppercase px-[20px] mt-[20px] laptop:mt-0 laptop:ml-[25px] leading-[35px] text-[12px]'>Subscribe</button>
            </div>
          </section>
        </footer>
      </div>
    )
  }
}
