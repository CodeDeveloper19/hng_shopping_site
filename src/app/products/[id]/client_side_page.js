'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { CartContext } from '@/components/cart_context';
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

export default function ClientSidePage(props) {
    const { data, price, allData } = props;
    const imageLink = `https://api.timbu.cloud/images/${data.photos[0].url}`;
    const guideDimensions = data.extra_infos[0].value.split('\n');
    const guideDimensionsItems = guideDimensions.map((guideDimension, index) => (
        <li key={index}>{guideDimension}</li>
    ));

    const [buyingQuantity, setBuyingQuantity] = useState(null);
    const [randomItems, setRandomItems] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('Product has been successfully added to your cart')
    const [[numberOfCartItems, setNumberOfCartItems], [showCartNotification, setShowCartNotification]] = useContext(CartContext);
    const [[numberOfFavoriteItems, setNumberOfFavoriteItems], [showFavoriteNotification, setShowFavoriteNotification]] = useContext(FavoriteContext);


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
                    setBuyingQuantity(parsedData[existingProductIndex].quantity);
                } else {
                    setBuyingQuantity(0);
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            setBuyingQuantity(0);
        }
        retrieveFavorites();
    }, []);

    useEffect(() => {
        const getRandomItems = (arr, num) => {
            const shuffled = arr.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num);
        };
    
        const randomEntries = getRandomItems(allData, 4);
        setRandomItems(randomEntries);
    }, [allData]);

    function retrieveFavorites() {
        let storedData = localStorage.getItem('homeAffairsFavorites');
        let parsedData;
        if (storedData) {
            try {
                parsedData = JSON.parse(storedData);
                let existingProductIndex = parsedData.findIndex(item => {
                    return item.productName === data.name;
                });

                if (existingProductIndex !== -1) {
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false)
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            setIsFavorite(false);
        }
    }

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

    function saveToCart() {
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
                        setNotificationMessage('The product quantity has been successfully updated');
                    } else {
                        // Add the new product to the cart
                        parsedData.push({
                            'imageLink': imageLink,
                            'productName': data.name,
                            'guideDimensions': guideDimensions,
                            'price': (price == 2049) ? price : 1049.5,
                            'quantity': buyingQuantity,
                            'productLink': `/products/${data.id}_${price}`
                        });
                        setShowCartNotification('flex');
                        setNumberOfCartItems(numberOfCartItems + 1);
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
                    'quantity': buyingQuantity,
                    'productLink': `/products/${data.id}_${price}`
                }];
                setShowCartNotification('flex');
                setNumberOfCartItems(numberOfCartItems + 1);
            }

            // Update localStorage with the updated cart data
            let updatedJsonData = JSON.stringify(parsedData);
            localStorage.setItem('homeAffairsCart', updatedJsonData);
            setShowNotification(true);
        }
    }

    function saveToFavorites() {
        let storedData = localStorage.getItem('homeAffairsFavorites');
        let parsedData;

            if (storedData) {
                try {
                    parsedData = JSON.parse(storedData);

                    // Check if the product name already exists in the cart
                    let existingProductIndex = parsedData.findIndex(item => {
                        return item.productName === data.name;
                    });

                    if (existingProductIndex !== -1) {
                        setIsFavorite(false);
                        let newData = [...parsedData.slice(0, existingProductIndex), ...parsedData.slice(existingProductIndex + 1)];
                        let updatedJsonData = JSON.stringify(newData);
                        localStorage.setItem('homeAffairsFavorites', updatedJsonData);
                        if(numberOfFavoriteItems == 1){
                            setShowFavoriteNotification('none');
                        }
                        setNumberOfFavoriteItems(numberOfFavoriteItems - 1);
                        return;
                    } else {
                        // Add the new product to the cart
                        parsedData.push({
                            'imageLink': imageLink,
                            'productName': data.name,
                            'guideDimensions': guideDimensions,
                            'price': (price == 2049) ? price : 1049.5,
                            'productLink': `/products/${data.id}_${price}`
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
                    'productLink': `/products/${data.id}_${price}`
                }];
            }

            setIsFavorite(true);
            setShowFavoriteNotification('flex');
            setNumberOfFavoriteItems(numberOfFavoriteItems + 1);
            // Update localStorage with the updated cart data
            let updatedJsonData = JSON.stringify(parsedData);
            localStorage.setItem('homeAffairsFavorites', updatedJsonData);
    }

    return (
        <>
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
                            <Link href='/checkout'><button className='w-[161px] h-[60px] bg-[#31514D] uppercase text-white'>Check Out</button></Link>
                            <Link href='/'><button className='mt-[30px] phone:mt-0 ml-0 phone:ml-[25px] w-[161px] h-[60px] bg-white uppercase text-[##31514D] border-[1px] border-[#31514D]'>CONTINUE SHOPPING</button></Link>
                        </div>
                        <div className='flex flex-row'>
                            <button onClick={saveToCart} className='border-[1px] border-[#31514D] w-[60px] h-[60px] flex justify-center items-center mt-[30px] minTablet:mt-0'>
                                <div className='w-[24px] h-[24px] relative'>
                                    <Image fill src="/cart/add_to_cart.png" className="object-contain" alt="vector of a add to cart sign" />
                                </div>
                            </button>
                            <button onClick={saveToFavorites} className='ml-[40px] border-[1px] border-[#31514D] w-[60px] h-[60px] flex justify-center items-center mt-[30px] minTablet:mt-0'>
                                <div className='w-[24px] h-[24px] relative'>
                                    {
                                        isFavorite ? 
                                            <Image fill src="/header/red_heart.png" className="object-contain" alt="vector of a heart sign" />
                                        :
                                            <Image fill src="/header/favorites.png" className="object-contain" alt="vector of a heart sign" />
                                    }
                                </div>
                            </button>
                        </div>
                        </div>
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
            <section className="notification fixed justify-center w-full h-full z-30 top-0" style={{display : (showNotification) ? 'flex' : 'none'}}>
                    <div className="relative mx-[15px] justify-around px-[15px] py-auto top-[50px] h-[90px] w-[420px] border-[1px] border-white/[.3] rounded-[20px] flex flex-row items-center z-10 bg-[#98FB98]">
                        <div className="w-fit h-[80px] flex items-center justify-center">
                            <div className="w-[40px] h-[40px] relative">
                                <Image fill className="object-cover" alt="notification_icon" src='/done.gif'/>
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
    


