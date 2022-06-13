import { Web3Provider } from '@ethersproject/providers';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import React from 'react'

const Web3ProviderNetwork = createWeb3ReactRoot("ERENY-NETWORK");

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

interface Props {
  children: any;
}

const W3Provider: React.FC<Props> = ({children}) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        {children}
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default W3Provider;