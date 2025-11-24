import {Redirect, Route, useLocation} from 'react-router-dom'; // Import useLocation
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {business, cart, chatbubble, person, restaurant} from 'ionicons/icons'; // Added restaurant mode icons
import DishesPage from './pages/DishesPage';
import RestaurantPage from './pages/RestaurantPage';
import ProfilePage from './pages/ProfilePage';
import DishDetailPage from './pages/DishDetailPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import CartPage from './pages/CartPage'; // Import the new CartPage
import ProfileEditPage from './pages/ProfileEditPage'; // Import the new ProfileEditPage
import {CartProvider} from './state/cartState'; // Import CartProvider
import {ProductContextProvider} from './state/productState'; // Import AppContextProvider
import EntryPage from './pages/EntryPage'; // Import the new EntryPage
import LoginPage from './pages/LoginPage'; // Import the new LoginPage
import SignupPage from './pages/SignupPage'; // Import the new SignupPage
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
import {useUser} from "./lib/data";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {queryClient} from "./vendor/utils/query-client";

setupIonicReact();

// Create a TabsContainer component to use the mode context
const TabsContainer: React.FC = () => {
  const location = useLocation(); // Get the current location
  const {data: user} = useUser();


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


  // Determine if the tab bar should be visible
  const showTabBar = location.pathname !== '/entry' && location.pathname !== '/signup';

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Entry point */}
        <Route exact path="/entry" component={EntryPage}/>
        {/* Login page for restaurants */}
        <Route exact path="/login" component={LoginPage}/>
        {/* Signup page for restaurants */}
        <Route exact path="/signup" component={SignupPage}/>

        {/* Normal mode routes */}
        <Route exact path="/dishes" component={DishesPage}/>
        <Route exact path="/restaurants" component={RestaurantPage}/>
        <Route exact path="/cart" component={CartPage}/>

        {/* Common routes */}
        <Route exact path="/profile" component={ProfilePage}/>
        <Route exact path="/profile/edit" component={ProfileEditPage}/>
        <Route exact path="/profile/my-account" component={MyAccountPage}/>
        <Route exact path="/profile/create-store" component={StoreCreationPage}/>
        <Route exact path="/profile/my-account/edit-store" component={StoreCreationPage}/>
        <Route exact path="/dish/:id" component={DishDetailPage}/>
        <Route
          exact
          path="/restaurant/:id"
          render={({match}) =>
            match.params.id !== user?.restaurant_id ? (
              <RestaurantDetailPage/>
            ) : (
              // todo maybe redirect to fallback page
              <Redirect to="/restaurants"/>
            )
          }
        />
        <Route exact path="/">
          <Redirect to="/entry"/>
        </Route>
      </IonRouterOutlet>

      {/* Conditional Tab Bars */}
      {showTabBar && (

        <IonTabBar slot="bottom">
          <IonTabButton tab="dishes" href="/dishes">
            <IonIcon aria-hidden="true" icon={restaurant}/>
            <IonLabel>Dishes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="restaurants" href="/restaurants">
            <IonIcon aria-hidden="true" icon={business}/>
            <IonLabel>Restaurants</IonLabel>
          </IonTabButton>
          <IonTabButton tab="cart" href="/cart">
            <IonIcon aria-hidden="true" icon={cart}/>
            <IonLabel>Cart</IonLabel>
          </IonTabButton>
          <IonTabButton tab="messages" href="/messages">
            <IonIcon aria-hidden="true" icon={chatbubble}/> {/* Changed icon */}
            <IonLabel>Messages</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href={`${user?.id ? '/profile' : '/login'}`}>
            <IonIcon aria-hidden="true" icon={person}/>
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      )}
    </IonTabs>
  );
};

const App: React.FC = () => (
  <IonApp>
    <QueryClientProvider client={queryClient}>
      <IonReactRouter>
        <CartProvider>
          <ProductContextProvider> {/* Wrap with AppContextProvider */}
            <TabsContainer/>
          </ProductContextProvider>
        </CartProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
      </IonReactRouter>
    </QueryClientProvider>
  </IonApp>
);

export default App;
