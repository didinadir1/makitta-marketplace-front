import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import React from 'react';
import ProductList from '../components/products/ProductList';
import ScheduleList from '../components/schedules/ScheduleList'; // Import ScheduleList
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
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
        <div className="product-section-container">
          <h2 className="section-title">Products</h2> {/* Added title back with class */}
          <ProductList />
        </div>
        {/* Section Separator */}
        <div className="section-separator"></div>

        {/* Schedules Section */}
        <div className="schedule-section-container">
          <h2 className="section-title">Schedules</h2>
          {/* Add Schedule Button */}
          <div className="add-schedule-button-container">
            <IonButton onClick={handleAddScheduleClick}>
              <IonIcon slot="start" icon={addOutline}></IonIcon>
              Add New Schedule
            </IonButton>
          </div>

          {/* Schedule List Component */}
          <ScheduleList onEditSchedule={handleEditSchedule} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;
