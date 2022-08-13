import LIST_ALL_CHAIN_TMP from "./LIST_ALL_CHAIN.json";
import LIST_ALL_TOKEN_TMP from "./LIST_ALL_TOKEN.json";
export type some = { [key: string]: any };

export const WALL_ADDRESS = "wallet-address";
export const MODE_THEME = "mode_theme";
export const PAGE_SIZE = "page_size";
export const SUCCESS_CODE = 200;
export const KEY_GOOGLE_MAP = "AIzaSyCK_8jKvtRQ4-j9RhlNhJb0NeUV4aiEmaY";
export const DATE_TIME_FORMAT = "HH:mm DD/MM/YYYY";
export const DATE_FORMAT = "DD/MM/YYYY";
export const TIME_FORMAT = "HH:mm";
export const BE_DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSSZ";
export const LIST_ALL_TOKEN = LIST_ALL_TOKEN_TMP;
export const LIST_ALL_CHAIN = LIST_ALL_CHAIN_TMP;

export const LIST_TOKEN_BASE = [
  {
    chainId: 1,
    symbol: "ETH",
    main_adds: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    token_quote: "USDT",
    token_quote_adds: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    chainId: 56,
    symbol: "BNB",
    main_adds: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    token_quote: "USDT",
    token_quote_adds: "0x55d398326f99059ff775485246999027b3197955",
  },
  {
    chainId: 137,
    symbol: "MATIC",
    main_adds: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    token_quote: "USDT",
    token_quote_adds: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  },
  {
    chainId: 250,
    symbol: "FTM",
    main_adds: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    token_quote: "USDC",
    token_quote_adds: "0x049d68029688eAbF473097a2fC38ef61633A3C7A",
  },
  {
    chainId: 10,
    symbol: "ETH",
    main_adds: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    token_quote: "USDT",
    token_quote_adds: "0x4200000000000000000000000000000000000006",
  },
];
export const LIST_NETWORK = LIST_TOKEN_BASE.map((item) => ({
  ...item,
  ...LIST_ALL_CHAIN_TMP.find((v) => v.chainId === item.chainId),
})) as some[];

export const ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
