import React from 'react';
import { IonItem, IonLabel, IonInput, IonList, IonText, IonIcon } from '@ionic/react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { logoInstagram, logoFacebook, logoSnapchat } from 'ionicons/icons';
import { SocialLinksFormData, FullStoreCreationFormData } from '../../validation/storeCreationValidation';

interface SocialLinksFormProps {
  control: Control<FullStoreCreationFormData>;
  errors: FieldErrors<FullStoreCreationFormData>;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ control, errors }) => {
  return (
    <IonList className="signup-form">
      <Controller
        name="instagram"
        control={control}
        render={({ field }) => (
          <IonItem lines="full">
            <IonIcon icon={logoInstagram} slot="start" color="medium" />
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
        render={({ field }) => (
          <IonItem lines="full">
            <IonIcon icon={logoFacebook} slot="start" color="medium" />
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
        render={({ field }) => (
          <IonItem lines="full">
            <IonIcon icon={logoSnapchat} slot="start" color="medium" />
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
  );
};

export default SocialLinksForm;
