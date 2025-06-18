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
  IonProgressBar,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {arrowBack} from 'ionicons/icons';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './StoreCreationPage.css';

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
          <IonTitle>Create Store</IonTitle>
        </IonToolbar>
        <IonProgressBar value={currentStep / 2}/>
      </IonHeader>
      <IonContent>
        <div className="signup-content">
          <IonText className="step-header">
            <h2>{currentStep === 1 ? "Store Information" : "Social Media Links"}</h2>
            <p>{currentStep === 1 ? "Tell us about your restaurant" : "Link your social media accounts"}</p>
          </IonText>
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
          <IonButton expand="block" onClick={handleSubmit}>
            {currentStep < 2 ? 'Next' : 'Sign Up'}
          </IonButton>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
