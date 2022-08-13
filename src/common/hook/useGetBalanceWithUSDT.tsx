import { ethers } from "ethers";
import useSWR from "swr";
import { LIST_NETWORK } from "../constants";
import { BaseCurrency } from "../utils";
import useGeneralHook from "./useGeneralHook";
import useGetEndpoint from "./useGetEndpoint";

interface Props {
  token?: BaseCurrency | null;
  amount?: string;
  chainId: number;
}

const useGetBalanceWithUSDT = (props: Props) => {
  const { amount, token, chainId } = props;
  const { dispatch, fetchThunk } = useGeneralHook();

  const { Endpoint, OX_PATH } = useGetEndpoint(chainId);

  const TokenAddress = LIST_NETWORK.find(
    (network) => network.chainId === chainId
  )?.token_quote_adds;

  const { data, isValidating } = useSWR(
    [Endpoint, token, amount, TokenAddress],
    async (Endpoint, token, amount, TokenAddress) => {
      if (
        Endpoint &&
        token &&
        amount &&
        Number(amount) > 0 &&
        token.address?.toLocaleLowerCase() !== TokenAddress?.toLocaleLowerCase()
      ) {
        const urlGetQuote = `${Endpoint}${OX_PATH.getQuote({
          sellToken: token.address,
          buyToken: TokenAddress,
          sellAmount: ethers.utils
            .parseUnits(amount, token.decimals)
            .toString(),
        })}`;
        const jsonQuote = await dispatch(fetchThunk(urlGetQuote));
        const tmp =
          jsonQuote?.price &&
          (Number(jsonQuote.price) * Number(amount)).toFixed(4);
        return tmp || 0;
      } else {
        return amount;
      }
    },
    { refreshInterval: 30000 }
  );

  return { price: data, loading: isValidating };
};

export default useGetBalanceWithUSDT;
