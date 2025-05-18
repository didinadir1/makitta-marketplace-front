import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="dashboard-container">
          <h2>Restaurant Dashboard</h2>
          <p>Welcome to your restaurant management dashboard.</p>
          {/* Dashboard content will go here */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
