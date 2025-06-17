import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from '@ionic/react'; // Added IonToggle
import React from 'react';
import './MyAccountPage.css';
import {helpCircleOutline, informationCircleOutline, listOutline, logOutOutline, personOutline} from 'ionicons/icons'; // Import necessary icons and chevronForwardOutline

const MyAccountPage: React.FC = () => {
  const [presentAlert] = useIonAlert(); // Use the useIonAlert hook

  const handleAccountClick = () => {
    console.log('Navigate to Account Settings');
    // router.push('/profile/account'); // Example navigation
  };

  const handleOrdersClick = () => {
    console.log('Navigate to Orders History');
    // router.push('/profile/orders'); // Example navigation
  };

  const handleHelpClick = () => {
    console.log('Navigate to Help & Support');
    // router.push('/profile/help'); // Example navigation
  };

  const handleAboutClick = () => {
    console.log('Navigate to About App');
    // router.push('/profile/about'); // Example navigation
  };

  const handleLogoutClick = () => {
    presentAlert({
      header: 'Log Out',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Log Out',
          handler: () => {
            console.log('Logging out...');
            // Implement actual logout logic here
            // e.g., clear authentication tokens, redirect to login page
          },
        },
      ],
    });
  };


  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" className="back-button"/>
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonList lines="full" className="profile-menu-list">
          <IonItem button onClick={handleAccountClick} detail={true}> {/* Use detail={true} for chevron */}
            <IonIcon icon={personOutline} slot="start" color="medium"/>
            <IonLabel>Account</IonLabel>
            {/* Removed explicit chevron icon */}
          </IonItem>
          <IonItem button onClick={handleOrdersClick} detail={true}> {/* Use detail={true} for chevron */}
            <IonIcon icon={listOutline} slot="start" color="medium"/>
            <IonLabel>Orders</IonLabel>
            {/* Removed explicit chevron icon */}
          </IonItem>
          <IonItem button onClick={handleHelpClick} detail={true}> {/* Use detail={true} for chevron */}
            <IonIcon icon={helpCircleOutline} slot="start" color="medium"/>
            <IonLabel>Help & Support</IonLabel>
            {/* Removed explicit chevron icon */}
          </IonItem>
          <IonItem button onClick={handleAboutClick} detail={true}> {/* Use detail={true} for chevron */}
            <IonIcon icon={informationCircleOutline} slot="start" color="medium"/>
            <IonLabel>About App</IonLabel>
            {/* Removed explicit chevron icon */}
          </IonItem>
          <IonItem button onClick={handleLogoutClick} className="logout-item"
                   detail={false}> {/* detail={false} for logout */}
            <IonIcon icon={logOutOutline} slot="start" color="danger"/>
            <IonLabel color="danger">Log Out</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MyAccountPage;
