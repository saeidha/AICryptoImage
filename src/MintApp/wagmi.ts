import { http, createConfig } from 'wagmi'
import { linea } from 'wagmi/chains'
// import { coinbaseWallet } from 'wagmi/connectors'
// baseSepolia linea
import { metaMask } from 'wagmi/connectors'
export const config = createConfig({
  chains: [linea],
  connectors: [
    metaMask()
    // coinbaseWallet({
    //   options: {
    //     appName: 'Coinbase',
    //   },
    // }),
  ],
  transports: {
    [linea.id]: http()
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
