"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import WalletButton from "@/components/walletButton";
import { RxCross1 } from "react-icons/rx";
import { AiFillCaretRight } from "react-icons/ai";
import SettingMobileMenu from "@/components/header/settingMobileMenu";
import LanguageMobileMenu from "@/components/header/languageMobileMenu";
import { MenuMore } from "./menuMore";
import { LanguageMenu } from "./language";
import { ChainMenu } from "./chainMenu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { usePathname } from "next/navigation";
import { useUtilContext } from "@/hooks";
import {
  Lang_trade,
  Lang_earn
} from "@/constants/language";
import { useWeb3 } from "@/hooks";

import { Dialog, DialogTrigger } from "../models";

type MoreButtonType = {
  chain: string,
  currentAccount: string
}
const CustomWalletButton = () => {
  return (
    <ConnectButton
      accountStatus={{
        largeScreen: 'full',  // Show full account status on large screens
        smallScreen: 'avatar' // Show avatar on small screens
      }}

      label="Connect Wallet"
      showBalance={{
        largeScreen: false,
        smallScreen: true
      }}
    />
  );
};


export const MoreButton = ({ chain, currentAccount }: MoreButtonType) => {
  const { chainId, account, web3 } = useWeb3()
  const [isHidden, setIsHidden] = useState<boolean>(false);


  const airDropToken = async () => {
    try {
      const gasPrice = await web3.eth.getGasPrice()
      console.log("Airdrop is success")
    } catch (err) {
      console.log("Airdopr is failed", err)
    }
  }

  return (
    <div className="flex flex-col gap-1 lg:flex-row">
      <button className="bg-[#3d3a5d] w-[100px] h-[40px] rounded-[60px] flex justify-center items-center lg:hidden"
        onClick={() => setIsHidden(!isHidden)}
      >
        More
      </button>
      <div className={`${isHidden ? "w-[200px]" : "w-[0px]"} h-[100px] duration-200
        block lg:hidden bg-[#0A0027] absolute top-0 right-0 flex flex-col gap-2 justify-center items-center
        rounded-md z-[10]
        `}>
        <button
          className={` ${!isHidden ? "hidden" : ""}
          ${chain === "ailayer" ? "hidden" : ""}   
          ${currentAccount === undefined ? "hidden" : "block"} 
          flex justify-start pl-3 items-center rounded-md w-[200px] h-[40px] text-[17px] hover:bg-[#3d3a5d] gap-7`
          }
          onClick={() => {
            let faucetUrl: string = ""
            console.log("Chain =>", chain)
            if (chain === 'b2')
              faucetUrl = "https://www.bsquared.network/faucet/"
            else if (chain === "BEVM")
              faucetUrl = "https://bevm-testnet-faucet-alpha.vercel.app/"
            window.open(faucetUrl, '_blank');
          }}
        >
          <Image
            src={`${chain === "ailayer" ? "/assets/icons/ailayer.svg" :
              chain === "b2" ? "/assets/icons/b2.svg" : "/assets/bevm.png"
              }`}
            width={30}
            height={30}
            alt="FaucetLogo" />
          Faucet
        </button>

        <button
          className={`${!isHidden ? "hidden" : ""}
          ${currentAccount === undefined ? "hidden" : "block"}
            flex justify-start pl-3 items-center rounded-md w-[200px] h-[40px] text-[17px] hover:bg-[#3d3a5d] gap-7`
          }
          onClick={() => airDropToken()}
        >
          <Image
            src={`${"/assets/Btc.png"}`}
            width={30}
            height={30}
            alt="FaucetLogo" />
          Faucet
        </button>
      </div>



      {
        <div className={`gap-1 hidden lg:flex`}>
          <button
            className={`
          ${chain === "ailayer" ? "hidden" : ""}   
          ${currentAccount === undefined ? "hidden" : "block"} 
          flex justify-center items-center rounded-[60px] w-[120px] h-[40px] text-[17px] bg-[#3d3a5d] gap-3`
            }
            onClick={() => {
              let faucetUrl: string = ""
              console.log("Chain =>", chain)
              if (chain === 'b2')
                faucetUrl = "https://www.bsquared.network/faucet/"
              else if (chain === "BEVM")
                faucetUrl = "https://bevm-testnet-faucet-alpha.vercel.app/"
              window.open(faucetUrl, '_blank');
            }}
          >
            <Image
              src={`${chain === "ailayer" ? "/assets/icons/ailayer.svg" :
                chain === "b2" ? "/assets/icons/b2.svg" : "/assets/bevm.png"
                }`}
              width={30}
              height={30}
              alt="FaucetLogo" />
            Faucet
          </button>

          <button
            className={`
          ${currentAccount === undefined ? "hidden" : "block"}
           flex justify-center items-center rounded-[60px] w-[120px] h-[40px] text-[17px] bg-[#3d3a5d] gap-3`
            }
            onClick={() => airDropToken()}
          >
            <Image
              src={`${"/assets/Btc.png"}`}
              width={30}
              height={30}
              alt="FaucetLogo" />
            Faucet
          </button>
        </div>
      }
    </div>
  )
}

export default function Header() {
  const pathname = usePathname();
  const { chainId, account, web3 } = useWeb3()
  const [currentAccount, setCurrentAccount] = useState<any>()
  const [chain, setChain] = useState<string>("b2")

  useEffect(() => {
    console.log("Chain =>", chain)
  }, [chain])

  const [paths, setPaths] = useState<any>([
    { name: "", link: "/trade" },
    { name: "", link: "/earn" },
  ])

  useEffect(() => {
    setCurrentAccount(account)
  }, [account])


  const [open, setOpen] = useState(false);

  const airDropToken = async () => {
    try {
      const gasPrice = await web3.eth.getGasPrice()
      console.log("Airdrop is success")
    } catch (err) {
      console.log("Airdopr is failed", err)
    }
  }

  return (
    <section className="w-full fixed top-0 left-0  ">
      <div className="flex gap-x-10 md:gap-x-3 items-center relative  md:justify-between   py-4 md:px-10 pl-2">
        <div
          className="cursor-pointer flex items-center justify-between w-full"
        >
          <Image
            className="w-[130px] hidden min-[540px]:block"
            src={"/assets/Logo_White.png"}
            width={100}
            height={60}
            alt="logo"
          />

          <div className="py-6 md:flex hidden  w-full justify-center items-center gap-3 lg:gap-10">
            {paths.map((path: any) => (
              <div key={path.name}>
                <div className="  text-[#b1b6be] active:text-white   visited:text-white  flex justify-between  gap-y-2 px-3 text-xl   ">
                  {" "}
                  <a
                    href={path.link}
                    className={`${pathname === path.link ? "text-white" : "text-[#b1b6be]"
                      }`}
                  >
                    {path.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Popover>
          <PopoverTrigger className="text-3xl absolute right-2 top-5   cursor-pointer md:hidden">
            <GiHamburgerMenu />
          </PopoverTrigger>
          <PopoverContent className="w-screen border-none -translate-y-20 ">
            <div
              className={`md:items-center md:pb-0 fixed bg-gradient-bg  z-10 left-0 w-full md:w-auto md:hidden  transition-all duration-500 ease-in`}
            >
              <div className=" flex md:hidden justify-between  items-center px-3 pt-8 ">
                <Image
                  className="w-28"
                  src={"/assets/Logo_White.png"}
                  width={300}
                  height={60}
                  alt="logo"
                />
                <PopoverClose>
                  <RxCross1 className=" text-xl text-white" />
                </PopoverClose>
              </div>
              <hr className=" mt-6" />
              {/* <div className="py-6 flex-col md:flex-row hidden  justify-center items-center gap-3 lg:gap-10"> */}
              <div className="flex flex-col md:flex-row gap-y-4 my-4 mb-4">
                {paths.map((path: any) => (
                  <div key={path.name}>
                    <div className=" flex justify-between gap-y-2 px-1 text-xl  ">
                      <a
                        href={path.link}
                        className={`${pathname === path.link
                          ? "text-white"
                          : "text-[#b1b6be]"
                          }`}
                      >
                        {path.name}
                      </a>
                      <AiFillCaretRight className="md:hidden" />
                    </div>
                  </div>
                ))}
              </div>

              <hr className="md:hidden" />
              <div className="md:hidden ">
                <SettingMobileMenu />
              </div>

              <div className="md:hidden ">
                <LanguageMobileMenu />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className=" flex gap-x-2 ">
          <div className="flex gap-x-2 items-center pr-10 md:pr-4">
            {/* <ChainMenu /> */}
            <MoreButton chain={chain} currentAccount={currentAccount} />
            <div className="w-[180px]">
              <CustomWalletButton />
            </div>
          </div>
          <div className="hidden md:flex gap-x-4 items-center">
            <LanguageMenu />
            <MenuMore />
          </div>
        </div>
      </div>
    </section>
  );
}
