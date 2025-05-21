import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  useIonAlert, // Import useIonAlert
  useIonToast, // Import useIonToast
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import React from 'react';
import ProductList from '../components/products/ProductList';
import ScheduleList from '../components/schedules/ScheduleList'; // Import ScheduleList
import './MyStorePage.css';

const MyStorePage: React.FC = () => {
  const [presentAlert] = useIonAlert(); // Hook for presenting alerts
  const [presentToast] = useIonToast(); // Hook for presenting toasts

  const handleAddScheduleClick = () => {
    console.log('Add New Schedule clicked');
    // Implement logic to navigate to schedule form or open modal
  };

  const handleEditSchedule = (scheduleId: string) => {
    console.log('Edit Schedule clicked for ID:', scheduleId);
    // Implement logic to navigate to schedule form or open modal for editing
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    presentAlert({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this schedule?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            presentToast({
              message: 'Deletion cancelled',
              duration: 1500,
              position: 'bottom',
              color: 'medium',
            });
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Deleting schedule with ID:', scheduleId);
            // Implement actual deletion logic here
            // For now, just show a success toast
            presentToast({
              message: 'Schedule deleted successfully',
              duration: 1500,
              position: 'bottom',
              color: 'success',
            });
          },
        },
      ],
    });
  };


  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>My Store</IonTitle>
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
          {/* Add Schedule Button */}
          <div className="add-schedule-button-container">
            <IonButton onClick={handleAddScheduleClick}>
              <IonIcon slot="start" icon={addOutline}></IonIcon>
              Add New Schedule
            </IonButton>
          </div>

          {/* Schedule List Component */}
          <ScheduleList
            onEditSchedule={handleEditSchedule}
            onDeleteSchedule={handleDeleteSchedule} // Pass delete handler
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyStorePage;
