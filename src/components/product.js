"use client";

import React, { Component } from 'react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const poppins = Poppins({
    weight: '500',
    subsets: ['latin'],
  });

export default class Product extends Component {
  render() {
    const { name, price, classNames, imageLink, shadowLink} = this.props;

    const productImageHeightClass = name === 'Toulouse fabric ROUND CHAIR' ? 'h-[659px]' : 'h-[270px]';
    const productPaddingClass = name === 'Toulouse fabric ROUND CHAIR' ? 'px-[100px]' : '';
    const productShadowHeightClass = name === 'Toulouse fabric ROUND CHAIR' ? 'h-[250px]' : 'h-[100px]';

    return (
      <>
        <Link href='/cart' className={`${poppins.className} ${classNames} border-[1px] border-[#31514D] grid flex-col px-[20px] pb-[50px] h-fit`}>
          <div className={`h-fit w-full ${productPaddingClass} relative top-[-10px] overflow-hidden`}>
            <div id='productImage' className={`relative w-full ${productImageHeightClass} z-10`}>
                <Image fill src={imageLink} className="object-contain" alt="image of a product" />
            </div>
            <div id='productImageShadow' className={`absolute bottom-0 w-[100%] ${productShadowHeightClass} left-0 z-0`}>
                <Image fill src={shadowLink} className="object-contain" alt="image of a product's shadow" />
            </div>
          </div>
          <div className='flex flex-col uppercase leading-[23px] text-[15px]'>
              <h3 className='text-[#000000] uppercase'>{name}</h3>
              <h3 className='text-[#31514D]'>{price}</h3>
          </div>
        </Link>
      </>
    )
  }
}

