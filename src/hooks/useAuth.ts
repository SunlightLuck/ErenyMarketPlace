import { useWeb3React } from "@web3-react/core"
import {InjectedConnector} from '@web3-react/injected-connector'

const useAuth = () => {
  const {activate, deactivate, account, chainId} = useWeb3React();

  const login = () => {
    const connector = new InjectedConnector({supportedChainIds: [4]})
    activate(connector);
  }

  return {login, logout: deactivate, account, chainId}
}

export default useAuth;