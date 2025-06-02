import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from '@ionic/react';
import {logoGoogle} from 'ionicons/icons'; // Google icon
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {getRedirectPath, useAuth} from '../lib/actions/users'; // Import useAuth hook
import {useAppMode} from '../state/appModeState'; // Hook to set app mode
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const {setMode} = useAppMode(); // Use setMode to change app mode
  const {login, loginWithGoogle} = useAuth(); // Use the useAuth hook
  const [present, dismiss] = useIonLoading();
  const [presentToast] = useIonToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await present({
      message: 'Logging in...',
      duration: 0,
    });
    try {
      const response = await login({email, password});
      await dismiss();
      // The useAuth hook handles session creation and cart transfer on success.
      // It also handles navigation based on actorType.
      // If the login function returns a location (for OAuth), handle the redirect.
      if (response && response.location) {
        history.push(getRedirectPath(response.actorType));
      }
    } catch (error: any) {
      await dismiss();
      console.error('Login failed:', error);
      presentToast({
        message: error.message || 'Login failed. Please try again.',
        duration: 3000,
        color: 'danger',
      });
    }
  };

  const handleGoogleLogin = async () => {
    await present({
      message: 'Redirecting to Google...',
      duration: 0,
    });
    try {
      const response = await loginWithGoogle();
      await dismiss();
      // The loginWithGoogle function handles the redirect to Google.
      // The callback URL will handle the rest of the login process.
      if (response && response.location) {
        // Redirect already handled by the hook
      } else {
        // This case is unlikely for OAuth, but handle if needed
      }
    } catch (error: any) {
      await dismiss();
      console.error('Google login failed:', error);
      presentToast({
        message: error.message || 'Google login failed. Please try again.',
        duration: 3000,
        color: 'danger',
      });
    }
  };

  const handleBackClick = () => {
    history.goBack(); // Go back to the previous page (EntryPage)
  };

  const handleSignupClick = () => {
    console.log('Signup clicked');
    // Navigate to the signup page
    history.push('/signup');
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBackClick}>
              <IonIcon icon="arrow-back"></IonIcon> {/* Back arrow icon */}
            </IonButton>
          </IonButtons>
          <IonTitle>Restaurant Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="login-page-content">
        <div className="login-container">
          <IonText className="login-title">
            <h2>Welcome Back!</h2>
          </IonText>
          <IonText className="login-subtitle">
            <p>Sign in to manage your restaurant</p>
          </IonText>
          <div className="login-form">
            <IonList>
              <IonItem lines="full">
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={e => setEmail(e.detail.value!)}
                  placeholder="Enter your email"
                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={e => setPassword(e.detail.value!)}
                  placeholder="Enter your password"
                ></IonInput>
              </IonItem>
            </IonList>

            <IonButton expand="block" size="large" onClick={handleLogin} className="login-button">
              Login
            </IonButton>
          </div>
          <div className="signup-text">
            <IonText color="medium">
              Don't have an account?{' '}
              <span className="signup-link" onClick={handleSignupClick}>Sign up</span>
            </IonText>
          </div>
          <div className="divider">
            <IonText color="medium">OR</IonText>
          </div>

          <IonButton expand="block" size="large" fill="outline" onClick={handleGoogleLogin}
                     className="google-login-button">
            <IonIcon slot="start" icon={logoGoogle}></IonIcon>
            Continue with Google
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
