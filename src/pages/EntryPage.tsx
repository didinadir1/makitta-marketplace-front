import {
  IonContent,
  IonPage,
  IonText,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { restaurantOutline, fastFoodOutline } from 'ionicons/icons'; // Icons for choices
import React from 'react';
import { useHistory } from 'react-router-dom'; // Hook for navigation
import { useAppMode } from '../state/appModeState'; // Hook to set app mode
import './EntryPage.css';

const EntryPage: React.FC = () => {
  const history = useHistory();
  const { setMode } = useAppMode(); // Use setMode to change app mode

  const handleOrderClick = () => {
    setMode('normal'); // Set app mode to normal
    history.push('/dishes'); // Navigate to the dishes page
  };

  const handleRestaurantClick = () => {
    // setMode('restaurant'); // We will set mode after successful login
    history.push('/login'); // Navigate to the login page
  };

  return (
    <IonPage>
      <IonContent fullscreen className="entry-page-content">
        <div className="entry-container">
          <IonText className="app-title">
            <h1>Your App Name</h1> {/* Replace with your app title */}
          </IonText>
          <IonText className="app-subtitle">
            <p>Choose how you want to use the app</p>
          </IonText>

          <div className="choice-buttons">
            <IonButton expand="block" size="large" onClick={handleOrderClick} className="choice-button">
              <IonIcon slot="start" icon={restaurantOutline}></IonIcon>
              I want to order
            </IonButton>
            <IonButton expand="block" size="large" fill="outline" onClick={handleRestaurantClick} className="choice-button">
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
