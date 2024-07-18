import React, { Component } from 'react';
import Product from './product';
import Script from 'next/script';

export default class YouMayLikeSection extends Component {
  render() {
    const { randomItems } = this.props;
    
    return (
      <>
        <Script 
          strategy="afterInteractive" 
          src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        />
        {randomItems != 0 ? (
          <div className='grid grid-cols-1 minTablet:grid-cols-2 laptop:grid-cols-4 gap-5 mt-[40px]'>
            {randomItems.map((randomItem, index) => {
              const imageUrl = randomItem.photos.length > 0 ? `https://api.timbu.cloud/images/${randomItem.photos[0].url}` : '';
              const price = randomItem.current_price.length > 0 ? randomItem.current_price[0].USD[0] : 0;
              const productId = randomItem.id;

              return (
                <Product
                  key={randomItem.unique_id}
                  name={randomItem.name}
                  productId={productId}
                  price={price}
                  classNames='pt-[30px] laptop:pt-0' 
                  imageLink={imageUrl}
                  productImageHeightClass='h-[150px] phone:h-[270px]'
                  productShadowHeightClass='h-[50px] phone:h-[110px]'
                />
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[390px]">
            <lottie-player 
              src="https://lottie.host/c95370e7-ba2b-4269-ac39-dedfe12f6fea/BvYi2yapGz.json"
              background="##ffffff"
              speed="1"
              style={{ width: '200px', height: '200px' }}
              loop
              autoplay
              direction="1"
              mode="normal"
            ></lottie-player>
          </div>
        )}
      </>
    );
  }
}
