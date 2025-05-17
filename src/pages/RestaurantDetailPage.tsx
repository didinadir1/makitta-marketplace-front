import {
  IonBackButton,
  IonButtons,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import {useParams} from 'react-router'; // Import useIonRouter
import {mockRestaurants} from '../data/mockRestaurants';
import {mockDishes} from '../data/mockDishes'; // Import mock dishes
import {businessOutline, locationOutline, star, starHalf} from 'ionicons/icons';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '@ionic/react/css/ionic-swiper.css';
import './RestaurantDetailPage.css'; // Create a new CSS file for this page
import DishCard from '../components/DishCard'; // Import DishCard

interface RestaurantDetailParams {
  id: string;
}

const RestaurantDetailPage: React.FC = () => {
  const {id} = useParams<RestaurantDetailParams>();
  const router = useIonRouter(); // Get the router hook
  const restaurant = mockRestaurants.find(r => r.id === id);

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

  // Filter dishes belonging to this restaurant
  const restaurantDishes = mockDishes.filter(dish => restaurant.dishIds.includes(dish.id));

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

  const handleDishCardClick = (dishId: string) => {
    router.push(`/dish/${dishId}`); // Navigate to the dish detail page
  };


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
        {restaurant.imageUrls.length > 0 && (
          <div className="restaurant-detail-image-slider-container"> {/* Container for slider */}
            <Swiper
              modules={[Pagination]}
              pagination={{clickable: true}}
              initialSlide={0}
              speed={400}
              className="restaurant-detail-slides"
            >
              {restaurant.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <IonImg src={url} alt={`${restaurant.name} image ${index + 1}`} className="restaurant-detail-image"/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="restaurant-detail-content"> {/* Main content container */}
          <div className="restaurant-detail-header-section">
            <IonCardTitle className="restaurant-detail-name">{restaurant.name}</IonCardTitle>
            <div className="restaurant-detail-rating">
              {renderRatingStars(restaurant.rating)}
              <span className="rating-text">({restaurant.rating.toFixed(1)})</span>
            </div>
          </div>

          <div className="restaurant-detail-meta-section">
            <div className="info-item">
              <IonIcon icon={locationOutline} slot="start" color="medium"/>
              <span>{restaurant.distance}</span>
            </div>
            <div className={`info-item restaurant-detail-status ${restaurant.status.toLowerCase()}`}>
              <IonIcon icon={businessOutline} slot="start" color="medium"/>
              <span>{restaurant.status}</span>
            </div>
          </div>

          <div className="restaurant-detail-cuisine-section">
            {restaurant.cuisine.map((tag, index) => (
              <IonChip key={index} outline={true} color="secondary">
                {tag}
              </IonChip>
            ))}
          </div>

          {restaurant.description && (
            <div className="restaurant-detail-description-section">
              <h3>About {restaurant.name}</h3>
              <p>{restaurant.description}</p>
            </div>
          )}

          <div className="restaurant-dishes-section">
            <h3>Dishes from {restaurant.name}</h3>
            {restaurantDishes.length > 0 ? (
              <div className="dishes-swiper-container"> {/* Container for horizontal dish list */}
                <Swiper
                  slidesPerView={'auto'} // Show as many as fit
                  spaceBetween={15} // Space between dish cards
                  effect={'cards'}
                  modules={[EffectCards]}
                  grabCursor
                  className="mySwiper">

                  {restaurantDishes.map(dish => (
                    <SwiperSlide key={dish.id} className="dish-swiper-slide"> {/* Style individual slides */}
                      <DishCard dish={dish} onClick={handleDishCardClick} /> {/* Pass isCompact prop */}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <p>No dishes available from this restaurant yet.</p>
            )}
          </div>

          {/* Add a section for reviews if needed later */}
          {/* <div className="restaurant-detail-reviews-section">
            <h3>Reviews</h3>
            </div> */}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantDetailPage;
