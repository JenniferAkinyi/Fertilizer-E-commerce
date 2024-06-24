import React from 'react'
import { Hero } from '../Components/Hero/Hero'
import { NewsLetter } from '../Components/NewsLetter/NewsLetter'
import { Products } from '../Components/Products/Products'


export const Shop = () => {
  return (
    <div>
      <Hero/>
      <Products/>
      <NewsLetter/>
    </div>
  )
}
