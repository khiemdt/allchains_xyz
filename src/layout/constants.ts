export const ASIDE_WIDTH = 240;
export const HEADER_HEIGHT = 56;
export const ASIDE_ITEM_HEIGHT = 56;

export const ROUTES = {
  login: "login",
  profile: {
    index: "profile",
    main: ":walletAddress/*",
    history: "history",
    approval: "approval",
    nft: "nft",
    new: "new",
  },
  detail: ":id",
  cryptocurrencies: {
    index: "cryptocurrencies",
  },
  bridge: "bridge",
  chainList: "chainList",
  swap: "swap",
  donate: "donate",
  introduce: "",
};
