"use client"
import React, { useEffect, useState } from 'react';
import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import Image from 'next/image';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ['500', '600'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

export default function Checkout() {
  let parsedData;

  const [cartItems, setCartItems] = useState([]);
  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    let storedData = localStorage.getItem('homeAffairsCart');
    if (storedData) {
        try {
            let parsedData = JSON.parse(storedData);
            setCartItems(parsedData);
            updateCosts(parsedData.length, parsedData);
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    } else {
        setCartItems([]);
        updateCosts(0);
    }
  }, []);

  function updateCosts(cartLength, data) {
    let shippingCost = cartLength * 50;
    const productsCost = data.reduce((accumulator, product) => {
      return accumulator + (product.price * product.quantity);
    }, 0);
    // let productsCost = 0;
    let allCost = shippingCost + productsCost;
    setTotalShippingCost(shippingCost);
    setTotalCost(allCost);
    setSubTotal(productsCost);
  }

  function removecartItem(_productName) {
    let productIndex = cartItems.findIndex(item => item.productName === _productName);
    if (productIndex !== -1) {
        // Create a new array excluding the item to be removed
        let newData = [...cartItems.slice(0, productIndex), ...cartItems.slice(productIndex + 1)];
        setCartItems(newData);
        updateCosts(newData.length, newData);
        let updatedJsonData = JSON.stringify(newData);
        localStorage.setItem('homeAffairsCart', updatedJsonData);
    }
}


  return (
    <>
    <section className='w-full flex justify-center'>
      <div className='flex flex-col minLaptop:flex-row justify-between w-full px-[50px] minTablet:px-[70px] pb-[150px] max-w-[1440px]'>
        <div className='flex flex-col w-full minLaptop:w-[60%]'>
          <h1 className={`${plus_jakarta_sans.className} font-[600] uppercase leading-[39px] text-[49px] text-black`}>SHIPPING</h1>
          <h2 className={`${poppins.className} font-[600] text-[20px] text-[#31514D] uppercase leadimg-[30px] mt-[50px] mb-[30px]`}>SHIPPING ADDRESS</h2>
          <form>
            <div className='flex flex-col phone:flex-row justify-between w-full'>
              <input type='text' placeholder='First Name' id='firstName' className={`${poppins.className} font-[600] w-full phone:w-[48.5%] h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`}/>
              <input type='text' placeholder='Last Name' id='lastName' className={`${poppins.className} phone:mt-0  mt-[25px] font-[600] w-full phone:w-[48.5%] h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`}/>
            </div>
            <input type='address' placeholder='Street Address' id='streetAddress' className={`${poppins.className} font-[600] mt-[25px] w-full h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`}/>
            <input type='text' placeholder='Apt, Suite' id='apartmentSuite' className={`${poppins.className} font-[600] mt-[25px] w-full h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`}/>
            <div className='flex flex-col phone:flex-row justify-between w-full mt-[25px]'>
              <input type='text' placeholder='City' id='city' className={`${poppins.className} font-[600] w-full phone:w-[48.5%] h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`}/>
              <input type='text' placeholder='State' id='state' className={`${poppins.className} mt-[25px] phone:mt-0 font-[600] w-full phone:w-[48.5%] h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`}/>
            </div>
            <input type='text' placeholder='Postal Code' id='postaCode' className={`${poppins.className} font-[600] w-full phone:w-[48.5%] h-[60px] mt-[25px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`}/>
            <div className={`${poppins.className} w-full flex flex-col my-[80px]`}>
            <h2 className='text-[20px] text-[#31514D] uppercase leadimg-[30px] mb-[30px]'>SHIPPING METHOD</h2>
            <p className='text-[#00000] text-[15px] leading-[23px]'>Enter a shipping address to see accurate shipping options for your order</p>
          </div>
          <div className={`${poppins.className} font-[600] w-full flex flex-col`}>
            <h2 className='text-[20px] text-[#31514D] uppercase leadimg-[30px] mb-[20px]'>GIFT OPTIONS</h2>
            <div className='flex flex-row'>
              <input type='checkbox' className='w-[31px] h-[31px'></input>
              <p className='text-[15px] text-black leading-[23px] ml-[20px] capitalize'>This is a gift</p>
            </div>
          </div>
          <button type='submit' className={`${plus_jakarta_sans.className} mt-[80px] w-full phone:w-[48.5%] h-[60px] text-[12px] leading-[15px] text-white uppercase hover:bg-[#4A6B68] bg-[#31514D] font-[500]`}>CONTINUE</button>
          <div className={`${poppins.className} flex flex-col mt-[80px]`}>
            <h2 className='text-[20px] text-[#31514D] uppercase leadimg-[30px] mb-[30px]'>PAYMENT METHOD</h2>
            <div className='w-full border-[1px] border-[#31514D] flex flex-col minTablet:flex-row justify-between px-[25px] py-[30px]'>
              <div className='flex flex-col text-black'>
                <h3 className='text-[15px] leading-[23px] font-[600]'>Credit Card</h3>
                <p className='text-[12px] leading-[18px] font-[500]'>Secure and encrypted</p>
              </div>
              <div className='flex flex-col phone:flex-row mt-[30px] minTablet:mt-0'>
                <button className='mt-[20px] phone:mt-0 relative w-[50px] h-[34.32px] mr-[10px]'>
                  <Image fill src='/checkout/paypal.svg' alt='paypal icon'/>
                </button>
                <button className='mt-[20px] phone:mt-0 relative w-[50px] h-[34.32px] mr-[10px]'>
                  <Image fill src='/checkout/mastercard.svg' alt='mastercard icon'/>
                </button>
                <button className='mt-[20px] phone:mt-0 relative w-[50px] h-[34.32px] mr-[10px]'>
                  <Image fill src='/checkout/googlepay.svg' alt='google pay icon'/>
                </button>
                <button className='mt-[20px] phone:mt-0 relative w-[50px] h-[34.32px] mr-[10px]'>
                  <Image fill src='/checkout/applepay.svg' alt='apple pay icon'/>
                </button>
                <button className='mt-[20px] phone:mt-0 relative w-[50px] h-[34.32px]'>
                  <Image fill src='/checkout/visa.svg' alt='visa icon'/>
                </button>
              </div>
            </div>
          </div>
          </form>
        </div>
        <div className='hidden minLaptop:block w-[1px] bg-[#31514D] mx-[20px]'></div>
        <div className='flex flex-col w-full minLaptop:w-[40%]'>
          <h2 className={`${poppins.className} font-[600] text-[20px] text-[#31514D] uppercase leadimg-[30px] mt-[90px] mb-[30px]`}>ORDER SUMMARY</h2>
          <div className={`${poppins.className} font-[600] text-[15px] text-black leading-[23px] flex flex-col mt-[60px] w-full`}>
            <p className='flex flex-row justify-between'>Subtotal<span>{`$${subtotal}`}</span></p>
            <p className='flex flex-row justify-between mt-[30px]'>Taxes<span>-</span></p>
            <p className='flex flex-row justify-between mt-[30px]'>{`Shipping (${cartItems.length} item)`}<span>{`$${totalShippingCost}`}</span></p>
            <div className='h-[1px] bg-black w-full my-[25px]'></div>
            <p className='flex flex-row justify-between uppercase text-[20px] font-[700] text-[#31514D] leading-[30px]'>TOTAL<span>{`$${totalCost}`}</span></p>
            <button type='submit' className={`${plus_jakarta_sans.className} my-[90px] w-full h-[60px] text-[12px] leading-[15px] text-white uppercase hover:bg-[#4A6B68] bg-[#31514D] font-[500]`}>APPLY A PROMO CODE OR DISCOUNT</button>
            <div className='flex flex-col'>
              <h2 className='font-[600] text-[20px] text-[#31514D] uppercase leadimg-[30px] mb-[30px]'>CART SUMMARY</h2>
              <p className='font-[600] text-[15px] leading-[23px] text-[#740000]'>Arrives in 2-5 days</p>
              {
                cartItems.map((cartItem, index) => (
                  <div key={index} className='flex flex-col minTablet:flex-row justify-between mt-[20px] mb-[80px]'>
                    <div className='w-full minTablet:w-[48%] border-[1px] border-[#31514D] py-[20px]'>
                      <div id='productImage' className={`relative w-full h-[250px] phone:h-[400px] minTablet:h-full`}>
                        <Image unoptimized loader={() => cartItem.imageLink} fill src={cartItem.imageLink} className="object-contain" alt="image of a product" />
                      </div>
                    </div>
                    <div className='w-full minTablet:w-[48%] text-[15px] mt-[50px] minTablet:mt-0'>
                      <h2 className={`${plus_jakarta_sans.className} leading-[19px] text-black font-[600] uppercase`}>{cartItem.productName}</h2>
                      <ul className={`${poppins.className} font-[500] text-black leading-[23px] my-[30px]`}>
                        {
                          cartItem.guideDimensions.map((guideDimension, index) => (
                              <li key={index}>{guideDimension}</li>
                          ))
                        }
                      </ul>
                      <p className={`${poppins.className} font-[500] text-[#31514D] leading-[23px]`}>{`$${cartItem.price}`}<span className='text-black'>{` x ${cartItem.quantity}`}</span></p>
                      <button onClick={() => removecartItem(cartItem.productName)} className='mt-[40px] leading-[23px] text-[#740000] hover:text-[#A52B2B]  font-[600]'>Remove</button>
                    </div>
                  </div>
                ))
              }
              {/* <div className='flex flex-col minTablet:flex-row justify-between mt-[20px] mb-[80px]'>
                <div className='w-full minTablet:w-[48%] border-[1px] border-[#31514D] py-[20px]'>
                  <div id='productImage' className={`relative w-full h-[250px] phone:h-[400px] minTablet:h-full`}>
                    <Image fill src='/homepage/red_chair.png' className="object-contain" alt="image of a product" />
                  </div>
                </div>
                <div className='w-full minTablet:w-[48%] text-[15px] mt-[50px] minTablet:mt-0'>
                  <h2 className={`${plus_jakarta_sans.className} leading-[19px] text-black font-[600] uppercase`}>Toulouse fabric ROUND CHAIR</h2>
                  <ul className={`${poppins.className} font-[500] text-black leading-[23px] my-[30px]`}>
                    <li>Total height: 84 cm</li>
                    <li>Total width: 48 cm</li>
                  </ul>
                  <p className={`${poppins.className} font-[500] text-[#31514D] leading-[23px]`}>$300 <span className='text-black'> x 1</span></p>
                  <button className='mt-[40px] leading-[23px] text-[#740000] hover:text-[#A52B2B]  font-[600]'>Remove</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
