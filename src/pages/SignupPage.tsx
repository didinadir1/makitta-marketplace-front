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
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {arrowBack, arrowForward} from 'ionicons/icons';
import React from 'react';
import {useHistory} from 'react-router-dom';
import './SignupPage.css';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

// Define the Zod schema for personal information
const personalInfoSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"), // Basic phone validation
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmedPassword: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.password === data.confirmedPassword, {
  message: "Passwords don't match",
  path: ["confirmedPassword"], // Set the error on the confirmedPassword field
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

const SignupPage: React.FC = () => {
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmedPassword: ''
    }
  });

  const onSubmit = (data: PersonalInfoFormData) => {
    // Navigate to the store registration page, passing user data
    history.push('/store-registration', {userData: data});
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
                        placeholder="restaurant@example.com"
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
                  name="firstName"
                  control={control}
                  render={({field}) => (
                    <IonItem lines="full">
                      <IonLabel position="stacked">First Name</IonLabel>
                      <IonInput
                        type="text"
                        {...field}
                        placeholder="John"
                      />
                      {errors.firstName && <IonText color="danger">{errors.firstName.message}</IonText>}
                    </IonItem>
                  )}
                />

                <Controller
                  name="lastName"
                  control={control}
                  render={({field}) => (
                    <IonItem lines="full">
                      <IonLabel position="stacked">Last Name</IonLabel>
                      <IonInput
                        type="text"
                        {...field}
                        placeholder="Doe"
                      />
                      {errors.lastName && <IonText color="danger">{errors.lastName.message}</IonText>}
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
                  name="confirmedPassword"
                  control={control}
                  render={({field}) => (
                    <IonItem lines="full">
                      <IonLabel position="stacked">Confirm Password</IonLabel>
                      <IonInput
                        type="password"
                        {...field}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmedPassword && <IonText color="danger">{errors.confirmedPassword.message}</IonText>}
                    </IonItem>
                  )}
                />
              </div>
            </IonList>
            <IonButton expand="block" type="submit" className="action-button">
              Continue to Store Details
              <IonIcon icon={arrowForward} slot="end"/>
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
