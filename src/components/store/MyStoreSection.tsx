import {IonIcon, IonLabel, IonSegment, IonSegmentButton,} from '@ionic/react';
import {fastFood, grid, receipt, archive, people, star, megaphone, list, helpCircle} from 'ionicons/icons';
import React, {useState} from 'react';
import ProductsTab from '../products/ProductsTab';
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
      case 'inventory':
        return <div></div>;
      case 'customers':
        return <div></div>;
      case 'reviews':
        return <div></div>;
      case 'promotions':
        return <div></div>;
      case 'price lists':
        return <div></div>;
      case 'request':
        return <div></div>;
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
        <IonSegmentButton value="inventory">
          <IonIcon icon={archive}/>
          <IonLabel>Inventory</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="customers">
          <IonIcon icon={people}/>
          <IonLabel>Customers</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="reviews">
          <IonIcon icon={star}/>
          <IonLabel>Reviews</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="promotions">
          <IonIcon icon={megaphone}/>
          <IonLabel>Promotions</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="price lists">
          <IonIcon icon={list}/>
          <IonLabel>Price Lists</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="request">
          <IonIcon icon={helpCircle}/>
          <IonLabel>Request</IonLabel>
        </IonSegmentButton>

      </IonSegment>
      <div className="my-store-content">
        {renderTabContent()}
      </div>
    </>
  );
};

export default MyStoreSection;
