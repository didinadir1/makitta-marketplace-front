import {IonList, useIonAlert, useIonToast,} from '@ionic/react';
import React, {useState} from 'react'; // Import useState
import OrderCard from './OrderCard'; // Import OrderCard
import {mockOrders} from '../../data/mockOrders'; // Import mock orders
import {Order} from '../../types/Order'; // Import Order types
import './OrdersTab.css';

const OrdersTab: React.FC = () => {
  const [presentAlert] = useIonAlert(); // Hook for presenting alerts
  const [presentToast] = useIonToast(); // Hook for presenting toasts
  const [orders, setOrders] = useState<Order[]>(mockOrders); // Use state for orders


  // Placeholder action handlers
  const handleAcceptOrder = (orderId: string) => {
    console.log('Accept Order clicked for ID:', orderId);
    // Update order status in state
    setOrders(orders.map(order =>
      order.id === orderId ? {...order, status: 'Ready to Prepare'} : order
    ));
    presentToast({
      message: `Order ${orderId} accepted!`,
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });
  };

  const handleCancelOrder = (orderId: string) => {
    presentAlert({
      header: 'Confirm Cancellation',
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            presentToast({
              message: 'Cancellation cancelled',
              duration: 1500,
              position: 'bottom',
              color: 'medium',
            });
          },
        },
        {
          text: 'Yes',
          role: 'destructive',
          handler: () => {
            console.log('Cancel Order clicked for ID:', orderId);
            // Update order status in state
            setOrders(orders.map(order =>
              order.id === orderId ? {...order, status: 'Cancelled'} : order
            ));
            presentToast({
              message: `Order ${orderId} cancelled.`,
              duration: 1500,
              position: 'bottom',
              color: 'danger',
            });
          },
        },
      ],
    });
  };

  const handleStartPreparing = (orderId: string) => {
    console.log('Start Preparing clicked for ID:', orderId);
    // Update order status in state
    setOrders(orders.map(order =>
      order.id === orderId ? {...order, status: 'Preparing'} : order
    ));
    presentToast({
      message: `Order ${orderId} is now preparing.`,
      duration: 1500,
      position: 'bottom',
      color: 'primary',
    });
  };

  const handleSetReady = (orderId: string) => {
    console.log('Set Ready for Pickup clicked for ID:', orderId);
    // Update order status in state
    setOrders(orders.map(order =>
      order.id === orderId ? {...order, status: 'In Transit'} : order
    ));
    presentToast({
      message: `Order ${orderId} is ready for pickup.`,
      duration: 1500,
      position: 'bottom',
      color: 'secondary',
    });
  };

  const handleSetInTransit = (orderId: string) => {
    console.log('Set In Transit clicked for ID:', orderId);
    // Update order status in state
    setOrders(orders.map(order =>
      order.id === orderId ? {...order, status: 'In Transit'} : order
    ));
    presentToast({
      message: `Order ${orderId} is in transit.`,
      duration: 1500,
      position: 'bottom',
      color: 'tertiary',
    });
  };


  const handleSetCompleted = (orderId: string) => {
    console.log('Set Completed clicked for ID:', orderId);
    // Update order status in state
    setOrders(orders.map(order =>
      order.id === orderId ? {...order, status: 'Completed'} : order
    ));
    presentToast({
      message: `Order ${orderId} completed!`,
      duration: 1500,
      position: 'bottom',
      color: 'success',
    });
  };


  return (
    <div className="orders-container">
      {/* List of Order Cards */}
      <IonList lines="none"> {/* Remove default list lines */}
        {orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            onAcceptOrder={handleAcceptOrder}
            onCancelOrder={handleCancelOrder}
            onStartPreparing={handleStartPreparing}
            onSetReady={handleSetReady}
            onSetInTransit={handleSetInTransit}
            onSetCompleted={handleSetCompleted}
          />
        ))}
      </IonList>
    </div>
  );
};

export default OrdersTab;
