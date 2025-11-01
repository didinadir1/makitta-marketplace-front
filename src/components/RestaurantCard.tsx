import React from 'react';
import {IonCard, IonCardContent, IonCardTitle, IonIcon, IonImg} from '@ionic/react';
import {businessOutline, locationOutline, star, starHalf} from 'ionicons/icons';
import './RestaurantCard.css';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/pagination'; // Import Swiper pagination styles
import '@ionic/react/css/ionic-swiper.css';
import {RestaurantDTO} from "../types/restaurant";


interface RestaurantCardProps {
  restaurant: RestaurantDTO;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({restaurant}) => {
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IonIcon key={`full-${i}`} icon={star} color="warning"/>);
    }
    if (hasHalfStar) {
      stars.push(<IonIcon key="half" icon={starHalf} color="warning"/>);
    }
    for (let i = (fullStars + (hasHalfStar ? 1 : 0)); i < 5; i++) {
      stars.push(<IonIcon key={`empty-${i}`} icon={star} style={{color: 'var(--ion-color-medium-shade)'}}/>);
    }
    return stars;
  };

  const status = restaurant.has_available_products ? "Open" : "Closed";

  return (
    <IonCard className="restaurant-card" routerLink={`/restaurant/${restaurant.id}`}>
      <IonImg src={restaurant.image_url ?? "public/store-default-image.png"} alt={`${restaurant.name} image`}
              className="restaurant-image"/>

      <IonCardContent className="restaurant-card-content"> {/* Content area below image */}
        <div className="restaurant-header">
          <IonCardTitle className="restaurant-name">{restaurant.name}</IonCardTitle>
          <div className="restaurant-rating">
            {/*// todo implement ratings*/}
            {/*{renderRatingStars(restaurant.rating)}*/}
            {/*<span className="rating-text">({restaurant.rating.toFixed(1)})</span>*/}
            {renderRatingStars(4.5)}
            <span className="rating-text">4.5</span>
          </div>
        </div>

        <div className="restaurant-meta-info">
          <div className="info-item">
            <IonIcon icon={locationOutline} slot="start"/>
            {/*// todo implement distance calculation*/}
            <span>1.2 km</span>
          </div>
          <div className={`info-item restaurant-status ${status.toLowerCase()}`}>
            <IonIcon icon={businessOutline} slot="start"/>
            <span>{status}</span>
          </div>
        </div>

        <div className="restaurant-description">
          <p>{restaurant.description}</p>
        </div>

      </IonCardContent>
    </IonCard>
  );
};

export default RestaurantCard;
