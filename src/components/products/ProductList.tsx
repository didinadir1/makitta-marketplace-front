import {IonCol, IonGrid, IonRow} from '@ionic/react';
import React from 'react';
import ProductCard from './ProductCard';
import {useProducts} from "../../vendor/api"; // Import the new ProductCard component

interface ProductListProps {
  onEditProduct: (productId: string) => void;
  onDeleteProduct?: (productId: string) => void; // Optional delete function
}

const ProductList: React.FC<ProductListProps> = ({onEditProduct, onDeleteProduct}) => {
  // Use mock data for now
  const {products} = useProducts()

  return (
    <IonGrid>
      <IonRow>
        {products?.map(product => (
          <IonCol size="12" sizeMd="6" sizeLg="4" sizeXl="3" key={product.id}>
            <ProductCard
              product={product}
              onEditClick={onEditProduct}
              onDeleteClick={onDeleteProduct}
            />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default ProductList;
