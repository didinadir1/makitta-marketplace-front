import {
  IonBackButton,
  IonBadge,
  IonButton,
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
  useIonToast,
} from '@ionic/react';
import {useParams} from 'react-router';
import {cartOutline, locationOutline, star, starHalf, timeOutline} from 'ionicons/icons'; // Changed icon to cartOutline
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '@ionic/react/css/ionic-swiper.css';
import './DishDetailPage.css';
import useProducts from "../lib/data/products";
import {Size} from "../data/mockDishes";

interface DishDetailParams {
  id: string;
}

const DishDetailPage: React.FC = () => {
  const {id} = useParams<DishDetailParams>();
  const {data: dish} = useProducts(id, {fields: "+metadata,+categories.*"}).getProduct;

  // const {addItem} = useCart(); // Use the addItem function from the cart state
  const [presentToast] = useIonToast(); // Use the useIonToast hook

  if (!dish) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/dishes"/>
            </IonButtons>
            <IonTitle>Dish Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <p>The requested dish could not be found.</p>
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

  const handleAddToCart = () => {
    // addItem(dish); // Add the current dish to the cart
    presentToast({ // Present the toast
      message: `${dish.title} added to cart!`,
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dishes"/>
          </IonButtons>
          <IonTitle>{dish.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {dish.images.length > 0 && (
          <div className="image-slider-container">
            <Swiper
              modules={[Pagination]}
              pagination={{clickable: true}}
              initialSlide={0}
              speed={400}
              className="dish-detail-slides"
            >
              {dish.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <IonImg src={image.url} alt={`${dish.title} image ${index + 1}`} className="dish-detail-image"/>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="dish-detail-content">
          <div className="dish-detail-header-section">
            <IonCardTitle className="dish-detail-name">{dish.title}</IonCardTitle>
            {/*todo handle price currency*/}
            <IonBadge color="success" className="dish-detail-price">
              {`${dish.metadata?.sizes?.find((size) => size.title === Size.STANDARD)?.price} $`}
            </IonBadge> {/* Price remains here */}
          </div>

          <div className="dish-detail-meta-section">
            <div className="dish-detail-rating">
              {/*//todo implement ratings*/}
              {/*{renderRatingStars(dish.rating)}*/}
              {/*<span className="rating-text">({dish.rating.toFixed(1)})</span>*/}
              {renderRatingStars(4.5)}
              <span className="rating-text">(4.5)</span>
            </div>
            <div className="dish-detail-info-items">
              <div className="info-item">
                <IonIcon icon={locationOutline} slot="start" color="medium"/>
                {/*//todo implement distance calculation*/}
                {/*<span>{dish.distance}</span>*/}
                <span>1.2 km</span>
              </div>
              <div className="info-item">
                <IonIcon icon={timeOutline} slot="start" color="medium"/>
                {dish.metadata?.isAlwaysAvailable ? (
                  <IonChip color="success">Always Available</IonChip>) : (
                  dish.metadata?.scheduledDates && dish.metadata?.scheduledDates.length > 0 ? (
                      dish.metadata?.scheduledDates.filter((date) => new Date(date) >= new Date()).map((date) => (
                        <IonChip key={date} color="success">
                          {new Date(date).toLocaleDateString()}
                        </IonChip>
                      )))
                    : (
                      <IonChip color="tertiary">Unavailable</IonChip>))}
              </div>
            </div>
          </div>

          <div className="dish-detail-tags-section">
            {dish && dish.categories?.map(({name}, index) => (
              <IonChip key={index} outline={true} color="secondary">
                {name}
              </IonChip>
            ))}
          </div>

          {/* Moved Add to Cart button here */}
          <div className="add-to-cart-section">
            <IonButton expand="block" size="large" className="add-to-cart-button"
                       onClick={handleAddToCart}> {/* Added onClick handler */}
              <IonIcon icon={cartOutline} slot="start"/> {/* Changed icon */}
              Add to Cart
            </IonButton>
          </div>


          <div className="dish-detail-description-section">
            <h3>Description</h3>
            <p>{dish.description}</p>
          </div>

          <div className="dish-detail-reviews-section">
            {/*//todo implement reviews fetching*/}
            <h3>Reviews 5</h3>
            {/*<h3>Reviews ({dish.reviews.length})</h3>*/}
            {/*{dish.reviews.length > 0 ? (*/}
            {/*  <IonList lines="none">*/}
            {/*    {dish.reviews.map(review => (*/}
            {/*      <IonCard key={review.id} className="review-card">*/}
            {/*        <IonCardContent>*/}
            {/*          <div className="review-header">*/}
            {/*            <h4>{review.author}</h4>*/}
            {/*            <div className="review-rating">{renderRatingStars(review.rating)}</div>*/}
            {/*          </div>*/}
            {/*          <IonText>{review.comment}</IonText>*/}
            {/*        </IonCardContent>*/}
            {/*      </IonCard>*/}
            {/*    ))}*/}
            {/*  </IonList>*/}
            {/*) : (*/}
            {/*  <p>No reviews yet.</p>*/}
            {/*)}*/}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DishDetailPage;
