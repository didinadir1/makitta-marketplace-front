import React from 'react';
import {IonCard, IonCardContent, IonCardTitle, IonChip, IonIcon, IonImg} from '@ionic/react';
import {businessOutline, locationOutline, star, starHalf} from 'ionicons/icons';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules'; // Import Pagination module
import {Restaurant} from '../data/mockRestaurants';
import './RestaurantCard.css';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/pagination'; // Import Swiper pagination styles
import '@ionic/react/css/ionic-swiper.css';


interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurantId: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({restaurant, onClick}) => {
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

  return (
    <div onClick={() => onClick(restaurant.id)}>
      <IonCard className="restaurant-card">
        {restaurant.imageUrls.length > 0 && (
            <Swiper
              modules={[Pagination]}
              pagination={{clickable: true}}
              initialSlide={0}
              speed={400}
              className="restaurant-slides"
            >
              {restaurant.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <IonImg src={url} alt={`${restaurant.name} image ${index + 1}`} className="restaurant-image"/>
                </SwiperSlide>
              ))}
            </Swiper>
        )}

        <IonCardContent className="restaurant-card-content"> {/* Content area below image */}
          <div className="restaurant-header">
            <IonCardTitle className="restaurant-name">{restaurant.name}</IonCardTitle>
            <div className="restaurant-rating">
              {renderRatingStars(restaurant.rating)}
              <span className="rating-text">({restaurant.rating.toFixed(1)})</span>
            </div>
          </div>

          <div className="restaurant-meta-info">
            <div className="info-item">
              <IonIcon icon={locationOutline} slot="start" color="medium"/>
              <span>{restaurant.distance}</span>
            </div>
            <div className={`info-item restaurant-status ${restaurant.status.toLowerCase()}`}>
              <IonIcon icon={businessOutline} slot="start" color="medium"/>
              <span>{restaurant.status}</span>
            </div>
          </div>

          <div className="restaurant-cuisine">
            {restaurant.cuisine.map((tag, index) => (
              <IonChip key={index} outline={true} color="secondary"> {/* Use secondary color for cuisine */}
                {tag}
              </IonChip>
            ))}
          </div>

          {restaurant.description && (
            <div className="restaurant-description">
              <p>{restaurant.description}</p>
            </div>
          )}

        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default RestaurantCard;
