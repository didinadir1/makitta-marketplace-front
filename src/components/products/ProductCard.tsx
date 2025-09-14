import {
  createAnimation,
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
import React, {useRef} from 'react';
import './ProductCard.css';
import {ProductDTO} from "@medusajs/types"; // Import the CSS for styling

interface ProductCardProps {
  product: ProductDTO;
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

  const itemRef = useRef<HTMLIonItemSlidingElement>(null);

  const handleCardClick = async () => {
    if (itemRef.current) {
      // Step 1: Open end options with animation
      await itemRef.current.open('end');

      // // Create animation for the end options slide
      const endAnimation = createAnimation()
        .addElement(itemRef.current)
        .duration(300)
        .keyframes([
          {offset: 0, transform: 'translateX(0px)'},
          {offset: 0.5, transform: 'translateX(-15px)'},
          {offset: 1, transform: 'translateX(0px)'}
        ]);

      await endAnimation.play();

      // Step 2: Open start options with animation
      await itemRef.current.open('start');

      // // Create animation for the start options slide
      const startAnimation = createAnimation()
        .addElement(itemRef.current)
        .duration(300)
        .keyframes([
          {offset: 0, transform: 'translateX(0px)'},
          {offset: 0.5, transform: 'translateX(15px)'},
          {offset: 1, transform: 'translateX(0px)'}
        ]).onFinish(() => {
          // Close the sliding item after animation
          itemRef.current?.close();
        });

      await startAnimation.play();

    }

  }

  return (
    <IonItemSliding ref={itemRef}>
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
              <IonImg src={product.thumbnail ?? "public/food-default-image.jpg"} alt={product.title}/>
            </div>
            <div className="product-details">
              <IonLabel>
                <IonText color="dark">
                  <h3 className="product-name">{product.title}</h3>
                </IonText>
              </IonLabel>
              <IonText color="secondary">
                <p className="product-price">
                  ${parseFloat((product.metadata?.basePrice ?? 0) as string).toFixed(2)}
                </p>
              </IonText>
              <IonText color="medium">
                {/* You might want to map category ID to a name here */}
                <p className="product-categories">{product?.categories?.map(category => category.name).join(', ')}</p>
              </IonText>
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
