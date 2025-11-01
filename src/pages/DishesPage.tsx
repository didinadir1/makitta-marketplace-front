import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonToolbar,} from '@ionic/react';
import React, {useState} from 'react';
import DishCard from '../components/DishCard';
import './DishesPage.css';
import useProducts from "../lib/data/products";

const DishesPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const {data: dishes} = useProducts(undefined, {fields: "+metadata,+categories.*"}, undefined).getAllProducts;

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search dishes or tags"
            debounce={300}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/*//todo implement pull to refresh*/}
        {/*<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>*/}
        {/*  <IonRefresherContent*/}
        {/*    pullingIcon={chevronDownCircleOutline}*/}
        {/*    pullingText="Pull to refresh"*/}
        {/*    refreshingSpinner="circles"*/}
        {/*    refreshingText="Refreshing..."*/}
        {/*  ></IonRefresherContent>*/}
        {/*</IonRefresher>*/}
        <IonGrid>
          <IonRow>
            {dishes && dishes.length > 0 ? (
              dishes.map(dish => dish && dish.id && (
                <IonCol size="12" sizeMd="6" sizeLg="4" sizeXl="3" key={dish.id}>
                  <DishCard key={dish.id} dish={dish}/>
                </IonCol>
              ))
            ) : (
              <div className="no-results">
                <p>No dishes found matching your search.</p>
              </div>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DishesPage;
