import {IonIcon, IonLabel, IonSegment, IonSegmentButton} from '@ionic/react';
import {fastFood, grid, receipt, archive, people, star, megaphone, list, helpCircle} from 'ionicons/icons';
import React from 'react';
import './StoreTabs.css';

interface StoreTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StoreTabs: React.FC<StoreTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default StoreTabs;
