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
  IonToolbar
} from '@ionic/react';
import {arrowBack, arrowForward} from 'ionicons/icons';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './SignupPage.css';
import {useAuth} from "../lib/actions";

interface UserData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
  actorType?: string;
  confirmedPassword: string;
}


const SignupPage: React.FC = () => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const {signup} = useAuth(); // Use the useAuth hook

  const [userData, setUserData] = useState<UserData>({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    password: '',
    actor_type: 'restaurant',
    confirmed_password: ''
  });

  const handleSingup = () => {
    if (validateUserData()) {
      setCurrentStep(2);
    }
  };

  const validateUserData = (): boolean => {
    // Add validation logic
    return true;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack}/>
            </IonButton>
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="signup-content">

          <IonText className="step-header">
            <h2>{currentStep === 1 ? "Personal Information" : "Store Information"}</h2>
            <p>{currentStep === 1 ? "Create your restaurant manager account" : "Tell us about your restaurant"}</p>
          </IonText>
          <IonList>
            <div className="signup-form">
              <IonItem lines="full">
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={userData.email}
                  onIonChange={e => setUserData({...userData, email: e.detail.value!})}
                  placeholder="restaurant@example.com" // Example placeholder
                  required
                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Phone Number</IonLabel>
                <IonInput
                  type="tel"
                  placeholder="+1 234 567 890"
                  value={userData.phone}
                  onIonChange={e => setUserData({...userData, phone: e.detail.value!})}
                  required
                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">First Name</IonLabel>
                <IonInput
                  type="text"
                  value={userData.firstName}
                  onIonChange={e => setUserData({...userData, firstName: e.detail.value!})}
                  placeholder="John" // Example placeholder
                  required

                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Last Name</IonLabel>
                <IonInput
                  type="text"
                  value={userData.lastName}
                  onIonChange={e => setUserData({...userData, lastName: e.detail.value!})}
                  placeholder="Doe" // Example placeholder
                  required

                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={userData.password}
                  onIonChange={e => setUserData({...userData, password: e.detail.value!})}
                  placeholder="Enter a strong password" // Example placeholder
                  required

                ></IonInput>
              </IonItem>

              <IonItem lines="full">
                <IonLabel position="stacked">Confirm Password</IonLabel>
                <IonInput
                  type="password"
                  value={userData.confirmedPassword}
                  onIonChange={e => setUserData({...userData, confirmedPassword: e.detail.value!})}
                  placeholder="Confirm your password"
                  required

                ></IonInput>
              </IonItem>
            </div>
          </IonList>
          <IonButton expand="block" onClick={handleSingup} className="action-button">
            Signup
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
