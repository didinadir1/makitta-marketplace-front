import {IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonNote, IonPage,} from '@ionic/react'; // Added IonToggle
import React from 'react';
import './ProfilePage.css';
import {chevronForwardOutline} from 'ionicons/icons';
import MyStoreSection from "../components/store/MyStoreSection";
import {useHistory} from "react-router-dom";
import {useUser} from "../lib/data";
import useRestaurant from "../lib/data/restaurants"; // Import necessary icons and chevronForwardOutline

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const {data: user} = useUser();
  const {data: restaurant} = useRestaurant(user?.restaurant_id || "");


  const handleEditClick = async () => {
    history.push("/profile/my-account")
  };


  return (
    <IonPage>
      <IonHeader>
        <div className="profile-header" onClick={handleEditClick}> {/* Use a div for the header area */}
          <div className="profile-info-container"> {/* Container for avatar and name */}
            <IonAvatar className="profile-avatar">
              <img src={restaurant?.image_url ?? "public/store-default-image.png"} alt="Profile"/>
            </IonAvatar>
            <div className="profile-name-container"> {/* Container for name and potential subtitle */}
              <IonLabel
                className="profile-name">{restaurant?.name ?? user?.first_name + " " + user?.last_name}</IonLabel>
              {/* Add a subtitle or email here if available in mockUser */}
              {/*todo fetch store name*/}
              <IonNote
                color="medium">{`${restaurant?.id ? user?.first_name + " " + user?.last_name : "Manage my profile"}`}</IonNote>
            </div>
          </div>
          <IonButton fill="clear" className="edit-profile-button">
            <IonIcon icon={chevronForwardOutline} slot="icon-only" size="large"/>
          </IonButton>
        </div>
      </IonHeader>
      <IonContent>
        {user?.restaurant_id ? (<MyStoreSection/>) : (
          <div className="create-store-container">
            <IonLabel>
              You haven't created a store yet.<br/> Click the button below to get started.
            </IonLabel>
            <IonButton routerLink="/profile/create-store">
              Create my store
            </IonButton>
          </div>)}

      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
