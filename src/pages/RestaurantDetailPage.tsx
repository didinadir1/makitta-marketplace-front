import {
  IonBackButton,
  IonButtons,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {useParams} from 'react-router';
import {businessOutline, locationOutline, star, starHalf} from 'ionicons/icons';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '@ionic/react/css/ionic-swiper.css';
import './RestaurantDetailPage.css'; // Create a new CSS file for this page
import DishCard from '../components/DishCard';
import useRestaurant from "../lib/data/restaurants"; // Import DishCard

interface RestaurantDetailParams {
  id: string;
}

const RestaurantDetailPage: React.FC = () => {
  const {id} = useParams<RestaurantDetailParams>();
  const {data: restaurant} = useRestaurant(id);

  if (!restaurant) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/restaurants"/>
            </IonButtons>
            <IonTitle>Restaurant Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <p>The requested restaurant could not be found.</p>
        </IonContent>
      </IonPage>
    );
  }

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
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/restaurants"/>
          </IonButtons>
          <IonTitle>{restaurant.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="restaurant-detail-image-container"> {/* Container for slider */}
          <IonImg src={restaurant.image_url} alt={`${restaurant.name} image`} className="restaurant-detail-image"/>
        </div>

        <div className="restaurant-detail-content"> {/* Main content container */}
          <div className="restaurant-detail-header-section">
            <IonCardTitle className="restaurant-detail-name">{restaurant.name}</IonCardTitle>
            <div className="restaurant-detail-rating">
              {/*todo implement ratings*/}
              {/*{renderRatingStars(restaurant.rating)}*/}
              {/*<span className="rating-text">({restaurant.rating.toFixed(1)})</span>*/}
              {renderRatingStars(4.5)}
              <span className="rating-text">4.5</span>
            </div>
          </div>

          <div className="restaurant-detail-meta-section">
            <div className="info-item">
              {/*todo implement distance calculation*/}
              {/*<IonIcon icon={locationOutline} slot="start" color="medium"/>*/}
              {/*<span>{restaurant.distance}</span>*/}
              <IonIcon icon={locationOutline} slot="start" color="medium"/>
              <span>1.2 km</span>
            </div>
            <div className={`info-item restaurant-detail-status ${status.toLowerCase()}`}>
              <IonIcon icon={businessOutline} slot="start" color="medium"/>
              <span>{status}</span>
            </div>
          </div>

          {restaurant.description && (
            <div className="restaurant-detail-description-section">
              <h3>About</h3>
              <p>{restaurant.description}</p>
            </div>
          )}

          <div className="restaurant-dishes-section">
            <h3>Proposed Dishes</h3>
            {restaurant.products && restaurant.products.length > 0 ? (
              <div className="dishes-swiper-container"> {/* Container for horizontal dish list */}
                <Swiper
                  slidesPerView={'auto'} // Show as many as fit
                  spaceBetween={15} // Space between dish cards
                  effect={'cards'}
                  modules={[EffectCards]}
                  grabCursor
                >

                  {restaurant.products.map(dish => (
                    <SwiperSlide key={dish.id} className="dish-swiper-slide"> {/* Style individual slides */}
                      <DishCard dish={dish} isCompact/> {/* Pass isCompact prop */}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <p>No dishes available from this restaurant yet.</p>
            )}
          </div>

          {/* todo Add a section for reviews if needed later */}
          {/* <div className="restaurant-detail-reviews-section">
            <h3>Reviews</h3>
            </div> */}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantDetailPage;
