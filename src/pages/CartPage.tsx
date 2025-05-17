import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonItem, // Import IonItem
  useIonRouter,
  useIonAlert, // Import useIonAlert hook
} from '@ionic/react';
import React from 'react';
import {useCart} from '../state/cartState'; // Import the cart hook
import {addOutline, cartOutline, removeOutline, trashOutline} from 'ionicons/icons';
import './CartPage.css';

const CartPage: React.FC = () => {
  const {cartItems, total, addItem, removeItem, updateItemQuantity, clearCart} = useCart();
  const router = useIonRouter(); // Get the router hook
  const [presentAlert] = useIonAlert(); // Use the useIonAlert hook

  // Placeholder for delivery cost - you would likely fetch this dynamically
  const deliveryCost = 5.00;
  const finalTotal = total + deliveryCost;

  const handleItemClick = (dishId: string) => {
    router.push(`/dish/${dishId}`); // Navigate to the dish detail page
  };

  const handleUpdateQuantity = (dishId: string, currentQuantity: number, newQuantity: number) => {
    if (newQuantity <= 0 && currentQuantity === 1) {
      // If quantity is 1 and user clicks minus, show confirmation dialog
      presentAlert({
        header: 'Remove Item',
        message: 'Are you sure you want to remove this item from your cart?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Remove',
            handler: () => {
              removeItem(dishId); // Remove the item if confirmed
            },
          },
        ],
      });
    } else {
      // Otherwise, just update the quantity
      updateItemQuantity(dishId, newQuantity);
    }
  };


  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Your Cart</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearCart} disabled={cartItems.length === 0}>
              <IonIcon icon={trashOutline} slot="icon-only"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <IonIcon icon={cartOutline} size="large" color="medium"/>
            <IonText color="medium">
              <p>Your cart is empty.</p>
            </IonText>
          </div>
        ) : (
          <>
            <IonList lines="none" className="cart-items-list">
              {cartItems.map(item => (
                <IonItem key={item.dish.id} onClick={() => handleItemClick(item.dish.id)} detail={false} className="cart-item-container"> {/* Wrap in IonItem */}
                  <IonCard className="cart-item-card">
                    <IonCardContent className="cart-item-content">
                      {item.dish.imageUrls && item.dish.imageUrls.length > 0 && (
                        <img src={item.dish.imageUrls[0]} alt={item.dish.name} className="cart-item-image"/>
                      )}
                      <div className="item-details">
                        <IonLabel className="item-name">{item.dish.name}</IonLabel>
                        <IonText color="medium" className="item-unit-price"> {/* Display unit price */}
                          Unit Price: {item.dish.price}
                        </IonText>
                        <IonText color="dark" className="item-total-price"> {/* Display item total price */}
                          Total: ${(parseFloat(item.dish.price.replace('$', '')) * item.quantity).toFixed(2)}
                        </IonText>
                      </div>
                      <div className="item-quantity-controls">
                        <IonButton fill="clear" size="small"
                                   onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(item.dish.id, item.quantity, item.quantity - 1); }}> {/* Use handleUpdateQuantity */}
                          <IonIcon icon={removeOutline}/>
                        </IonButton>
                        <IonBadge color="light" className="item-quantity">{item.quantity}</IonBadge>
                        <IonButton fill="clear" size="small"
                                   onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(item.dish.id, item.quantity, item.quantity + 1); }}> {/* Use handleUpdateQuantity */}
                          <IonIcon icon={addOutline}/>
                        </IonButton>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonItem>
              ))}
            </IonList>

            <div className="cart-summary">
              <div className="summary-row">
                <IonText>Subtotal:</IonText>
                <IonText>${total.toFixed(2)}</IonText>
              </div>
              <div className="summary-row"> {/* Delivery Cost Row */}
                <IonText>Delivery Fee:</IonText>
                <IonText>${deliveryCost.toFixed(2)}</IonText>
              </div>
              <div className="summary-row total-row">
                <IonText color="dark">
                  <h3>Order Total:</h3> {/* Changed label */}
                </IonText>
                <IonText color="dark">
                  <h3>${finalTotal.toFixed(2)}</h3> {/* Display final total */}
                </IonText>
              </div>
            </div>

            <IonButton expand="block" size="large" className="checkout-button">
              Checkout (${finalTotal.toFixed(2)}) {/* Update button text */}
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
