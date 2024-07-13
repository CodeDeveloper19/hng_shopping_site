// 'use client'
import React from 'react';
import ClientSidePage from './client_side_page';

async function getData(productId) {
    const res = await fetch(
      `https://timbu-get-single-product.reavdev.workers.dev/${productId}?organization_id=6184b8f87d2f4caead13337fea84c139&Appid=S8GLLN23AENH8KZ&Apikey=48d28e6ce3f64e64ad46cc4e1c8cbafb20240712201541919159`,
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  };


export default async function CartProduct({ params }) {
    const { id } = params;
    const splitUrl = id.split('_');
    const data = await getData(splitUrl[0]);

    return (
        <>
            <ClientSidePage data={data} price={splitUrl[1]} />
        </>
    )
}
