'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import Product from '@/components/product';
import { CartContext } from '@/components/cart_context';

const plus_jakarta_sans = Plus_Jakarta_Sans({
    weight: ['500', '600'],
    subsets: ['latin'],
});

const poppins = Poppins({
    weight: ['500', '600', '700', '900'],
    subsets: ['latin'],
});

export default function ClientSidePage(props) {
    const { data, price, allData } = props;
    const imageLink = `https://api.timbu.cloud/images/${data.photos[0].url}`;
    const guideDimensions = data.extra_infos[0].value.split('\n');
    const guideDimensionsItems = guideDimensions.map((guideDimension, index) => (
        <li key={index}>{guideDimension}</li>
    ));

    const [buyingQuantity, setBuyingQuantity] = useState(null);
    const [randomItems, setRandomItems] = useState([]);
    const [[numberOfCartItems, setNumberOfCartItems], [showCartNotification, setShowCartNotification]] = useContext(CartContext);

    useEffect(() => {
        let storedData = localStorage.getItem('homeAffairsCart');
        if (storedData) {
            try {
                let parsedData = JSON.parse(storedData);
                let existingProductIndex = parsedData.findIndex(item => {
                    return item.productName === data.name;
                });
                // If the product name is found, update its quantity
                if (existingProductIndex !== -1) {
                    setBuyingQuantity(parsedData[existingProductIndex].quantity)
                } else {
                    setBuyingQuantity(0);
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            setBuyingQuantity(0);
        }
    }, []);

    useEffect(() => {
        const getRandomItems = (arr, num) => {
            const shuffled = arr.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num);
        };
    
        const randomEntries = getRandomItems(allData, 4);
        setRandomItems(randomEntries);
    }, [allData]);

    function increaseQuantity() {
        if(buyingQuantity < data.available_quantity) {
            setBuyingQuantity(buyingQuantity + 1);
        }
    }

    function reduceQuantity() {
        if(buyingQuantity > 0) {
            setBuyingQuantity(buyingQuantity - 1);
        }
    }

    function saveToLocalStorage() {
        if (buyingQuantity >= 1) {
            let storedData = localStorage.getItem('homeAffairsCart');
            let parsedData;

            if (storedData) {
                try {
                    parsedData = JSON.parse(storedData);
    
                    // Check if the product name already exists in the cart
                    let existingProductIndex = parsedData.findIndex(item => {
                        return item.productName === data.name;
                    });
    
                    // If the product name is found, update its quantity
                    if (existingProductIndex !== -1) {
                        parsedData[existingProductIndex].quantity = buyingQuantity;
                    } else {
                        // Add the new product to the cart
                        parsedData.push({
                            'imageLink': imageLink,
                            'productName': data.name,
                            'guideDimensions': guideDimensions,
                            'price': (price == 2049) ? price : 1049.5,
                            'quantity': buyingQuantity
                        });
                    }
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                    }
            } else {
                // If no stored data, initialize with the new product
                parsedData = [{
                    'imageLink': imageLink,
                    'productName': data.name,
                    'guideDimensions': guideDimensions,
                    'price': price,
                    'quantity': buyingQuantity
                }];
            }

            setShowCartNotification('flex');
            setNumberOfCartItems(numberOfCartItems + 1);
            // Update localStorage with the updated cart data
            let updatedJsonData = JSON.stringify(parsedData);
            localStorage.setItem('homeAffairsCart', updatedJsonData);
        }
    }
    

    return (
        <section className='pt-[30px] pb-[150px]'>
            <div className='w-full flex justify-center'>
                <div className='w-full max-w-[1440px] px-[50px] minTablet:px-[70px] pb-[100px] flex flex-col minLaptop:flex-row justify-between'>
                <div className='w-full minLaptop:w-[49%] border-[1px] border-[#31514D]'>
                    <div className='h-fit w-full px-[50px] phone:px-[100px] relative top-0 minLaptop:top-[-20px] overflow-hidden'>
                    <div id='productImage' className={`relative w-full h-[300px] phone:h-[400px] minTablet:h-[600px] minLaptop:h-[700px]`}>
                        <Image unoptimized loader={() => imageLink} fill src={imageLink} className="object-contain" alt="image of a product" />
                    </div>
                    </div>
                </div>
                <div className='flex flex-col w-full minLaptop:w-[49%] mt-[100px] minLaptop:mt-0'>
                    <div className='h-fit w-[90%]'>
                    <h1 className={`${plus_jakarta_sans.className} font-[600] uppercase text-black text-[39px] leading-[49px]`}>{data.name}</h1>
                    <h2 className={`${poppins.className} font-[700] mt-[40px] mb-[20px] text-[#31514D] uppercase text-[12px] leading-[18px]`}>DESCRIPTION</h2>
                    <p className={`${poppins.className} font-[500] text-[15px] leading-[23px]`}>{data.description}</p>
                    <div className='flex flex-col minTablet:flex-row justify-between mt-[90px]'>
                        <div className={`${poppins.className} w-full minTablet:w-[49%] flex flex-col text-[15px] leading-[23px]`}>
                        <h2 className='text-[#31514D] font-[600] uppercase'>Guide dimensions</h2>
                        <ul className='mt-[20px] font-[500]'>
                            {guideDimensionsItems}
                        </ul>
                        </div>
                        <div className={`${poppins.className} mt-[50px] minTablet:mt-0 w-full minTablet:w-[49%]`}>
                        <h2 className='text-[#31514D] text-[12px] font-[700] uppercase leading-[18px]'>QUANTITY</h2>
                        <div className='flex flex-row items-center mt-[20px]'>
                            <div className={`${plus_jakarta_sans.className} font-[600] flex justify-center items-center leading-[15px] text-[12px] border-[1px] border-[#31514D] w-[60px] h-[60px]`}>
                            {buyingQuantity}
                            </div>
                            <div className='flex flex-row ml-[40px]'>
                            <button onClick={reduceQuantity} className="relative w-[24px] h-[24px]">
                                <Image fill src="/cart/minus.svg" className="object-contain" alt="vector of a minus sign" />
                            </button>
                            <button onClick={increaseQuantity} className="relative w-[24px] h-[24px] ml-[40px]">
                                <Image fill src="/cart/plus.svg" className="object-contain" alt="vector of a plus sign" />
                            </button>
                            </div>
                        </div>
                        <h3 className='flex flex-row items-center mt-[30px] minTablet:mt-[35%] font-[700] text-[#31514D] text-[12px] leading-[18px] uppercase'>
                            PRICE:
                        {
                            (price == 2099) ?  
                            (
                                <span className='ml-[20px] font-[900] text-[22.4px] text-black leading-[34px] flex flex-row'>
                                    <s>{`$${price}`}</s>
                                    <p className='ml-[10px]'>1049.5</p>
                                </span>
                            ) : 
                            (
                                <span className='ml-[20px] font-[900] text-[22.4px] text-black leading-[34px]'>
                                    {`$${price}`}
                                </span>
                            )
                        }
                        </h3>
                        </div>
                    </div>
                    </div>
                    <div className={`${plus_jakarta_sans.className} font-[600] flex flex-col minTablet:flex-row justify-between mt-[30px]`}>
                    <div className='flex flex-col phone:flex-row text-[12px] leading-[15px]'>
                        <Link href='/checkout'><button onClick={saveToLocalStorage} className='w-[161px] h-[60px] bg-[#31514D] uppercase text-white'>Check Out</button></Link>
                        <Link href='/'><button onClick={saveToLocalStorage} className='mt-[30px] phone:mt-0 ml-0 phone:ml-[25px] w-[161px] h-[60px] bg-white uppercase text-[##31514D] border-[1px] border-[#31514D]'>CONTINUE SHOPPING</button></Link>
                    </div>
                    <button className='border-[1px] border-[#31514D] w-[60px] h-[60px] flex justify-center items-center mt-[30px] minTablet:mt-0'>
                        <div className='w-[24px] h-[24px] relative'>
                            <Image fill src="/cart/heart.png" className="object-contain" alt="vector of a heart sign" />
                        </div>
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-full max-w-[1440px] px-[50px] minTablet:px-[70px] flex flex-col'>
                <h2 className={`${plus_jakarta_sans.className} leading-[49px] text-[39px] text-black font-[500]`}>YOU MIGHT ALSO LIKE</h2>
                <div className='grid grid-cols-1 minTablet:grid-cols-2 laptop:grid-cols-4 gap-5 mt-[40px]'>
                    {
                        randomItems.map((randomItem, index) => {
                            const imageUrl = randomItem.photos.length > 0 ? `https://api.timbu.cloud/images/${randomItem.photos[0].url}` : '';
                            const price = randomItem.current_price.length > 0 ? randomItem.current_price[0].USD[0] : 0;
                            const productId = randomItem.id

                            return(
                                <Product
                                key={randomItem.unique_id}
                                name={randomItem.name}
                                productId={productId}
                                price={price}
                                classNames='pt-[30px] laptop:pt-0' 
                                imageLink={imageUrl}
                                // shadowLink='/homepage/wall_clock_shadow.png'
                                productImageHeightClass='h-[150px] phone:h-[270px]'
                                productShadowHeightClass='h-[50px] phone:h-[110px]'
                                />                            
                            )
                        })
                    }
                </div>
                </div>
            </div>
        </section>
    )
}
