import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';

const ProductsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Products</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="products-container">
          <h2>Manage Your Products</h2>
          <p>Add, edit, and manage your restaurant's products here.</p>
          {/* Products management content will go here */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;
