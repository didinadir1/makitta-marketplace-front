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
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast
} from '@ionic/react';
import {arrowBack, arrowForward} from 'ionicons/icons';
import React from 'react';
import {useHistory} from 'react-router-dom';
import './SignupPage.css';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSignUpWithEmailPass} from "../lib/actions";
import {PersonalInfoFormData, personalInfoSchema} from "../validation/signupValidation";


const SignupPage: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();
  const {mutateAsync: signup} = useSignUpWithEmailPass();
  const queryParams = new URLSearchParams(history.location.search);

  const from = queryParams.get("from") || '/';

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      email: '',
      phone: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmed_password: ''
    }
  });

  const onSubmit = async (data: PersonalInfoFormData) => {
    await signup(data, {
      onSuccess: () => {
        history.replace(from);
      },
      onError: async (error: any) => {
        console.error('Signup failed:', error);
        history.replace('/login');
        await presentToast({
          message: `Signup failed: ${error.message || 'Unknown error'}`,
          duration: 5000,
          color: 'danger',
        });
      }
    })
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
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
        {/* You might want to add a progress bar here */}
      </IonHeader>
      <IonContent>
        <div className="signup-content">
          <IonText className="step-header">
            <h2>Personal Information</h2>
            <p>Create your restaurant manager account</p>
          </IonText>

          <form onSubmit={handleSubmit(onSubmit)}>
            <IonList>
              <div className="signup-form">
                <Controller
                  name="email"
                  control={control}
                  render={({field}) => (
                    <IonItem lines="full">
                      <IonLabel position="stacked">Email</IonLabel>
                      <IonInput
                        type="email"
                        {...field}
                        placeholder="user@example.com"
                      />
                      {errors.email && <IonText color="danger">{errors.email.message}</IonText>}
                    </IonItem>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({field}) => (
                    <IonItem lines="full">
                      <IonLabel position="stacked">Phone Number</IonLabel>
                      <IonInput
                        type="tel"
                        {...field}
                        placeholder="+1 234 567 890"
                      />
                      {errors.phone && <IonText color="danger">{errors.phone.message}</IonText>}
                    </IonItem>
                  )}
                />

                <Controller
                  name="first_name"
                  control={control}
                  render={({field}) => (
                    <IonItem lines="full">
                      <IonLabel position="stacked">First Name</IonLabel>
                      <IonInput
                        type="text"
                        {...field}
                        placeholder="John"
                      />
                      {errors.first_name && <IonText color="danger">{errors.first_name.message}</IonText>}
                    </IonItem>
                  )}
                />

                <Controller
                  name="last_name"
                  control={control}
                  render={({field}) => (
                    <IonItem lines="full">
                      <IonLabel position="stacked">Last Name</IonLabel>
                      <IonInput
                        type="text"
                        {...field}
                        placeholder="Doe"
                      />
                      {errors.last_name && <IonText color="danger">{errors.last_name.message}</IonText>}
                    </IonItem>
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({field}) => (
                    <IonItem lines="full">
                      <IonLabel position="stacked">Password</IonLabel>
                      <IonInput
                        type="password"
                        {...field}
                        placeholder="Enter a strong password"
                      />
                      {errors.password && <IonText color="danger">{errors.password.message}</IonText>}
                    </IonItem>
                  )}
                />

                <Controller
                  name="confirmed_password"
                  control={control}
                  render={({field}) => (
                    <IonItem lines="full">
                      <IonLabel position="stacked">Confirm Password</IonLabel>
                      <IonInput
                        type="password"
                        {...field}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmed_password &&
                          <IonText color="danger">{errors.confirmed_password.message}</IonText>}
                    </IonItem>
                  )}
                />
              </div>
            </IonList>
            <IonButton expand="block" type="submit" className="action-button">
              Sign Up
              <IonIcon icon={arrowForward} slot="end"/>
              {/*{true && <IonSpinner name="circular" slot={ "end"}></IonSpinner>}*/}
            </IonButton>
            <IonLoading message="Loading..." isOpen={isValid && isSubmitting} spinner="circles"/>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
