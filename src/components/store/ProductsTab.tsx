import React from 'react';
import {IonContent, IonFab, IonFabButton, IonIcon, IonPage,} from '@ionic/react';
import {addOutline} from 'ionicons/icons';
import ProductList from '../products/ProductList';
import './StoreTabs.css';

interface ProductsTabProps {
  onAddProductClick: () => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({onAddProductClick}) => {
  return (
        <div className="tab-content">
          <ProductList/>

          {/* Floating Action Button for Add Product */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={onAddProductClick}>
              <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </div>
  );
};

export default ProductsTab;
