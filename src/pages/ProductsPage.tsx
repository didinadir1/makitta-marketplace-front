import {IonButton, IonContent, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToolbar,} from '@ionic/react';
import {addOutline} from 'ionicons/icons';
import React from 'react';
import ProductList from '../components/products/ProductList';
import ScheduleCard from '../components/schedules/ScheduleCard'; // Import ScheduleCard
import {mockSchedules} from '../data/mockSchedules'; // Import mock schedules
import {Schedule} from '../types/Schedule'; // Import Schedule type
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
  const schedules: Schedule[] = mockSchedules; // Use mock schedules

  const handleAddScheduleClick = () => {
    console.log('Add New Schedule clicked');
    // Implement logic to navigate to schedule form or open modal
  };

  const handleEditSchedule = (scheduleId: string) => {
    console.log('Edit Schedule clicked for ID:', scheduleId);
    // Implement logic to navigate to schedule form or open modal for editing
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ProductList/>

        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Schedules Section */}
        <div>
          <h2 className="section-title">Schedules</h2>
          {/* Add Schedule Button */}
          <div className="add-schedule-button-container">
            <IonButton onClick={handleAddScheduleClick}>
              <IonIcon slot="start" icon={addOutline}></IonIcon>
              Add New Schedule
            </IonButton>
          </div>

          {/* List of Schedule Cards */}
          <IonList lines="none"> {/* Remove default list lines */}
            {schedules.map(schedule => (
              <ScheduleCard
                key={schedule.id}
                schedule={schedule}
                onEditClick={handleEditSchedule}
              />
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;
