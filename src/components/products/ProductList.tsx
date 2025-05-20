import { IonList } from '@ionic/react';
import React from 'react';
import { Product } from '../../types/Product'; // Assuming Product type is defined here
import { mockProducts } from '../../data/mockProducts'; // Import mock products
import ProductCard from './ProductCard'; // Import the new ProductCard component

const ProductList: React.FC = () => {
  // Use mock data for now
  const products: Product[] = mockProducts;

  return (
    <IonList lines="none"> {/* Remove default list lines */}
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </IonList>
  );
};

export default ProductList;
