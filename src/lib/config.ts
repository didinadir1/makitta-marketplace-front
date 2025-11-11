import Medusa from "@medusajs/js-sdk";
import {Storage} from '@ionic/storage';


export const backendUrl = __BACKEND_URL__ ?? "/"
export const publishableApiKey = __PUBLISHABLE_API_KEY__ ?? ""

const CUSTOMER_JWT_KEY = "medusa_customer_token";
const VENDOR_JWT_KEY = "medusa_vendor_token";

export const medusaStorage = new Storage().create()

// const appStorage = {setItem: medusaStorage.set, getItem: medusaStorage.get, removeItem: medusaStorage.remove};

export const sdk = new Medusa({
  baseUrl: backendUrl,
  debug: import.meta.env.NODE_ENV === "development",
  publishableKey: publishableApiKey,
  // auth: {
  //   type: "jwt",
  //   jwtTokenStorageMethod: "custom",
  //   storage: appStorage,
  // }
});

export const uploadFilesQuery = async (files: any[]) => {
  const token = await (await medusaStorage).get(VENDOR_JWT_KEY);

  const formData = new FormData()

  for (const {file} of files) {
    formData.append("files", file)
  }

  return await fetch(`${backendUrl}/vendor/uploads`, {
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

  const token = await (await medusaStorage).get(url.startsWith("/vendor") ? VENDOR_JWT_KEY : CUSTOMER_JWT_KEY);

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
