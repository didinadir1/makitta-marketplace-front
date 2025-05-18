import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonToggle,
  useIonAlert,
  useIonRouter,
} from '@ionic/react'; // Added IonToggle
import React, { useEffect } from 'react';
import { useAppMode } from '../state/appModeState';
import './ProfilePage.css';
import {mockUser} from '../data/mockUser'; // Import mock user data
import {
  chevronForwardOutline,
  createOutline,
  helpCircleOutline,
  informationCircleOutline,
  listOutline,
  logOutOutline,
  personOutline
} from 'ionicons/icons'; // Import necessary icons and chevronForwardOutline

const ProfilePage: React.FC = () => {
  const router = useIonRouter(); // Get the router hook
  const [presentAlert] = useIonAlert(); // Use the useIonAlert hook
  const { mode, toggleMode, isRestaurantMode } = useAppMode();

  const handleEditClick = () => {
    router.push('/profile/edit'); // Navigate to the profile edit page
  };

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
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="profile-header"> {/* Use a div for the header area */}
          <div className="profile-info-container"> {/* Container for avatar and name */}
            <IonAvatar className="profile-avatar">
              <img src={mockUser.profilePictureUrl} alt="Profile"/>
            </IonAvatar>
            <div className="profile-name-container"> {/* Container for name and potential subtitle */}
              <IonLabel className="profile-name">{mockUser.name}</IonLabel>
              {/* Add a subtitle or email here if available in mockUser */}
              {/* <IonNote color="medium">user@example.com</IonNote> */}
            </div>
          </div>
          <IonButton fill="clear" className="edit-profile-button" onClick={handleEditClick}>
            <IonIcon icon={createOutline} slot="icon-only"/>
          </IonButton>
        </div>

        <div className="profile-sections">
          <IonList lines="full" className="profile-menu-list">
            <IonItem>
              <IonLabel>Restaurant Mode</IonLabel>
              <IonToggle 
                checked={isRestaurantMode()} 
                onIonChange={toggleMode}
                color="primary"
              />
            </IonItem>
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
            <IonItem button onClick={handleLogoutClick} className="logout-item" detail={false}> {/* detail={false} for logout */}
              <IonIcon icon={logOutOutline} slot="start" color="danger"/>
              <IonLabel color="danger">Log Out</IonLabel>
            </IonItem>
          </IonList>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
