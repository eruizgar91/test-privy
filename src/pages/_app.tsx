import type {AppProps} from 'next/app'
import Head from 'next/head'
import {PrivyProvider} from '@privy-io/react-auth'
import {useRouter} from 'next/router'
import {configureChains} from "@wagmi/core"
import {arbitrumGoerli, polygonMumbai} from "wagmi/chains"
import { infuraProvider } from "wagmi/providers/infura";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector"
import { Catalog, NeverminedOptions } from '@nevermined-io/catalog'
import {appConfig} from "@/config/config";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();
    const configureChainsConfig = configureChains(
        [polygonMumbai, arbitrumGoerli],
        [
            infuraProvider({ apiKey: process.env.API_KEY }),
        ]
    )

    return (
        <>
            <Head>
                <title>Privy Auth Starter</title>
                <meta name="description" content="Privy Auth Starter" />
            </Head>
            <Catalog.NeverminedProvider config={appConfig}>

                <PrivyProvider
                    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
                    onSuccess={() => console.log('you are logged')}
                >
                    <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
                        <Component {...pageProps} />
                    </PrivyWagmiConnector>
                </PrivyProvider>
            </Catalog.NeverminedProvider>

        </>
    );
}

export default MyApp;
