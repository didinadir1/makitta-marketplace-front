import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonChip, IonIcon, IonBadge } from '@ionic/react';
import { star, starHalf, locationOutline, timeOutline, businessOutline } from 'ionicons/icons'; // Added businessOutline icon
import { Restaurant } from '../data/mockRestaurants';
import './RestaurantCard.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurantId: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IonIcon key={`full-${i}`} icon={star} color="warning" />);
    }
    if (hasHalfStar) {
      stars.push(<IonIcon key="half" icon={starHalf} color="warning" />);
    }
    for (let i = (fullStars + (hasHalfStar ? 1 : 0)); i < 5; i++) {
      stars.push(<IonIcon key={`empty-${i}`} icon={star} style={{ color: 'var(--ion-color-medium-shade)' }} />);
    }
    return stars;
  };

  return (
    <div onClick={() => onClick(restaurant.id)}>
      <IonCard className="restaurant-card">
        {restaurant.imageUrl && (
          <IonImg src={restaurant.imageUrl} alt={`${restaurant.name} image`} className="restaurant-image" />
        )}
        <IonCardHeader>
          <div className="restaurant-title-rating">
            <IonCardTitle>{restaurant.name}</IonCardTitle>
            <div className="restaurant-rating">
              {renderRatingStars(restaurant.rating)}
              <span className="rating-text">({restaurant.rating.toFixed(1)})</span>
            </div>
          </div>
        </IonCardHeader>
        <IonCardContent>
          <div className="restaurant-cuisine">
            {restaurant.cuisine.map((tag, index) => (
              <IonChip key={index} outline={true} color="primary">
                {tag}
              </IonChip>
            ))}
          </div>
          <div className="restaurant-info">
            <div className="info-item">
              <IonIcon icon={locationOutline} slot="start" color="medium" />
              <span>{restaurant.distance}</span>
            </div>
            {/* Display status instead of delivery time */}
            <div className={`info-item restaurant-status ${restaurant.status.toLowerCase()}`}>
              <IonIcon icon={businessOutline} slot="start" color="medium" /> {/* Changed icon */}
              <span>{restaurant.status}</span>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default RestaurantCard;
