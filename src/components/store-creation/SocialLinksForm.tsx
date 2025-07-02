import React from 'react';
import {IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote} from '@ionic/react';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {logoFacebook, logoInstagram, logoSnapchat} from 'ionicons/icons';
import {FullStoreCreationFormData} from '../../validation/storeCreationValidation';

interface SocialLinksFormProps {
  control: Control<FullStoreCreationFormData>;
  errors: FieldErrors<FullStoreCreationFormData>;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({control, errors}) => {
  return (
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
            {errors.instagram && <IonNote color="danger">{errors.instagram.message}</IonNote>}
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
            {errors.facebook && <IonNote color="danger">{errors.facebook.message}</IonNote>}
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
            {errors.snapchat && <IonNote color="danger">{errors.snapchat.message}</IonNote>}
          </IonItem>
        )}
      />
    </IonList>
  );
};

export default SocialLinksForm;
