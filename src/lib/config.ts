import Medusa from "@medusajs/js-sdk";
import {Storage} from '@ionic/storage';


export const backendUrl = __BACKEND_URL__ ?? "/"
export const publishableApiKey = __PUBLISHABLE_API_KEY__ ?? ""

export const CUSTOMER_JWT_KEY = "medusa_customer_token";
export const SELLER_JWT_KEY = "medusa_seller_token";

export const medusaStorage = new Storage()
await medusaStorage.create()

const baseSdkConfig = {
  baseUrl: backendUrl,
  debug: true,
  publishableKey: publishableApiKey
};
const sdkStorage = {
  setItem: (key: string, value: any) => medusaStorage.set(key, value),
  getItem: (key: string) => medusaStorage.get(key),
  removeItem: (key: string) => medusaStorage.remove(key),
};
export const sellerSdk = new Medusa({
    ...baseSdkConfig,
    auth: {
      type: "jwt",
      jwtTokenStorageKey: SELLER_JWT_KEY,
      jwtTokenStorageMethod: "custom",
      storage: sdkStorage,
    }
  })
;
export const customerSdk = new Medusa({
    ...baseSdkConfig,
    auth: {
      type: "jwt",
      jwtTokenStorageKey: CUSTOMER_JWT_KEY,
      jwtTokenStorageMethod: "custom",
      storage: sdkStorage,
    }
  })
;

export const uploadFilesQuery = async (files: any[]) => {
  const token = await medusaStorage.get(SELLER_JWT_KEY);

  const formData = new FormData()


  for (const file of files) {
    formData.append("files", file)
  }

  return await fetch(`${backendUrl}/seller/uploads`, {
    method: "POST",
    body: formData,
    headers: {
      authorization: `Bearer ${token}`,
      "x-publishable-api-key": publishableApiKey,
    },
  })
    .then((res) => res.json())
    .catch(() => null)
}

export const fetchQuery = async (
  url: string,
  {
    method,
    body,
    query,
    headers,
  }: {
    method: "GET" | "POST" | "DELETE"
    body?: object
    query?: Record<string, string | number>
    headers?: { [key: string]: string }
  }
) => {

  const token = await medusaStorage.get(url.startsWith("/vendor") ? SELLER_JWT_KEY : CUSTOMER_JWT_KEY);

  const bearer = token || ""
  const params = Object.entries(query || {}).reduce(
    (acc, [key, value], index) => {
      if (value && value !== undefined) {
        const queryLength = Object.values(query || {}).filter(
          (i) => i && i !== undefined
        ).length
        acc += `${key}=${value}${index + 1 <= queryLength ? "&" : ""}`
      }
      return acc
    },
    ""
  )
  const response = await fetch(`${backendUrl}${url}${params && `?${params}`}`, {
    method: method,
    headers: {
      authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
      "x-publishable-api-key": publishableApiKey,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Unknown error")
  }

  return response.json()
}
