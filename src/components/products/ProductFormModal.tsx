import React, {useEffect} from 'react';
import {
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
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
import './ProductFormModal.css';
import {Size} from "../../data/mockDishes";
import ImageUploadField from "../store-creation/ImageUploadField";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SaveProductFormData, saveProductSchema} from "../../validation/productCreationValidation";
import {useCategories, useUser} from "../../lib/data";
import {useProductActions} from "../../lib/actions/products";
import {Product} from "../../types/product";


interface ProductFormModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product?: Product; // Optional product for editing
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
                                                             isOpen,
                                                             setIsOpen,
                                                             product,
                                                           }) => {

  const {data: fetchedCategories} = useCategories()
  const {createProduct} = useProductActions()
  const {data: user} = useUser();


  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    watch,
    setValue, getValues,
    reset
  } = useForm<SaveProductFormData>({
    resolver: zodResolver(saveProductSchema),
    defaultValues: {
      id: product?.id,
      title: '',
      sizes: [{id: 'standard', title: Size.STANDARD, price: 0}], // Default to Standard size
      description: '',
      categories: [],
      isAlwaysAvailable: true,
      scheduledDates: [],
      images: [],
      addOns: [],
      newAddOnName: '',
      newAddOnPrice: '',
    },
  });

  // Initialize form with product data if editing
  useEffect(() => {
    if (product) {
      setValue('id', product.id);
      setValue('title', product.title);
      setValue('sizes', Array.isArray(product.metadata?.sizes) && product.metadata.sizes.length > 0 ? product.metadata.sizes : [{
        id: 'standard',
        title: Size.STANDARD,
        price: 0
      }]);
      setValue('description', product.description || '');
      setValue('categories', product.categories || []);
      setValue('addOns', Array.isArray(product.metadata?.addOns) ? product.metadata.addOns : []);
      setValue('isAlwaysAvailable', !!product.metadata?.isAlwaysAvailable);
      setValue('scheduledDates', Array.isArray(product.metadata?.scheduledDates) ? product.metadata.scheduledDates : []);
      setValue('newAddOnName', '');
      setValue('newAddOnPrice', '');
    }

    if (product?.images) {
      const fetchImagePromises = product.images.map(async (image) => {
        const url = new URL(image.url);
        const fileName = url.pathname.replace(/^.*[\\/]/, "");

        try {
          const response = await fetch(image.url);
          const blob = await response.blob();
          return new File([blob], fileName, {type: blob.type});
        } catch (error) {
          console.error('Error fetching image:', error);
          return null;
        }
      });

      Promise.all(fetchImagePromises).then((files) => {
        const validFiles = files.filter((file) => file !== null) as File[];
        setValue("images", validFiles);
      });
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
          title: newAddOnName.trim(),
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
      title: allSizes.filter(size => !selectedSizeNames.includes(size))[0],
      price: 0
    });
  };

  const onSubmit: SubmitHandler<SaveProductFormData> = async (data) => {
    await createProduct({restaurantId: user!.restaurant_id, productData: data})
    setIsOpen(false);
  };

  const handleCancel = () => {
    reset();
    console.log(getValues())
    setIsOpen(false)
  };

  // Get available sizes for selection (excluding already selected ones)
  const allSizes = Object.values(Size);
  const selectedSizeNames = watch('sizes')?.map(s => s.title) || [];

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
                name="title"
                control={control}
                render={({field}) => (
                  <IonItem lines="full" className="form-item">
                    <IonLabel position="stacked" className="form-label">title</IonLabel>
                    <IonInput
                      type="text"
                      {...field}
                      placeholder="Enter product title"
                      className="form-input"
                    ></IonInput>
                    {errors.title && <IonNote color="danger">{errors.title.message}</IonNote>}
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
                            fetchedCategories?.find((category) => category.id === id)
                          )
                        )
                      }
                    >
                      {fetchedCategories
                        ?.filter((category) => category.category_children && category.category_children.length > 0)
                        .map((category) => (
                          <React.Fragment key={category.id}>
                            <IonSelectOption key={category.id} value={category.id} disabled
                                             className="select-group-label-option">
                              {category.name}
                            </IonSelectOption>
                            {category.category_children.map((child) => (
                              <IonSelectOption key={child.id} value={child.id}>
                                {child.name}
                              </IonSelectOption>
                            ))}
                          </React.Fragment>
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
                      name={`sizes.${index}.title`}
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
                              disabled={selectedSizeNames.includes(size) && size !== watch(`sizes.${index}.title`)}
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
                          min="0"
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
                    <span className="add-on-name">{field.title}</span>
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
              <IonLabel position="stacked" className="form-label">Always Available</IonLabel>
              <Controller
                name="isAlwaysAvailable"
                control={control}
                render={({field}) => (
                  <IonItem lines="full" className="availability-item">
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
            <div className="form-group">
              <IonLabel position="stacked" className="form-label">Schedules</IonLabel>
              <Controller name={"scheduledDates"} control={control} render={({field}) => (
                <IonItem className="form-item">
                  <IonDatetime
                    disabled={watch("isAlwaysAvailable")}
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]}
                    presentation="date"
                    multiple={true} // Allow multiple date selection
                    value={field.value} // Bind selected dates
                    onIonChange={(e) => field.onChange(e.detail.value)}
                    className="schedule-calendar"
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
