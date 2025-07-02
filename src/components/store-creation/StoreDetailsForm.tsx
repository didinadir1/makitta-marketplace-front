import React from 'react';
import {IonInput, IonItem, IonLabel, IonList, IonNote, IonTextarea} from '@ionic/react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {FullStoreCreationFormData} from '../../validation/storeCreationValidation';
import ImageUploadField from "./ImageUploadField";

interface StoreDetailsFormProps {
  control: Control<FullStoreCreationFormData>;
  errors: FieldErrors<FullStoreCreationFormData>;
  defaultFile?: File
}

const StoreDetailsForm: React.FC<StoreDetailsFormProps> = ({control, errors,defaultFile}) => {
  return (
    <IonList className="signup-form">
      <ImageUploadField
        name="storeImage"
        label="Store Logo/Image"
        control={control}
        errors={errors}
        defaultFile={defaultFile}
      />
      <Controller
        name="storeName"
        control={control}
        render={({field}) => (
          <IonItem lines="full"> {/* Add ion-invalid class */}
            <IonLabel position="stacked">Store Name</IonLabel>
            <IonInput
              type="text"
              {...field}
              placeholder="The Cozy Corner Cafe"
            ></IonInput>
            {errors.storeName && <IonNote color="danger">{errors.storeName.message}</IonNote>}
          </IonItem>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({field}) => (
          <IonItem lines="full"> {/* Add ion-invalid class */}
            <IonLabel position="stacked">Address</IonLabel>
            <IonInput
              type="text"
              {...field}
              placeholder="123 Main St, Anytown"
            ></IonInput>
            {errors.address && <IonNote color="danger">{errors.address.message}</IonNote>}
          </IonItem>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({field}) => (
          <IonItem lines="full"> {/* Add ion-invalid class */}
            <IonLabel position="stacked">Description</IonLabel>
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
