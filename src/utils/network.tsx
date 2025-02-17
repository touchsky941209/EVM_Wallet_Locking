import { mainnet, merlin } from "wagmi/chains";
import { Chain, } from "@rainbow-me/rainbowkit";
import { http } from "wagmi"
export const mainnetwork = mainnet
export const merlinnetwork = merlin

export const sepoliaNetwork = {
    id: 11155111,
    name: "Sepolia",
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ["https://ethereum-sepolia-rpc.publicnode.com"] }
    }
}

export const chains: readonly [Chain, ...Chain[]] = [
    {
        ...sepoliaNetwork,
        iconUrl: "/assets/icons/b2.svg",
    },
];

export const transports = {
    [sepoliaNetwork.id]: http()
}