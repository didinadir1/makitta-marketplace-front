import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
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
  storeDetailsSchema,
} from '../validation/storeCreationValidation';
import './StoreCreationPage.css';
import StoreDetailsForm from '../components/store-creation/StoreDetailsForm'; // Import Step 1 component
import {useRestaurantActions} from "../lib/actions";
import {useUser} from "../lib/data";
import useRestaurant from "../lib/data/restaurants";
import areFilesIdentical from "../lib/util/files"; // Import Step 2 component


const StoreCreationPage: React.FC = () => {
  const history = useHistory();
  const {createRestaurant, updateRestaurant} = useRestaurantActions()
  const [presentToast] = useIonToast();

  const {data: user} = useUser();
  const {data: restaurant} = useRestaurant(user?.restaurant_id || "");

  const isEditPage = history.location.pathname.includes("edit-store")

  const [defaultImage, setDefaultImage] = useState<File>();

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
      image: undefined,
    },
  });

  useEffect(() => {
    if (restaurant) {
      setValue("name", restaurant.name || "");
      setValue("address", restaurant.address || "");
      setValue("description", restaurant.description || "");
    }

    if (restaurant?.image_url) {
      const url = new URL(restaurant.image_url);
      const fileName = url.pathname.replace(/^.*[\\/]/, "");

      fetch(restaurant.image_url)
        .then(response => response.blob())
        .then(blob => {
          setDefaultImage(new File([blob], fileName, {type: blob.type}));
          setValue("image", defaultImage); // Set the file in form state
        })
        .catch(error => console.error('Error fetching image:', error));
    }
  }, [restaurant]);

  // Function to handle the final submission
  const onSubmit: SubmitHandler<FullStoreCreationFormData> = async (data) => {
    const isStepValid = await trigger(Object.keys(storeDetailsSchema.shape) as (Array<keyof FullStoreCreationFormData>));
    if (isStepValid) {
      if (isEditPage) {
        let updatedValues = Object.fromEntries(
          Object.entries(data).filter(([key, value]) => key !== "image" && value !== restaurant![key as keyof typeof restaurant])
        )
        const haveImageChanged = await areFilesIdentical(defaultImage, watch("image"))
        if (haveImageChanged) {
          updatedValues = {...updatedValues, image: watch("image")!}
        }
        await updateRestaurant({id: restaurant!.id, ...updatedValues})
      } else await createRestaurant(data)
    }
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
          <IonTitle>{isEditPage ? "Edit" : "Create"} Store</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="signup-content">
          <IonText className="step-header">
            <h2>Store Information</h2>
            <p>Tell us about your restaurant</p>
          </IonText>
          {/* Wrap form content in <form> and use handleSubmit */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <StoreDetailsForm control={control} errors={errors} setValue={setValue}
                              defaultFile={watch("image")} // Pass existing image URL
            />

            {/* Submit button */}
            <IonButton expand="block" type="submit"
                       disabled={isSubmitting}> {/* Default type="submit" will trigger form onSubmit */}
              {isEditPage ? "Edit" : "Create"} Store
            </IonButton>
            <IonLoading message="Loading..." isOpen={isValid && isSubmitting} spinner="circles"/>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StoreCreationPage;
