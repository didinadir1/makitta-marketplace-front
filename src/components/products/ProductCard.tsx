import {
  createAnimation,
  IonCard,
  IonChip,
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
import {AdminProduct} from "@medusajs/types"; // Import the CSS for styling

interface ProductCardProps {
  product: AdminProduct;
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
    itemRef.current?.close()
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

  // Helper to format price
  const formatPrice = (price: number | undefined) => {
    if (!price) return 'N/A';
    return `$${price.toFixed(2)}`;
  };

  // Get the first variant's price if available
  const price = product.variants?.[0]?.prices?.[0]?.amount ? product.variants[0].prices[0].amount / 100 : undefined;

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
              <IonImg src={product.thumbnail ?? "public/food-default-image.png"} alt={product.title}/>
            </div>
            <div className="product-details">
              <IonLabel>
                <IonText color="dark">
                  <h3 className="product-title">{product.title}</h3>
                </IonText>
              </IonLabel>
              <div className="product-meta">
                <IonText color="primary" className="product-price">
                  {formatPrice(price)}
                </IonText>
                <IonChip color="success" className="product-status">
                  {product.status === 'published' ? 'Active' : 'Draft'}
                </IonChip>
              </div>
              <IonText color="medium" className="product-description">
                {product.description ? product.description.substring(0, 80) + '...' : 'No description available'}
              </IonText>
              <IonText color="medium" className="product-categories">
                {/* You might want to map category ID to a name here */}
                Categories: {product?.categories?.map(category => category.name).join(', ') || 'None'}
              </IonText>
            </div>
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
