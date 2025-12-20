import {z} from "zod"
import {decorateVariantsWithDefaultValues} from "../lib/utils/products/utils";
import {optionalInt} from "../lib/utils/validation";
import {imageSchema} from "./storeCreationValidation";


const ProductCreateVariantSchema = z.object({
  should_create: z.boolean(),
  is_default: z.boolean().optional(),
  title: z.string(),
  upc: z.string().optional(),
  ean: z.string().optional(),
  barcode: z.string().optional(),
  mid_code: z.string().optional(),
  hs_code: z.string().optional(),
  width: optionalInt,
  height: optionalInt,
  length: optionalInt,
  weight: optionalInt,
  material: z.string().optional(),
  origin_country: z.string().optional(),
  sku: z.string().optional(),
  manage_inventory: z.boolean().optional(),
  allow_backorder: z.boolean().optional(),
  inventory_kit: z.boolean().optional(),
  options: z.record(z.string(), z.string()),
  variant_rank: z.number(),
  prices: z.array(
    z.object({
      currency_code: z.string(),
      amount: z.number().positive().min(1, "Price too low"),
    })
  ).min(1),
  inventory: z
    .array(
      z.object({
        inventory_item_id: z.string(),
        required_quantity: optionalInt,
      })
    )
    .optional(),
})

export type ProductCreateVariantSchema = z.infer<
  typeof ProductCreateVariantSchema
>

const ProductCreateOptionSchema = z.object({
  title: z.string().min(1, "Option title is required"),
  values: z.array(z.string()).min(1, "Should have at least one option value"),
})

export type ProductCreateOptionSchema = z.infer<
  typeof ProductCreateOptionSchema
>

export const ProductCreateSchema = z
  .object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    handle: z.string().optional(),
    description: z.string().optional(),
    discountable: z.boolean(),
    type_id: z.string().optional(),
    collection_id: z.string().optional(),
    shipping_profile_id: z.string().optional(),
    categories: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    sales_channels: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .optional(),
    origin_country: z.string().optional(),
    material: z.string().optional(),
    width: z.string().optional(),
    length: z.string().optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    mid_code: z.string().optional(),
    hs_code: z.string().optional(),
    options: z.array(ProductCreateOptionSchema).min(1),
    enable_variants: z.boolean(),
    variants: z.array(ProductCreateVariantSchema).min(1),
    media: z.array(imageSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.variants.every((v) => !v.should_create)) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["variants"],
        message: "invalid_length",
      })
    }

    const skus = new Set<string>()

    //todo i18n

    data.variants.forEach((v, index) => {
      if (v.sku) {
        if (skus.has(v.sku)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [`variants.${index}.sku`],
            message: "create products error unique sku",
          })
        }

        skus.add(v.sku)
      }
    })
  })

export type ProductCreateFields = z.infer<typeof ProductCreateSchema>;
export const PRODUCT_CREATE_FORM_DEFAULTS: Partial<
  ProductCreateFields
> = {
  discountable: true,
  tags: [],
  sales_channels: [],
  options: [
    {
      title: "Default option",
      values: ["Default option value"],
    },
  ],
  variants: decorateVariantsWithDefaultValues([
    {
      title: "Default variant",
      should_create: true,
      variant_rank: 0,
      options: {
        "Default option": "Default option value",
      },
      inventory: [{inventory_item_id: "", required_quantity: ""}],
      is_default: true,
      prices: [{currency_code: "usd", amount: 0}],
    },
  ]),
  enable_variants: false,
  media: [],
  categories: [],
  collection_id: "",
  shipping_profile_id: "",
  description: "",
  handle: "",
  height: "",
  hs_code: "",
  length: "",
  material: "",
  mid_code: "",
  origin_country: "",
  subtitle: "",
  title: "",
  type_id: "",
  weight: "",
  width: "",
}
