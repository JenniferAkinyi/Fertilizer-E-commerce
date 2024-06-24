import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { Breadcrumb } from '../Components/Breadcrumbs/Breadcrumb';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox';
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts';

export const Product = () => {
  const { allProduct } = useContext(ShopContext);
  const { productid } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (allProduct.length > 0) {
      const foundProduct = allProduct.find(e => e.id === productid);
      setProduct(foundProduct);
    }
  }, [allProduct, productid]);

  if (!product) {
    return <div>Loading product...</div>; // Show loading state while product is being fetched
  }

  return (
    <div>
      {/* <Breadcrumb product={product} /> */}
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};
