"use client"
import {
    createContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from 'react';
import Web3 from 'web3';
import { ethers, Contract, ContractRunner } from 'ethers';
import { useAccount, useChainId } from 'wagmi';
import { useEthersProvider, useEthersSigner } from '@/utils/wagmi-ethers';
import { Web3ContextType } from '../types';
import UsdtAbi from "@/contracts/usdtAbi.json"
import StakingAbi from "@/contracts/stakingAbi.json"
import { USDTAddress, StakingContractAddress } from '@/constants';
declare let window: any;
const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const signer = useEthersSigner();
    const ethersProvider = useEthersProvider();
    const defaultProvider = new ethers.JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com');
    let web3: any;

    if (typeof window !== 'undefined' && window.ethereum) {
        web3 = new Web3(window.ethereum);
    }

    const [provider, setProvider] = useState<ContractRunner>(defaultProvider);

    const [usdcTokenContract, setUsdcTokenContract] = useState<Contract>({} as Contract)
    const [stakeContract, setStakinContract] = useState<Contract>({} as Contract)
    const [isWeb3Loading, setIsWeb3Loading] = useState<boolean>(false)

    const init = useCallback(async () => {

        try {
            if (!isConnected || !ethersProvider) {
                console.log('Not connected wallet');
            } else {
                await setProvider(ethersProvider);
                console.log('Connected wallet');
                console.log("gasPrice: ", await web3.eth.getGasPrice())
            }

            let _usdcTokenContract: any
            let _StakingContract: any
            _usdcTokenContract = await new web3.eth.Contract(
                UsdtAbi,
                USDTAddress
            )

            _StakingContract = await new web3.eth.Contract(
                StakingAbi,
                StakingContractAddress
            )
            await setUsdcTokenContract(_usdcTokenContract)
            await setStakinContract(_StakingContract)
            await setIsWeb3Loading(true)
        } catch (err) {
            // console.log(err);
        }
    }, [isConnected, ethersProvider, provider]);

    useEffect(() => {
        init();

    }, [init]);



    const value = useMemo(
        () => ({
            account: address,
            web3,
            chainId,
            isConnected,
            library: provider ?? signer,
            usdcTokenContract,
            stakeContract,
            isWeb3Loading
        }),
        [
            address,
            web3,
            chainId,
            isConnected,
            provider,
            signer,
            usdcTokenContract,
            stakeContract,
            isWeb3Loading
        ]
    );
    return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3Context;
