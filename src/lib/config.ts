import Medusa from "@medusajs/js-sdk";
import {Storage} from '@ionic/storage';


// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000";

if (process.env.NEXT_PUBLIC_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
}
export const medusaStorage = new Storage()

const appStorage = {setItem: medusaStorage.set, getItem: medusaStorage.get, removeItem: medusaStorage.remove};

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  auth: {
    type: "jwt",
    jwtTokenStorageMethod: "custom",
    storage: appStorage,
  }
});
