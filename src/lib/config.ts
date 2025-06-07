import Medusa from "@medusajs/js-sdk";
import {Storage} from '@ionic/storage';


// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000";

if (import.meta.env.VITE_BACKEND_URL) {
  MEDUSA_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
}
export const medusaStorage = new Storage().create()

// const appStorage = {setItem: medusaStorage.set, getItem: medusaStorage.get, removeItem: medusaStorage.remove};

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: import.meta.env.NODE_ENV === "development",
  publishableKey: import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY,
  // auth: {
  //   type: "jwt",
  //   jwtTokenStorageMethod: "custom",
  //   storage: appStorage,
  // }
});
