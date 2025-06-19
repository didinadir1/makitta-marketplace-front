import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast
} from '@ionic/react';
import {arrowBack} from 'ionicons/icons';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  FullStoreCreationFormData,
  fullStoreCreationSchema,
  StoreDetailsFormData,
} from '../validation/storeCreationValidation';
import './StoreCreationPage.css';
import StoreDetailsForm from '../components/store-creation/StoreDetailsForm'; // Import Step 1 component
import SocialLinksForm from '../components/store-creation/SocialLinksForm'; // Import Step 2 component


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
        return <StoreDetailsForm control={control} errors={errors} />;
      case 2:
        return <SocialLinksForm control={control} errors={errors} />;
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
          <form onSubmit={currentStep === 1 ? handleSubmit(handleNextStep) : handleSubmit(onSubmit)}>
            {renderStepContent()}

            {/* Buttons to navigate steps or submit */}
            {currentStep < 2 ? (
              <IonButton expand="block" type="submit"> {/* Type="submit" will trigger form onSubmit */}
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
