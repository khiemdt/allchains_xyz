import { ethers } from "ethers";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { NULL_ADDRESS, providerEthers } from "../../constants";
import { AppState } from "../../redux/reducer";
import { ABI, some } from "../constants";
import useGeneralHook from "./useGeneralHook";

interface Props {
  spenderTokenAddress?: string;
  amount?: string;
  allowanceTarget?: string;
}
const useGetAllowanceTokens = (props: Props) => {
  const { spenderTokenAddress, amount, allowanceTarget } = props;
  const { warningDialog } = useGeneralHook();
  const walletAddress = useSelector(
    (state: AppState) => state.wallet.walletAddress
  );
  const [approveTransactionData, setApproveTransactionData] = useState<
    some | undefined
  >(undefined);

  const {
    data: balance,
    isValidating,
    revalidate,
  } = useSWR(
    [allowanceTarget, walletAddress, providerEthers, spenderTokenAddress],
    async (
      allowanceTarget,
      walletAddress,
      providerEthers,
      spenderTokenAddress
    ) => {
      if (
        !allowanceTarget ||
        !walletAddress ||
        !providerEthers ||
        !spenderTokenAddress ||
        spenderTokenAddress === NULL_ADDRESS
      ) {
        return 0;
      } else {
        const contract = new ethers.Contract(
          spenderTokenAddress,
          ABI,
          providerEthers.getSigner()
        );
        const balanceValue = await contract.allowance(
          walletAddress,
          allowanceTarget
        );
        const balanceParse = Number(ethers.utils.formatUnits(balanceValue));
        return balanceParse;
      }
    },
    { refreshInterval: 30000 }
  );

  const approveToken = useCallback(async () => {
    if (!spenderTokenAddress || !providerEthers || !allowanceTarget) {
      return;
    }
    try {
      const contract = new ethers.Contract(
        spenderTokenAddress,
        ABI,
        providerEthers.getSigner()
      );
      const approveRes = await contract.approve(
        allowanceTarget,
        ethers.utils.parseEther("10000000")
      );
      if (approveRes) {
        setApproveTransactionData(approveRes);
      }
    } catch (error: any) {
      if (error.code === 4001) {
        warningDialog.openDialog({
          content: error.message,
        });
      }
    } finally {
    }
  }, [allowanceTarget, spenderTokenAddress, warningDialog]);

  const isTokenAllowed = useMemo(() => {
    return (
      (balance || 0) > Number(amount || 0) ||
      spenderTokenAddress === NULL_ADDRESS
    );
  }, [amount, balance, spenderTokenAddress]);

  return {
    isValidating,
    approveToken,
    isTokenAllowed,
    revalidate,
    approveTransactionData,
    setApproveTransactionData,
  };
};

export default useGetAllowanceTokens;
