import {IonList} from '@ionic/react';
import React from 'react';
import ProductCard from './ProductCard';
import {Dish, mockDishes} from "../../data/mockDishes"; // Import the new ProductCard component

interface ProductListProps {
  onEditProduct: (productId: string) => void;
  onDeleteProduct?: (productId: string) => void; // Optional delete function
}

const ProductList: React.FC<ProductListProps> = ({onEditProduct, onDeleteProduct}) => {
  // Use mock data for now
  const products: Dish[] = mockDishes;

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
