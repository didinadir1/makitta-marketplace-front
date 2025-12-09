import React from 'react';
import {IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonTextarea, useIonToast} from '@ionic/react';
import {Control, Controller, FieldErrors, UseFormSetValue} from 'react-hook-form';
import ImageUploadField from "./ImageUploadField";
import {locationOutline} from "ionicons/icons";
import getCurrentLocation from "../../lib/utils/geolocation";
import {StoreDetailsFormData} from "../../validation/storeCreationValidation";

interface StoreDetailsFormProps {
  control: Control<StoreDetailsFormData>;
  errors: FieldErrors<StoreDetailsFormData>;
  defaultFile?: File;
  setValue: UseFormSetValue<StoreDetailsFormData>; // Add setValue to props
}

const StoreDetailsForm: React.FC<StoreDetailsFormProps> = ({control, errors, defaultFile, setValue}) => {

  const [presentToast] = useIonToast();


  const handleLocationClick = async () => {
    try {
      const address = await getCurrentLocation();
      if (address) {
        setValue('address', address, {shouldValidate: true});
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      await presentToast({
        message: 'Failed to get current location. Please retry.',
        duration: 2000,
        color: 'danger',
      });
    }
  };

  return (
    <IonList className="signup-form">
      <ImageUploadField
        name="image"
        label="Store Logo/Image"
        control={control}
        errors={errors}
        defaultFile={defaultFile}
      />
      <Controller
        name="name"
        control={control}
        render={({field}) => (
          <IonItem lines="full"> {/* Add ion-invalid class */}
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              type="text"
              {...field}
              placeholder="The Cozy Corner Cafe"
            ></IonInput>
            {errors.name && <IonNote color="danger">{errors.name.message}</IonNote>}
          </IonItem>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({field}) => (
          <IonItem lines="full"> {/* Add ion-invalid class */}
            <IonLabel position="stacked">Address</IonLabel>
            <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between"}}>
              <IonInput
                type="text"
                {...field}
                placeholder="123 Main St, Anytown"
              >
              </IonInput>
              <IonIcon
                icon={locationOutline}
                slot="end"
                className="location-icon"
                onClick={handleLocationClick}
                color="primary"
                size="large"
              />
            </div>
            {errors.address && <IonNote color="danger">{errors.address.message}</IonNote>}
          </IonItem>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({field}) => (
          <IonItem lines="full"> {/* Add ion-invalid class */}
            <IonLabel position="stacked" style={{marginBottom: "5px"}}>Description</IonLabel>
            <IonTextarea
              {...field}
              placeholder="Tell us about your store (cuisine, atmosphere, etc.)"
              rows={2}
            ></IonTextarea>
            {errors.description && <IonNote color="danger">{errors.description.message}</IonNote>}
          </IonItem>
        )}
      />
    </IonList>
  );
};

export default StoreDetailsForm;
