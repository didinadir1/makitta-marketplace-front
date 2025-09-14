import React, {useState} from 'react';
import {IonFab, IonFabButton, IonIcon, IonLoading, useIonAlert, useIonToast,} from '@ionic/react'; // Import hooks for dialog/toast
import {addOutline} from 'ionicons/icons';
import ProductList from './ProductList';
import ProductFormModal from './ProductFormModal';
import '../store/StoreTabs.css';
import {useUser} from "../../lib/data";
import useRestaurant from "../../lib/data/restaurants";
import {Product} from "../../types/product";
import {useProductActions} from "../../lib/actions/products";

const ProductsTab: React.FC = () => {
  const [presentAlert] = useIonAlert(); // Hook for presenting alerts
  const [presentToast] = useIonToast(); // Hook for presenting toasts
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);

  const {data: user} = useUser();
  const {data: restaurant} = useRestaurant(user?.restaurant_id);
  const {deleteProduct} = useProductActions();

  const handleOpenModal = () => {
    setCurrentProduct(undefined); // Reset for new product
    setIsModalOpen(true);
  };


  const handleEditProduct = (productId: string) => {
    console.log('Edit Product clicked for ID:', productId);
    // Find the product to edit
    const productToEdit = restaurant?.products?.find(p => p.id === productId);
    if (productToEdit) {
      setCurrentProduct(productToEdit);
      setIsModalOpen(true);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    await presentAlert({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: async () => {
            await presentToast({
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
          handler: async () => {
            setIsDeleting(true)
            await deleteProduct({productId: productId, restaurantId: restaurant!.id})
              .finally(() => setIsDeleting(false));
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
        setIsOpen={setIsModalOpen}
        product={currentProduct}
      />
      <IonLoading message="Loading..." isOpen={isDeleting} spinner="circles"/>
    </div>
  );
};

export default ProductsTab;
