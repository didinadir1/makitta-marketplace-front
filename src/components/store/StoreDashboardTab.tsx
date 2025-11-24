import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
// Import hooks or functions from vendor APIs for fetching dashboard data (e.g., metrics like revenue, orders)
// Assuming we have a hook like useStoreDashboard from vendor APIs
// For now, placeholder data; replace with actual API calls
// Example: const { data: dashboardData } = useStoreDashboard();

const StoreDashboardTab: React.FC = () => {
  // Placeholder data - replace with actual fetched data
  const metrics = {
    totalRevenue: 12500.00,
    totalRevenueChange: 12.5, // percentage change
    ordersToday: 45,
    ordersTodayChange: 8.3,
    averageOrderValue: 278.50,
    averageOrderValueChange: -2.1,
  };

  const renderChange = (change: number) => {
    const color = change >= 0 ? 'success' : 'danger';
    const icon = change >= 0 ? '▲' : '▼';
    return (
      <IonText color={color} className="change-indicator">
        {icon} {Math.abs(change)}%
      </IonText>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Store Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardContent>
                  <IonText color="medium">
                    <h4>Total Revenue</h4>
                  </IonText>
                  <IonText color="dark" className="metric-value">
                    <h3>${metrics.totalRevenue.toFixed(2)}</h3>
                  </IonText>
                  {renderChange(metrics.totalRevenueChange)}
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardContent>
                  <IonText color="medium">
                    <h4>Orders Today</h4>
                  </IonText>
                  <IonText color="dark" className="metric-value">
                    <h3>{metrics.ordersToday}</h3>
                  </IonText>
                  {renderChange(metrics.ordersTodayChange)}
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonCard>
                <IonCardContent>
                  <IonText color="medium">
                    <h4>Average Order Value</h4>
                  </IonText>
                  <IonText color="dark" className="metric-value">
                    <h3>${metrics.averageOrderValue.toFixed(2)}</h3>
                  </IonText>
                  {renderChange(metrics.averageOrderValueChange)}
                </IonCardContent>
              </IonCard>
            </IonCol>
            {/* Add more metrics as needed, e.g., top-selling items, recent orders */}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default StoreDashboardTab;
