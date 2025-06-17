import {IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonNote, IonPage,} from '@ionic/react'; // Added IonToggle
import React from 'react';
import './ProfilePage.css';
import {mockUser} from '../data/mockUser'; // Import mock user data
import {chevronForwardOutline} from 'ionicons/icons';
import MyStoreSection from "../components/store/MyStoreSection";
import {useHistory} from "react-router-dom"; // Import necessary icons and chevronForwardOutline

const ProfilePage: React.FC = () => {
  const history = useHistory();


  const handleEditClick = () => {
    history.push("/profile/my-account")
  };


  return (
    <IonPage>
      <IonHeader>
        <div className="profile-header" onClick={handleEditClick}> {/* Use a div for the header area */}
          <div className="profile-info-container"> {/* Container for avatar and name */}
            <IonAvatar className="profile-avatar">
              <img src={mockUser.profilePictureUrl} alt="Profile"/>
            </IonAvatar>
            <div className="profile-name-container"> {/* Container for name and potential subtitle */}
              <IonLabel className="profile-name">{mockUser.name}</IonLabel>
              {/* Add a subtitle or email here if available in mockUser */}
              {/*todo fetch store name*/}
              <IonNote color="medium">les délices de titi</IonNote>
            </div>
          </div>
          <IonButton fill="clear" className="edit-profile-button">
            <IonIcon icon={chevronForwardOutline} slot="icon-only" size="large"/>
          </IonButton>
        </div>
      </IonHeader>
      <IonContent>
        <MyStoreSection/>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
