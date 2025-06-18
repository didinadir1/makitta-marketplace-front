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
  IonToolbar,
  useIonToast
} from '@ionic/react';
import {arrowBack, logoFacebook, logoInstagram, logoSnapchat} from 'ionicons/icons';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  FullStoreCreationFormData,
  fullStoreCreationSchema,
  StoreDetailsFormData
} from '../validation/storeCreationValidation';
import './StoreCreationPage.css';

// Define the combined form data type
type StoreCreationFormData = FullStoreCreationFormData;

const StoreCreationPage: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger, // Use trigger for step-specific validation
    getValues, // To get current form values
  } = useForm<StoreCreationFormData>({
    resolver: zodResolver(fullStoreCreationSchema),
    defaultValues: {
      storeName: '',
      address: '',
      description: '',
      instagram: '',
      facebook: '',
      snapchat: '',
    },
    mode: 'onTouched', // Validate on blur
  });

  // Function to handle moving to the next step (Step 1 -> Step 2)
  const handleNextStep = async () => {
    // Trigger validation only for fields in step 1
    const step1Fields: (keyof StoreDetailsFormData)[] = ['storeName', 'address', 'description'];
    const isValidStep1 = await trigger(step1Fields);

    if (isValidStep1) {
      setCurrentStep(2);
    } else {
      presentToast({
        message: 'Please fix the errors in the store information.',
        duration: 2000,
        color: 'danger',
      });
    }
  };

  // Function to handle the final submission (from Step 2)
  const onSubmit: SubmitHandler<StoreCreationFormData> = (data) => {
    console.log('Submitting:', data);
    // TODO: Implement actual submission logic (API call, etc.)

    presentToast({
      message: 'Store created successfully!',
      duration: 2000,
      color: 'success',
    });
    history.push('/login'); // Or navigate to the store dashboard
  };

  // Helper to get error message for a field from react-hook-form errors
  const getErrorMessage = (fieldName: keyof StoreCreationFormData) => {
    return errors[fieldName]?.message;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <IonList className="signup-form">
            <Controller
              name="storeName"
              control={control}
              render={({field}) => (
                <IonItem lines="full" className={getErrorMessage('storeName') ? 'ion-invalid' : ''}>
                  <IonLabel position="stacked">Store Name</IonLabel>
                  <IonInput
                    type="text"
                    {...field}
                    placeholder="The Cozy Corner Cafe"
                    required
                  ></IonInput>
                  <IonText color="danger" slot="error">{getErrorMessage('storeName')}</IonText>
                </IonItem>
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({field}) => (
                <IonItem lines="full" className={getErrorMessage('address') ? 'ion-invalid' : ''}>
                  <IonLabel position="stacked">Address</IonLabel>
                  <IonInput
                    type="text"
                    {...field}
                    placeholder="123 Main St, Anytown"
                    required
                  ></IonInput>
                  <IonText color="danger" slot="error">{getErrorMessage('address')}</IonText>
                </IonItem>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({field}) => (
                <IonItem lines="full" className={getErrorMessage('description') ? 'ion-invalid' : ''}>
                  <IonLabel position="stacked">Description</IonLabel>
                  <IonTextarea
                    {...field}
                    placeholder="Tell us about your store (cuisine, atmosphere, etc.)"
                    rows={4}
                  ></IonTextarea>
                  <IonText color="danger" slot="error">{getErrorMessage('description')}</IonText>
                </IonItem>
              )}
            />
          </IonList>
        );
      case 2:
        return (
          <IonList className="signup-form">
            <Controller
              name="instagram"
              control={control}
              render={({field}) => (
                <IonItem lines="full" className={getErrorMessage('instagram') ? 'ion-invalid' : ''}>
                  <IonIcon icon={logoInstagram} slot="start" color="medium"/>
                  <IonLabel position="stacked">Instagram Link (Optional)</IonLabel>
                  <IonInput
                    type="url"
                    {...field}
                    placeholder="https://instagram.com/yourstore"
                  ></IonInput>
                  <IonText color="danger" slot="error">{getErrorMessage('instagram')}</IonText>
                </IonItem>
              )}
            />

            <Controller
              name="facebook"
              control={control}
              render={({field}) => (
                <IonItem lines="full" className={getErrorMessage('facebook') ? 'ion-invalid' : ''}>
                  <IonIcon icon={logoFacebook} slot="start" color="medium"/>
                  <IonLabel position="stacked">Facebook Link (Optional)</IonLabel>
                  <IonInput
                    type="url"
                    {...field}
                    placeholder="https://facebook.com/yourstore"
                  ></IonInput>
                  <IonText color="danger" slot="error">{getErrorMessage('facebook')}</IonText>
                </IonItem>
              )}
            />

            <Controller
              name="snapchat"
              control={control}
              render={({field}) => (
                <IonItem lines="full" className={getErrorMessage('snapchat') ? 'ion-invalid' : ''}>
                  <IonIcon icon={logoSnapchat} slot="start" color="medium"/>
                  <IonLabel position="stacked">Snapchat Link (Optional)</IonLabel>
                  <IonInput
                    type="url"
                    {...field}
                    placeholder="https://snapchat.com/add/yourstore"
                  ></IonInput>
                  <IonText color="danger" slot="error">{getErrorMessage('snapchat')}</IonText>
                </IonItem>
              )}
            />
          </IonList>
        );
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {currentStep > 1 ? ( // Show back button if not on the first step
              <IonButton onClick={() => setCurrentStep(currentStep - 1)}>
                <IonIcon icon={arrowBack}/>
              </IonButton>
            ) : ( // Show history back button on the first step
              <IonButton onClick={() => history.goBack()}>
                <IonIcon icon={arrowBack}/>
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>Create Store</IonTitle>
        </IonToolbar>
        {/* Progress bar value should reflect the current step out of total steps */}
        <IonProgressBar value={currentStep / 2}/>
      </IonHeader>
      <IonContent>
        <div className="signup-content">
          <IonText className="step-header">
            <h2>{currentStep === 1 ? "Store Information" : "Social Media Links"}</h2>
            <p>{currentStep === 1 ? "Tell us about your restaurant" : "Link your social media accounts (Optional)"}</p>
          </IonText>
          {/* Wrap form content in <form> and use handleSubmit */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent()}

            {/* Buttons to navigate steps or submit */}
            {currentStep < 2 ? (
              <IonButton expand="block" onClick={handleNextStep} type="button"> {/* Use type="button" to prevent form submission */}
                Next
              </IonButton>
            ) : (
              <IonButton expand="block" type="submit"> {/* Default type="submit" will trigger form onSubmit */}
                Sign Up
              </IonButton>
            )}
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StoreCreationPage;
