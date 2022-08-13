import { ethers } from "ethers";
import useSWR from "swr";
import { NULL_ADDRESS, providerEthers } from "../../constants";
import { ABI, LIST_ALL_TOKEN } from "../constants";
import { BaseCurrency } from "../utils";
import useGeneralHook from "./useGeneralHook";
import useGetEndpoint from "./useGetEndpoint";
interface Props {
  token?: BaseCurrency | null;
  chainId: number;
}
const useGetBalanceTokens = (props: Props) => {
  const { chainId, token } = props;

  const { appState, dispatch, fetchThunk } = useGeneralHook();
  const { Endpoint, OX_PATH } = useGetEndpoint(chainId);
  const walletAddress = appState.wallet.walletAddress;

  const { data } = useSWR(
    token && token?.address === NULL_ADDRESS
      ? `${Endpoint}${OX_PATH.getQuote({
          buyToken: LIST_ALL_TOKEN[chainId]?.find((v) => v.symbol === "USDC")
            ?.address,
          sellToken:
            token?.address === NULL_ADDRESS ? token.symbol : token?.address,
          sellAmount: Math.pow(10, token.decimals).toString(),
        })}`
      : null,
    async (url) => {
      const json = await dispatch(fetchThunk(url));
      return json;
    },
    { refreshInterval: 15000 }
  );

  const {
    data: balance,
    isValidating,
    revalidate,
  } = useSWR(
    token && walletAddress ? [token, walletAddress] : null,
    async (tokenTmp, walletAddressTmp) => {
      try {
        const { address, decimals } = tokenTmp;
        if (address === NULL_ADDRESS) {
          const balance = await providerEthers.getBalance(walletAddressTmp);
          const balanceParse = Number(
            ethers.utils.formatUnits(
              data && !balance.isZero()
                ? balance.sub(
                    ethers.BigNumber.from(data?.estimatedGas).mul(
                      ethers.BigNumber.from(data?.gasPrice)
                    )
                  )
                : balance,
              decimals
            )
          );
          return balanceParse;
        } else {
          const contract = new ethers.Contract(address, ABI, providerEthers);
          const balance = await contract.balanceOf(walletAddressTmp);
          const balanceParse = Number(
            ethers.utils.formatUnits(balance, decimals)
          );
          return balanceParse;
        }
      } catch (_) {
        return 0;
      }
    },
    { refreshInterval: 15000 }
  );

  return {
    loading: isValidating,
    balance: balance && balance > 0 ? balance.toFixed(4) : 0,
    getBalance: () => revalidate(),
  };
};

export default useGetBalanceTokens;
