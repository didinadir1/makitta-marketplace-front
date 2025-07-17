import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLoading,
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
  socialLinksSchema,
  storeDetailsSchema,
} from '../validation/storeCreationValidation';
import './StoreCreationPage.css';
import StoreDetailsForm from '../components/store-creation/StoreDetailsForm'; // Import Step 1 component
import SocialLinksForm from '../components/store-creation/SocialLinksForm';
import {useRestaurantActions} from "../lib/actions"; // Import Step 2 component


const StoreCreationPage: React.FC = () => {
  const history = useHistory();
  const {createRestaurant} = useRestaurantActions()
  const [presentToast] = useIonToast();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {title: 'Store Information', subtitle: "Tell us about your restaurant", schema: storeDetailsSchema},
    {title: 'Social Media Links', subtitle: "Link your social media accounts (Optional)", schema: socialLinksSchema},
  ];

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
    trigger, // Use trigger for step-specific validation
    watch
  } = useForm<FullStoreCreationFormData>({
    resolver: zodResolver(fullStoreCreationSchema),
    defaultValues: {
      name: '',
      address: '',
      description: '',
      instagram: '',
      facebook: '',
      snapchat: '',
      image: undefined,
    },
  });

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  }

  // Function to handle moving to the next step (Step 1 -> Step 2)
  const validateStep = async () => {
    const isStepValid = await trigger(Object.keys(steps[currentStep - 1].schema.shape) as (Array<keyof FullStoreCreationFormData>));
    if (isStepValid) {
      return true
    }
    await presentToast({
      message: 'Please fix the errors in the store information.',
      duration: 2000,
      color: 'danger',
    });
    return false;

  };

  const handleNextStep = async () => {
    const isValidStep = await validateStep();
    if (isValidStep) {
      setCurrentStep(currentStep + 1);
    }
  }

  // Function to handle the final submission (from Step 2)
  const onSubmit: SubmitHandler<FullStoreCreationFormData> = async (data) => {
    const isValidStep = await validateStep();
    if (isValidStep) {
      createRestaurant(data)
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StoreDetailsForm control={control} errors={errors}
                                 defaultFile={watch("image")} // Pass existing image URL
        />;
      case 2:
        return <SocialLinksForm control={control} errors={errors}/>;
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
              <IonButton onClick={handlePrevStep}>
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
            <h2>{steps[currentStep - 1].title}</h2>
            <p>{steps[currentStep - 1].subtitle}</p>
          </IonText>
          {/* Wrap form content in <form> and use handleSubmit */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent()}

            {/* Buttons to navigate steps or submit */}
            {currentStep < 2 ? (
              <IonButton expand="block" onClick={handleNextStep}> {/* Type="submit" will trigger form onSubmit */}
                Next
              </IonButton>
            ) : (
              <>
                <IonButton expand="block" type="submit"> {/* Default type="submit" will trigger form onSubmit */}
                  Sign Up
                </IonButton>
                <IonLoading message="Loading..." isOpen={isValid && isSubmitting} spinner="circles"/>
              </>
            )}
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StoreCreationPage;
