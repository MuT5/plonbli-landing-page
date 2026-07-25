import { createContext, useContext } from "react";

const ClientReadyContext = createContext(true);

export const ClientReadyProvider = ClientReadyContext.Provider;

export function useClientReady() {
  return useContext(ClientReadyContext);
}
