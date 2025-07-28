import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  useIonLoading,
  useIonToast,
} from '@ionic/react';
import {logoGoogle} from 'ionicons/icons'; // Google icon
import React, {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {getRedirectPath, useAuth} from '../lib/actions/users'; // Import useAuth hook
import './LoginPage.css';


const LoginPage: React.FC = () => {
  const history = useHistory();
  const {login, loginWithGoogle} = useAuth(); // Use the useAuth hook
  const [present, dismiss] = useIonLoading();
  const [presentToast] = useIonToast();
  const location = useLocation();

  // Parse query parameters manually
  const queryParams = new URLSearchParams(location.search);

  const [email, setEmail] = useState(atob(queryParams.get("email") ?? ""));
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await present({
      message: 'Logging in...',
      duration: 0,
    });
    try {
      const response = await login({
        email,
        password,
        provider: queryParams.get("verify-google") ? 'google' : 'emailpass'
      });
      await dismiss();
      // It also handles navigation based on actorType.
      if (response?.actorType) {
        history.push(getRedirectPath(response?.actorType));
      } else if (response?.verifyPassword) {
        // todo manage this case when u implement sending verification email for account
        history.push(`login?verify-password=${true}&email=${btoa(email)}`);
      }
    } catch (error: any) {
      await dismiss();
      console.error('Login failed:', error);
      await presentToast({
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
      if (response) {
        const {actorType, profile, verifyPassword} = response;
        if (actorType)
          history.push(getRedirectPath(response.actorType));
        else if (verifyPassword) {
          setEmail(profile?.email ?? '');
          history.push(`login?verify-google=${true}&email=${btoa(profile?.email ?? "")}`);
        }
      }

      await dismiss();

    } catch (error: any) {
      await dismiss();
      console.error('Google login failed:', error);
      await presentToast({
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
