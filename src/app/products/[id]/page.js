// 'use client'
import React from 'react';
import ClientSidePage from './client_side_page';

async function getData(productId) {
  const res = await fetch(
    `https://timbu-get-single-product.reavdev.workers.dev/${productId}?organization_id=${process.env.NEXT_PUBLIC_ORGANIZATION_ID}&Appid=${process.env.NEXT_PUBLIC_APP_ID}&Apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
  );
  

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  };

  async function getAllData() {
    const res = await fetch(
      `https://timbu-get-all-products.reavdev.workers.dev/?organization_id=${process.env.NEXT_PUBLIC_ORGANIZATION_ID}&reverse_sort=false&Appid=${process.env.NEXT_PUBLIC_APP_ID}&Apikey=${process.env.NEXT_PUBLIC_API_KEY}&page=1&size=30`,
    )
    
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  };


export default async function CartProduct({ params }) {
    const { id } = params;
    const splitUrl = id.split('_');
    const data = await getData(splitUrl[0]);
    const allData = await getAllData();

    return (
        <>
            <ClientSidePage allData={allData.items} data={data} price={splitUrl[1]} />
        </>
    )
}
