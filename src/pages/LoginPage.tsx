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
import {useLinkGoogleAccount, useLogInWithEmailPass, useLogInWithGoogle} from '../lib/actions'; // Import useAuth hook
import './LoginPage.css';
import {GoogleLoginResponseOnline, SocialLogin} from "@capgo/capacitor-social-login";
import {CUSTOMER_JWT_KEY, medusaStorage, SELLER_JWT_KEY} from "../lib/config";


const LoginPage: React.FC = () => {
  const {mutateAsync: loginMutation} = useLogInWithEmailPass()
  const {mutateAsync: googleLoginMutation} = useLogInWithGoogle()
  const {mutateAsync: linkGoogleAccountMutation} = useLinkGoogleAccount()
  const history = useHistory();
  const [present, dismiss] = useIonLoading();
  const [presentToast] = useIonToast();
  const location = useLocation();

  // Parse query parameters manually
  const queryParams = new URLSearchParams(location.search);

  const isLinkingGoogle = queryParams.get("link-google") === "true";
  const googleIdToken = queryParams.get("google-id-token") ?? "";

  const [email, setEmail] = useState(atob(queryParams.get("email") ?? ""));
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await present({
      message: 'Logging in...',
      duration: 0,
    });

    if (!isLinkingGoogle) {
      await loginMutation({email, password, actor_type: "customer"}, {
        onSuccess: async (response) => {
          console.log("successful login", {response});
          await loginMutation({email, password, actor_type: "seller"}, {
            onSuccess: async () => {
              await dismiss();
            },
            onError: async () => {
              await dismiss();
              await presentToast({
                message: 'create a seller account !',
                duration: 2000,
                color: 'danger',
              })
            }
          })
          await presentToast({
            message: 'Login successful!',
            duration: 2000,
            color: 'success',
          })
          history.replace("/home")
        },
        onError: async (error: any) => {
          await dismiss();
          console.error('Login failed:', error);
          await presentToast({
            message: error.message || 'Login failed. Please try again.',
            duration: 3000,
            color: 'danger',
          });
        }
      })
    } else {
      await linkGoogleAccountMutation({email, password, idToken: googleIdToken}, {
        onSuccess: async (response) => {
          await dismiss();
          if (response.customerToken) {
            await medusaStorage.set(CUSTOMER_JWT_KEY, response.customerToken);
          }
          if (response.sellerToken) {
            await medusaStorage.set(SELLER_JWT_KEY, response.sellerToken);
          }
          await presentToast({
            message: 'Accounts linked successfully!',
            duration: 2000,
            color: 'success',
          })
          console.log("successful account linking", {response});
          history.replace('/'); // Clear query params after linking
        },
        onError: async (error: any) => {
          await dismiss();
          console.error('Account linking failed:', error);
          await presentToast({
            message: error.message || 'Account linking failed. Please try again.',
            duration: 3000,
            color: 'danger',
          });
        }
      })
    }
  };

  const handleGoogleLogin = async () => {
    await present({
      message: 'Logging in...',
      duration: 0,
    });

    const {result} = await SocialLogin.login({
      provider: "google",
      options: {
        scopes: ['email', 'profile'],
      }
    }) as { result: GoogleLoginResponseOnline }

    await googleLoginMutation({idToken: result.idToken!}, {
      onSuccess: async (response) => {
        await dismiss();
        if (response.originalProvider && response.profile) {
          setEmail(response.profile?.email ?? '');
          history.push(`login?link-google=${true}&email=${btoa(response?.profile?.email ?? "")}&google-id-token=${result.idToken}`);
        } else {
          if (response.customerToken) {
            await medusaStorage.set(CUSTOMER_JWT_KEY, response.customerToken);
          }
          if (response.sellerToken) {
            await medusaStorage.set(SELLER_JWT_KEY, response.sellerToken);
          }
        }
        await presentToast({
          message: 'Login successful!',
          duration: 2000,
          color: 'success',
        })
        history.replace('/');
      },
      onError: async (error: any) => {
        await dismiss();
        console.error('Google Login failed:', error);
        await presentToast({
          message: error.message || 'Google Login failed. Please try again.',
          duration: 3000,
          color: 'danger',
        });
      }
    })
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
            <h2>{isLinkingGoogle ? "Link your account" : "Welcome Back!"}</h2>
          </IonText>
          <IonText className="login-subtitle">
            <p>Sign in to use Makitta</p>
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
          {isLinkingGoogle || (
            <>
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
            </>)}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
