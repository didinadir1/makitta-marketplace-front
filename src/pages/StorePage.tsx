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


  return (
    <IonPage>
      <IonHeader>
        <div className="profile-header" onClick={handleEditClick}> {/* Use a div for the header area */}
          <div className="profile-info-container"> {/* Container for avatar and name */}
            <IonAvatar className="profile-avatar">
              <img src={seller?.photo ?? "public/store-default-image.png"} alt="Profile"/>
            </IonAvatar>
            <div className="profile-name-container"> {/* Container for name and potential subtitle */}
              <IonLabel
                className="profile-name">{seller?.name}</IonLabel>
              {/* Add a subtitle or email here if available in mockUser */}
              {/*todo fetch store name*/}
              <IonNote
                color="medium">{`${seller?.id ?? "Manage my profile"}`}</IonNote>
            </div>
          </div>
          <IonButton fill="clear" className="edit-profile-button">
            <IonIcon icon={chevronForwardOutline} slot="icon-only" size="large"/>
          </IonButton>
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
