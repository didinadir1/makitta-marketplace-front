import {IonBadge, IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonList, IonText,} from '@ionic/react';
import React from 'react';
import './DashboardTab.css';
import {mockDashboardData} from '../../data/mockDashboardData'; // Import mock dashboard data
import {
  arrowDownOutline,
  arrowUpOutline,
  cashOutline,
  cubeOutline,
  receiptOutline,
  timeOutline,
  trendingUpOutline
} from 'ionicons/icons'; // Import icons including arrow icons

const DashboardTab: React.FC = () => {
  const {metrics, topSellingItems, recentOrders} = mockDashboardData;

  const renderChange = (change: number) => {
    const isPositive = change >= 0;
    const changeIcon = isPositive ? arrowUpOutline : arrowDownOutline;
    const changeColor = isPositive ? 'success' : 'danger';

    return (
      <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
        <IonIcon icon={changeIcon} color={changeColor}/>
        <IonText color={changeColor}>
          <span>{Math.abs(change).toFixed(1)}%</span>
        </IonText>
      </div>
    );
  };

  return (

    <div className="dashboard-container">
      {/* Metrics Section */}
      <div className="metrics-section">
        <h2>Overview</h2>
        <div className="metrics-cards">
          <IonCard className="metric-card">
            <IonCardContent>
              <IonIcon icon={cashOutline} color="success" className="metric-icon"/>
              <IonLabel className="metric-label">Total Revenue</IonLabel>
              <IonText color="dark" className="metric-value">
                <h3>${metrics.totalRevenue.toFixed(2)}</h3>
              </IonText>
              {renderChange(metrics.totalRevenueChange)} {/* Display change */}
            </IonCardContent>
          </IonCard>
          <IonCard className="metric-card">
            <IonCardContent>
              <IonIcon icon={receiptOutline} color="primary" className="metric-icon"/>
              <IonLabel className="metric-label">Orders Today</IonLabel>
              <IonText color="dark" className="metric-value">
                <h3>{metrics.ordersToday}</h3>
              </IonText>
              {renderChange(metrics.ordersTodayChange)} {/* Display change */}
            </IonCardContent>
          </IonCard>
          <IonCard className="metric-card">
            <IonCardContent>
              <IonIcon icon={trendingUpOutline} color="warning" className="metric-icon"/>
              <IonLabel className="metric-label">Avg. Order Value</IonLabel>
              <IonText color="dark" className="metric-value">
                <h3>${metrics.averageOrderValue.toFixed(2)}</h3>
              </IonText>
              {renderChange(metrics.averageOrderValueChange)} {/* Display change */}
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
              <IonIcon icon={cubeOutline} slot="start" color="medium"/>
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
                  <IonIcon icon={timeOutline} slot="start" color="medium"/>
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
  );
};

export default DashboardTab;
