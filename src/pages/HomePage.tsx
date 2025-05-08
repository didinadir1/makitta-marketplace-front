import {IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './HomePage.css'; // You might want to rename the CSS file as well

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* You can keep the search bar here if you want it on the Home page */}
        <IonSearchbar placeholder="Search"></IonSearchbar>
        <ExploreContainer name="Home page"/>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
