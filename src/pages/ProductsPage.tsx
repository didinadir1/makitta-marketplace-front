import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import ProductList from '../components/products/ProductList'; // Import ProductList
import './ProductsPage.css'; // Assuming you have a CSS file for this page

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
          {/* Render the ProductList component */}
          <ProductList />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;
