import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import Product from "@/components/product";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const poppins = Poppins({
  weight: '700',
  subsets: ['latin'],
});


export default function Home() {
  return (
    <>
    <section className="w-full flex items-center flex-col">
      <div className="px-[70px] w-full h-fit bg-[#F3F3F3] flex justify-center">
        <div className={`${plus_jakarta_sans.className} relative w-full max-w-[1440px] pt-[30px] flex justify-center`}>
          <div className=" relative w-fit h-fit flex flex-col items-center phone:min-h-[520px] py-[50px]">
            <h2 className="text-[35px] leading-[44.1px] text-[#31514D] max-w-[400px] minLaptop:max-w-[500px] laptop:max-w-[650px] normal:max-w-[762px] text-center font-[600]">We Transform Your Homes, One Furniture at a Time</h2>
            <button className="w-[161px] border-[1px] border-[#31514D] uppercase text-[#31514D] mt-[30px] text-[12px] leading-[15.12px] h-[60px] font-[600]">View More</button>
            <div className="hidden phone:block w-[540px] tablet:w-[640px] minLaptop:w-[800px] h-[300px] tablet:h-[400px] minLaptop:h-[500px] absolute mt-[180px] tablet:mt-[100px] minLaptop:mt-[20px]">
              <Image fill src="/homepage/couch.png" className="object-contain" alt="image of a couch" />
            </div>
            <div className="hidden phone:block w-[84px] tablet:w-[124px] minLaptop:w-[155px] h-[84px] tablet:h-[124px] minLaptop:h-[155px] absolute left-[-65px] tablet:left-[-150px] minLaptop:left-[-180px] laptop:left-[-105px] normal:left-[-50px] bottom-[70px]">
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
        <div className="pt-[80px] pb-[30px] px-[70px] flex flex-col items-center max-w-[1440px] w-full">
          <div className="grid grid-rows-2 laptop:grid-rows-3 gap-5 w-full">
            <div className="grid row-start-1 row-end-3 grid-cols-1 laptop:grid-cols-4 gap-5">
              <div className="grid laptop:col-start-1 laptop:col-end-3 grid-cols-1 minTablet:grid-cols-2 gap-5">
                <Product
                  name='CURVED WALNUT DINING CHAIR'
                  price='$356.00'
                  classNames='pt-[30px] laptop:pt-0' 
                  imageLink='/homepage/white_chair.png'
                  shadowLink='/homepage/white_chair_shadow.png'
                  productImageHeightClass='h-[150px] phone:h-[270px]'
                  productShadowHeightClass='h-[50px] phone:h-[110px]'
                />
                <Product
                  name='ROUND ELM STOOL'
                  price='$300.00'
                  classNames='pt-[30px] laptop:pt-0' 
                  imageLink='/homepage/round_table.png'
                  shadowLink='/homepage/round_table_shadow.png'
                  productImageHeightClass='h-[150px] phone:h-[270px]'
                  productShadowHeightClass='h-[50px] phone:h-[110px]'
                />
                <Product
                  name='OAK WOOD WALL CLOCK'
                  price='$500.00'
                  classNames='pt-[30px] laptop:pt-0' 
                  imageLink='/homepage/wall_clock.png'
                  shadowLink='/homepage/wall_clock_shadow.png'
                  productImageHeightClass='h-[150px] phone:h-[270px]'
                  productShadowHeightClass='h-[50px] phone:h-[110px]'
                />
                <Product
                  name='CATERPILLAR SOFA COUCH'
                  price='$375.50'
                  classNames='pt-[30px] laptop:pt-0' 
                  imageLink='/homepage/caterpillar_sofa.png'
                  shadowLink='/homepage/caterpillar_sofa_shadow.png'
                  productImageHeightClass='h-[150px] phone:h-[270px]'
                  productShadowHeightClass='h-[50px] phone:h-[110px]'
                />
              </div>
                <Product
                  name='Toulouse fabric ROUND CHAIR'
                  price='$300.00'
                  classNames='laptop:col-start-3 laptop:col-end-5' 
                  imageLink='/homepage/red_chair.png'
                  shadowLink='/homepage/red_chair_shadow.png'
                  productImageHeightClass='h-[180px] phone:h-[300px] laptop:h-[659px]'
                  productPaddingClass='phone:px-[100px] pt-[50px]'
                  productShadowHeightClass='h-[70px] phone:h-[110px] laptop:h-[250px]'
                />
            </div>
            <div className="grid grid-cols-1 laptop:grid-cols-4 row-start-3 row-span-4 gap-5 w-full">
              <Product
                name='Sleeper Sofa'
                price='$750.00'
                classNames='pt-[30px] laptop:pt-0 laptop:col-start-1 laptop:col-end-3' 
                imageLink='/homepage/white_sofa_product.png'
                shadowLink='/homepage/white_sofa_product_shadow.png'
                productImageHeightClass='h-[150px] phone:h-[270px]'
                productShadowHeightClass='h-[50px] phone:h-[110px]'
              />            
              <div className="grid grids-cols-1 minTablet:grid-cols-2 laptop:col-start-3 laptop:col-end-5 gap-5">
                <Product
                  name='DINING SLIDE CHAIR'
                  price='$225.06'
                  classNames='pt-[30px] laptop:pt-0 minTablet:col-start-1 minTablet:col-end-2' 
                  imageLink='/homepage/chair.png'
                  shadowLink='/homepage/chair_shadow.png'
                  productImageHeightClass='h-[150px] phone:h-[270px]'
                  productShadowHeightClass='h-[50px] phone:h-[110px]'
                />    
                <Product
                  name='CHARLES STOOL'
                  price='$299.00'
                  classNames='pt-[30px] laptop:pt-0 minTablet:col-start-2 minTablet:col-end-3' 
                  imageLink='/homepage/round_chair.png'
                  shadowLink='/homepage/round_chair_shadow.png'
                  productImageHeightClass='h-[150px] phone:h-[270px]'
                  productShadowHeightClass='h-[50px] phone:h-[110px]'
                />    
              </div>
            </div>
          </div>
          <div className={`${plus_jakarta_sans.className} flex flex-col phone:flex-row smartPhone:items-start items-center justify-center w-full`}>
            <button className="w-[161px] border-[1px] border-[#31514D] uppercase text-[#31514D] mt-[50px] phone:mt-[30px] text-[12px] leading-[15.12px] h-[60px] font-[600]">Prev</button>
            <button className="w-[161px] border-[1px] border-[#31514D] uppercase text-[#31514D] mt-[20px] phone:mt-[30px] text-[12px] leading-[15.12px] h-[60px] font-[600] phone:ml-[20px]">Next</button>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#FFE3E3] flex justify-center">
        <div className="relative w-full px-[70px] py-[100px] overflow-x-hidden max-w-[1440px]">
          <div className="flex flex-col">
            <h2 className={`${plus_jakarta_sans.className} leading-[61.74px] text-[#000000] uppercase font-[400] text-[49px]`}><span className="text-[#740000]">50% </span>Discount</h2>
            <h3 className={`${poppins.className} uppercase text-[#740000] text-[73.26px] leading-[109.88px]`}>ROMEO RED SOFA</h3>
            <button className={`${plus_jakarta_sans.className} font-[700] w-[161px] border-[1px] border-[#740000] uppercase text-[#740000] mt-[30px] text-[12px] leading-[15.12px] h-[60px]`}>Buy Now</button>
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
        <div className="w-full px-[70px] pt-[80px] pb-[150px] max-w-[1440px]">
          <div className="grid grid-cols-1 minTablet:grid-cols-2 laptop:grid-cols-4 h-[1800px] minTablet:h-[900px] laptop:h-[400px]">
            <div className="bg-[#F1E3E2] relative">
              <div className="absolute top-[-70px] w-full h-full">
                <Image fill src="/homepage/vase.png" className="object-contain" alt="image of a cactus in a flower pot" />
              </div>
            </div>
            <div className="bg-[#B79971]"></div>
            <div className="bg-[#FAFAFA] relative">
              <Image fill src="/homepage/white_sofa.png" className="object-contain transform scale-x-[-1]" alt="image of a cactus in a flower pot" />
            </div>
            <div className="bg-[#D9D9D9]"></div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
