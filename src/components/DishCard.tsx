import React from 'react';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonImg,
  useIonToast
} from '@ionic/react'; // Import IonButton // Import useIonToast hook
import {cartOutline, locationOutline, star, starHalf, timeOutline} from 'ionicons/icons'; // Import cartOutline icon
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from "swiper/modules"; // Import Pagination module
import './DishCard.css';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/pagination'; // Import Swiper pagination styles
import '@ionic/react/css/ionic-swiper.css';
import {useCart} from '../state/cartState';
import {Size} from "../data/mockDishes";
import {Product} from "../types/product"; // Import the useCart hook


interface DishCardProps {
  dish: Product;
  isCompact?: boolean;
}

const DishCard: React.FC<DishCardProps> = ({dish, isCompact = false}) => { // Destructure and provide default
  const {addItem} = useCart(); // Use the addItem function from the cart state
  const [presentToast] = useIonToast(); // Use the useIonToast hook

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation to prevent card click
    e.preventDefault();
    addItem(dish); // Add the current dish to the cart
    presentToast({ // Present the toast
      message: `${dish.title} added to cart!`,
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });
  };


  return (
    <IonCard className={`dish-card`} routerLink={`/dish/${dish.id}`}> {/* Apply compact class */}
      {
        isCompact ? (
          <div className="dish-image-container"> {/* Use a simple container for compact mode image */}
            <IonImg src={dish.thumbnail ?? "public/food-default-image.png"} alt={`${dish.title} image`}
                    className="dish-image"/> {/* Display first image */}
          </div>
        ) : (
          <Swiper
            modules={[Pagination]}
            pagination={true} // Only show pagination in non-compact mode
            initialSlide={0}
            speed={400}
            className="dish-slides">
            {dish.images && dish.images.length > 0 ? (dish.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <IonImg src={image.url} alt={`${dish.title} image ${index + 1}`} className="dish-image"/>
                </SwiperSlide>
              ))) :
              (
                <SwiperSlide>
                  <IonImg src={dish.thumbnail ?? "public/food-default-image.png"} alt={`${dish.title} image`}
                          className="dish-image"/>
                </SwiperSlide>

              )}
          </Swiper>
        )}
      <div className="dish-card-header">
        <div className="dish-title-price">
          <IonCardTitle className="dish-name">{dish.title}</IonCardTitle>
          {/*todo handle price currency*/}
          <IonBadge color="success" className="dish-price">
            {`${dish.metadata?.sizes?.find((size) => size.title === Size.STANDARD)?.price} $`}
          </IonBadge>
        </div>
        <div className="dish-rating">
          {/*todo implement ratings*/}
          {/*{renderRatingStars(dish.rating)}*/}
          {/*<span className="rating-text">({dish.rating.toFixed(1)})</span>*/}
          {renderRatingStars(4.5)}
          <span className="rating-text">4.5</span>
        </div>
      </div>
      <IonCardContent>
        <div className="dish-tags">
          {dish.categories?.slice(0, 2).map(({name}, index) => (
            <IonChip key={index} outline={true} color="secondary">
              {name}
            </IonChip>
          ))}
          {dish.categories && dish.categories.length > 2 && (
            <IonChip outline={true} color="secondary">
              ...+{dish.categories.length - 2}
            </IonChip>
          )}
        </div>
        <div className="dish-info">
          <div className="info-item">
            <IonIcon icon={locationOutline} slot="start"/>
            {/*todo implement distance*/}
            <span>1.2 km</span>
          </div>
          <div className="info-item">
            <IonIcon icon={timeOutline} slot="start"/>
            <IonChip
              color={dish.is_currently_available ? "success" : "tertiary"}>
              {dish.is_currently_available
                ? "Available"
                : "Unavailable"}
            </IonChip>
          </div>
          <IonButton
            disabled={!dish.is_currently_available}
            shape="round"
            size={isCompact ? "small" : "default"}
            className="add-to-cart-button-card"
            onClick={handleAddToCart} // Add click handler
          >
            <IonIcon icon={cartOutline} slot="icon-only"/>
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default DishCard;
