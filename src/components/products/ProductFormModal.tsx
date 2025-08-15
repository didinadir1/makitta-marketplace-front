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
import {Dish, Size} from "../../data/mockDishes";
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
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    watch,
    setValue,
    reset
  } = useForm<ProductCreationFormData>({
    resolver: zodResolver(productCreationSchema),
    defaultValues: {
      name: '',
      sizes: [{id: 'standard', name: Size.STANDARD, price: 0}], // Default to Standard size
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
        sizes: product.sizes && product.sizes.length > 0 ? product.sizes : [{
          id: 'standard',
          name: Size.STANDARD,
          price: 0
        }],
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

  const {fields: sizeFields, append: appendSize, remove: removeSize} = useFieldArray({
    control,
    name: 'sizes',
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

  const handleAddSize = () => {
    appendSize({
      id: Date.now().toString(),
      name: allSizes.filter(size => !selectedSizeNames.includes(size))[0],
      price: 0
    });
  };

  const onSubmit: SubmitHandler<ProductCreationFormData> = (data) => {
    console.log(errors)
    setIsOpen(false);
    console.log({data})
  };

  const handleCancel = () => {
    reset();
    setIsOpen(false)
  };

  // Get available sizes for selection (excluding already selected ones)
  const allSizes = Object.values(Size);
  const selectedSizeNames = watch('sizes')?.map(s => s.name) || [];

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
              name="images"
              label="Product images"
              control={control}
              errors={errors}
              defaultFile={watch("images")}
              multiple
            />
            <div className="form-group">
              <Controller
                name="name"
                control={control}
                render={({field}) => (
                  <IonItem lines="full" className="form-item">
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
                  <IonItem lines="full" className="form-item">
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
                    {errors.categories && <IonNote color="danger">{errors.categories.message}</IonNote>}
                  </IonItem>
                )}
              />
            </div>

            {/* Sizes and Prices Section */}
            <div className="form-group">
              <IonLabel position="stacked" className="form-label">Size & Price</IonLabel>
              {sizeFields.map((item, index) => (
                <>
                  <div key={item.id} className="size-item">
                    <Controller
                      name={`sizes.${index}.name`}
                      control={control}
                      render={({field}) => (
                        <IonSelect
                          {...field}
                          placeholder="Select Size"
                          className="form-select"
                          onIonChange={(e) => field.onChange(e.detail.value)}
                          disabled={index === 0 && product === undefined} // Disable size selection for the first (default) size if not editing
                        >
                          {allSizes.map((size) => (
                            <IonSelectOption
                              key={size}
                              value={size}
                              disabled={selectedSizeNames.includes(size) && size !== watch(`sizes.${index}.name`)}
                            >
                              {size}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      )}
                    />
                    <Controller
                      name={`sizes.${index}.price`}
                      control={control}
                      render={({field}) => (
                        <IonInput
                          {...field}
                          type="number"
                          placeholder="Price"
                          className="form-input"
                          {...register(`sizes.${index}.price`, {valueAsNumber: true})}
                          onIonChange={(e) => field.onChange(e.detail.value)}
                        />
                      )}
                    />
                    {sizeFields.length > 1 && index !== 0 && ( // Allow removing if more than one size
                      <IonButton fill="clear" onClick={() => removeSize(index)} className="remove-size-button">
                        <IonIcon icon={removeOutline}/>
                      </IonButton>
                    )}
                  </div>
                  {errors.sizes?.[index]?.price?.message &&
                      <IonNote color="danger">{errors.sizes?.[index]?.price?.message}</IonNote>}
                </>
              ))}
              {selectedSizeNames.length < allSizes.length && ( // Only show if there are unselected sizes
                <IonButton expand="block" fill="outline" onClick={handleAddSize} className="add-size-button">
                  <IonIcon icon={addOutline} slot="start"/>
                  Add a Size
                </IonButton>
              )}
            </div>


            {/* Add-ons Section */}
            <div className="form-group add-ons-group">
              <IonLabel position="stacked" className="form-label">Add-ons</IonLabel>

              <div className="add-ons-list">
                {addOnFields.map((field, index) => (
                  <IonChip key={field.id} className="add-on-chip">
                    <span className="add-on-name">{field.name}</span>
                    <span className="add-on-price">{field.price.toFixed(2)}$</span>
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
          disabled={isSubmitting}
          className="save-button"
          type="submit"
          onClick={(handleSubmit(onSubmit))}
        >
          Save
        </IonButton>
        <IonLoading message="Loading..." isOpen={isSubmitting} spinner="circles"/>
      </IonFooter>

    </IonModal>
  );
};

export default ProductFormModal;
