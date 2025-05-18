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
  useIonRouter
} from '@ionic/react';
import React from 'react';
import './ProfilePage.css';
import { mockUser } from '../data/mockUser'; // Import mock user data
import { createOutline } from 'ionicons/icons'; // Import edit icon

const ProfilePage: React.FC = () => {
  const router = useIonRouter(); // Get the router hook

  const handleEditClick = () => {
    router.push('/profile/edit'); // Navigate to the profile edit page
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

        {/* Add other profile management sections here later */}
        <div className="profile-sections">
          {/* Example: Order History, Payment Methods, Settings, etc. */}
        </div>

      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
