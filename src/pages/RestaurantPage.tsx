import {IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonToolbar} from '@ionic/react';
import React, {useState} from 'react';
import RestaurantCard from '../components/RestaurantCard'; // Import the new RestaurantCard
import './RestaurantPage.css';
import {useRestaurants, useUser} from "../lib/data";

const RestaurantPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const {data: user} = useUser();
  const {data: restaurants} = useRestaurants({id: {$ne: user?.restaurant_id}});


  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search restaurants" // Updated placeholder
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
        {/*// todo here use the filteredRestaurants list*/}
        <IonGrid>
          <IonRow>
            {restaurants && restaurants.length > 0 ? (
              restaurants.map(restaurant => (
                <IonCol size="12" sizeMd="6" sizeLg="4" sizeXl="3" key={restaurant.id}>
                  <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                </IonCol>
              ))
            ) : (
              <div className="no-results">
                <p>No restaurants found matching your search.</p>
              </div>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantPage;
