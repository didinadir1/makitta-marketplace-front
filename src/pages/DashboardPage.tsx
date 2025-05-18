import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
} from '@ionic/react';
import React from 'react';
import './DashboardPage.css';
import { mockDashboardData } from '../data/mockDashboardData'; // Import mock dashboard data
import { trendingUpOutline, cashOutline, receiptOutline, cubeOutline, timeOutline } from 'ionicons/icons'; // Import icons

const DashboardPage: React.FC = () => {
  const { metrics, topSellingItems, recentOrders } = mockDashboardData;

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="dashboard-container">
          {/* Metrics Section */}
          <div className="metrics-section">
            <h2>Overview</h2>
            <div className="metrics-cards">
              <IonCard className="metric-card">
                <IonCardContent>
                  <IonIcon icon={cashOutline} color="success" className="metric-icon" />
                  <IonLabel className="metric-label">Total Revenue</IonLabel>
                  <IonText color="dark" className="metric-value">
                    <h3>${metrics.totalRevenue.toFixed(2)}</h3>
                  </IonText>
                </IonCardContent>
              </IonCard>
              <IonCard className="metric-card">
                <IonCardContent>
                  <IonIcon icon={receiptOutline} color="primary" className="metric-icon" />
                  <IonLabel className="metric-label">Orders Today</IonLabel>
                  <IonText color="dark" className="metric-value">
                    <h3>{metrics.ordersToday}</h3>
                  </IonText>
                </IonCardContent>
              </IonCard>
              <IonCard className="metric-card">
                <IonCardContent>
                  <IonIcon icon={trendingUpOutline} color="warning" className="metric-icon" />
                  <IonLabel className="metric-label">Avg. Order Value</IonLabel>
                  <IonText color="dark" className="metric-value">
                    <h3>${metrics.averageOrderValue.toFixed(2)}</h3>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </div>
          </div>

          {/* Top Selling Items Section */}
          <div className="top-selling-section">
            <h2>Top Selling Items</h2>
            <IonList lines="none" className="top-selling-list">
              {topSellingItems.map(item => (
                <IonItem key={item.id} className="top-selling-item">
                  <IonIcon icon={cubeOutline} slot="start" color="medium" />
                  <IonLabel>
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                  </IonLabel>
                  <IonBadge color="secondary" slot="end">{item.unitsSold} sold</IonBadge>
                </IonItem>
              ))}
            </IonList>
          </div>

          {/* Recent Orders Section */}
          <div className="recent-orders-section">
            <h2>Recent Completed Orders</h2>
            <IonList lines="none" className="recent-orders-list">
              {recentOrders.map(order => (
                <IonCard key={order.id} className="order-card">
                  <IonCardContent className="order-card-content">
                    <div className="order-header">
                      <IonLabel className="order-id">Order #{order.id}</IonLabel>
                      <IonBadge color="success" className="order-status">{order.status}</IonBadge>
                    </div>
                    <div className="order-details">
                      <IonText color="medium">
                        <p>{order.items.length} items</p>
                      </IonText>
                      <IonText color="dark">
                        <p>${order.total.toFixed(2)}</p>
                      </IonText>
                    </div>
                    <div className="order-time">
                       <IonIcon icon={timeOutline} slot="start" color="medium" />
                       <IonText color="medium">
                         <p>{order.time}</p>
                       </IonText>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
