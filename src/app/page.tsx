"use client"
import EarnTabs from "@/components/earnPageTabs/earnTabs";
import { Lang_EASYREWARDSMADESIMPLE, Lang_EarnrewardsfromtradingfeesandPBTmining, Lang_earn } from "@/constants/language";
import { useEffect, useState } from "react";
import { useWeb3 } from "@/hooks";
import { StakingContractAddress, USDTAddress } from "@/constants";
export default function Earn() {
  const { usdcTokenContract, stakeContract, web3, account, isWeb3Loading } = useWeb3()
  const [stakeBtnLoading, setStakingBtnLoading] = useState<Boolean>(true)
  const [amount, setAmount] = useState<number>(0)
  const [lockTime, setLockTime] = useState<number>(0)
  const [stakeState, setStakeState] = useState<any>()
  const StakeToken = async () => {
    try {
      console.log("Locktime => ", lockTime)
      console.log(">>>>> amount =>", amount)
      setStakingBtnLoading(false)
      const gasPrice = await web3.eth.getGasPrice()
      console.log('start approve')
      const res = await usdcTokenContract.methods.approve(StakingContractAddress, amount * (10 ** 18)).send({ from: account, gasPrice: gasPrice })
      console.log(">>> tx : ", res.transactionHash)

      const tx2 = await stakeContract.methods.Deposite(USDTAddress, amount * (10 ** 18), lockTime).send({ from: account })
      console.log(">>>> tx2 =>", tx2.transactionHash)

      console.log("Airdrop is success")
      setStakingBtnLoading(true)
    } catch (err) {
      console.log("Airdopr is failed", err)
      setStakingBtnLoading(true)
    } finally {
      console.log('finished')
    }
  }

  const getTokenList = async () => {
    const tokenList = await stakeContract.methods.getStakingTokenList(account).call()
    const tokenAmount = await stakeContract.methods.getStakingTokenAmount(account).call()
    const tokenTime = await stakeContract.methods.getStakingTokenStartTime(account).call()
    const tokenLockTime = await stakeContract.methods.getStakingTokenLockTime(account).call()
    setStakeState({
      tokenList: tokenList,
      tokenAmount: tokenAmount,
      tokenTime: tokenTime,
      tokenLockTime: tokenLockTime
    })

  }
  const getTokenBalance = async () => {
    const balance = await usdcTokenContract.methdos.balanceOf(account).call()
    console.log("Balance =>", balance)
  }

  useEffect(() => {
    if (isWeb3Loading && account)
      getTokenList()
  }, [isWeb3Loading])

  return (
    <div className="pt-28 px-1  min-h-screen">
      <div className="flex items-center justify-center  pt-12 font-Raleway">
        <div className="text-center font-ArchivoBlack font-normal custom-text">
          <h1 className=" font-ArchivoBlack lg:text-8xl text-7xl uppercase  ">
          </h1>
          <p className="lg:text-6xl text-4xl  uppercase py-5  ">
            {
              Lang_EASYREWARDSMADESIMPLE.en
            }
          </p>
          <p className="lg:text-2xl text-lg font-light font-Raleway text-text">
            {
              Lang_EarnrewardsfromtradingfeesandPBTmining.en
            }
          </p>
        </div>
      </div>
      <div className="lg:px-10 px-3 ">
        <div className="pt-7">
          <EarnTabs
            stakeState={stakeState} />
        </div>


      </div>
      <div className="flex flex-col items-center justify-center  pt-12 font-Raleway">
        <div>
          <p className="text-left">
            Input Staking Amount
          </p>
          <input
            className="w-[500px] h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e: any) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="mt-10">
          <p className="text-left">
            LockTime with day
          </p>
          <input
            className="w-[500px] h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e: any) => setLockTime(Number(e.target.value) * 24 * 3600)}
          />
        </div>
        <button
          className="w-[300px] h-[70px] bg-indigo-500 hover:bg-fuchsia-500 mt-10 rounded-xl text-[30px]"
          onClick={async () => {
            if (isWeb3Loading && account) {
              await StakeToken()
              await getTokenList()
            }
          }}>
          {
            stakeBtnLoading ? "Stake" : "●●●"
          }
        </button>

      </div>
    </div>
  );
}
