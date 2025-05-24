import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar, IonList, IonRefresher, IonRefresherContent, RefresherEventDetail, useIonRouter } from '@ionic/react';
import { chevronDownCircleOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import DishCard from '../components/DishCard';
import { mockDishes, Dish } from '../data/mockDishes';
import './DishesPage.css';

const DishesPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [dishes, setDishes] = useState<Dish[]>([]
  );
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const router = useIonRouter(); // Get the router hook

  useEffect(() => {
    // Simulate fetching data
    setDishes(mockDishes);
    setFilteredDishes(mockDishes);
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchText.toLowerCase();
    const filteredData = dishes.filter(dish => {
      return dish.name.toLowerCase().includes(lowercasedFilter) ||
             dish.categories.some(({name}) => name.toLowerCase().includes(lowercasedFilter));
    });
    setFilteredDishes(filteredData);
  }, [searchText, dishes]);

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    console.log('Begin async operation');
    // Simulate fetching new data
    setTimeout(() => {
      const newMockDishes = [...mockDishes].sort(() => Math.random() - 0.5); // Shuffle for "new" data
      setDishes(newMockDishes);
      setFilteredDishes(newMockDishes.filter(dish => { // Re-apply filter if searchText exists
        const lowercasedFilter = searchText.toLowerCase();
        return dish.name.toLowerCase().includes(lowercasedFilter) ||
               dish.categories.some(({name}) => name.toLowerCase().includes(lowercasedFilter));
      }));
      console.log('Async operation has ended');
      event.detail.complete();
    }, 2000);
  };

  const handleDishCardClick = (dishId: string) => {
    router.push(`/dish/${dishId}`); // Navigate to the dish detail page
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Dishes</IonTitle>
        </IonToolbar>
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
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        <IonList className="dish-list">
          {filteredDishes.length > 0 ? (
            filteredDishes.map(dish => (
              <DishCard key={dish.id} dish={dish} onClick={handleDishCardClick} /> // Pass the click handler
            ))
          ) : (
            <div className="no-results">
              <p>No dishes found matching your search.</p>
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DishesPage;
