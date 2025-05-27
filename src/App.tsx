import { Redirect, Route } from 'react-router-dom';
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
import { IonReactRouter } from '@ionic/react-router';
import {
  restaurant, business, person, cart,
  grid, fastFood, receipt, chatbubble // Changed to filled icons
} from 'ionicons/icons'; // Added restaurant mode icons
import DishesPage from './pages/DishesPage';
import RestaurantPage from './pages/RestaurantPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import DishDetailPage from './pages/DishDetailPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import CartPage from './pages/CartPage'; // Import the new CartPage
import ProfileEditPage from './pages/ProfileEditPage'; // Import the new ProfileEditPage
import { CartProvider } from './state/cartState'; // Import CartProvider
import { AppModeProvider, useAppMode } from './state/appModeState'; // Import AppModeProvider
import DashboardPage from './pages/DashboardPage';
import MyStorePage from './pages/MyStorePage';
import OrdersPage from './pages/OrdersPage';
import { ProductContextProvider } from './state/productState'; // Import AppContextProvider
import EntryPage from './pages/EntryPage'; // Import the new EntryPage
import LoginPage from './pages/LoginPage'; // Import the new LoginPage


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

setupIonicReact();

// Create a TabsContainer component to use the mode context
const TabsContainer: React.FC = () => {
  const { isRestaurantMode } = useAppMode();

  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Entry point */}
        <Route exact path="/entry">
          <EntryPage />
        </Route>
        {/* Login page for restaurants */}
        <Route exact path="/login">
          <LoginPage />
        </Route>

        {/* Normal mode routes */}
        <Route exact path="/dishes">
          <DishesPage />
        </Route>
        <Route exact path="/restaurants">
          <RestaurantPage />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>

        {/* Restaurant mode routes */}
        {/* MyStorePage now handles its own nested routes */}
        <Route path="/MyStore">
          <MyStorePage />
        </Route>
        <Route exact path="/dashboard">
          <DashboardPage />
        </Route>
        <Route exact path="/orders">
          <OrdersPage />
        </Route>
        <Route exact path="/messages">
          <MessagesPage />
        </Route>

        {/* Common routes */}
        <Route exact path="/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/profile/edit">
          <ProfileEditPage />
        </Route>
         {/* Dish and Restaurant Detail pages might be needed in both modes,
             or you might want separate detail pages for restaurant mode.
             Keeping them outside conditional rendering for now. */}
        <Route exact path="/dish/:id">
          <DishDetailPage />
        </Route>
        <Route exact path="/restaurant/:id">
          <RestaurantDetailPage />
        </Route>
        {/* Default redirect to the entry page */}
        <Route exact path="/">
          <Redirect to="/entry" />
        </Route>
      </IonRouterOutlet>

      {/* Conditional Tab Bars */}
      {/* The tab bars should only be visible when NOT on the entry or login pages */}
      {/* This logic might need refinement based on actual authentication state */}
      {window.location.pathname !== '/entry' && window.location.pathname !== '/login' && (
        isRestaurantMode() ? (
          // Restaurant mode tabs
          <IonTabBar slot="bottom">
            <IonTabButton tab="dashboard" href="/dashboard">
              <IonIcon aria-hidden="true" icon={grid} /> {/* Changed icon */}
              <IonLabel>Dashboard</IonLabel>
            </IonTabButton>
            {/* MyStore tab now points to the base path */}
            <IonTabButton tab="MyStore" href="/MyStore">
              <IonIcon aria-hidden="true" icon={fastFood} /> {/* Changed icon */}
              <IonLabel>My Store</IonLabel>
            </IonTabButton>
            <IonTabButton tab="orders" href="/orders">
              <IonIcon aria-hidden="true" icon={receipt} /> {/* Changed icon */}
              <IonLabel>Orders</IonLabel>
            </IonTabButton>
            <IonTabButton tab="messages" href="/messages">
              <IonIcon aria-hidden="true" icon={chatbubble} /> {/* Changed icon */}
              <IonLabel>Messages</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon aria-hidden="true" icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        ) : (
          // Normal mode tabs
          <IonTabBar slot="bottom">
            <IonTabButton tab="dishes" href="/dishes">
              <IonIcon aria-hidden="true" icon={restaurant} />
              <IonLabel>Dishes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="restaurants" href="/restaurants">
              <IonIcon aria-hidden="true" icon={business} />
              <IonLabel>Restaurants</IonLabel>
            </IonTabButton>
            <IonTabButton tab="cart" href="/cart">
              <IonIcon aria-hidden="true" icon={cart} />
              <IonLabel>Cart</IonLabel>
            </IonTabButton>
            <IonTabButton tab="messages" href="/messages">
              <IonIcon aria-hidden="true" icon={chatbubble} /> {/* Changed icon */}
              <IonLabel>Messages</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon aria-hidden="true" icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        )
      )}
    </IonTabs>
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppModeProvider>
        <CartProvider>
          <ProductContextProvider> {/* Wrap with AppContextProvider */}
            <TabsContainer />
          </ProductContextProvider>
        </CartProvider>
      </AppModeProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
