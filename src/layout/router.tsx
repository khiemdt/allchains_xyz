import React from "react";
import { Navigate } from "react-router";
import { IS_DEV_EVN } from "../api/API_App";
import CryptocurrenciesPage from "../modules/cryptocurrencies/page/CryptocurrenciesPage";
import DonatePage from "../modules/donate/DonatePage";
import IntroducePage from "../modules/introduce/IntroducePage";
import NFTPage from "../modules/profile/NFTPage";
import PortfolioPage from "../modules/profile/PortfolioPage";
import ProfileNewPage from "../modules/profile/ProfileNewPage";
import ProfilePage from "../modules/profile/ProfilePage";
import ProfilePageLayout from "../modules/profile/ProfilePageLayout";
import ChainListPage from "../modules/research/page/ChainListPage";
import SwapPage from "../modules/swap/SwapPage";
import {
  BookIcon,
  BuyCryptoIcon,
  IconUser,
  RepeatCircleIcon,
  Upgrade,
  IconBridge,
} from "../svg";
import { ROUTES } from "./constants";
import { RouteObject } from "./utils";

export const ADMIN_ROUTES: RouteObject[] = [
  {
    path: ROUTES.introduce,
    hidden: true,
    element: <IntroducePage />,
  },
  {
    path: ROUTES.profile.index,
    title: "profile",
    icon: <IconUser className="svgStroke" />,
    element: <ProfilePageLayout />,
    children: [
      {
        path: ROUTES.profile.main,
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <PortfolioPage />,
          },
          {
            path: ROUTES.profile.nft,
            element: <NFTPage />,
          },
          {
            path: ROUTES.profile.history,
            element: <>history</>,
          },
          {
            path: ROUTES.profile.approval,
            element: <>approval</>,
          },
        ],
      },
      {
        path: ROUTES.profile.new,
        element: <ProfileNewPage />,
      },
      {
        path: "*",
        element: <Navigate to={"new"} />,
      },
    ],
  },
  {
    path: ROUTES.cryptocurrencies.index,
    title: "cryptocurrencies",
    icon: <BuyCryptoIcon className="svgStroke" />,
    element: <CryptocurrenciesPage />,
  },
  {
    path: ROUTES.chainList,
    title: "chainList",
    icon: <BookIcon className="svgStroke" />,
    element: <ChainListPage />,
  },
  {
    path: ROUTES.swap,
    title: "swap",
    icon: <RepeatCircleIcon className="svgStroke" />,
    element: <SwapPage />,
  },
  {
    path: ROUTES.donate,
    element: <DonatePage />,
    hidden: true,
  },

  {
    path: ROUTES.bridge,
    title: "bridge",
    icon: <IconBridge className="svgStroke" />,
    element: (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "100%",
        }}
      >
        <img src={Upgrade} alt="" />{" "}
      </div>
    ),
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.chainList} />,
    hidden: true,
  },
];
