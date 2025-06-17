import React, {useState} from 'react';
import {IonFab, IonFabButton, IonIcon, useIonAlert, useIonToast,} from '@ionic/react'; // Import hooks for dialog/toast
import {addOutline} from 'ionicons/icons';
import ProductList from './ProductList';
import ProductFormModal from './ProductFormModal';
import '../store/StoreTabs.css';
import {Dish, mockDishes} from "../../data/mockDishes";

const ProductsTab: React.FC = () => {
  const [presentAlert] = useIonAlert(); // Hook for presenting alerts
  const [presentToast] = useIonToast(); // Hook for presenting toasts
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Dish | undefined>(undefined);

  const handleOpenModal = () => {
    setCurrentProduct(undefined); // Reset for new product
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(undefined);
  };

  const handleEditProduct = (productId: string) => {
    console.log('Edit Product clicked for ID:', productId);
    // Find the product to edit
    const productToEdit = mockDishes.find(p => p.id === productId);
    if (productToEdit) {
      setCurrentProduct(productToEdit);
      setIsModalOpen(true);
    }
  };

  const handleSaveProduct = (product: Partial<Dish>) => {
    console.log('Saving product:', product);
    // Here you would update your state or call an API
    // For now, just show a success toast
    presentToast({
      message: `Product ${currentProduct ? 'updated' : 'added'} successfully`,
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });
    setIsModalOpen(false);
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

    <div className="tab-content">
      <ProductList
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct} // Pass delete handler
      />

      {/* Floating Action Button for Add Product */}
      <IonFab>
        <IonFabButton onClick={handleOpenModal}>
          <IonIcon icon={addOutline}></IonIcon>
        </IonFabButton>
      </IonFab>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={currentProduct}
      />
    </div>
  );
};

export default ProductsTab;
