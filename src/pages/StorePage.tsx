import {IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonNote, IonPage,} from '@ionic/react'; // Added IonToggle
import React from 'react';
import './StorePage.css';
import {chevronForwardOutline} from 'ionicons/icons';
import MyStoreSection from "../components/store/MyStoreSection";
import {useHistory} from "react-router-dom";
import {useSellerMe} from "../vendor/api"; // Import necessary icons and chevronForwardOutline

const StorePage: React.FC = () => {
  const history = useHistory();
  const {seller} = useSellerMe()

  const handleEditClick = async () => {
    history.push("/store/edit-store")
  };

  // Placeholder data for reviews and products sold - replace with actual API data
  const storeStats = {
    averageRating: 4.5,
    totalReviews: 128,
    productsSold: 456,
  };

  return (
    <IonPage>
      <IonHeader className="store-header">
        <div className="store-header-background">
          <div className="store-header-content">
            <div className="store-info-section">
              <IonAvatar className="store-avatar">
                <img src={seller?.photo ?? "public/store-default-image.png"} alt="Store"/>
              </IonAvatar>
              <div className="store-details">
                <IonLabel className="store-name">{seller?.name ?? "Store Name"}</IonLabel>
                <div className="store-stats">
                  <div className="stat-item">
                    <IonLabel className="stat-value">{storeStats.averageRating}</IonLabel>
                    <IonNote className="stat-label">Avg Rating</IonNote>
                  </div>
                  <div className="stat-item">
                    <IonLabel className="stat-value">{storeStats.totalReviews}</IonLabel>
                    <IonNote className="stat-label">Reviews</IonNote>
                  </div>
                  <div className="stat-item">
                    <IonLabel className="stat-value">{storeStats.productsSold}</IonLabel>
                    <IonNote className="stat-label">Sold</IonNote>
                  </div>
                </div>
              </div>
            </div>
            <IonButton fill="clear" className="edit-store-button" onClick={handleEditClick}>
              <IonIcon icon={chevronForwardOutline} slot="icon-only" size="large"/>
            </IonButton>
          </div>
        </div>
      </IonHeader>
      <IonContent>
        {seller?.id ? (<MyStoreSection/>) : (
          <div className="create-store-container">
            <IonLabel>
              You haven't created a store yet.<br/> Click the button below to get started.
            </IonLabel>
            <IonButton routerLink="/store/create-store">
              Create my store
            </IonButton>
          </div>)}

      </IonContent>
    </IonPage>
  );
};

export default StorePage;
