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
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useAuth} from "../lib/actions";

// Define the Zod schema for personal information
const personalInfoSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"), // Basic phone validation
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  actor_type: z.enum(["restaurant", "driver", "customer"]),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmedPassword: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.password === data.confirmedPassword, {
  message: "Passwords don't match",
  path: ["confirmedPassword"], // Set the error on the confirmedPassword field
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

const SignupPage: React.FC = () => {
  const history = useHistory();
  const {signup} = useAuth();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      email: '',
      phone: '',
      first_name: '',
      last_name: '',
      actor_type: 'restaurant',
      password: '',
      confirmedPassword: ''
    }
  });

  const onSubmit = async (data: PersonalInfoFormData) => {
    await signup(data)
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
              Sign Up
              <IonIcon icon={arrowForward} slot="end"/>
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
