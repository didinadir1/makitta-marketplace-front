import {sellerSdk} from "../config";
import {DriverDTO} from "../../types/user";
import {getAuthHeaders} from "./sessions";
import {useQuery} from "@tanstack/react-query";


async function retrieveDriver(driverId: string): Promise<DriverDTO> {
  const {
    driver,
  }: {
    driver: DriverDTO;
  } = await sellerSdk.client.fetch(`/store/drivers/${driverId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...await getAuthHeaders(),
    },
  });

  return driver;
}

export function useDriver(driverId: string) {
  return {
    getDriver: useQuery({
      queryKey: ["driver", driverId],
      queryFn: () => retrieveDriver(driverId),
      staleTime: 1000 * 60 * 15, // 15 minutes
      enabled: !!driverId, // Only run if driverId is provided
    })
  };
}
