import {Redirect, Route} from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {cart, chatbubble, home, person, storefront} from 'ionicons/icons';
import DishesPage from './pages/DishesPage';
import StorePage from './pages/StorePage';
import DishDetailPage from './pages/DishDetailPage';
import ProfileEditPage from './pages/ProfileEditPage';
import {CartProvider} from './state/cartState';
import {ProductContextProvider} from './state/productState';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import {QueryClientProvider} from "@tanstack/react-query";
import {useEffect} from "react";
import {SocialLogin} from "@capgo/capacitor-social-login";
import MyAccountPage from "./pages/MyAccountPage";
import StoreCreationPage from "./pages/StoreCreationPage";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {queryClient} from "./lib/utils/query-client";
import {useMe} from "./lib/data";
import CartPage from "./pages/CartPage";
import MessagesPage from "./pages/MessagesPage";

setupIonicReact();

export interface LocationState {
  from?: string;
}

const ProtectedRoute: React.FC<{
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}> = ({component: Component, path: path, ...rest}) => {
  const {user, isLoading, isError} = useMe();

  return (
    <Route
      {...rest}
      path={path}
      render={(props) => {
        // Show loading spinner while checking authentication
        if (isLoading) {
          return (
            <IonContent className="ion-padding">
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                <IonSpinner name="crescent"/>
              </div>
            </IonContent>
          );
        }

        // If there's an error or no user, redirect to login
        if (isError || !user?.id) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {from: path}
              }}
            />
          );
        }

        // User is authenticated, render the component
        return <Component {...props} />;
      }}
    />
  );
};
// Create a TabsContainer component to use the mode context
const TabsContainer: React.FC = () => {

  useEffect(() => {
    SocialLogin.initialize(
      {
        google: {
          iOSClientId: __GOOGLE_IOS_CLIENT_ID__,
          webClientId: __GOOGLE_WEB_CLIENT_ID__
        }
      }
    )
  }, []);


  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Tab routes - these should come first for proper tab functionality */}
        <Route exact path="/home" component={DishesPage}/>
        <ProtectedRoute exact path="/profile" component={MyAccountPage}/>
        <ProtectedRoute exact path="/profile/account" component={ProfileEditPage}/>
        <ProtectedRoute exact path="/store" component={StorePage}/>
        <ProtectedRoute exact path="/store/create-store" component={StoreCreationPage}/>
        <ProtectedRoute exact path="/store/edit-store" component={StoreCreationPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <ProtectedRoute exact path="/cart" component={CartPage}/>
        <ProtectedRoute exact path={"/messages"} component={MessagesPage}/>

        {/* Detail and sub-pages */}
        <Route exact path="/dish/:id" component={DishDetailPage}/>

        {/* Redirect root to /home */}
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>

      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon aria-hidden="true" icon={home}/>
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="cart" href="/cart">
          <IonIcon aria-hidden="true" icon={cart}/>
          <IonLabel>Cart</IonLabel>
        </IonTabButton>
        <IonTabButton tab="store" href="/store">
          <IonIcon aria-hidden="true" icon={storefront}/>
          <IonLabel>Store</IonLabel>
        </IonTabButton>
        <IonTabButton tab="messages" href="/messages">
          <IonIcon aria-hidden="true" icon={chatbubble}/>
          <IonLabel>Messages</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon aria-hidden="true" icon={person}/>
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App: React.FC = () => (
  <IonApp>
    <QueryClientProvider client={queryClient}>
      <IonReactRouter>
        {/* Routes outside tabs - for pages that shouldn't show tabs */}

        {/* Main app with tabs */}
        <Route path="/">
          <CartProvider>
            <ProductContextProvider>
              <TabsContainer/>
            </ProductContextProvider>
          </CartProvider>
        </Route>

        <ReactQueryDevtools initialIsOpen={false}/>
      </IonReactRouter>
    </QueryClientProvider>
  </IonApp>
);

export default App;