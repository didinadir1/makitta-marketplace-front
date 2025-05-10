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
import { restaurant, business, mail, person } from 'ionicons/icons'; // Changed search to business icon
import DishesPage from './pages/DishesPage';
import RestaurantPage from './pages/RestaurantPage'; // Import the new RestaurantPage
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import DishDetailPage from './pages/DishDetailPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage'; // Import the new RestaurantDetailPage

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/dishes">
            <DishesPage />
          </Route>
          <Route exact path="/restaurants">
            <RestaurantPage />
          </Route>
          <Route path="/messages">
            <MessagesPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/dish/:id">
            <DishDetailPage />
          </Route>
          <Route exact path="/restaurant/:id"> {/* Added route for RestaurantDetailPage */}
            <RestaurantDetailPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/dishes" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="dishes" href="/dishes">
            <IonIcon aria-hidden="true" icon={restaurant} />
            <IonLabel>Dishes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="restaurants" href="/restaurants">
            <IonIcon aria-hidden="true" icon={business} />
            <IonLabel>Restaurants</IonLabel>
          </IonTabButton>
          <IonTabButton tab="messages" href="/messages">
            <IonIcon aria-hidden="true" icon={mail} />
            <IonLabel>Messages</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon aria-hidden="true" icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
