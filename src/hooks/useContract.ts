import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { Contract } from "ethers";
import { useMemo } from "react";
import ABI from '../contract/ABI.json'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {chainId?: number|string} {
  const context = useWeb3ReactCore<Web3Provider>();
  const contextNetwork = useWeb3ReactCore<Web3Provider>("ERENY-NETWORK");
  return context.active ? context : contextNetwork
}

export const useContract = (address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null => {
  const {library, account} = useActiveWeb3React()

  return useMemo(() => {
    if(!address || !ABI || !library) {
      return null;
    }
    try {
      return new Contract(address, ABI, withSignerIfPossible && account ? library.getSigner(account).connectUnchecked() : library);
    } catch(err) {
      console.log(err);
      return null;
    }
  }, [address, ABI, library])
}

export const useTokenContract = (): Contract | null => {
  const contract = useContract("0x0507690B82801f1232e072dd2Ec35C3Bb7D055f9", ABI, true);
  return contract; 
}