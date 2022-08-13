import { ethers } from "ethers";

export const ethereumWindow = (window as any).ethereum;
export const providerEthers =
  ethereumWindow && new ethers.providers.Web3Provider(ethereumWindow, "any");
export const NULL_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
