'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

export default function ImageComponent(props) {
    const { imageUrl, linkUrl } = props;
  return (
    <Link href={linkUrl}><Image unoptimized loader={() => imageUrl} fill src={imageUrl} className="object-contain" alt="image of a product" /></Link>
)
}
