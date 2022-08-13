import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { LIST_ALL_CHAIN, LIST_NETWORK, some } from "../../common/constants";
import useDebounce from "../../common/hook/useDebounce";
import useGeneralHook from "../../common/hook/useGeneralHook";
import useGetBalanceTokens from "../../common/hook/useGetBalanceTokens";
import useGetBalanceWithUSDT from "../../common/hook/useGetBalanceWithUSDT";
import useGetEndpoint from "../../common/hook/useGetEndpoint";
import useGetGasPrice from "../../common/hook/useGetGasPrice";
import { BaseCurrency } from "../../common/utils";
import { ethereumWindow, NULL_ADDRESS, providerEthers } from "../../constants";
export const ET_FEE = 2;
export type InputType = "sellToken" | "buyToken";
export interface FormInterface {
  sellToken: BaseCurrency | null;
  buyToken: BaseCurrency | null;
  buyAmount?: string;
  sellAmount?: string;
  gasPrice?: number;
  inputType?: InputType;
}
export interface SettingInterface {
  type: "fast" | "fastest" | "custom";
  gasPrice?: number;
  slippagePercentage: number;
}

interface Props {}

const useSwapLogic = (props: Props) => {
  const { dispatch, fetchThunk, appState, warningDialog, intl } =
    useGeneralHook();
  const networkID = appState.wallet.networkInfo?.chainId;

  const networkInfo = appState.wallet.networkInfo;

  const walletAddress = appState.wallet.walletAddress;
  const [transactionsData, setTransactionsData] = useState<some | undefined>(
    undefined
  );

  const [formData, setFormData] = useState<FormInterface>({
    sellToken: null,
    buyToken: null,
  });
  const [formDataTmp, setFormDataTmp] = useState<FormInterface>({
    sellToken: null,
    buyToken: null,
  });
  const formDataDebounce = useDebounce(formData, 1000);

  const [settingsFormData, setSettingFormData] = useState<SettingInterface>({
    type: "fast",
    slippagePercentage: 0.001,
  });
  const [openDialog, setOpenDialog] = useState<{ type: InputType } | undefined>(
    undefined
  );
  const [chainId, setChainId] = useState<number>(1);
  const [openSettings, setOpenSetting] = useState(false);
  const { gasPrice, revalidate: revalidateGasPrice } = useGetGasPrice({
    chainId,
  });

  const isSameNetWork = networkInfo ? chainId === networkInfo.chainId : false;

  const { Endpoint, OX_PATH } = useGetEndpoint(chainId);

  const { balance: balanceSellToken, getBalance: getBalanceSellToken } =
    useGetBalanceTokens({
      token: isSameNetWork ? formDataDebounce.sellToken : undefined,
      chainId: chainId,
    });

  const { balance: balanceBuyToken, getBalance: getBalanceBuyToken } =
    useGetBalanceTokens({
      token: isSameNetWork ? formDataDebounce.buyToken : undefined,
      chainId: chainId,
    });

  const { price: sellUSDTPrice, loading: loadingSellUSDTPrice } =
    useGetBalanceWithUSDT({
      token: formDataDebounce.sellToken,
      amount: formDataDebounce.sellAmount,
      chainId: chainId,
    });
  const { price: buyUSDTPrice, loading: loadingBuyUSDTPrice } =
    useGetBalanceWithUSDT({
      token: formDataDebounce.buyToken,
      amount: formDataDebounce.buyAmount,
      chainId: chainId,
    });

  const getParamsQuote = useMemo(() => {
    return formDataDebounce.inputType === "sellToken" &&
      formDataDebounce.sellAmount &&
      formDataDebounce.sellToken?.symbol &&
      formDataDebounce.buyToken?.symbol
      ? {
          sellToken:
            formDataDebounce.sellToken?.address === NULL_ADDRESS
              ? formDataDebounce.sellToken?.symbol
              : formDataDebounce.sellToken?.address,
          buyToken:
            formDataDebounce.buyToken?.address === NULL_ADDRESS
              ? formDataDebounce.buyToken?.symbol
              : formDataDebounce.buyToken?.address,
          sellAmount: ethers.utils.parseUnits(
            formDataDebounce.sellAmount,
            formDataDebounce.sellToken?.decimals
          ),
          slippagePercentage: settingsFormData.slippagePercentage,
          gasPrice:
            (settingsFormData?.type === "custom"
              ? ethers.utils.parseUnits(`${settingsFormData?.gasPrice || 0}`, 9)
              : ethers.utils
                  .parseUnits(`${gasPrice?.[settingsFormData.type] || 0}`, 8)
                  .toString()) || undefined,
        }
      : formDataDebounce.inputType === "buyToken" &&
        formDataDebounce.buyAmount &&
        formDataDebounce.sellToken?.symbol &&
        formDataDebounce.buyToken?.symbol
      ? {
          sellToken:
            formDataDebounce.sellToken?.address === NULL_ADDRESS
              ? formDataDebounce.sellToken?.symbol
              : formDataDebounce.sellToken?.address,
          buyToken:
            formDataDebounce.buyToken?.address === NULL_ADDRESS
              ? formDataDebounce.buyToken?.symbol
              : formDataDebounce.buyToken?.address,
          buyAmount: ethers.utils.parseUnits(
            formDataDebounce.buyAmount,
            formDataDebounce.buyToken?.decimals
          ),
          slippagePercentage: settingsFormData.slippagePercentage,
          gasPrice:
            (settingsFormData?.type === "custom"
              ? ethers.utils.parseUnits(`${settingsFormData?.gasPrice || 0}`, 9)
              : ethers.utils
                  .parseUnits(`${gasPrice?.[settingsFormData.type] || 0}`, 8)
                  .toString()) || undefined,
        }
      : undefined;
  }, [
    formDataDebounce.buyAmount,
    formDataDebounce.buyToken?.address,
    formDataDebounce.buyToken?.decimals,
    formDataDebounce.buyToken?.symbol,
    formDataDebounce.inputType,
    formDataDebounce.sellAmount,
    formDataDebounce.sellToken?.address,
    formDataDebounce.sellToken?.decimals,
    formDataDebounce.sellToken?.symbol,
    gasPrice,
    settingsFormData?.gasPrice,
    settingsFormData.slippagePercentage,
    settingsFormData.type,
  ]);

  const { data: quoteRes, isValidating } = useSWR(
    Endpoint && getParamsQuote
      ? `${Endpoint}${OX_PATH.getQuote(getParamsQuote)}`
      : null,
    async (url) => {
      const jsonQuote = await dispatch(fetchThunk(url));
      return jsonQuote;
    },
    { refreshInterval: 15000, revalidateOnFocus: false }
  );

  useEffect(() => {
    if (quoteRes) {
      const sellAmount = Number(
        ethers.utils.formatUnits(
          quoteRes.sellAmount,
          formData?.sellToken?.decimals
        )
      ).toFixed(5);
      const buyAmount = Number(
        ethers.utils.formatUnits(
          quoteRes.buyAmount,
          formData?.buyToken?.decimals
        )
      ).toFixed(5);
      setFormDataTmp((old) => {
        return {
          ...old,
          [`${formData.inputType === "buyToken" ? "sellAmount" : "buyAmount"}`]:
            formData.inputType === "buyToken" ? sellAmount : buyAmount,
        };
      });
    } else {
      setFormDataTmp((old) => {
        return {
          ...old,
          [`${formData.inputType === "buyToken" ? "sellAmount" : "buyAmount"}`]:
            "",
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteRes]);

  const onSwap = useCallback(async () => {
    if (!quoteRes || !walletAddress || !providerEthers) {
      return;
    }
    try {
      const signer = providerEthers.getSigner();
      const transactions = await signer.sendTransaction({
        to: quoteRes?.to,
        from: walletAddress,
        value:
          formDataDebounce.sellToken?.address === NULL_ADDRESS
            ? ethers.BigNumber.from(quoteRes?.sellAmount)
            : undefined,
        gasPrice: ethers.BigNumber.from(quoteRes?.gasPrice),
        gasLimit: ethers.BigNumber.from(
          Math.round(Number(quoteRes?.estimatedGas) * ET_FEE)
        ),
        nonce: providerEthers.getTransactionCount(walletAddress, "latest"),
        data: quoteRes.data,
      });

      if (transactions) {
        setTransactionsData(transactions);
      }
    } catch (error: any) {
      warningDialog.openDialog({
        content: error.message,
      });
    }
  }, [
    formDataDebounce.sellToken?.address,
    quoteRes,
    walletAddress,
    warningDialog,
  ]);

  const changeNetwork = async (chainIdParams: number) => {
    try {
      if (!ethereumWindow) {
        warningDialog.openDialog({
          content: intl.formatMessage({ id: "no_crypto_wallet_found" }),
        });
        throw new Error("No crypto wallet found");
      }
      const network = LIST_ALL_CHAIN.find((v) => v.chainId === chainIdParams);
      if (!network) {
        return;
      }
      try {
        await ethereumWindow.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: `0x${Number(network?.chainId).toString(16)}`,
            },
          ],
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereumWindow.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainName: network.name,
                  rpcUrls: network.rpc,
                  blockExplorerUrls: network.explorers
                    ? network.explorers.map((v) => v.url)
                    : undefined,
                  nativeCurrency: network.nativeCurrency
                    ? network.nativeCurrency
                    : undefined,
                  chainId: `0x${Number(network.chainId).toString(16)}`,
                },
              ],
            });
            try {
              await ethereumWindow.request({
                method: "wallet_switchEthereumChain",
                params: [
                  { chainId: `0x${Number(network?.chainId).toString(16)}` },
                ],
              });
            } catch (error) {
              warningDialog.openDialog({
                content: intl.formatMessage({ id: "switch_network_fail" }),
              });
            } finally {
              setFormData({
                sellToken: null,
                buyToken: null,
              });
            }
          } catch (addError) {
            console.log("addError", addError);
          } finally {
            setFormData({
              sellToken: null,
              buyToken: null,
            });
          }
        }
        // handle other "switch" errors
      } finally {
        setFormData({
          sellToken: null,
          buyToken: null,
        });
      }
    } catch (err) {}
  };

  const setFormDataWarper = (value: some) => {
    setFormData((old) => ({ ...old, ...value }));
  };

  useEffect(() => {
    if (!openSettings && settingsFormData.type !== "custom") {
      revalidateGasPrice();
    }
  }, [openSettings, revalidateGasPrice, settingsFormData.type]);

  useEffect(() => {
    if (
      networkID &&
      LIST_NETWORK.findIndex((v) => v.chainId === networkID) !== -1
    ) {
      setChainId(networkID);
    }
  }, [networkID]);

  return {
    balanceSellToken,
    balanceBuyToken,
    quoteRes,
    formData: {
      ...formData,
      buyAmount:
        formData.inputType === "buyToken"
          ? formData.buyAmount
          : formDataTmp.buyAmount,
      sellAmount:
        formData.inputType === "sellToken"
          ? formData.sellAmount
          : formDataTmp.sellAmount,
    } as FormInterface,
    setFormData: setFormDataWarper,
    openDialog,
    setOpenDialog,
    walletAddress,
    loading: isValidating,
    onSwap,
    changeNetwork,
    sellUSDTPrice,
    buyUSDTPrice,
    loadingSellUSDTPrice,
    loadingBuyUSDTPrice,
    chainId,
    setChainId: (value: number) => {
      setChainId(value);
      setFormData({ buyToken: null, sellToken: null });
    },
    isSameNetWork,
    openSettings,
    setOpenSetting,
    appState,
    settingsFormData,
    setSettingFormData,
    gasPrice,
    transactionsData,
    setTransactionsData,
    getBalanceSellToken,
    getBalanceBuyToken,
  };
};
export default useSwapLogic;
