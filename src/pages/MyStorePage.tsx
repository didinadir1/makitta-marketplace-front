import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  IonSegment,
  IonSegmentButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { 
  cubeOutline, 
  calendarOutline, 
  listOutline 
} from 'ionicons/icons';
import React, { useState } from 'react';
import ProductsTab from '../components/store/ProductsTab';
import SchedulesTab from '../components/store/SchedulesTab';
import CategoriesTab from '../components/store/CategoriesTab';
import './MyStorePage.css';

const MyStorePage: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const [activeTab, setActiveTab] = useState<string>('products');

  const handleAddProductClick = () => {
    console.log('Add New Product clicked');
    // Implement logic to navigate to product form or open modal
  };

  const handleAddScheduleClick = () => {
    console.log('Add New Schedule clicked');
    // Implement logic to navigate to schedule form or open modal
  };

  const handleAddCategoryClick = () => {
    console.log('Add New Category clicked');
    // Implement logic to navigate to category form or open modal
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsTab onAddProductClick={handleAddProductClick} />;
      case 'schedules':
        return (
          <SchedulesTab 
            onAddScheduleClick={handleAddScheduleClick}
            onEditSchedule={handleEditSchedule}
            onDeleteSchedule={handleDeleteSchedule}
          />
        );
      case 'categories':
        return <CategoriesTab onAddCategoryClick={handleAddCategoryClick} />;
      default:
        return <ProductsTab onAddProductClick={handleAddProductClick} />;
    }
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar >
          <IonSegment value={activeTab} onIonChange={e => setActiveTab(e.detail.value as string)}>
            <IonSegmentButton value="products">
              <IonIcon icon={cubeOutline} />
              <IonLabel>Products</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="schedules">
              <IonIcon icon={calendarOutline} />
              <IonLabel>Schedules</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="categories">
              <IonIcon icon={listOutline} />
              <IonLabel>Categories</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {renderTabContent()}
      </IonContent>
    </IonPage>
  );
};

export default MyStorePage;
