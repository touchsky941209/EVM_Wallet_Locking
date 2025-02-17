"use client"
import {
    createContext,
    useEffect,
    useState,
    useMemo,
} from "react"
import { UtilContextType, MarketPriceType, TradeHeaderType } from "@/types"
import { useWeb3 } from "@/hooks"

const UtilContext = createContext<UtilContextType | null>(null)

export const UtilContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { account, web3, chainId, isConnected } = useWeb3()
    const value = useMemo(() => ({
    }), [
    ])
    return (
        <UtilContext.Provider value={value}>
            {children}
        </UtilContext.Provider>
    )
}

export default UtilContext