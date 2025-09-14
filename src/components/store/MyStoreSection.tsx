import {IonIcon, IonLabel, IonSegment, IonSegmentButton,} from '@ionic/react';
import {calendar, fastFood, grid, receipt} from 'ionicons/icons';
import React, {useState} from 'react';
import ProductsTab from '../products/ProductsTab';
import SchedulesTab from '../schedules/SchedulesTab';
import './MyStoreSection.css';
import DashboardTab from "../dashboard/DashboardTab";
import OrdersTab from "../orders/OrdersTab";

const MyStoreSection: React.FC = () => {


  const [activeTab, setActiveTab] = useState<string>('products');


  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab/>;
      case 'orders':
        return <OrdersTab/>;
      case 'products':
        return <ProductsTab/>;
      case 'schedules':
        return (
          <SchedulesTab/>
        );
      default:
        return <ProductsTab/>;
    }
  };

  return (
    <>

      <IonSegment value={activeTab} onIonChange={e => setActiveTab(e.detail.value as string)}>
        <IonSegmentButton value="dashboard">
          <IonIcon icon={grid}/>
          <IonLabel>Dashboard</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="orders">
          <IonIcon icon={receipt}/>
          <IonLabel>Orders</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="products">
          <IonIcon icon={fastFood}/>
          <IonLabel>Products</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="schedules">
          <IonIcon icon={calendar}/>
          <IonLabel>Schedules</IonLabel>
        </IonSegmentButton>

      </IonSegment>
      <div className="my-store-content">
        {renderTabContent()}
      </div>
    </>
  );
};

export default MyStoreSection;
