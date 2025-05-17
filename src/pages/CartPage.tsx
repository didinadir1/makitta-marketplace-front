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
} from '@ionic/react';
import React from 'react';
import {useCart} from '../state/cartState'; // Import the cart hook
import {addOutline, cartOutline, removeOutline, trashOutline} from 'ionicons/icons';
import './CartPage.css';

const CartPage: React.FC = () => {
  const {cartItems, total, addItem, removeItem, updateItemQuantity, clearCart} = useCart();

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
                <IonCard key={item.dish.id} className="cart-item-card">
                  <IonCardContent className="cart-item-content">
                    {item.dish.imageUrls && item.dish.imageUrls.length > 0 && (
                      <img src={item.dish.imageUrls[0]} alt={item.dish.name} className="cart-item-image"/>
                    )}
                    <div className="item-details">
                      <IonLabel className="item-name">{item.dish.name}</IonLabel>
                      <IonText color="medium" className="item-price">
                        {item.dish.price}
                      </IonText>
                    </div>
                    <div className="item-quantity-controls">
                      <IonButton fill="clear" size="small"
                                 onClick={() => updateItemQuantity(item.dish.id, item.quantity - 1)}>
                        <IonIcon icon={removeOutline}/>
                      </IonButton>
                      <IonBadge color="light" className="item-quantity">{item.quantity}</IonBadge>
                      <IonButton fill="clear" size="small"
                                 onClick={() => updateItemQuantity(item.dish.id, item.quantity + 1)}>
                        <IonIcon icon={addOutline}/>
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>

            <div className="cart-summary">
              <div className="summary-row">
                <IonText>Subtotal:</IonText>
                <IonText>${total.toFixed(2)}</IonText>
              </div>
              {/* Add other summary rows like delivery fee, tax if needed */}
              <div className="summary-row total-row">
                <IonText color="dark">
                  <h3>Total:</h3>
                </IonText>
                <IonText color="dark">
                  <h3>${total.toFixed(2)}</h3>
                </IonText>
              </div>
            </div>

            <IonButton expand="block" size="large" className="checkout-button">
              Checkout
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
