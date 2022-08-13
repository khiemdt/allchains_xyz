import { OX_PATH } from "../../api/API_App";
import useGeneralHook from "./useGeneralHook";

const useGetEndpoint = (chainId: number) => {
  const { OX_NETWORK, GAS_API } = useGeneralHook();
  const Endpoint = OX_NETWORK(chainId);
  const EndpointGas = GAS_API(chainId);
  return { Endpoint, EndpointGas, OX_PATH: OX_PATH, GAS_API: GAS_API };
};

export default useGetEndpoint;
