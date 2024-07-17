'use client'
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import Product from "@/components/product";
import Link from "next/link";
import ImageComponent from "@/components/image";
import { useState, useEffect } from "react";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: '700',
  subsets: ['latin'],
});

async function getData() {
  const res = await fetch(
    `http://localhost:3001/proxy/all`
  )
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function Home() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getData().then(data => {
      setData(data);
    }).catch(error => {
      console.error("Failed to fetch data", error);
    });
  }, []);

  if (!data) {
    return <div className="h-[500px]"></div>;
  }

  const chunkedArrays = chunkArray(data.items, 8);

  function nextPage() {
    if(currentPage < chunkedArrays.length - 1){
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    if(currentPage > 0){
      setCurrentPage(currentPage - 1);
    }
  }

  const showCaseComponents = data.items.slice(-2).map((product, index) => {
    const imageUrl = product.photos.length > 0 ? `https://api.timbu.cloud/images/${product.photos[0].url}` : '';
    const price = product.current_price.length > 0 ? product.current_price[0].USD[0] : 0;
    const productId = product.id
  
    return (
      <ImageComponent linkUrl={`/products/${productId}_${price}`} imageUrl={imageUrl} key={product.unique_id} />
    );
  });

  return (
    <section className="w-full flex items-center flex-col">
      <div className="px-[50px] minTablet:px-[70px] w-full h-fit bg-[#F3F3F3] flex justify-center">
        <div className={`${plus_jakarta_sans.className} relative w-full max-w-[1440px] pt-[30px] pb-[30px] flex justify-center`}>
          <div className=" relative w-fit h-fit flex flex-col items-center phone:min-h-[520px] py-[50px]">
            <h2 className="text-[35px] leading-[44.1px] text-[#31514D] max-w-[400px] minLaptop:max-w-[500px] laptop:max-w-[650px] normal:max-w-[762px] text-center font-[600]">We Transform Your Homes, One Furniture at a Time</h2>
            <button className="w-[161px] border-[1px] border-[#31514D] uppercase text-[#31514D] mt-[30px] text-[12px] leading-[15.12px] h-[60px] font-[600]">View More</button>
            <div className="hidden phone:block w-[500px] tablet:w-[640px] minLaptop:w-[800px] h-[300px] tablet:h-[400px] minLaptop:h-[500px] absolute mt-[180px] tablet:mt-[100px] minLaptop:mt-[20px]">
              <Image fill src="/homepage/couch.png" className="object-contain" alt="image of a couch" />
            </div>
            <div className="hidden phone:block w-[84px] tablet:w-[124px] minLaptop:w-[155px] h-[84px] tablet:h-[124px] minLaptop:h-[155px] absolute left-[-65px] tablet:left-[-150px] minLaptop:left-[-180px] laptop:left-[-105px] normal:left-[-50px] bottom-[20px]">
              <Image fill src="/homepage/stool.png" className="object-contain" alt="image of a stool" />
            </div>
          </div>
          <div className="hidden phone:block w-full h-[136px] absolute bottom-[25px]">
              <Image fill src="/homepage/shadow.png" className="object-contain" alt="image of a shadow" />
          </div>
          <div className="hidden minTablet:block w-[64.3px] tablet:w-[141.3px] minLaptop:w-[177px] h-[142px] tablet:h-[212px] minLaptop:h-[265.5px] absolute top-0 right-[60px]">
              <Image fill src="/homepage/lighting.png" className="object-contain" alt="image of a hanging lighting" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="pt-[80px] pb-[30px] px-[50px] minTablet:px-[70px] flex flex-col items-center max-w-[1440px] w-full">
          <div className="w-full overflow-hidden relative h-[2580px] smartPhone:h-[2520px] phone:h-[3374px] minTablet:h-[2190px] tablet:h-[2150px] laptop:h-[1273px]">
            <div style={{left: `-${100*currentPage}%`}} className="absolute min-w-full w-fit flex flex-row transition-all duration-[400ms]">
              {
                chunkedArrays.map((chunkArrayy, index) => {
                  const productComponents = chunkArrayy.slice(0, 8).map((product, index) => {
                    const imageUrl = product.photos.length > 0 ? `https://api.timbu.cloud/images/${product.photos[0].url}` : '';
                    const price = product.current_price.length > 0 ? product.current_price[0].USD[0] : 0;
                  
                    return (
                      <Product
                        key={product.unique_id}
                        name={product.name}
                        productId={product.id}
                        price={price}
                        classNames='pt-[30px] laptop:pt-0'
                        imageLink={imageUrl}
                        shadowLink=''
                        productPaddingClass=''
                        productImageHeightClass='h-[150px] phone:h-[270px]'
                        productShadowHeightClass='h-[50px] phone:h-[110px]'
                      />
                    );
                  });

                  return(
                    <div key={index} style={{left: `${100*index}%`}} className="absolute grid grid-rows-2 laptop:grid-rows-3 gap-5 w-full">
                      <div className="grid row-start-1 row-end-3 grid-cols-1 laptop:grid-cols-4 gap-5">
                        <div className="grid laptop:col-start-1 laptop:col-end-3 grid-cols-1 minTablet:grid-cols-2 gap-5">
                          {productComponents.slice(0, 4)}
                        </div>
                        {productComponents[4] && (
                          <Product
                            {...productComponents[4].props}
                            classNames='laptop:col-start-3 laptop:col-end-5'
                            productImageHeightClass='h-[180px] phone:h-[300px] laptop:h-[609px]'
                            productPaddingClass='phone:px-[100px] pt-[50px]'
                            productShadowHeightClass='h-[70px] phone:h-[110px] laptop:h-[250px]'
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-1 laptop:grid-cols-4 row-start-3 row-span-4 gap-5 w-full">
                        {productComponents[5] && (
                          <Product
                            {...productComponents[5].props}
                            classNames='pt-[30px] laptop:pt-0 laptop:col-start-1 laptop:col-end-3'
                          />
                        )}
                        <div className="grid grids-cols-1 minTablet:grid-cols-2 laptop:col-start-3 laptop:col-end-5 gap-5">
                          {productComponents.slice(6, 8)} {/* Adjust the slice as needed */}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className={`${plus_jakarta_sans.className} flex flex-col phone:flex-row smartPhone:items-start items-center justify-center w-full`}>
            <button onClick={prevPage} className="w-[161px] border-[1px] border-[#31514D] uppercase text-[#31514D] mt-[50px] phone:mt-[30px] text-[12px] leading-[15.12px] h-[60px] font-[600]">Prev</button>
            <button onClick={nextPage} className="w-[161px] border-[1px] border-[#31514D] uppercase text-[#31514D] mt-[20px] phone:mt-[30px] text-[12px] leading-[15.12px] h-[60px] font-[600] phone:ml-[20px]">Next</button>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#FFE3E3] flex justify-center">
        <div className="relative w-full px-[50px] minTablet:px-[70px] py-[100px] overflow-x-hidden max-w-[1440px]">
          <div className="flex flex-col">
            <h2 className={`${plus_jakarta_sans.className} leading-[61.74px] text-[#000000] uppercase font-[400] text-[49px]`}><span className="text-[#740000]">50% </span>Discount</h2>
            <h3 className={`${poppins.className} uppercase text-[#740000] text-[73.26px] leading-[109.88px]`}>ROMEO RED SOFA</h3>
            <Link href='/products/591a1995b5a747cc89075072d9e10ba4_2099'>            
              <button className={`${plus_jakarta_sans.className} font-[700] w-[161px] border-[1px] border-[#740000] uppercase text-[#740000] mt-[30px] text-[12px] leading-[15.12px] h-[60px]`}>Buy Now</button>
            </Link>
          </div>
          <div className="w-[650px] h-[650px] absolute bottom-[70px] right-[-80px] hidden laptop:block">
            <Image fill src="/homepage/red_sofa.png" className="object-contain" alt="image of a red stofa" />
          </div>
          <div className="w-[650px] h-[67px] absolute bottom-[90px] right-0 hidden laptop:block">
            <Image fill src="/homepage/shadow_red.png" className="object-cover" alt="image of a red sofa shadow" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full px-[50px] minTablet:px-[70px] pt-[80px] pb-[150px] max-w-[1440px]">
          <div className="grid grid-cols-1 minTablet:grid-cols-2 laptop:grid-cols-4 h-[1800px] minTablet:h-[900px] laptop:h-[400px]">
            <div className="bg-[#F1E3E2] relative">
              {
                showCaseComponents[0]
              }
            </div>
            <div className="bg-[#B79971]"></div>
            <div className="bg-[#FAFAFA] relative">
              {
                showCaseComponents[1]
              }
            </div>
            <div className="bg-[#D9D9D9]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
