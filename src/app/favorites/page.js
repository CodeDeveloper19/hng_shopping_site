"use client"
import React, { useContext, useState, useEffect } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import YouMayLikeSection from '@/components/you_may_like_section';
import { FavoriteContext } from '@/components/favorite_context.';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ['500', '600'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['500', '600', '700', '900'],
  subsets: ['latin'],
});

async function getAllData() {
  const res = await fetch(
    `http://localhost:3001/proxy/all`
  )
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
};

export default function Favorites() {
  const [randomItems, setRandomItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [[numberOfFavoriteItems, setNumberOfFavoriteItems], [showFavoriteNotification, setShowFavoriteNotification]] = useContext(FavoriteContext);

  function removeFavoriteItem(_productName) {
    let productIndex = favoriteItems.findIndex(item => item.productName === _productName);
    if (productIndex !== -1) {
        // Create a new array excluding the item to be removed
        let newData = [...favoriteItems.slice(0, productIndex), ...favoriteItems.slice(productIndex + 1)];
        setFavoriteItems(newData);
        if(numberOfFavoriteItems == 1){
          setShowFavoriteNotification('none');
        }
        setNumberOfFavoriteItems(numberOfFavoriteItems - 1);
        let updatedJsonData = JSON.stringify(newData);
        localStorage.setItem('homeAffairsFavorites', updatedJsonData);
    }
}

  useEffect(() => {
    async function fetchData() {
      const tempData = await getAllData();

      const getRandomItems = (arr, num) => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      };

      const randomEntries = getRandomItems(tempData.items, 4);
      setRandomItems(randomEntries);
    }

    fetchData();

    let storedData = localStorage.getItem('homeAffairsFavorites');
    if (storedData) {
        try {
            let parsedData = JSON.parse(storedData);
            setFavoriteItems(parsedData);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    } else {
        setFavoriteItems([]);
    }
  }, []);

  return (
    <>
    <section className='w-full pt-[30px] pb-[150px]'>
      <div className='w-full flex justify-center'>
        <div className='w-full max-w-[1440px] px-[50px] minTablet:px-[70px] pb-[100px] flex flex-col'>
          {
            favoriteItems.map((cartItem, index) => (
              <div key={index} className='flex flex-col minTablet:flex-row mt-[20px] mb-[80px] w-fit'>
                <div className='minTablet:mr-[50px] w-[200px] border-[1px] border-[#31514D] py-[20px] h-fit'>
                  <div id='productImage' className={`relative w-full h-[150px]`}>
                    <Image unoptimized loader={() => cartItem.imageLink} fill src={cartItem.imageLink} className="object-contain" alt="image of a product" />
                  </div>
                </div>
                <div className='w-full minTablet:w-fit text-[15px] mt-[50px] minTablet:mt-0'>
                  <h2 className={`${plus_jakarta_sans.className} leading-[19px] text-black font-[600] uppercase`}>{cartItem.productName}</h2>
                  <ul className={`${poppins.className} font-[500] text-black leading-[23px] my-[30px]`}>
                    {
                      cartItem.guideDimensions.map((guideDimension, index) => (
                          <li key={index}>{guideDimension}</li>
                      ))
                    }
                  </ul>
                  <div className='flex flex-col smartPhone:flex-row items-start'>
                    <p className={`${poppins.className} font-[500] text-[#31514D] leading-[23px]`}>{`$${cartItem.price}`}</p>
                    <button onClick={() => removeFavoriteItem(cartItem.productName)} className='mt-[10px] smartPhone:mt-0 smartPhone:ml-[20px] leading-[23px] text-[#740000] hover:text-[#A52B2B] font-[600]'>Remove From Favorites</button>
                    <Link href={cartItem.productLink}><button className='mt-[10px] smartPhone:mt-0 smartPhone:ml-[20px] leading-[23px] text-[#740000] hover:text-[#A52B2B] font-[600]'>View Product</button></Link>
                  </div>
                </div>
              </div>
            ))
          }
          <div className={`${plus_jakarta_sans.className} font-[600] flex flex-col minTablet:flex-row justify-between mt-[30px]`}>
              <button onClick={() => {
                setFavoriteItems([]);
                setShowFavoriteNotification('none');
                setNumberOfFavoriteItems(null);
                localStorage.removeItem('homeAffairsFavorites');
              }} className={`${plus_jakarta_sans.className} flex justify-center items-center text-[12px] leading-[15px] hover:bg-[#A52B2B] bg-[#740000] w-full max-w-[161px] h-[60px] text-white mt-[30px] minTablet:mt-0`}>
              <span className='mr-[8px]'><Image width={18} height={18} src={'/checkout/delete.svg'} alt='vector of a delete icon'/></span>
              Clear Favorites
            </button>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <div className='w-full max-w-[1440px] px-[50px] minTablet:px-[70px] flex flex-col'>
          <h2 className={`${plus_jakarta_sans.className} leading-[49px] text-[39px] text-black font-[500]`}>YOU MIGHT ALSO LIKE</h2>
          {
            <YouMayLikeSection randomItems={randomItems}/>
          }
        </div>
      </div>
    </section>
    </>
  )
}
