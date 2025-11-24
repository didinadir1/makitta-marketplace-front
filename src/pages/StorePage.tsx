import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { barChart, list, cube, settings } from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';
import StoreDashboardTab from '../components/store/StoreDashboardTab';
import StoreOrdersTab from '../components/store/StoreOrdersTab';
import StoreProductsTab from '../components/store/StoreProductsTab';
import StoreSettingsTab from '../components/store/StoreSettingsTab';

const StorePage: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/store/dashboard" component={StoreDashboardTab} />
        <Route exact path="/store/orders" component={StoreOrdersTab} />
        <Route exact path="/store/products" component={StoreProductsTab} />
        <Route exact path="/store/settings" component={StoreSettingsTab} />
        <Route exact path="/store">
          <Redirect to="/store/dashboard" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="top">
        <IonTabButton tab="dashboard" href="/store/dashboard">
          <IonIcon aria-hidden="true" icon={barChart} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="orders" href="/store/orders">
          <IonIcon aria-hidden="true" icon={list} />
          <IonLabel>Orders</IonLabel>
        </IonTabButton>
        <IonTabButton tab="products" href="/store/products">
          <IonIcon aria-hidden="true" icon={cube} />
          <IonLabel>Products</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/store/settings">
          <IonIcon aria-hidden="true" icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default StorePage;
