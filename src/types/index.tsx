import { ContractRunner, Contract, JsonRpcSigner } from "ethers";
import { Address } from "viem";

export type Web3ContextType = {
  account?: Address;
  web3: any;
  chainId?: number;
  isConnected?: boolean;
  library?: ContractRunner | Promise<JsonRpcSigner>;
  usdcTokenContract: any;
  stakeContract: any;
  isWeb3Loading: boolean;
};

export type UtilContextType = {
}

export type TradeHeaderType = {
  price24High: number;
  price24Low: number;
}
export type MarketPriceType = {
  open: number,
  close: number,
  high: number,
  low: number
}