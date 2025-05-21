import {IonList} from '@ionic/react';
import React from 'react';
import {Product} from '../../types/Product'; // Assuming Product type is defined here
import {mockProducts} from '../../data/mockProducts'; // Import mock products
import ProductCard from './ProductCard'; // Import the new ProductCard component

interface ProductListProps {
  onEditProduct: (productId: string) => void;
  onDeleteProduct?: (productId: string) => void; // Optional delete function
}

const ProductList: React.FC<ProductListProps> = ({onEditProduct, onDeleteProduct}) => {
  // Use mock data for now
  const products: Product[] = mockProducts;

  return (
    <IonList lines="none"> {/* Remove default list lines */}
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEditClick={onEditProduct}
          onDeleteClick={onDeleteProduct} // Pass delete handler
        />
      ))}
    </IonList>
  );
};

export default ProductList;
