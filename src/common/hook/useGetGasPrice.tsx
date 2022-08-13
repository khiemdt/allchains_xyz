import useSWR from "swr";
import useGeneralHook from "./useGeneralHook";
import useGetEndpoint from "./useGetEndpoint";

interface Props {
  chainId: number;
}
const useGetGasPrice = (props: Props) => {
  const { chainId } = props;
  const { dispatch, fetchThunk } = useGeneralHook();
  const { EndpointGas } = useGetEndpoint(chainId);

  const { data, revalidate, isValidating } = useSWR(
    EndpointGas,
    async (url) => {
      const json = await dispatch(fetchThunk(url));
      return json;
    },
    { refreshInterval: 10000 }
  );

  return { gasPrice: data, loading: isValidating, revalidate };
};

export default useGetGasPrice;
