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
} from '@ionic/react';
import {logoGoogle} from 'ionicons/icons'; // Google icon
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAppMode} from '../state/appModeState'; // Hook to set app mode
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const {setMode} = useAppMode(); // Use setMode to change app mode

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login with Email:', email, 'Password:', password);
    // Implement actual email/password login logic here
    // On successful login:
    setMode('restaurant'); // Set app mode to restaurant
    history.push('/dashboard'); // Navigate to the restaurant dashboard
  };

  const handleGoogleLogin = () => {
    console.log('Continue with Google clicked');
    // Implement actual Google login logic here
    // On successful login:
    setMode('restaurant'); // Set app mode to restaurant
    history.push('/dashboard'); // Navigate to the restaurant dashboard
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

          <IonList className="login-form">
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
