import React from 'react';
import {
  IonButton,
  IonIcon,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import ProductList from '../products/ProductList';
import './StoreTabs.css';

interface ProductsTabProps {
  onAddProductClick: () => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({ onAddProductClick }) => {
  return (
    <div className="tab-content">
      <div className="add-button-container add-product-button-container">
        <IonButton onClick={onAddProductClick}>
          <IonIcon slot="start" icon={addOutline}></IonIcon>
          Add New Product
        </IonButton>
      </div>
      <ProductList />
    </div>
  );
};

export default ProductsTab;
