import React from 'react';
import {IonContent, IonFab, IonFabButton, IonIcon, IonPage, useIonAlert, useIonToast,} from '@ionic/react'; // Import hooks for dialog/toast
import {addOutline} from 'ionicons/icons';
import ProductList from '../products/ProductList';
import './StoreTabs.css';

interface ProductsTabProps {
  onAddProductClick: () => void;
}

const ProductsTab: React.FC<ProductsTabProps> = ({onAddProductClick}) => {
  const [presentAlert] = useIonAlert(); // Hook for presenting alerts
  const [presentToast] = useIonToast(); // Hook for presenting toasts

  const handleEditProduct = (productId: string) => {
    console.log('Edit Product clicked for ID:', productId);
    // Implement logic to navigate to product form or open modal for editing
  };

  const handleDeleteProduct = (productId: string) => {
    presentAlert({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            presentToast({
              message: 'Deletion cancelled',
              duration: 1500,
              position: 'bottom',
              color: 'medium',
            });
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Deleting product with ID:', productId);
            // Implement actual deletion logic here
            // For now, just show a success toast
            presentToast({
              message: 'Product deleted successfully',
              duration: 1500,
              position: 'bottom',
              color: 'success',
            });
          },
        },
      ],
    });
  };


  return (
    <IonPage> {/* Wrap content in IonPage */}
      <IonContent fullscreen> {/* Wrap content in IonContent */}
        <div className="tab-content">
          <h2 className="section-title">Manage Your Products</h2> {/* Added section title */}
          <ProductList
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct} // Pass delete handler
          />

          {/* Floating Action Button for Add Product */}
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={onAddProductClick}>
              <IonIcon icon={addOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductsTab;
