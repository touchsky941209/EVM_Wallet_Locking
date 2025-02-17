
import Web3 from 'web3';
import { useWeb3 } from '@/hooks';
import { ethers } from 'ethers';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

export const getMinexecuteFee = () => {
  return ethers.parseEther("0.00005");
}

export const ToPriceX96 = (price: number) => {
  let usdDecimal = 18
  let marketDecimal = 18
  return price * Math.pow(2, 96) * Math.pow(10, usdDecimal) / Math.pow(10, marketDecimal)
}

export const FromPriceX96 = (price: number) => {
  let usdDecimal = 18
  let marketDecimal = 18
  return price * Math.pow(10, marketDecimal) / (Math.pow(2, 96) * Math.pow(10, usdDecimal))
}

export const SetCandleTicketDataProcess = async (price: any) => {
  let newPrice: any = []

  for (let i = 0; i < price.length; i++) {
    if (price[i].low === 0) {
      const _newPrice = {
        time: price[i].time,
        high: price[i].high,
        open: price[i].open,
        close: price[i].close,
        low: price[i].open > price[i].close ? price[i].close : price[i].open
      }

      newPrice.push(_newPrice)
    }
    else newPrice.push(price[i])
  }


  return newPrice
}

export const SetOrdersDataProcess = async (data: any) => {
  let newData: any = []
  for (let i = 0; i < data.length; i++) {
    if (Number(data[i].size) != 0) {
      newData.push(data[i])
    }
  }

  return newData
}