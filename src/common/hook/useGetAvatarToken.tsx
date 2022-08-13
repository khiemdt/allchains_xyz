import { UnknownLogo } from "../../svg";
import useGeneralHook from "./useGeneralHook";

interface Props {
  symbol?: string;
}
const useGetAvatarToken = (props: Props) => {
  const { symbol } = props;
  const { appState } = useGeneralHook();

  return {
    avatar: symbol
      ? appState.common.listCoin?.find(
          (v) => v.symbol.toUpperCase() === symbol.toUpperCase()
        )?.large || UnknownLogo
      : UnknownLogo,
  };
};

export default useGetAvatarToken;
