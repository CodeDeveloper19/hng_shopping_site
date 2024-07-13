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
    const { name, price, classNames, imageLink, productId, shadowLink, productImageHeightClass, productPaddingClass, productShadowHeightClass} = this.props;

    return (
      <>
        <Link href={`/cart/${productId}_${price}`} className={`${poppins.className} ${classNames} border-[1px] border-[#31514D] grid flex-col px-[20px] pb-[50px] h-fit min-h-full`}>
          <div className={`h-fit w-full ${productPaddingClass} my-auto overflow-hidden`}>
            <div id='productImage' className={`relative w-full ${productImageHeightClass} z-10`}>
                <Image unoptimized loader={() => imageLink} fill src={imageLink} className="object-contain" alt="image of a product" />
            </div>
            {/* <div id='productImageShadow' className={`absolute bottom-0 w-[100%] ${productShadowHeightClass} left-0 z-0`}>
                <Image fill src={shadowLink} className="object-contain" alt="image of a product's shadow" />
            </div> */}
          </div>
          <div className='flex flex-col uppercase leading-[23px] text-[15px] my-auto'>
              <h3 className='text-[#000000] uppercase'>{name}</h3>
              <h3 className='text-[#31514D]'>{`$${price}`}</h3>
          </div>
        </Link>
      </>
    )
  }
}

