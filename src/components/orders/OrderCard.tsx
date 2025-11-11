import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonIcon, IonLabel,
  IonText,
} from '@ionic/react';
import {archiveOutline, checkmarkCircleOutline, closeCircleOutline, playCircleOutline} from 'ionicons/icons'; // Icons for actions
import React from 'react';
import {Order, OrderStatus} from '../../vendor/types/order';
import './OrderCard.css';
import {mockDishes} from "../../data/mockDishes";

interface OrderCardProps {
  order: Order;
  onAcceptOrder: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
  onStartPreparing: (orderId: string) => void;
  onSetReady: (orderId: string) => void;
  onSetInTransit: (orderId: string) => void;
  onSetCompleted: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
                                               order,
                                               onAcceptOrder,
                                               onCancelOrder,
                                               onStartPreparing,
                                               onSetReady,
                                               onSetInTransit,
                                               onSetCompleted,
                                             }) => {

  // Function to get product name by ID (using mock data for now)
  const getProductName = (productId: string): string => {
    const product = mockDishes.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  // Render action buttons based on order status
  const renderActionButtons = (status: OrderStatus) => {
    switch (status) {
      case 'Incoming':
        return (
          <>
            <IonButton expand="block" fill="outline" color="danger" onClick={() => onCancelOrder(order.id)}>
              <IonIcon slot="start" icon={closeCircleOutline}></IonIcon>
              Cancel
            </IonButton>
            <IonButton expand="block" onClick={() => onAcceptOrder(order.id)}>
              <IonIcon slot="start" icon={checkmarkCircleOutline}></IonIcon>
              Accept Order
            </IonButton>
          </>
        );
      case 'Ready to Prepare':
        return (
          <IonButton expand="block" onClick={() => onStartPreparing(order.id)}>
            <IonIcon slot="start" icon={playCircleOutline}></IonIcon>
            Start Preparing
          </IonButton>
        );
      case 'Preparing':
        return (
          <IonButton expand="block" onClick={() => onSetReady(order.id)}>
            <IonIcon slot="start" icon={checkmarkCircleOutline}></IonIcon>
            Set Ready for Pickup
          </IonButton>
        );
      case 'In Transit':
        return (
          <IonButton expand="block" onClick={() => onSetCompleted(order.id)}>
            <IonIcon slot="start" icon={archiveOutline}></IonIcon>
            Set Completed
          </IonButton>
        );
      default:
        return null; // No actions for Completed or Cancelled
    }
  };

  // Determine status color
  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'Incoming':
        return 'warning';
      case 'Ready to Prepare':
        return 'primary';
      case 'Preparing':
        return 'secondary';
      case 'In Transit':
        return 'tertiary';
      case 'Completed':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'medium';
    }
  };

  return (
    <IonCard className="order-card">
      <IonCardHeader className="order-card-header">
        <div className="order-header-top">
          <IonCardTitle className="order-code">#{order.orderCode}</IonCardTitle>
          <IonChip color={getStatusColor(order.status)} className="order-status-chip">
            <IonLabel>{order.status}</IonLabel>
          </IonChip>
        </div>
        <IonText color="medium" className="order-time">
          <p>{order.time}</p>
        </IonText>
      </IonCardHeader>

      <IonCardContent className="order-card-content">
        <div className="order-items">
          <IonText color="dark">
            <p className="items-list-title">Items:</p>
          </IonText>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.quantity}x {getProductName(item.productId)}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-total">
          <IonText color="dark">
            <p className="total-label">Total:</p>
          </IonText>
          <IonText color="success">
            <p className="total-value">${order.total.toFixed(2)}</p>
          </IonText>
        </div>

        <div className="order-actions">
          {renderActionButtons(order.status)}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default OrderCard;
