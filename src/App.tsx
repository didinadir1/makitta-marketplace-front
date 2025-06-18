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
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect} from "react";
import {SocialLogin} from "@capgo/capacitor-social-login";
import MyAccountPage from "./pages/MyAccountPage";
import StoreCreationPage from "./pages/StoreCreationPage";

setupIonicReact();
const queryClient = new QueryClient()


// Create a TabsContainer component to use the mode context
const TabsContainer: React.FC = () => {
  const location = useLocation(); // Get the current location

  useEffect(() => {
    SocialLogin.initialize(
      {
        google: {
          iOSClientId: "1079130558258-iqole135c63rblcsl6edp27509ei0hej.apps.googleusercontent.com",
          webClientId: "1079130558258-q2liqaor41kmm36c73gvpp7jjmb98ddj.apps.googleusercontent.com"
        }
      }
    )
  }, []);


  // Determine if the tab bar should be visible
  const showTabBar = location.pathname !== '/entry' && location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Entry point */}
        <Route exact path="/entry">
          <EntryPage/>
        </Route>
        {/* Login page for restaurants */}
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        {/* Signup page for restaurants */}
        <Route exact path="/signup">
          <SignupPage/>
        </Route>

        {/* Normal mode routes */}
        <Route exact path="/dishes">
          <DishesPage/>
        </Route>
        <Route exact path="/restaurants">
          <RestaurantPage/>
        </Route>
        <Route exact path="/cart">
          <CartPage/>
        </Route>

        {/* Common routes */}
        <Route exact path="/profile">
          <ProfilePage/>
        </Route>
        <Route exact path="/profile/edit">
          <ProfileEditPage/>
        </Route>
        <Route exact path="/profile/my-account">
          <MyAccountPage/>
        </Route>
        <Route exact path="/profile/create-store">
          <StoreCreationPage/>
        </Route>
        {/* Dish and Restaurant Detail pages might be needed in both modes,
             or you might want separate detail pages for restaurant mode.
             Keeping them outside conditional rendering for now. */}
        <Route exact path="/dish/:id">
          <DishDetailPage/>
        </Route>
        <Route exact path="/restaurant/:id">
          <RestaurantDetailPage/>
        </Route>
        {/* Default redirect to the entry page */}
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
          <IonTabButton tab="profile" href="/profile">
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
    <IonReactRouter>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductContextProvider> {/* Wrap with AppContextProvider */}
            <TabsContainer/>
          </ProductContextProvider>
        </CartProvider>
      </QueryClientProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
