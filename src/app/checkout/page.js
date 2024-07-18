"use client"
import React, { useEffect, useState, useContext } from 'react';
import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { CartContext } from '@/components/cart_context';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ['500', '600'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const [subtotal, setSubTotal] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationIcon, setNotificationIcon] = useState('');
  const [[numberOfCartItems, setNumberOfCartItems], [showCartNotification, setShowCartNotification]] = useContext(CartContext);

  const initialFormData = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartmentSuite: '',
    city: '',
    state: '',
    postalCode: '',
    isGift: false
  };

  const [formData, setFormData] = useState(initialFormData);


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
        updateCosts(0, []);
    }
  }, []);

  function updateCosts(cartLength, data) {
    let shippingCost = cartLength * 50;
    const productsCost = data.reduce((accumulator, product) => {
      return accumulator + (product.price * product.quantity);
    }, 0);
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
        if(numberOfCartItems == 1){
          setShowCartNotification('none');
        }
        setNumberOfCartItems(numberOfCartItems - 1);
        updateCosts(newData.length, newData);
        let updatedJsonData = JSON.stringify(newData);
        localStorage.setItem('homeAffairsCart', updatedJsonData);
    }
}
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['firstName', 'lastName', 'streetAddress', 'city', 'state', 'postalCode'];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setNotificationMessage('Cannot process checkout. Please fill in all required fields');
        setNotificationIcon('/error.gif');
        setShowNotification(true);
        return;
      }
    }
      setNotificationMessage('Your checkout has been processed successfully');
      setNotificationIcon('/done.gif');
      setShowNotification(true);
      setFormData(initialFormData);
  };


  return (
    <>
    <section className='w-full flex justify-center'>
      <div className='flex flex-col minLaptop:flex-row justify-between w-full px-[50px] minTablet:px-[70px] pb-[150px] max-w-[1440px]'>
        <div className='flex flex-col w-full minLaptop:w-[60%]'>
          <h1 className={`${plus_jakarta_sans.className} font-[600] uppercase leading-[39px] text-[49px] text-black`}>SHIPPING</h1>
          <h2 className={`${poppins.className} font-[600] text-[20px] text-[#31514D] uppercase leadimg-[30px] mt-[50px] mb-[30px]`}>SHIPPING ADDRESS</h2>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col phone:flex-row justify-between w-full'>
              <input type='text' placeholder='First Name' id='firstName' value={formData.firstName} onChange={handleChange} className={`${poppins.className} font-[600] w-full phone:w-[48.5%] h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`} />
              <input type='text' placeholder='Last Name' id='lastName' value={formData.lastName} onChange={handleChange} className={`${poppins.className} phone:mt-0 mt-[25px] font-[600] w-full phone:w-[48.5%] h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`} />
            </div>
            <input type='text' placeholder='Street Address' id='streetAddress' value={formData.streetAddress} onChange={handleChange} className={`${poppins.className} font-[600] mt-[25px] w-full h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`} />
            <input type='text' placeholder='Apt, Suite' id='apartmentSuite' value={formData.apartmentSuite} onChange={handleChange} className={`${poppins.className} font-[600] mt-[25px] w-full h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`} />
            <div className='flex flex-col phone:flex-row justify-between w-full mt-[25px]'>
              <input type='text' placeholder='City' id='city' value={formData.city} onChange={handleChange} className={`${poppins.className} font-[600] w-full phone:w-[48.5%] h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`} />
              <input type='text' placeholder='State' id='state' value={formData.state} onChange={handleChange} className={`${poppins.className} mt-[25px] phone:mt-0 font-[600] w-full phone:w-[48.5%] h-[60px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`} />
            </div>
            <input type='text' placeholder='Postal Code' id='postalCode' value={formData.postalCode} onChange={handleChange} className={`${poppins.className} font-[600] w-full phone:w-[48.5%] h-[60px] mt-[25px] border-[1px] border-[#31514D] outline-none leading-[18px] px-[20px] text-[#31514D] text-[12px]`} />
            <div className={`${poppins.className} w-full flex flex-col my-[80px]`}>
              <h2 className='text-[20px] text-[#31514D] uppercase leadimg-[30px] mb-[30px]'>SHIPPING METHOD</h2>
              <p className='text-[#00000] text-[15px] leading-[23px]'>Enter a shipping address to see accurate shipping options for your order</p>
            </div>
            <div className={`${poppins.className} font-[600] w-full flex flex-col`}>
              <h2 className='text-[20px] text-[#31514D] uppercase leadimg-[30px] mb-[20px]'>GIFT OPTIONS</h2>
              <div className='flex flex-row'>
                <input type='checkbox' id='isGift' checked={formData.isGift} onChange={handleChange} className='w-[31px] h-[31px]' />
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
                    <Image fill src='/checkout/paypal.svg' alt='paypal icon' />
                  </button>
                  <button className='mt-[20px] phone:mt-0 relative w-[50px] h-[34.32px] mr-[10px]'>
                    <Image fill src='/checkout/mastercard.svg' alt='mastercard icon' />
                  </button>
                  <button className='mt-[20px] phone:mt-0 relative w-[50px] h-[34.32px] mr-[10px]'>
                    <Image fill src='/checkout/googlepay.svg' alt='google pay icon' />
                  </button>
                  <button className='mt-[20px] phone:mt-0 relative w-[50px] h-[34.32px] mr-[10px]'>
                    <Image fill src='/checkout/applepay.svg' alt='apple pay icon' />
                  </button>
                  <button className='mt-[20px] phone:mt-0 relative w-[50px] h-[34.32px]'>
                    <Image fill src='/checkout/visa.svg' alt='visa icon' />
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
              <button onClick={() => {
                  setCartItems([]);
                  setShowCartNotification('none');
                  setNumberOfCartItems(null);
                  updateCosts(0, []);
                  localStorage.removeItem('homeAffairsCart');
                }} className={`${plus_jakarta_sans.className} flex justify-center items-center text-[12px] leading-[15px] hover:bg-[#A52B2B] bg-[#740000] w-full max-w-[161px] h-[60px] text-white mb-[30px]`}>
                <span className='mr-[8px]'><Image width={18} height={18} src={'/checkout/delete.svg'} alt='vector of a delete icon'/></span>
                Clear Cart
              </button>
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
                      <button onClick={() => removecartItem(cartItem.productName)} className='mt-[40px] leading-[23px] text-[#740000] hover:text-[#A52B2B] font-[600]'>Remove</button>
                    </div>
                  </div>
                ))
              }
              <div className={`${poppins.className} smartPhone:items-center mt-[20px] font-[600] flex flex-col smartPhone:flex-row w-full leading-[23px] underline text-[15px] text-[#740000]`}>
                <Link href=''><p>Privacy Policy</p></Link>
                <div className='bg-[#31514D] h-[12px] w-[1px] mx-[10px] hidden smartPhone:block'></div>
                <Link className='mt-[10px] smartPhone:mt-0' href=''><p>Terms & Conditions</p></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="notification fixed justify-center w-full h-full z-30 top-0" style={{display : (showNotification) ? 'flex' : 'none'}}>
      <div className="relative mx-[15px] justify-around px-[15px] py-auto top-[50px] h-[90px] w-[420px] border-[1px] border-white/[.3] rounded-[20px] flex flex-row items-center z-10" style={{backgroundColor: (notificationIcon === '/done.gif' ? 'rgb(152, 251, 152)' : 'rgb(251, 206, 177)')}}>
          <div className="w-fit h-[80px] flex items-center justify-center">
              <div className="w-[40px] h-[40px] relative">
                  <Image fill className="object-cover" alt="notification icon" src={notificationIcon}/>
              </div>
          </div>
          <div className="flex flex-col w-[70%] h-fit text-[#191970]">
              <h5 id="error-message" className="text-[13px] font-[400]">{notificationMessage}</h5>
          </div>
          <button className="w-fit flex justify-center items-center ml-[5px]" onClick={() => {setShowNotification(false)}}>
              <div className="w-[15px] h-[15px] relative">
                  <Image fill className="object-cover" alt="close_icon" src='/close.svg'/>
              </div>                       
          </button>
      </div>
      <div className="bg-black opacity-[0.6] absolute w-full h-full top-0"></div>
      </section>
    </>
  )
}
