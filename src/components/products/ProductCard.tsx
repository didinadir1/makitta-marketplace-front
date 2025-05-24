import {
  IonCard,
  IonIcon,
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonText,
} from '@ionic/react';
import {createOutline, trashOutline} from 'ionicons/icons';
import React from 'react';
import './ProductCard.css';
import {Dish} from "../../data/mockDishes"; // Import the CSS for styling

interface ProductCardProps {
  product: Dish;
  onEditClick: (productId: string) => void;
  onDeleteClick?: (productId: string) => void; // Optional delete handler
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                   product,
                                                   onEditClick,
                                                   onDeleteClick,
                                                 }) => {
  const handleEditClick = () => {
    onEditClick(product.id);
    // Close the sliding item after action (optional, but good UX)
    // You might need a ref to the IonItemSliding for this
  };

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(product.id);
    }
    // Close the sliding item after action (optional, but good UX)
    // You might need a ref to the IonItemSliding for this
  };

  // Placeholder for clicking the card to view/edit (if still needed)
  const handleCardClick = () => {
    console.log('Card clicked for product:', product.name);
    // Implement navigation to product detail/edit page here later
    // Note: This might conflict with swipe actions, consider if card click is still desired
  };

  return (
    <IonItemSliding>
      {/* Options for swiping right (start) */}
      <IonItemOptions side="start" className="item-option-start">
        <IonItemOption color="danger" onClick={handleDeleteClick}>
          <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
          {/* <IonLabel>Delete</IonLabel> Add label if preferred */}
        </IonItemOption>
      </IonItemOptions>

      {/* The actual card content */}
      {/* Wrap the card in an IonItem for better integration with sliding */}
      <IonItem lines="none" className="ion-no-padding">
        <IonCard className="product-card" onClick={handleCardClick}>
          <div className="product-card-content">
            <div className="product-thumbnail">
              {/* Use the first image URL from the array */}
              <IonImg src={product.imageUrls[0]} alt={product.name}/>
            </div>
            <div className="product-details">
              <IonLabel>
                <IonText color="dark">
                  <h3 className="product-name">{product.name}</h3>
                </IonText>
                <IonText color="secondary">
                  <p className="product-price">${parseFloat(product.basePrice).toFixed(2)}</p>{' '}
                  {/* Format price */}
                </IonText>
                <IonText color="medium">
                  {/* You might want to map category ID to a name here */}
                  {/*todo fix : display all categories*/}
                  <p className="product-category">{product.categories[0].name}</p>
                </IonText>
              </IonLabel>
            </div>
            {/* Removed the old actions icon */}
            {/* <div className="product-actions" onClick={handleActionsClick}>
              <IonIcon icon={ellipsisVertical} size="large"></IonIcon>
            </div> */}
          </div>
        </IonCard>
      </IonItem>

      {/* Options for swiping left (end) */}
      <IonItemOptions side="end" className="item-option-end">
        <IonItemOption color="primary" onClick={handleEditClick}>
          <IonIcon slot="icon-only" icon={createOutline}></IonIcon>
          {/* <IonLabel>Edit</IonLabel> Add label if preferred */}
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ProductCard;
