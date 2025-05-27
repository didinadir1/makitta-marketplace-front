import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {arrowBack} from 'ionicons/icons';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './SignupPage.css';

interface UserData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface StoreData {
  storeName: string;
  address: string;
  description: string;
}

const SignupPage: React.FC = () => {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [storeData, setStoreData] = useState<StoreData>({
    storeName: '',
    address: '',
    description: ''
  });

  const handleNextStep = () => {
    if (validateUserData()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStoreData()) {
      // Submit logic here
      console.log('Submitting:', {userData, storeData});
      history.push('/login');
    }
  };

  const validateUserData = (): boolean => {
    // Add validation logic
    return true;
  };

  const validateStoreData = (): boolean => {
    // Add validation logic
    return true;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {currentStep === 2 ? (
              <IonButton onClick={() => setCurrentStep(1)}>
                <IonIcon icon={arrowBack}/>
              </IonButton>
            ) : (
              <IonButton onClick={() => history.goBack()}>
                <IonIcon icon={arrowBack}/>
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
        <IonProgressBar value={currentStep / 2} color="primary"/>
      </IonHeader>

      {/* Form Box */}

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <>
          <IonText className="step-header">
            <h2>Personal Information</h2>
            <p>Create your restaurant manager account</p>
          </IonText>
          <IonCard>
            <IonCardContent>
              <IonList className="signup-form">
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
                    value={userData.confirmPassword}
                    onIonChange={e => setUserData({...userData, confirmPassword: e.detail.value!})}
                    placeholder="Confirm your password" // Example placeholder
                    required

                  ></IonInput>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
          <IonButton expand="block" onClick={handleNextStep} className="action-button">
            Continue to Store Details
            <IonIcon icon={arrowBack} slot="end" className="flip"/>
          </IonButton>
        </>
      )}

      {/* Step 2: Store Details */}
      {currentStep === 2 && (
        <>
          <IonText className="step-header">
            <h2>Store Information</h2>
            <p>Tell us about your restaurant</p>
          </IonText>
          <IonCard>
            <IonCardContent>
              <IonList className="signup-form">
                <IonItem lines="full">
                  <IonLabel position="stacked">Store Name</IonLabel>
                  <IonInput
                    type="text"
                    value={storeData.storeName}
                    onIonChange={e => setStoreData({...storeData, storeName: e.detail.value!})}
                    placeholder="The Cozy Corner Cafe" // Example placeholder
                    required

                  ></IonInput>
                </IonItem>

                <IonItem lines="full">
                  <IonLabel position="stacked">Address</IonLabel>
                  <IonInput
                    type="text"
                    value={storeData.address}
                    onIonChange={e => setStoreData({...storeData, address: e.detail.value!})}
                    placeholder="123 Main St, Anytown" // Example placeholder
                    required

                  ></IonInput>
                </IonItem>

                <IonItem lines="full">
                  <IonLabel position="stacked">Description</IonLabel>
                  <IonTextarea
                    value={storeData.description}
                    onIonChange={e => setStoreData({...storeData, description: e.detail.value!})}
                    placeholder="Tell us about your store (cuisine, atmosphere, etc.)" // Example placeholder
                    rows={4}

                  ></IonTextarea>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
          {/* Navigation Buttons */}
          <div className="button-container">
            <IonButton expand="block" size="large" onClick={handleSubmit}>
              {currentStep < 2 ? 'Next' : 'Sign Up'}
            </IonButton>
          </div>
        </>
      )}


    </IonPage>
  );
};

export default SignupPage;
