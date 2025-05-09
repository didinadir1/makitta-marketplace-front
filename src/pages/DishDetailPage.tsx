import {
  IonBackButton,
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {useParams} from 'react-router';
import {mockDishes} from '../data/mockDishes';
import {locationOutline, star, starHalf, timeOutline} from 'ionicons/icons';
import {Swiper, SwiperSlide} from 'swiper/react';
import '@ionic/react/css/ionic-swiper.css';
import './DishDetailPage.css';

interface DishDetailParams {
  id: string;
}

const DishDetailPage: React.FC = () => {
  const {id} = useParams<DishDetailParams>();
  const dish = mockDishes.find(d => d.id === id);

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

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dishes"/>
          </IonButtons>
          <IonTitle>{dish.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {dish.imageUrls.length > 0 && (
          <Swiper pagination={dish.imageUrls.length > 1} initialSlide={0} speed={400} className="dish-detail-slides">
            {dish.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <IonImg src={url} alt={`${dish.name} image ${index + 1}`} className="dish-detail-image"/>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <IonCard className="dish-detail-card">
          <IonCardHeader>
            <div className="dish-detail-title-price">
              <IonCardTitle>{dish.name}</IonCardTitle>
              <IonBadge color="success" className="dish-detail-price">{dish.price}</IonBadge>
            </div>
            <div className="dish-detail-rating">
              {renderRatingStars(dish.rating)}
              <span className="rating-text">({dish.rating.toFixed(1)})</span>
            </div>
          </IonCardHeader>
          <IonCardContent>
            <div className="dish-detail-tags">
              {dish.tags.map((tag, index) => (
                <IonChip key={index} outline={true} color="primary">
                  {tag}
                </IonChip>
              ))}
            </div>
            <div className="dish-detail-info">
              <div className="info-item">
                <IonIcon icon={locationOutline} slot="start" color="medium"/>
                <span>{dish.distance}</span>
              </div>
              <div className="info-item">
                <IonIcon icon={timeOutline} slot="start" color="medium"/>
                <span>{dish.timeToReady}</span>
              </div>
            </div>

            <div className="dish-detail-description">
              <h3>Description</h3>
              <p>{dish.description}</p>
            </div>

            <div className="dish-detail-reviews">
              <h3>Reviews ({dish.reviews.length})</h3>
              {dish.reviews.length > 0 ? (
                <IonList>
                  {dish.reviews.map(review => (
                    <IonItem key={review.id}>
                      <IonLabel>
                        <h4>{review.author}</h4>
                        <p>{renderRatingStars(review.rating)}</p>
                        <IonText>{review.comment}</IonText>
                      </IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DishDetailPage;
