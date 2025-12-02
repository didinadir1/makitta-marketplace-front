import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, useIonAlert,} from '@ionic/react'; // Added IonToggle
import React from 'react';
import './MyAccountPage.css';
import {
  helpCircleOutline,
  informationCircleOutline,
  logOutOutline,
  personOutline,
  storefrontOutline
} from 'ionicons/icons';
import useRestaurant from "../lib/data/restaurants";
import {useUser} from "../lib/data";
import {useHistory} from "react-router-dom";
import {useLogout} from "../lib/actions";
import {queryClient} from "../lib/utils/query-client"; // Import necessary icons and chevronForwardOutline

const MyAccountPage: React.FC = () => {
  const [presentAlert] = useIonAlert(); // Use the useIonAlert hook
  const history = useHistory();
  const {mutateAsync: logout} = useLogout()


  const {data: user} = useUser();
  const {data: restaurant} = useRestaurant(user?.restaurant_id || "");


  const handleAccountClick = () => {
    history.push('/profile/account'); // Example navigation
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
          handler: async () => {
            await logout(undefined, {
              onSuccess: () => {
                queryClient.clear()
                history.replace("/login")
              },
            })
          },
        },
      ],
    });
  };
  const handleEditStoreClick = async () => {
    history.push("/store/");
  };


  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonList lines="full" className="profile-menu-list">
          <IonItem button onClick={handleAccountClick} detail={true}> {/* Use detail={true} for chevron */}
            <IonIcon icon={personOutline} slot="start" color="medium"/>
            <IonLabel>Account</IonLabel>
          </IonItem>
          {restaurant?.id && (
            <IonItem button onClick={handleEditStoreClick} detail={true}> {/* Use detail={true} for chevron */}
              <IonIcon icon={storefrontOutline} slot="start" color="medium"/>
              <IonLabel>My Store Settings</IonLabel>
            </IonItem>)}
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
