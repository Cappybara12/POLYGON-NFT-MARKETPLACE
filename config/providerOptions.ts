import WalletConnectProvider from "@walletconnect/web3-provider";
import { IProviderOptions } from "web3modal";

import UAuthSPA from "@uauth/js";
import * as UAuthWeb3Modal from "@uauth/web3modal";

export const uauthOptions: UAuthWeb3Modal.IUAuthOptions = {
  clientID: "0e72ss8AEhurAuHoBbT5oHLm70/qpnjsgQVKB8iajII=",
  clientSecret: "36SZ4aLZnoLIaM334sjjggPlBIZJEHm5r4ThvuRsyso=",
  redirectUri: "http://localhost:3000",

  scope: "openid wallet",
};

export const providerOptions: IProviderOptions = {
  "custom-uauth": {
    display: UAuthWeb3Modal.display,
    connector: UAuthWeb3Modal.connector,
    package: UAuthSPA,
    options: uauthOptions,
  },

  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "3166386b5b694b2ea9726c7e2ab9b46d",
    },
  },
};
