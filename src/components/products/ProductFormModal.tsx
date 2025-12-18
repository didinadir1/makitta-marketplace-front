import React, {useEffect, useMemo, useState} from 'react';
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
  IonLoading,
  IonModal,
  IonNote,
  IonProgressBar,
  IonRow,
  IonSelect,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import {
  addCircle,
  addOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  removeOutline
} from 'ionicons/icons';
import './ProductFormModal.css';
import ImageUploadField from "../store-creation/ImageUploadField";
import {Controller, useFieldArray, useWatch} from "react-hook-form";
import {Product} from "../../types/product";
import {useCreateProduct, useProductCategories, useRegions, useSalesChannels, useStore} from "../../vendor/api";
import {usePricePreferences} from "../../vendor/api/price-preferences";
import {useExtendableForm} from '../../lib/utils/forms/hooks';
import {PRODUCT_CREATE_FORM_DEFAULTS, ProductCreateSchema} from '../../validation/productCreationValidation';
import {uploadFilesQuery} from "../../lib/config";
import {HttpTypes} from "@medusajs/types";

enum Tab {
  DETAILS = "details",
  ORGANIZE = "organize",
  PRICING = "pricing",
}

type ProgressStatus = "not-started" | "in-progress" | "completed"

type TabState = Record<Tab, ProgressStatus>

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

  const {store, isPending: isStorePending} = useStore()

  const {sales_channels, isPending: isSalesChannelPending} =
    useSalesChannels()

  const {product_categories: fetchedCategories, isPending, isError, error} =
    useProductCategories()

  const ready =
    !!store && !isStorePending && !!sales_channels && !isSalesChannelPending

  const defaultChannel = sales_channels?.[0]

  const [tab, setTab] = useState<Tab>(Tab.DETAILS)
  const [tabState, setTabState] = useState<TabState>({
    [Tab.DETAILS]: "in-progress",
    [Tab.PRICING]: "not-started",
    [Tab.ORGANIZE]: "not-started",
  })
  const [defaultImages, setDefaultImages] = useState<{ url: string; file: File }[]>([]);
  const [presentToast] = useIonToast();

  const configs = []

  const {regions} = useRegions({limit: 9999})
  const {price_preferences: pricePreferences} = usePricePreferences({
    limit: 9999,
  })

  const form = useExtendableForm({
    defaultValues: {
      ...PRODUCT_CREATE_FORM_DEFAULTS,
      sales_channels: defaultChannel
        ? [
          {
            id: defaultChannel.id,
            name: defaultChannel.name,
          },
        ]
        : [],
      enable_variants: false,
    },
    schema: ProductCreateSchema,
    configs,
  })

  const {control, handleSubmit, watch, formState: {errors, isSubmitting}, trigger, setValue} = form;
  const {mutateAsync, isPending: isCreatePending} = useCreateProduct()

  const {fields: optionFields, append: appendOption, remove: removeOption} = useFieldArray({
    control,
    name: "options",
  });
  const {fields: variantFields, append: appendVariant, remove: removeVariant} = useFieldArray({
    control,
    name: "variants",
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const currentCategories = watch("categories") || [];
    setSelectedCategories(currentCategories);
  }, [watch("categories")]);

  const watchedOptions = watch("options");

  useEffect(() => {
    if (watchedOptions.length === 0) {
      setValue("enable_variants", false);
      setValue("options", [{
        title: "Default option",
        values: ["Default option value"],
      }])
    }
  }, [watchedOptions, setValue]);

  useEffect(() => {
    if (watch("enable_variants") && watchedOptions.length === 1 && watchedOptions[0].title === "Default option"
      && watchedOptions[0].values.length === 1 && watchedOptions[0].values[0] === "Default option value") {
      setValue("options", [{
        title: "",
        values: [],
      }]);
    }
  }, [setValue, watch("enable_variants"), watchedOptions]);

  const generateVariants = (options: { title: string, values: string[] }[]) => {
    if (options.length === 0) return [];
    const result: { title: string, options: Record<string, string> }[] = [];
    const recurse = (current: string[], index: number) => {
      if (index === options.length) {
        const title = current.join('-');
        const opts: Record<string, string> = {};
        options.forEach((opt, i) => opts[opt.title] = current[i]);
        result.push({title, options: opts});
        return;
      }
      for (const value of options[index].values) {
        recurse([...current, value], index + 1);
      }
    };
    recurse([], 0);
    return result;
  };

  useEffect(() => {
    if (watch("enable_variants") && watchedOptions.every(opt => opt.values.length > 0)) {
      const generatedVariants = generateVariants(watchedOptions);
      const newVariants = generatedVariants.map((gen, index) => ({
        title: gen.title,
        sku: "",
        prices: [{ currency_code: regions?.[0]?.currency_code || 'usd', amount: 0 }],
        should_create: true,
        manage_inventory: true,
        allow_backorder: false,
        inventory_kit: false,
        options: gen.options,
        variant_rank: index,
        inventory: [{inventory_item_id: "", required_quantity: 0}],
      }));
      setValue("variants", newVariants);
    } else if (!watch("enable_variants")) {
      setValue("variants", PRODUCT_CREATE_FORM_DEFAULTS.variants || []);
    }
  }, [watchedOptions, setValue, watch("enable_variants"), regions]);

  const handleAddOption = () => {
    if (!watch("enable_variants")) {
      setValue("enable_variants", true);
    }
    appendOption({title: "", values: []});
  };

  const handleAddVariant = () => {
    appendVariant({
      title: "",
      sku: "",
      prices: [{ currency_code: regions?.[0]?.currency_code || 'usd', amount: 0 }],
      should_create: true,
      manage_inventory: true,
      allow_backorder: false,
      inventory_kit: false,
      options: {},
      variant_rank: variantFields.length,
      inventory: [{inventory_item_id: "", required_quantity: 0}],
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.reset();
    setTab(Tab.DETAILS);
  };

  const onSubmit = async (values: any) => {
    const isDraftSubmission = false

    const media = values.media || []
    const payload = {...values, media: undefined}

    let uploadedMedia: (HttpTypes.AdminFile & {
      isThumbnail: boolean
    })[] = []
    try {
      if (media.length) {
        const thumbnailReq = media.filter((m) => m.isThumbnail)
        const otherMediaReq = media.filter((m) => !m.isThumbnail)

        const fileReqs: any = []
        if (thumbnailReq?.length) {
          fileReqs.push(
            uploadFilesQuery(thumbnailReq).then((r: any) =>
              r.files.map((f: any) => ({
                ...f,
                isThumbnail: true,
              }))
            )
          )
        }
        if (otherMediaReq?.length) {
          fileReqs.push(
            uploadFilesQuery(otherMediaReq).then((r: any) =>
              r.files.map((f: any) => ({
                ...f,
                isThumbnail: false,
              }))
            )
          )
        }

        uploadedMedia = (await Promise.all(fileReqs)).flat()
      }
    } catch (error) {
      if (error instanceof Error) {
        await presentToast({
          message: error.message,
          duration: 3000,
          color: "danger",
        })
      }
    }

    await mutateAsync(
      {
        ...payload,
        status: isDraftSubmission ? "draft" : "proposed",
        images: uploadedMedia,
        weight: parseInt(payload.weight || "") || undefined,
        length: parseInt(payload.length || "") || undefined,
        height: parseInt(payload.height || "") || undefined,
        width: parseInt(payload.width || "") || undefined,
        type_id: payload.type_id || undefined,
        tags:
          payload.tags?.map((tag) => ({
            id: tag,
          })) || [],
        collection_id: payload.collection_id || undefined,
        shipping_profile_id: undefined,
        enable_variants: undefined,
        additional_data: undefined,
        categories: payload.categories.map((cat) => ({
          id: cat,
        })),
        variants: payload.variants.map((variant) => ({
          ...variant,
          sku: variant.sku === "" ? undefined : variant.sku,
          manage_inventory: true,
          allow_backorder: false,
          should_create: undefined,
          is_default: undefined,
          inventory_kit: undefined,
          inventory: undefined,
          prices: variant.prices,
        })),
      },
      {
        onSuccess: async () => {
          await presentToast({
            message: "Product created successfully",
            duration: 2000,
            color: "success",
          })
          setIsOpen(false)
        },
        onError: async (error) => {
          await presentToast({
            message: error.message,
            duration: 3000,
            color: "danger",
          })
        },
      }
    )
  }

  const onNext = async (currentTab: Tab) => {

    const valid = await trigger();

    if (!valid) {
      return;
    }

    if (currentTab === Tab.DETAILS) {
      setTab(Tab.ORGANIZE);
    } else if (currentTab === Tab.ORGANIZE) {
        setTab(Tab.PRICING);
    }
  };

  const onPrevious = () => {
    if (tab === Tab.ORGANIZE) {
      setTab(Tab.DETAILS);
    } else if (tab === Tab.PRICING) {
      setTab(Tab.ORGANIZE);
    }
  };

  useEffect(() => {
    const currentState = {...tabState}
    if (tab === Tab.DETAILS) {
      currentState[Tab.DETAILS] = "in-progress"
    }
    if (tab === Tab.ORGANIZE) {
      currentState[Tab.DETAILS] = "completed"
      currentState[Tab.ORGANIZE] = "in-progress"
    }
    if (tab === Tab.PRICING) {
      currentState[Tab.DETAILS] = "completed"
      currentState[Tab.ORGANIZE] = "completed"
      currentState[Tab.PRICING] = "in-progress"
    }

    setTabState({...currentState})
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want this effect to run when the tab changes
  }, [tab])

  const renderStepIndicator = () => {
    const steps = [
      {key: Tab.DETAILS, label: "Details"},
      {key: Tab.ORGANIZE, label: "Organize"},
      {key: Tab.PRICING, label: "Pricing"},
    ];
    const currentIndex = steps.findIndex(s => s.key === tab);
    return (
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={step.key} className={`step ${tabState[step.key]} ${index === currentIndex ? 'active' : ''}`}>
            <span className="step-number">{index + 1}</span>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderDetailsStep = () => (
    <div className="form-fields">
      <ImageUploadField
        name="media"
        label="Product Images"
        control={control}
        errors={errors}
        defaultFile={watch("media")?.map((media: any) => media.file)}
        multiple
      />
      <div className="form-item">
        <IonLabel className="form-label">Title *</IonLabel>
        <Controller
          name="title"
          control={control}
          render={({field}) => (
            <>
              <IonInput
                type="text"
                {...field}
                placeholder="Enter product title"
                className="form-input"
              />
              {errors.title && <IonNote color="danger">{errors.title.message}</IonNote>}
            </>
          )}
        />
      </div>
      <div className="form-item">
        <IonLabel className="form-label">Description</IonLabel>
        <Controller
          name="description"
          control={control}
          render={({field}) => (
            <>
              <IonTextarea
                {...field}
                placeholder="Enter product description"
                rows={3}
                className="form-input"
              />
              {errors.description && <IonNote color="danger">{errors.description.message}</IonNote>}
            </>
          )}
        />
      </div>
      <div className="form-item">
        <div className="toggle-item">
          <IonLabel className="form-label">This product has variants</IonLabel>
          <Controller
            name="enable_variants"
            control={control}
            render={({field}) => (
              <IonToggle
                {...field}
                checked={field.value}
                onIonChange={(e) => field.onChange(e.detail.checked)}
                className="availability-toggle"
              />
            )}
          />
        </div>
        <IonNote>Add options like size or color. If unchecked, the product will have only one standard
          variant.</IonNote>
      </div>
      {watch("enable_variants") && (
        <div className="form-item">
          <IonLabel className="form-label">Options *</IonLabel>
          {optionFields.map((field, index) => (
            <div key={field.id} className="option-card">
              <div className="option-header">
                <h3 className="option-title">Option {index + 1}</h3>
                <IonButton fill="clear" onClick={() => removeOption(index)} className="remove-option-button">
                  <IonIcon icon={closeOutline}/>
                </IonButton>
              </div>
              <div className="option-content">
                <div className="form-item">
                  <IonLabel className="form-label">Option name</IonLabel>
                  <Controller
                    name={`options.${index}.title`}
                    control={control}
                    render={({field}) => (
                      <IonInput
                        {...field}
                        placeholder="e.g. Size, Color"
                        className="form-input"
                      />
                    )}
                  />
                  {errors.options?.[index]?.title &&
                      <IonNote color="danger">{errors.options?.[index]?.title.message}</IonNote>}
                </div>
                <div className="form-item">
                  <IonLabel className="form-label">Option values</IonLabel>
                  <div className="values-container">
                    {watch(`options.${index}.values`)?.map((value: string, idx: number) => (
                      <IonChip key={idx} className="value-chip">
                        <IonLabel>{value}</IonLabel>
                        <IonIcon
                          icon={closeOutline}
                          onClick={() => {
                            const current = watch(`options.${index}.values`);
                            setValue(`options.${index}.values`, current.filter((_, i) => i !== idx));
                          }}
                        />
                      </IonChip>
                    ))}
                    <IonInput
                      placeholder="Add value, press comma to add"
                      className="add-value-input"
                      onKeyDown={(e: any) => {
                        if (e.key === ',') {
                          e.preventDefault();
                          const val = e.target.value.trim();
                          if (val) {
                            const current = watch(`options.${index}.values`) || [];
                            if (!current.includes(val)) {
                              setValue(`options.${index}.values`, [...current, val]);
                            }
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                  {errors.options?.[index]?.values &&
                      <IonNote color="danger">{errors.options?.[index]?.values.message}</IonNote>}
                </div>
              </div>
            </div>
          ))}
          <IonButton fill="clear" onClick={handleAddOption} className="add-option-button">
            <IonIcon icon={addCircle} slot="start"/>
            add a new option
          </IonButton>
          {errors.options && <IonNote color="danger">{errors.options.message}</IonNote>}
        </div>
      )}
    </div>
  );

  const renderOrganizeStep = () => (
    <div className="form-fields">
      <div className="form-item">
        <div className="toggle-item">
          <IonLabel className="form-label">Discountable</IonLabel>
          <Controller
            name="discountable"
            control={control}
            render={({field}) => (
              <IonToggle
                {...field}
                checked={field.value}
                onIonChange={(e) => field.onChange(e.detail.checked)}
                className="availability-toggle"
              />
            )}
          />
        </div>
        <IonNote>When unchecked, discounts will not be applied to this product.</IonNote>
      </div>
      <div className="form-item">
        <IonLabel className="form-label">Categories *</IonLabel>
        <Controller
          name="categories"
          control={control}
          render={({field}) => (
            <>
              <div className="category-tag-input">
                <div className="selected-tags">
                  {selectedCategories.map((catId) => {
                    const cat = fetchedCategories?.find(c => c.id === catId);
                    return (
                      <IonChip key={catId} className="category-chip">
                        <IonLabel>{cat?.name || catId}</IonLabel>
                        <IonIcon
                          icon={closeOutline}
                          onClick={() => {
                            const newSelected = selectedCategories.filter(id => id !== catId);
                            setSelectedCategories(newSelected);
                            field.onChange(newSelected);
                          }}
                        />
                      </IonChip>
                    );
                  })}
                </div>
                <IonInput
                  value={categorySearch}
                  placeholder="Type to search categories..."
                  className="form-input category-input"
                  onIonInput={(e) => {
                    setCategorySearch(e.detail.value!);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && categorySearch && (
                  <div className="suggestions-list">
                    {filteredCategories?.slice(0, 5).map((cat) => (
                      <IonItem
                        key={cat.id}
                        button
                        onClick={() => {
                          if (!selectedCategories.includes(cat.id)) {
                            const newSelected = [...selectedCategories, cat.id];
                            setSelectedCategories(newSelected);
                            field.onChange(newSelected);
                          }
                          setCategorySearch('');
                          setShowSuggestions(false);
                        }}
                        className="suggestion-item"
                      >
                        <IonLabel>{cat.name}</IonLabel>
                      </IonItem>
                    ))}
                  </div>
                )}
              </div>
              {errors.categories && <IonNote color="danger">{errors.categories.message}</IonNote>}
            </>
          )}
        />
      </div>
      <div className="form-item">
        <IonLabel className="form-label">Tags</IonLabel>
        <Controller
          name="tags"
          control={control}
          render={({field}) => (
            <>
              <IonSelect
                {...field}
                value={field.value || []}
                placeholder="Select tags"
                className="form-select"
                interface="action-sheet"
                multiple
                onIonChange={(e) => field.onChange(e.detail.value)}
              >
                {/* Assume tags are available, or add logic */}
              </IonSelect>
              {errors.tags && <IonNote color="danger">{errors.tags.message}</IonNote>}
            </>
          )}
        />
      </div>
    </div>
  );


  const renderPricingStep = () => (
    <div className="form-fields">
      {variantFields.length > 0 && (
        <div className="form-item">
          <IonLabel className="form-label">Pricing</IonLabel>
          <div className="pricing-inventory-table">
            {/* Table Header */}
            <div className="table-header">
              <div className="header-cell variant-col">Variant</div>
              <div className="header-cell price-col">Price</div>
            </div>

            {/* Table Rows */}
            {variantFields.map((field, index) => (
              <div key={field.id} className="table-row">
                <div className="variant-cell">
                  <div className="variant-name">
                    {watch(`variants.${index}.title`)}
                  </div>
                </div>

                <div className="price-cell">
                  <Controller
                    name={`variants.${index}.prices.0.amount`}
                    control={control}
                    render={({field}) => (
                      <IonInput
                        {...field}
                        type="number"
                        pattern="^\d+(\.\d{1,2})?$"
                        placeholder="0.00"
                        className="price-input"
                        fill="outline"
                        min="1"
                        step="0.01"
                        onIonChange={(e) => field.onChange(parseFloat(e.detail.value || '0'))}
                      >
                        {/*todo handle currency*/}
                        <div slot="start" className="currency-symbol">$</div>
                      </IonInput>
                    )}
                  />
                  {errors.variants?.[index]?.prices?.[0]?.amount &&
                      <IonNote color="danger">{errors.variants?.[index]?.prices?.[0]?.amount.message}</IonNote>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  console.log(errors)

  const renderCurrentStep = () => {
    switch (tab) {
      case Tab.DETAILS:
        return renderDetailsStep();
      case Tab.ORGANIZE:
        return renderOrganizeStep();
      case Tab.PRICING:
        return renderPricingStep();
      default:
        return null;
    }
  };

  const isLastStep = tab === Tab.PRICING ;

  const filteredCategories = fetchedCategories?.filter((category) => {
    const searchLower = categorySearch.toLowerCase();
    const nameMatches = category.name.toLowerCase().includes(searchLower);
    const hasChildren = category.category_children && category.category_children.length > 0;
    const isStandalone = !category.category_children || category.category_children.length === 0;
    return nameMatches && (hasChildren || isStandalone);
  });

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
        {renderStepIndicator()}
        <IonProgressBar
          value={(Object.values(tabState).filter(s => s === 'completed').length + 1) / Object.keys(tabState).length}/>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderCurrentStep()}
        </form>
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              {tab !== Tab.DETAILS && (
                <IonButton expand="block" fill="outline" onClick={onPrevious} className="nav-button">
                  <IonIcon icon={chevronBackOutline} slot="start"/>
                  Previous
                </IonButton>
              )}
            </IonCol>
            <IonCol size="6">
              {!isLastStep ? (
                <IonButton expand="block" onClick={() => onNext(tab)} className="nav-button">
                  Next
                  <IonIcon icon={chevronForwardOutline} slot="end"/>
                </IonButton>
              ) : (
                <IonButton
                  expand="block"
                  disabled={isSubmitting || isCreatePending}
                  className="save-button"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Save Product
                </IonButton>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonLoading message="Saving product..." isOpen={isSubmitting || isCreatePending} spinner="circles"/>
      </IonFooter>
    </IonModal>
  );
};

export default ProductFormModal;
