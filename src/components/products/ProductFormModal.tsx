import React, {useEffect} from 'react';
import {
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import {addOutline, closeOutline, removeOutline} from 'ionicons/icons';
import {mockCategories} from '../../data/mockCategories';
import './ProductFormModal.css';
import {Dish} from "../../data/mockDishes";
import ImageUploadField from "../store-creation/ImageUploadField";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductCreationFormData, productCreationSchema} from "../../validation/productCreationValidation";

interface ProductFormModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product?: Dish; // Optional product for editing
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
                                                             isOpen,
                                                             setIsOpen,
                                                             product,
                                                           }) => {


  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting, isValid},
    watch,
    setValue,
    reset
  } = useForm<ProductCreationFormData>({
    resolver: zodResolver(productCreationSchema),
    defaultValues: {
      name: '',
      sizes: undefined,
      description: '',
      categories: [],
      isAvailable: true,
      images: undefined,
      addOns: undefined,
      newAddOnName: '',
      newAddOnPrice: '',
    },
  });


  // Initialize form with product data if editing
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        sizes: product.sizes || [],
        description: product.description || '',
        categories: product.categories || [],
        addOns: product.addOns || [],
        isAvailable: product.isAvailable,
        newAddOnName: '',
        newAddOnPrice: '',
      });
    }

    if (product?.imageUrls) {
      const defaultImages: File[] = [];

      product.imageUrls.forEach((imageUrl) => {

        const url = new URL(imageUrl);
        const fileName = url.pathname.replace(/^.*[\\/]/, "");

        fetch(imageUrl)
          .then(response => response.blob())
          .then(blob => {
            defaultImages.push(new File([blob], fileName, {type: blob.type}));
          })
          .catch(error => console.error('Error fetching image:', error));
      })
      setValue("images", defaultImages);
    }
  }, [product]);

  const {fields: addOnFields, append: appendAddOn, remove: removeAddOn} = useFieldArray({
    control,
    name: 'addOns',
  });

  const handleAddAddOn = () => {
    const newAddOnName = watch('newAddOnName');
    const newAddOnPrice = watch('newAddOnPrice');
    if (newAddOnName?.trim() && newAddOnPrice?.trim()) {
      const price = parseFloat(newAddOnPrice);
      if (!isNaN(price) && price >= 0) {
        const newAddOn = {
          id: Date.now().toString(),
          name: newAddOnName.trim(),
          price: price,
        };
        appendAddOn(newAddOn);
        setValue('newAddOnName', '');
        setValue('newAddOnPrice', '');
      }
    }
  };

  const onSubmit: SubmitHandler<ProductCreationFormData> = (data) => {

    setIsOpen(false);
    console.log({data})
  };

  const handleCancel = () => {
    reset();
    setIsOpen(false)
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleCancel} className="product-form-modal" initialBreakpoint={1}
              breakpoints={[0, 0.25, 0.5, 0.8, 1]}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{product ? 'Edit Product' : 'Add Product'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleCancel}>
              <IonIcon icon={closeOutline}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList className="form-list">
            <ImageUploadField
              name="image"
              label="Product images"
              control={control}
              errors={errors}
              defaultFile={watch("images")?.[0]} // Use the first image as default
              multiple
            />
            <div className="form-group">
              <Controller
                name="name"
                control={control}
                render={({field}) => (
                  <IonItem lines="full" className="form-item"> {/* Add ion-invalid class */}
                    <IonLabel position="stacked" className="form-label">Name</IonLabel>
                    <IonInput
                      type="text"
                      {...field}
                      placeholder="Enter product name"
                      className="form-input"
                    ></IonInput>
                    {errors.name && <IonNote color="danger">{errors.name.message}</IonNote>}
                  </IonItem>
                )}
              />
            </div>
            <div className="form-group">
              <Controller
                name="description"
                control={control}
                render={({field}) => (
                  <IonItem lines="full" className="form-item"> {/* Add ion-invalid class */}
                    <IonLabel position="stacked" className="form-label">Description</IonLabel>
                    <IonTextarea
                      {...field}
                      placeholder="Enter product description"
                      rows={2}
                      className="form-input"
                    ></IonTextarea>
                    {errors.description && <IonNote color="danger">{errors.description.message}</IonNote>}
                  </IonItem>
                )}
              />
            </div>
            <div className="form-group">
              <Controller
                name="categories"
                control={control}
                render={({field}) => (
                  <IonItem lines="full" className="form-item">
                    <IonLabel position="stacked" className="form-label">Categories</IonLabel>
                    <IonSelect
                      {...field}
                      value={field.value?.map((category) => category.id) || []}
                      placeholder={
                        field.value && field.value.length > 0
                          ? field.value.map((category) => category.name).join(', ')
                          : 'Select categories'
                      }
                      className="form-select"
                      interface="action-sheet"
                      interfaceOptions={{cssClass: "form-action-sheet"}}
                      multiple
                      onIonChange={(e) =>
                        field.onChange(
                          e.detail.value.map((id: string) =>
                            mockCategories.find((category) => category.id === id)
                          )
                        )
                      }
                    >
                      {mockCategories.map((category) => (
                        <IonSelectOption key={category.id} value={category.id}>
                          {category.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                )}
              />
            </div>

            {/* Add-ons Section */}
            <div className="form-group add-ons-group">
              <IonLabel position="stacked" className="form-label">Add-ons</IonLabel>

              <div className="add-ons-list">
                {addOnFields.map((field, index) => (
                  <IonChip key={field.id} className="add-on-chip">
                    <span className="add-on-name">{field.name}</span>
                    <span className="add-on-price">${field.price.toFixed(2)}</span>
                    <IonIcon
                      icon={removeOutline}
                      onClick={() => removeAddOn(index)}
                      className="remove-add-on"
                    />
                  </IonChip>
                ))}
              </div>

              <IonGrid className="add-on-form">
                <IonCol size="5">
                  <Controller
                    name="newAddOnName"
                    control={control}
                    render={({field}) => (
                      <IonItem lines="full" className="form-item">
                        <IonInput
                          {...field}
                          placeholder="Name"
                          className="form-input"
                          onIonInput={(e) => field.onChange(e.detail.value!)}
                        />
                      </IonItem>
                    )}
                  />
                </IonCol>
                <IonCol size="3">
                  <Controller
                    name="newAddOnPrice"
                    control={control}
                    render={({field}) => (
                      <IonItem lines="full" className="form-item">
                        <IonInput
                          {...field}
                          placeholder="Price"
                          type="number"
                          min="0"
                          step="0.01"
                          className="form-input"
                          onIonInput={(e) => field.onChange(e.detail.value!)}
                        />
                      </IonItem>
                    )}
                  />
                </IonCol>
                <IonCol size="2">
                  <IonButton
                    expand="block"
                    type="button"
                    onClick={handleAddAddOn}
                    disabled={!watch('newAddOnName')?.trim() || !watch('newAddOnPrice')?.trim()}
                    className="add-add-on-button"
                  >
                    <IonIcon icon={addOutline}/>
                  </IonButton>
                </IonCol>
              </IonGrid>
            </div>

            {/* Availability Toggle */}
            <div className="form-group">
              <Controller
                name="isAvailable"
                control={control}
                render={({field}) => (
                  <IonItem lines="full" className="availability-item">
                    <IonLabel>Available</IonLabel>
                    <IonToggle
                      checked={field.value}
                      onIonChange={(e) => field.onChange(e.detail.checked)}
                      slot="end"
                      className="availability-toggle"
                    />
                  </IonItem>
                )}
              />
            </div>
          </IonList>
        </form>
      </IonContent>
      <IonFooter>
        <IonButton
          expand="block"
          disabled={isSubmitting || !isValid}
          className="save-button"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </IonButton>
        <IonLoading message="Loading..." isOpen={isSubmitting} spinner="circles"/>
      </IonFooter>

    </IonModal>
  );
};

export default ProductFormModal;
