import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonChip, IonIcon, IonBadge } from '@ionic/react';
import { star, starHalf, locationOutline, timeOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from "swiper/modules"; // Import Pagination module
import { Dish } from '../data/mockDishes'; // Assuming mockDishes.ts is in src/data
import './DishCard.css';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/pagination'; // Import Swiper pagination styles
import '@ionic/react/css/ionic-swiper.css';


interface DishCardProps {
  dish: Dish;
  onClick: (dishId: string) => void; // Added onClick prop
}

const DishCard: React.FC<DishCardProps> = ({ dish, onClick }) => { // Destructure onClick
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
    <div onClick={() => onClick(dish.id)}> {/* Wrap with a clickable div */}
      <IonCard className="dish-card">
        {dish.imageUrls.length > 0 && (
          <Swiper
            modules={[Pagination]}
            pagination={true}
            initialSlide={0}
            speed={400}
            className="dish-slides">
            {dish.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <IonImg src={url} alt={`${dish.name} image ${index + 1}`} className="dish-image" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <IonCardHeader>
          <div className="dish-title-price">
            <IonCardTitle>{dish.name}</IonCardTitle>
            <IonBadge color="success" className="dish-price">{dish.price}</IonBadge>
          </div>
          <div className="dish-rating"> {/* Keep this structure for styling */}
            {renderRatingStars(dish.rating)}
            <span className="rating-text">({dish.rating.toFixed(1)})</span>
          </div>
        </IonCardHeader>
        <IonCardContent>
          <div className="dish-tags">
            {dish.tags.map((tag, index) => (
              <IonChip key={index} outline={true} color="primary">
                {tag}
              </IonChip>
            ))}
          </div>
          <div className="dish-info">
            <div className="info-item">
              <IonIcon icon={locationOutline} slot="start" color="medium" />
              <span>{dish.distance}</span>
            </div>
            <div className="info-item">
              <IonIcon icon={timeOutline} slot="start" color="medium" />
              <span>{dish.timeToReady}</span>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default DishCard;
