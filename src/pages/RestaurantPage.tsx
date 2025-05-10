import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail, useIonRouter } from '@ionic/react';
import { chevronDownCircleOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard'; // Import the new RestaurantCard
import { mockRestaurants, Restaurant } from '../data/mockRestaurants'; // Import mock restaurant data
import './RestaurantPage.css'; // Import the new CSS file

const RestaurantPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const router = useIonRouter();

  useEffect(() => {
    // Simulate fetching data
    setRestaurants(mockRestaurants);
    setFilteredRestaurants(mockRestaurants);
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchText.toLowerCase();
    const filteredData = restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(lowercasedFilter) ||
             restaurant.tags.some(tag => tag.toLowerCase().includes(lowercasedFilter));
    });
    setFilteredRestaurants(filteredData);
  }, [searchText, restaurants]);

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log('Begin async operation');
    // Simulate fetching new data
    setTimeout(() => {
      const newMockRestaurants = [...mockRestaurants].sort(() => Math.random() - 0.5); // Shuffle for "new" data
      setRestaurants(newMockRestaurants);
      setFilteredRestaurants(newMockRestaurants.filter(restaurant => { // Re-apply filter if searchText exists
        const lowercasedFilter = searchText.toLowerCase();
        return restaurant.name.toLowerCase().includes(lowercasedFilter) ||
               restaurant.tags.some(tag => tag.toLowerCase().includes(lowercasedFilter));
      }));
      console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  };

  const handleRestaurantCardClick = (restaurantId: string) => {
    // Implement navigation to a restaurant detail page if needed later
    console.log(`Clicked on restaurant with ID: ${restaurantId}`);
    // router.push(`/restaurant/${restaurantId}`); // Example navigation
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Restaurants</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search restaurants or tags"
            debounce={300}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        <IonList className="restaurant-list"> {/* Use a specific class name */}
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={handleRestaurantCardClick} />
            ))
          ) : (
            <div className="no-results">
              <p>No restaurants found matching your search.</p>
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantPage;
