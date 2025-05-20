import {IonCard, IonIcon, IonImg, IonLabel, IonText} from '@ionic/react';
import {ellipsisVertical} from 'ionicons/icons';
import React from 'react';
import {Product} from '../../types/Product'; // Assuming Product type is defined here
import './ProductCard.css'; // Import the CSS for styling

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  // Placeholder for action menu or edit button
  const handleActionsClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking actions
    console.log('Actions clicked for product:', product.name);
    // Implement action menu logic here later
  };

  // Placeholder for clicking the card to view/edit
  const handleCardClick = () => {
    console.log('Card clicked for product:', product.name);
    // Implement navigation to product detail/edit page here later
  };

  return (
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
              <p className="product-price">${product.basePrice.toFixed(2)}</p> {/* Format price */}
            </IonText>
            <IonText color="medium">
              {/* You might want to map category ID to a name here */}
              <p className="product-category">{product.category}</p>
            </IonText>
          </IonLabel>
        </div>
        <div className="product-actions" onClick={handleActionsClick}>
          <IonIcon icon={ellipsisVertical} size="large"/>
        </div>
      </div>
    </IonCard>
  );
};

export default ProductCard;
