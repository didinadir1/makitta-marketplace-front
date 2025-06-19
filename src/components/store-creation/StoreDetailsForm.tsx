import React from 'react';
import { IonItem, IonLabel, IonInput, IonTextarea, IonList, IonText } from '@ionic/react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { StoreDetailsFormData, FullStoreCreationFormData } from '../../validation/storeCreationValidation';

interface StoreDetailsFormProps {
  control: Control<FullStoreCreationFormData>;
  errors: FieldErrors<FullStoreCreationFormData>;
}

const StoreDetailsForm: React.FC<StoreDetailsFormProps> = ({ control, errors }) => {
  return (
    <IonList className="signup-form">
      <Controller
        name="storeName"
        control={control}
        render={({ field }) => (
          <IonItem lines="full">
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
        render={({ field }) => (
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
        render={({ field }) => (
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
  );
};

export default StoreDetailsForm;
