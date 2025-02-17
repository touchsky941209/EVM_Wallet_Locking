"use client"
import { MagicMenu } from "./ui/dropdown";
import { useUtilContext } from "@/hooks";
import { useEffect, useState } from "react";
import { getMarketInfo } from "@/services/markets";
import { chain, market } from "@/constants/index"
import {
  Lang_24HHigh,
  Lang_24Low,
  Lang_24hChange,
  Lang_FundingCountdown
} from "@/constants/language"

export default function TradeHeader() {
  const [changeDay, setChangeDay] = useState<number>(0)
  const [funding, setFunding] = useState<number>(0)
  const [countTime, setCountTime] = useState<any>({ m: 60, s: 0 })
  const init = async () => {
    const result = await getMarketInfo(market, chain)
    const _changeDay = Number(result ? result.change_in_24h : 0)
    setChangeDay(_changeDay)
  }


  return (
    <div className="flex flex-col justify-around xl:flex-row py-4 backdrop-blur-lg/2 px-2 bg-card border border-border rounded-3xl">
      <div className="flex justify-between items-center sm:gap-12 gap-2">
        <div className="flex justify-between">
          <MagicMenu />
        </div>
        <div>
          <p
            className={`font-bold sm:text-4xl text-sm ${changeDay < 0 ? "text-rose-500" : "text-semantic-success"}`}
          >
          </p>
        </div>
        <div>
          <p className="">
            <span className="text-text-secondary hidden lg:block">
              {
                Lang_24hChange.en
              }
            </span>{" "}
            <span
              className={`block text-lg ${changeDay < 0 ? "text-rose-500" : "text-semantic-success"}`}
            >
              {changeDay.toFixed(2) + " %"}
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-between sm:gap-12 gap-2">
        <div>
          <p className="text-text-secondary">
            {
            Lang_24HHigh.en 
            }
          </p>
        </div>
        <div>
          <p className="text-text-secondary">
            {
            }
          </p>
        </div>
        <div>
          <p className="text-text-secondary">
            {
            }
          </p>
          <p>
            <span className=" text-semantic-warning">{funding}</span>
            <span className=" text-white text-lg">/ {countTime.m + ":" + countTime.s}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
