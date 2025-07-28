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
import React, {useEffect, useState} from 'react';
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
import {useRestaurantActions} from "../lib/actions";
import {useUser} from "../lib/data";
import useRestaurant from "../lib/data/restaurants"; // Import Step 2 component


const StoreCreationPage: React.FC = () => {
  const history = useHistory();
  const {createRestaurant, updateRestaurant} = useRestaurantActions()
  const [presentToast] = useIonToast();
  const [currentStep, setCurrentStep] = useState(1);

  const {data: user} = useUser();
  const {data: restaurant} = useRestaurant(user?.restaurant_id || "");

  const steps = [
    {title: 'Store Information', subtitle: "Tell us about your restaurant", schema: storeDetailsSchema},
    {title: 'Social Media Links', subtitle: "Link your social media accounts (Optional)", schema: socialLinksSchema},
  ];
  const isEditPage = history.location.pathname.includes("edit-store")

  let defaultImage: File;
  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
    trigger, // Use trigger for step-specific validation
    watch,
    setValue,
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

  useEffect(() => {
    if (restaurant) {
      setValue("name", restaurant.name || "");
      setValue("address", restaurant.address || "");
      setValue("description", restaurant.description || "");
      setValue("instagram", restaurant.instagram_url || "");
      setValue("facebook", restaurant.facebook_url || "");
      setValue("snapchat", restaurant.snapchat_url || "");
    }

    if (restaurant?.image_url) {
      const url = new URL(restaurant.image_url);
      const fileName = url.pathname.replace(/^.*[\\/]/, "");

      fetch(restaurant.image_url)
        .then(response => response.blob())
        .then(blob => {
          defaultImage = new File([blob], fileName, {type: blob.type});
          setValue("image", defaultImage); // Set the file in form state
        })
        .catch(error => console.error('Error fetching image:', error));
    }
  }, [restaurant]);

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
      if (isEditPage) {
        let updatedValues = Object.fromEntries(
          Object.entries(data).filter(([key, value]) => key !== "image" && value !== restaurant![key as keyof typeof restaurant])
        )
        const haveImageChanged = await areFilesIdentical(defaultImage, watch("image"))
        if (haveImageChanged) {
          updatedValues = {...updatedValues, image: watch("image")!}
        }
        console.log({updatedValues})
        await updateRestaurant({id: restaurant!.id, ...updatedValues})
      } else await createRestaurant(data)
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
          <IonTitle>{isEditPage ? "Edit" : "Create"} Store</IonTitle>
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
                <IonButton expand="block" type="submit"
                           disabled={isSubmitting}> {/* Default type="submit" will trigger form onSubmit */}
                  {isEditPage ? "Edit" : "Create"} Store
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

async function areFilesIdentical(file1?: File, file2?: File) {
  // Convert files to ArrayBuffers
  const buffer1 = await file1?.arrayBuffer();
  const buffer2 = await file2?.arrayBuffer();

  if (!buffer1 || !buffer2) return false;

  // Compare byte-by-byte
  if (buffer1.byteLength !== buffer2.byteLength) return false;

  const view1 = new Uint8Array(buffer1);
  const view2 = new Uint8Array(buffer2);

  for (let i = 0; i < view1.length; i++) {
    if (view1[i] !== view2[i]) return false;
  }

  return true;
}