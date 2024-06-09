import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { Popular } from '../Components/Popular/Popular'
import { Offers } from '../Components/Offers/Offers'
import { NewsLetter } from '../Components/NewsLetter/NewsLetter'
import { Products } from '../Components/Products/Products'


export const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/> 
      <Offers/>
      <Products/>
      <NewsLetter/>
    </div>
  )
}
