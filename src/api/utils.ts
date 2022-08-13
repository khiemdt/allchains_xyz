import { BigNumber } from "ethers";

export interface QuoteParams {
  buyToken: string;
  sellToken: string;
  sellAmount?: BigNumber | string;
  buyAmount?: BigNumber | string;
}
