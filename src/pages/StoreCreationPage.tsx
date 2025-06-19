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
  fullStoreCreationSchema, StoreDetailsFormData,
} from '../validation/storeCreationValidation';
import './StoreCreationPage.css';


const StoreCreationPage: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    control,
    handleSubmit,
    formState: {errors},
    trigger, // Use trigger for step-specific validation
  } = useForm<FullStoreCreationFormData>({
    resolver: zodResolver(fullStoreCreationSchema),
    defaultValues: {
      storeName: '',
      address: '',
      description: '',
      instagram: '',
      facebook: '',
      snapchat: '',
    },
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
  const onSubmit: SubmitHandler<FullStoreCreationFormData> = (data) => {
    console.log('Submitting:', data);
    // TODO: Implement actual submission logic (API call, etc.)

    presentToast({
      message: 'Store created successfully!',
      duration: 2000,
      color: 'success',
    });
    history.push('/login'); // Or navigate to the store dashboard
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={handleSubmit(handleNextStep)}>
          <IonList className="signup-form">
            <Controller
              name="storeName"
              control={control}
              render={({field}) => (
                <IonItem lines="full" >
                  <IonLabel position="stacked">Store Name</IonLabel>
                  <IonInput
                    type="text"
                    {...field}
                    placeholder="The Cozy Corner Cafe"
                    required
                  ></IonInput>
                  {errors.storeName && <IonText color="danger" slot="error">{errors.storeName.message}</IonText>}
                </IonItem>
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({field}) => (
                <IonItem lines="full">
                  <IonLabel position="stacked">Address</IonLabel>
                  <IonInput
                    type="text"
                    {...field}
                    placeholder="123 Main St, Anytown"
                    required
                  ></IonInput>
                  {errors.address && <IonText color="danger" slot="error">{errors.address.message}</IonText>}
                </IonItem>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({field}) => (
                <IonItem lines="full">
                  <IonLabel position="stacked">Description</IonLabel>
                  <IonTextarea
                    {...field}
                    placeholder="Tell us about your store (cuisine, atmosphere, etc.)"
                    rows={4}
                  ></IonTextarea>
                  {errors.description && <IonText color="danger" slot="error">{errors.description.message}</IonText>}
                </IonItem>
              )}
            />
          </IonList>
        <IonButton expand="block" onClick={handleNextStep} type="submit"> {/* Use type="button" to prevent form submission */}
          Next
        </IonButton>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>

          <IonList className="signup-form">
            <Controller
              name="instagram"
              control={control}
              render={({field}) => (
                <IonItem lines="full">
                  <IonIcon icon={logoInstagram} slot="start" color="medium"/>
                  <IonLabel position="stacked">Instagram Link (Optional)</IonLabel>
                  <IonInput
                    type="url"
                    {...field}
                    placeholder="https://instagram.com/yourstore"
                  ></IonInput>
                  {errors.instagram && <IonText color="danger" slot="error">{errors.instagram.message}</IonText>}
                </IonItem>
              )}
            />

            <Controller
              name="facebook"
              control={control}
              render={({field}) => (
                <IonItem lines="full">
                  <IonIcon icon={logoFacebook} slot="start" color="medium"/>
                  <IonLabel position="stacked">Facebook Link (Optional)</IonLabel>
                  <IonInput
                    type="url"
                    {...field}
                    placeholder="https://facebook.com/yourstore"
                  ></IonInput>
                  {errors.facebook && <IonText color="danger" slot="error">{errors.facebook.message}</IonText>}
                </IonItem>
              )}
            />

            <Controller
              name="snapchat"
              control={control}
              render={({field}) => (
                <IonItem lines="full">
                  <IonIcon icon={logoSnapchat} slot="start" color="medium"/>
                  <IonLabel position="stacked">Snapchat Link (Optional)</IonLabel>
                  <IonInput
                    type="url"
                    {...field}
                    placeholder="https://snapchat.com/add/yourstore"
                  ></IonInput>
                  {errors.snapchat && <IonText color="danger" slot="error">{errors.snapchat.message}</IonText>}
                </IonItem>
              )}
            />
          </IonList>
        <IonButton expand="block" type="submit"> {/* Default type="submit" will trigger form onSubmit */}
          Sign Up
        </IonButton>
          </form>
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
              <IonButton onClick={() => {
                setCurrentStep(currentStep - 1)
              }}>
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
            {renderStepContent()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StoreCreationPage;
