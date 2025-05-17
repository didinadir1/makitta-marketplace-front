import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonChip, IonIcon, IonBadge, IonButton } from '@ionic/react'; // Import IonButton
import { star, starHalf, locationOutline, timeOutline, cartOutline } from 'ionicons/icons'; // Import cartOutline icon
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination} from "swiper/modules"; // Import Pagination module
import { Dish } from '../data/mockDishes'; // Assuming mockDishes.ts is in src/data
import './DishCard.css';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/pagination'; // Import Swiper pagination styles
import '@ionic/react/css/ionic-swiper.css';
import { useCart } from '../state/cartState'; // Import the useCart hook
import { useIonToast } from '@ionic/react'; // Import useIonToast hook


interface DishCardProps {
  dish: Dish;
  onClick: (dishId: string) => void; // Added onClick prop
  isCompact?: boolean; // Added prop for compact styling
}

const DishCard: React.FC<DishCardProps> = ({ dish, onClick, isCompact = false }) => { // Destructure and provide default
  const { addItem } = useCart(); // Use the addItem function from the cart state
  const [presentToast] = useIonToast(); // Use the useIonToast hook

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation to prevent card click
    addItem(dish); // Add the current dish to the cart
    presentToast({ // Present the toast
      message: `${dish.name} added to cart!`,
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });
  };


  return (
    <div onClick={() => onClick(dish.id)}> {/* Wrap with a clickable div */}
      <IonCard className={`dish-card ${isCompact ? 'compact' : ''}`}> {/* Apply compact class */}
        {dish.imageUrls.length > 0 && (
          <div className="dish-image-container"> {/* Use a simple container for compact mode image */}
             <IonImg src={dish.imageUrls[0]} alt={`${dish.name} image`} className="dish-image" /> {/* Display first image */}
          </div>
        )}
        <IonCardHeader>
          <div className="dish-title-price">
            <IonCardTitle>{dish.name}</IonCardTitle>
            <IonBadge color="success" className="dish-price">{dish.price}</IonBadge>
          </div>
          {!isCompact && ( // Conditionally hide rating in non-compact mode
            <div className="dish-rating"> {/* Keep this structure for styling */}
              {renderRatingStars(dish.rating)}
              <span className="rating-text">({dish.rating.toFixed(1)})</span>
            </div>
          )}
        </IonCardHeader>
        {!isCompact && ( // Conditionally hide content in non-compact mode
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
             <IonButton
                shape="round"
                size="small"
                className="add-to-cart-button-card"
                onClick={handleAddToCart} // Add click handler
              >
                <IonIcon icon={cartOutline} slot="icon-only" />
              </IonButton>
          </IonCardContent>
        )}
      </IonCard>
    </div>
  );
};

export default DishCard;
