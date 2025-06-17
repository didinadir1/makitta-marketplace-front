import {IonButton, IonContent, IonIcon, IonPage, IonText,} from '@ionic/react';
import {fastFoodOutline, restaurantOutline} from 'ionicons/icons'; // Icons for choices
import React from 'react';
import {useHistory} from 'react-router-dom'; // Hook for navigation
import './EntryPage.css';

const EntryPage: React.FC = () => {
  const history = useHistory();

  const handleOrderClick = () => {
    history.push('/dishes'); // Navigate to the dishes page
  };

  const handleRestaurantClick = () => {
    history.push('/login'); // Navigate to the login page
  };

  return (
    <IonPage>
      <IonContent fullscreen className="entry-page-content">
        <div className="entry-background"></div>
        {/* Background element for gradient/animation */}
        <div className="entry-container">
          <div className="app-branding">
            <IonText className="app-title">
              <h1>Your App Name</h1> {/* Replace with your app title */}
            </IonText>
            <IonText className="app-subtitle">
              <p>Choose how you want to use the app</p>
            </IonText>
          </div>

          <div className="choice-buttons">
            <IonButton expand="block" size="large" onClick={handleOrderClick} className="choice-button">
              <IonIcon slot="start" icon={restaurantOutline}></IonIcon>
              I want to order
            </IonButton>
            <IonButton expand="block" size="large" fill="outline" onClick={handleRestaurantClick}
                       className="choice-button">
              <IonIcon slot="start" icon={fastFoodOutline}></IonIcon>
              I'm a restaurant
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
