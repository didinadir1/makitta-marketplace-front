import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/react';
import React, { useState } from 'react';
import './ProfileEditPage.css'; // Create a new CSS file for this page
import { mockUser } from '../data/mockUser'; // Import mock user data

const ProfileEditPage: React.FC = () => {
  const [name, setName] = useState(mockUser.name);
  // Add state for other editable fields

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving profile:', { name });
    // Navigate back to profile page after saving
    // history.goBack(); // Example using history
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="edit-profile-form">
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput value={name} onIonChange={e => setName(e.detail.value!)} />
          </IonItem>
          {/* Add other input fields for editable information */}

          <IonButton expand="block" className="save-profile-button" onClick={handleSave}>
            Save Changes
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileEditPage;
