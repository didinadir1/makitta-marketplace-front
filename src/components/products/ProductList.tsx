import {IonCol, IonGrid, IonRow} from '@ionic/react';
import React from 'react';
import ProductCard from './ProductCard';
import {useUser} from "../../lib/data";
import useRestaurant from "../../lib/data/restaurants"; // Import the new ProductCard component

interface ProductListProps {
  onEditProduct: (productId: string) => void;
  onDeleteProduct?: (productId: string) => void; // Optional delete function
}

const ProductList: React.FC<ProductListProps> = ({onEditProduct, onDeleteProduct}) => {
  // Use mock data for now
  const {data: user} = useUser();
  const {data: restaurant} = useRestaurant(user?.restaurant_id);

  return (
    <IonGrid>
      <IonRow>
        {restaurant?.products?.map(product => (
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
