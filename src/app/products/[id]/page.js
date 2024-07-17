// 'use client'
import React from 'react';
import ClientSidePage from './client_side_page';

async function getData(productId) {
  const res = await fetch(
    `http://localhost:3001/proxy/single/${productId}`
  );
  

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  };

  async function getAllData() {
    const res = await fetch(
      `http://localhost:3001/proxy/all`
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
