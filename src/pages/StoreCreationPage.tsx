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
import {StoreDetailsFormData, storeDetailsSchema,} from '../validation/storeCreationValidation';
import './StoreCreationPage.css';
import StoreDetailsForm from '../components/store-creation/StoreDetailsForm'; // Import Step 1 component
import {useMe} from "../lib/data";
import areFilesIdentical from "../lib/util/files";
import {useSellerCreate, useSellerMe, useSellerUpdateMe} from "../vendor/api";
import {HttpTypes} from "@medusajs/types";
import {uploadFilesQuery} from "../lib/config"; // Import Step 2 component


const StoreCreationPage: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();

  const {user} = useMe();
  const {seller} = useSellerMe();
  const {mutateAsync: createSeller} = useSellerCreate();
  const {mutateAsync: updateSeller} = useSellerUpdateMe();

  const isEditPage = history.location.pathname.includes("edit-store")

  const [defaultImage, setDefaultImage] = useState<File>();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
    watch,
    setValue,
  } = useForm<StoreDetailsFormData>({
    resolver: zodResolver(storeDetailsSchema),
    defaultValues: {
      name: '',
      address: '',
      description: '',
      image: undefined,
    },
  });

  useEffect(() => {
    if (seller) {
      setValue("name", seller.name || "");
      setValue("address", seller.address_line || "");
      setValue("description", seller.description || "");
    }

    if (seller?.photo) {
      const url = new URL(seller.photo);
      const fileName = url.pathname.replace(/^.*[\\/]/, "");

      fetch(seller.photo)
        .then(response => response.blob())
        .then(blob => {
          setDefaultImage(new File([blob], fileName, {type: blob.type}));
          setValue("image", defaultImage); // Set the file in form state
        })
        .catch(error => console.error('Error fetching image:', error));
    }
  }, [seller]);


  const onSubmit: SubmitHandler<StoreDetailsFormData> = async (values) => {
    let uploadedMedia: (HttpTypes.AdminFile & {
      isThumbnail: boolean
    })[] = [];
    try {
      const haveImageChanged = !await areFilesIdentical(defaultImage, values.image)
      console.log({haveImageChanged, defaultImage, newFile: values.image})
      if (haveImageChanged) {
        uploadedMedia = await uploadFilesQuery([values.image]).then((r: any) =>
          r.files.map((f: any) => ({
            ...f,
            isThumbnail: false,
          }))
        )
      }
    } catch (error) {
      if (error instanceof Error) {
        presentToast({
          message: "couldn't upload file",
          duration: 2000,
          color: 'danger',
        })
      }
    }


    if (isEditPage) {

      await updateSeller(
        {
          name: values.name,
          address_line: values.address,
          description: values.description,
          photo: uploadedMedia[0].url || seller?.photo || "",
        },
        {
          onSuccess: () => {
            presentToast({
              message: 'Store updated successfully!',
              duration: 2000,
              color: 'success',
            })

            history.push('/store')
          },
          onError: (error) => {
            presentToast({
              message: error.message || "couldn't update store",
              duration: 2000,
              color: 'danger',
            })
          },
        }
      )
    } else {
      await createSeller(
        {
          name: values.name,
          email: user?.email || "",
          phone: user?.phone || "",
          address_line: values.address,
          description: values.description,
          photo: uploadedMedia[0].url || "",
          member: {name: user?.first_name + " " + user?.last_name, email: user?.email, phone: user?.phone}
        },
        {
          onSuccess: () => {
            presentToast({
              message: 'Store created successfully!',
              duration: 2000,
              color: 'success',
            })

            history.push('/store')
          },
          onError: (error) => {
            presentToast({
              message: error.message || "couldn't create store",
              duration: 2000,
              color: 'danger',
            })
          },
        }
      )
    }
  }


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
            <p>Tell us about your store</p>
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
