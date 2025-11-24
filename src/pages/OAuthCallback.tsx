import React, {useEffect, useState} from 'react';
import {IonCard, IonCardContent, IonContent, IonPage, IonSpinner, IonText,} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import {HttpTypes} from "@medusajs/types";

const OAuthCallback: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    // This component is just a fallback/loading screen
    // The actual callback is handled by the deep link listener in googleAuthService

    const timer = setTimeout(() => {
      // If we're still here after 5 seconds, something went wrong
      if (loading) {
        setError('Authentication is taking longer than expected...');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (customer) {
      // Redirect to home page after successful authentication
      setTimeout(() => {
        history.replace('/entry');
      }, 1500);
    }
  }, [customer, history]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: '20px',
          }}
        >
          {loading && !customer && !error && (
            <>
              <IonSpinner name="crescent" style={{transform: 'scale(2)'}}/>
              <IonText>
                <h2>Authenticating with Google...</h2>
                <p>Please wait while we complete your sign-in.</p>
              </IonText>
            </>
          )}

          {customer && (
            <IonCard>
              <IonCardContent>
                <IonText color="success">
                  <h2>✓ Authentication Successful!</h2>
                  <p>Welcome, {customer.email}</p>
                  <p>Redirecting to home page...</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          )}

          {error && (
            <IonCard>
              <IonCardContent>
                <IonText color="warning">
                  <h2>⚠ {error}</h2>
                  <p>You can close this window and try again.</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OAuthCallback;