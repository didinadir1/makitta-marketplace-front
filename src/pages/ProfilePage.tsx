import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  useIonRouter,
  IonList, // Import IonList
  IonItem, // Import IonItem
} from '@ionic/react';
import React from 'react';
import './ProfilePage.css';
import { mockUser } from '../data/mockUser'; // Import mock user data
import { createOutline, personOutline, listOutline, helpCircleOutline, informationCircleOutline, logOutOutline } from 'ionicons/icons'; // Import necessary icons
import { useIonAlert } from '@ionic/react'; // Import useIonAlert for Log Out confirmation

const ProfilePage: React.FC = () => {
  const router = useIonRouter(); // Get the router hook
  const [presentAlert] = useIonAlert(); // Use the useIonAlert hook

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
        <div className="profile-header-card"> {/* Container for the profile card */}
          <IonCard className="profile-card">
            <IonCardContent className="profile-card-content">
              <IonAvatar className="profile-avatar">
                <img src={mockUser.profilePictureUrl} alt="Profile" />
              </IonAvatar>
              <IonLabel className="profile-name">{mockUser.name}</IonLabel>
              <IonButton fill="clear" size="small" className="edit-profile-button" onClick={handleEditClick}>
                <IonIcon icon={createOutline} slot="icon-only" />
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        <div className="profile-sections">
          <IonList lines="none" className="profile-menu-list"> {/* Menu items list */}
            <IonItem button onClick={handleAccountClick}>
              <IonIcon icon={personOutline} slot="start" color="medium" />
              <IonLabel>Account</IonLabel>
            </IonItem>
            <IonItem button onClick={handleOrdersClick}>
              <IonIcon icon={listOutline} slot="start" color="medium" />
              <IonLabel>Orders</IonLabel>
            </IonItem>
            <IonItem button onClick={handleHelpClick}>
              <IonIcon icon={helpCircleOutline} slot="start" color="medium" />
              <IonLabel>Help & Support</IonLabel>
            </IonItem>
            <IonItem button onClick={handleAboutClick}>
              <IonIcon icon={informationCircleOutline} slot="start" color="medium" />
              <IonLabel>About App</IonLabel>
            </IonItem>
            <IonItem button onClick={handleLogoutClick} className="logout-item"> {/* Add a class for styling */}
              <IonIcon icon={logOutOutline} slot="start" color="danger" /> {/* Danger color for logout */}
              <IonLabel color="danger">Log Out</IonLabel> {/* Danger color for label */}
            </IonItem>
          </IonList>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
