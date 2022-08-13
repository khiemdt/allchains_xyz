import { LIST_ALL_TOKEN } from "../constants";
import useGeneralHook from "./useGeneralHook";
const useGetAllTokens = (props: { chainId: string | number }) => {
  const { chainId } = props;
  const { appState } = useGeneralHook();

  return {
    tokens: chainId
      ? LIST_ALL_TOKEN[chainId]
      : appState.wallet.networkInfo?.chainId
      ? LIST_ALL_TOKEN[appState.wallet.networkInfo?.chainId] || []
      : [],
  };
};

export default useGetAllTokens;
