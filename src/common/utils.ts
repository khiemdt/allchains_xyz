import { some } from "./constants";

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function scrollTo(id: string, offsetTop: number) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({ top: el.offsetTop - offsetTop, behavior: "smooth" });
  }
}

export const stringifyUrl = function (obj) {
  var str: string[] = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p)) {
      const value = obj[p];
      str.push(
        encodeURIComponent(p) +
          "=" +
          encodeURIComponent(
            typeof value === "object"
              ? JSON.stringify(value)
              : typeof value === "string" || typeof value === "number"
              ? value
              : ""
          )
      );
    }
  return str.join("&");
};

export const shortText = (text: string) => {
  if (text?.length > 13) {
    return `${text?.slice(0, 5)}...${text?.slice(-4)}`;
  } else {
    return text;
  }
};

export interface BaseCurrency {
  readonly chainId: number;
  /**
   * The decimals used in representing currency amounts
   */
  readonly decimals: number;
  /**
   * The symbol of the currency, i.e. a short textual non-unique identifier
   */
  readonly symbol: string;
  /**
   * The name of the currency, i.e. a descriptive textual non-unique identifier
   */
  readonly name: string;

  readonly address: string;

  readonly logoURI?: string;
}

export interface NativeCurrency extends BaseCurrency {}

export function toFixedNumber(num, digits, base) {
  var pow = Math.pow(base || 10, digits);
  return Math.round(num * pow) / pow;
}
export interface ITokenBase {
  id: string;
  name: string;
  symbol: string;
  large: string;
  market_cap_rank: 1;
  thumb: string;
}
export interface IConfigForAll {
  chains: {
    id: number;
    name: string;
    icon: string;
    block_delay: number;
    gas_token_symbol: string;
    explore_url: string;
    contract_addr: string;
    drop_gas_amt: string;
    drop_gas_cost_amt: string;
    drop_gas_balance_alert: string;
    suggested_gas_cost: string;
  }[];
  chain_token: {
    [key: string]: {
      token: {
        token: {
          symbol: string;
          address: string;
          decimal: number;
          xfer_disabled: true;
        };
        name: string;
        icon: string;
      }[];
    };
  };
  farming_reward_contract_addr: string;
  pegged_pair_configs: {
    canonical_token_contract_addr: string;
    org_chain_id: number;
    org_token: {
      icon: string;
      name: string;
      token: {
        symbol: string;
        address: string;
        decimal: number;
        xfer_disabled: boolean;
      };
      pegged_burn_contract_addr: string;
      pegged_chain_id: number;
      pegged_deposit_contract_addr: string;
      pegged_token: some;
    };
  }[];
}
