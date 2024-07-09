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
    <section>
      <div className="px-[70px] w-full h-fit">
        <div className={`${plus_jakarta_sans.className} relative w-full bg-[#F3F3F3] pt-[30px] flex justify-center`}>
          <div className=" relative w-fit h-fit flex flex-col items-center min-h-[520px]">
            <h2 className="text-[35px] leading-[44.1px] text-[#31514D] max-w-[762px] text-center font-[600]">We Transform Your Homes, One Furniture at a Time</h2>
            <button className="w-[161px] border-[1px] border-[#31514D] uppercase text-[#31514D] mt-[30px] text-[12px] leading-[15.12px] h-[60px] font-[600]">View More</button>
            <div className="w-[800px] h-[500px] absolute mt-[20px]">
              <Image fill src="/homepage/couch.png" className="object-contain" alt="image of a couch" />
            </div>
            <div className="w-[155px] h-[155px] absolute left-[-50px] bottom-[70px]">
              <Image fill src="/homepage/stool.png" className="object-contain" alt="image of a stool" />
            </div>
          </div>
          <div className="w-full h-[136px] absolute bottom-[25px]">
              <Image fill src="/homepage/shadow.png" className="object-contain" alt="image of a shadow" />
          </div>
          <div className="w-[177px] h-[265.5px] absolute top-0 right-[60px]">
              <Image fill src="/homepage/lighting.png" className="object-contain" alt="image of a hanging lighting" />
          </div>
        </div>
      </div>
      <div className="pt-[80px] pb-[30px] px-[70px] flex flex-col items-center">
        <div className="grid grid-rows-3 gap-5 w-full">
          <div className="grid row-start-1 row-end-3 grid-cols-4 gap-5">
            <div className="grid col-start-1 col-end-3 grid-cols-2 gap-5">
              <Product
                name='CURVED WALNUT DINING CHAIR'
                price='$356.00'
                classNames='' 
                imageLink='/homepage/white_chair.png'
                shadowLink='/homepage/white_chair_shadow.png'
              />
              <Product
                name='ROUND ELM STOOL'
                price='$300.00'
                classNames='' 
                imageLink='/homepage/round_table.png'
                shadowLink='/homepage/round_table_shadow.png'
              />
              <Product
                name='OAK WOOD WALL CLOCK'
                price='$500.00'
                classNames='' 
                imageLink='/homepage/wall_clock.png'
                shadowLink='/homepage/wall_clock_shadow.png'
              />
              <Product
                name='CATERPILLAR SOFA COUCH'
                price='$375.50'
                classNames='' 
                imageLink='/homepage/caterpillar_sofa.png'
                shadowLink='/homepage/caterpillar_sofa_shadow.png'
              />
            </div>
              <Product
                name='Toulouse fabric ROUND CHAIR'
                price='$300.00'
                classNames='col-start-3 col-end-5' 
                imageLink='/homepage/red_chair.png'
                shadowLink='/homepage/red_chair_shadow.png'
              />
          </div>
          <div className="grid grid-cols-4 row-start-3 row-span-4 gap-5 w-full">
            <Product
              name='Sleeper Sofa'
              price='$750.00'
              classNames='col-start-1 col-end-3' 
              imageLink='/homepage/white_sofa_product.png'
              shadowLink='/homepage/white_sofa_product_shadow.png'
            />            
            <div className="grid grid-cols-2 col-start-3 col-end-5 gap-5">
              <Product
                name='DINING SLIDE CHAIR'
                price='$225.06'
                classNames='col-start-1 col-end-2' 
                imageLink='/homepage/chair.png'
                shadowLink='/homepage/chair_shadow.png'
              />    
              <Product
                name='CHARLES STOOL'
                price='$299.00'
                classNames='col-start-2 col-end-3' 
                imageLink='/homepage/round_chair.png'
                shadowLink='/homepage/round_chair_shadow.png'
              />    
            </div>
          </div>
        </div>
        <div className={`${plus_jakarta_sans.className} flex flex-row`}>
          <button className="w-[161px] border-[1px] border-[#31514D] uppercase text-[#31514D] mt-[30px] text-[12px] leading-[15.12px] h-[60px] font-[600]">Prev</button>
          <button className="w-[161px] border-[1px] border-[#31514D] uppercase text-[#31514D] mt-[30px] text-[12px] leading-[15.12px] h-[60px] font-[600] ml-[20px]">Next</button>
        </div>
      </div>
      <div className="relative bg-[#FFE3E3] w-full px-[70px] py-[100px] overflow-x-hidden">
        <div className="flex flex-col">
          <h2 className={`${plus_jakarta_sans.className} leading-[61.74px] text-[#000000] uppercase font-[400] text-[49px]`}><span className="text-[#740000]">50% </span>Discount</h2>
          <h3 className={`${poppins.className} uppercase text-[#740000] text-[73.26px] leading-[109.88px]`}>ROMEO RED SOFA</h3>
          <button className={`${plus_jakarta_sans.className} font-[700] w-[161px] border-[1px] border-[#740000] uppercase text-[#740000] mt-[30px] text-[12px] leading-[15.12px] h-[60px]`}>Buy Now</button>
        </div>
        <div className="w-[650px] h-[650px] absolute bottom-[70px] right-[-80px]">
          <Image fill src="/homepage/red_sofa.png" className="object-contain" alt="image of a stool" />
        </div>
        <div className="w-[650px] h-[67px] absolute bottom-[90px] right-0">
          <Image fill src="/homepage/shadow_red.png" className="object-cover" alt="image of a stool" />
        </div>
      </div>
      <div className="w-full px-[70px] pt-[80px] pb-[150px]">
        <div className="grid grid-cols-4 h-[400px]">
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
    </section>
    </>
  );
}
