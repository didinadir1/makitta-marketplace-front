import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './MessagesPage.css'; // Create a new CSS file for this page

const MessagesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Messages</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Messages</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Messages page" />
      </IonContent>
    </IonPage>
  );
};

export default MessagesPage;
