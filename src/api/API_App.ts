import query from "query-string";
import { QuoteParams } from "./utils";
export const IS_DEV_EVN: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

enum APIServices {
  ecokera,
  ox,
}

function getBaseUrl(service?: APIServices) {
  if (service === APIServices.ecokera) {
    return IS_DEV_EVN ? "/api/" : "https://allchains-api.ecokera.com";
  }
  return IS_DEV_EVN ? "/api/" : "https://allchains-api.ecokera.com";
}
export const OX_NETWORK = (chainId: number): string => {
  if (chainId === 1) {
    return "https://api.0x.org";
  } else if (chainId === 56) {
    return "https://bsc.api.0x.org";
  } else if (chainId === 3) {
    return "https://ropsten.api.0x.org";
  } else if (chainId === 137) {
    return "https://polygon.api.0x.org";
  } else if (chainId === 250) {
    return "https://fantom.api.0x.org";
  } else if (chainId === 10) {
    return "https://optimism.api.0x.org";
  }
  return "https://api.0x.org";
};

export const GAS_API = (chainId: number): string => {
  if (chainId === 1) {
    return "https://gas.api.0x.org/source/median?output=eth_gas_station";
  } else if (chainId === 56) {
    return "https://gas.bsc.api.0x.org/source/median?output=eth_gas_station";
  } else if (chainId === 3) {
    return "https://gas.ropsten.api.0x.org/source/median?output=eth_gas_station";
  } else if (chainId === 137) {
    return "https://gas.polygon.api.0x.org/source/median?output=eth_gas_station";
  } else if (chainId === 250) {
    return "https://gas.fantom.api.0x.org/source/median?output=eth_gas_station";
  } else if (chainId === 10) {
    return "https://gas.optimism.api.0x.org/source/median?output=eth_gas_station";
  }
  return "https://gas.api.0x.org/source/median?output=eth_gas_station";
};

export const OX_PATH = {
  getQuote: (params: QuoteParams) =>
    `/swap/v1/quote?${query.stringify(params, {
      skipEmptyString: true,
      skipNull: true,
    })}`,
  getPrice: (params: QuoteParams) =>
    `/swap/v1/price?${query.stringify(params, {
      skipEmptyString: true,
      skipNull: true,
    })}`,
};

export const API_PATHS = {
  getTransferConfigsForAll: `https://cbridge-prod2.celer.network/v1/getTransferConfigsForAll`,
  getInfo: (walletAddress: string) =>
    `${getBaseUrl()}/api/v3/balance/${walletAddress}`,
  searchCurrency: `${getBaseUrl()}/api/v3/search?locale=en`,
  getCoinInfo: (coinId: string) =>
    `${getBaseUrl()}/api/v3/coins/${coinId}?localization=false&market_data=false&developer_data=false`,
  getCoinMarketInfo: (coinId: string) =>
    `${getBaseUrl()}/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
  getTransactions: (chainId: string, address: string, contact: string) =>
    `${getBaseUrl()}/v1/${chainId}/address/${address}/transfers/?limit=20&contract-address=${contact}`,
  spamToken: `${getBaseUrl()}/v1/tracking/spam-token`,
};
