import React, {useEffect, useMemo, useState} from 'react';
import {IonModal, useIonToast,} from '@ionic/react';
import './ProductFormModal.css';
import {useWatch} from "react-hook-form";
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
  VARIANTS = "variants",
  INVENTORY = "inventory",
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

  const {product_categories, isPending, isError, error} =
    useProductCategories()

  const ready =
    !!store && !isStorePending && !!sales_channels && !isSalesChannelPending

  const defaultChannel = sales_channels?.[0]

  const [tab, setTab] = useState<Tab>(Tab.DETAILS)
  const [tabState, setTabState] = useState<TabState>({
    [Tab.DETAILS]: "in-progress",
    [Tab.ORGANIZE]: "not-started",
    [Tab.VARIANTS]: "not-started",
    [Tab.INVENTORY]: "not-started",
  })
  const [defaultImages, setDefaultImages] = useState<{ url: string; file: File }[]>([]);
  const [presentToast] = useIonToast();

  const configs = []

  // use regions and pricePreferences for handling the price of the variant
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
    },
    schema: ProductCreateSchema,
    configs,
  })

  const {mutateAsync, isPending} = useCreateProduct()

  /**
   * TODO: Important to revisit this - use variants watch so high in the tree can cause needless rerenders of the entire page
   * which is suboptimal when rerenders are caused by bulk editor changes
   */

  const watchedVariants = useWatch({
    control: form.control,
    name: "variants",
  })

  const showInventoryTab = useMemo(
    () => watchedVariants.some((v) => v.manage_inventory && v.inventory_kit),
    [watchedVariants]
  )

  const handleSubmit = form.handleSubmit(async (values) => {
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
          prices: Object.keys(variant.prices || {}).map((key) => ({
            currency_code: key,
            amount: parseFloat(variant.prices?.[key] as string),
          })),
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
  })

  const onNext = async (currentTab: Tab) => {
    const valid = await form.trigger()

    if (!valid) {
      return
    }

    if (currentTab === Tab.DETAILS) {
      setTab(Tab.ORGANIZE)
    }

    if (currentTab === Tab.ORGANIZE) {
      setTab(Tab.VARIANTS)
    }

    if (currentTab === Tab.VARIANTS) {
      setTab(Tab.INVENTORY)
    }
  }

  useEffect(() => {
    const currentState = {...tabState}
    if (tab === Tab.DETAILS) {
      currentState[Tab.DETAILS] = "in-progress"
    }
    if (tab === Tab.ORGANIZE) {
      currentState[Tab.DETAILS] = "completed"
      currentState[Tab.ORGANIZE] = "in-progress"
    }
    if (tab === Tab.VARIANTS) {
      currentState[Tab.DETAILS] = "completed"
      currentState[Tab.ORGANIZE] = "completed"
      currentState[Tab.VARIANTS] = "in-progress"
    }
    if (tab === Tab.INVENTORY) {
      currentState[Tab.DETAILS] = "completed"
      currentState[Tab.ORGANIZE] = "completed"
      currentState[Tab.VARIANTS] = "completed"
      currentState[Tab.INVENTORY] = "in-progress"
    }

    setTabState({...currentState})
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want this effect to run when the tab changes
  }, [tab])

  return (
    <IonModal isOpen={isOpen} initialBreakpoint={1} breakpoints={[0, 0.25, 0.5, 0.8, 1]}>

      {/*  todo insert modal form code here */}
    </IonModal>
  );
};

export default ProductFormModal;
