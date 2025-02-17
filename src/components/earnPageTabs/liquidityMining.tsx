"use client";

import { useEffect, useState } from "react";

export const LMiningAndPFiler = ({ stakeState }: any) => {
  const [amount, setAmount] = useState<any>([])
  const [startTime, setstartTime] = useState<any>([])
  const [lockTime, setLockTime] = useState<any>([])
  useEffect(() => {
    if (stakeState) {
      setAmount(stakeState.tokenAmount)
      setstartTime(stakeState.tokenTime)
      setLockTime(stakeState.tokenLockTime)
    }
  }, [stakeState])

  useEffect(() => {
    console.log("amount =>", amount)
    console.log("startTime =>", startTime)
    console.log("lockTime =>", lockTime)
  }, [amount, startTime, lockTime])

  const convertTolocalTime = (unixTime: any) => {
    const milliseconds = Number(unixTime) * 1000;

    // Create a new JavaScript Date object based on the timestamp.
    const date = new Date(milliseconds);

    // Use toLocaleString() to format the date and time according to the user's locale
    // and with specific options for date and time parts.
    const localTime = date.toLocaleString();

    return localTime;
  }

  return (
    <div className="flex items-center justify-center text-base text-[#FFF] font-normal lg:w-full">
      <div className="w-full rounded-2xl">
        <div>
          <table className="w-full">
            <thead>
              <tr className="text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Token</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Start Time</th>
                <th className="p-2">Lock Time</th>
              </tr>
            </thead>
            <tbody>
              {
                amount.map((itm: any, idx: any) => (
                  <tr className="text-center"
                    key={idx}>
                    <td className="p-2">{idx}</td>
                    <td className="p-2">{"USDT"}</td>
                    <td className="p-2">{Number(amount[idx]) / (10 ** 18)}</td>
                    <td className="p-2">{convertTolocalTime(startTime[idx])}</td>
                    <td className="p-2">{Number(lockTime[idx]) / (24 * 3600) + " day"}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
