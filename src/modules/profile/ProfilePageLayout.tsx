import { useEffect } from "react";
import { useSelector } from "react-redux";
import { generatePath, Outlet, useNavigate, useParams } from "react-router";
import { AppState } from "../../redux/reducer";

interface Props {}

const ProfilePageLayout = (props: Props) => {
  const navigate = useNavigate();
  const { walletAddress: walletAddressDefault } = useSelector(
    (state: AppState) => state.wallet
  );
  const params = useParams<{ walletAddress?: string; tab?: string }>();
  const { walletAddress } = params;
  useEffect(() => {
    if (!walletAddress && walletAddressDefault) {
      navigate(
        generatePath(":walletAddress", { walletAddress: walletAddressDefault }),
        { replace: true }
      );
    }
  }, [navigate, walletAddress, walletAddressDefault]);

  return <Outlet />;
};

export default ProfilePageLayout;
