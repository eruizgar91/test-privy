import {usePrivy, useWallets} from '@privy-io/react-auth';
import Head from 'next/head';
import {useAccount, useConnect} from "wagmi";
import {useState} from "react";

export default function LoginPage() {
    const {login, authenticated, ready, logout, user} = usePrivy();
    const { isConnected, address} = useAccount()
    const { wallets} = useWallets()
    const [walletSign, setWalletSign] = useState('')

    return (
        <>
            <Head>
                <title>Login · Privy</title>
            </Head>

            <main className="flex min-h-screen min-w-full">
                <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
                    <div>
                        <div className="mt-6 flex justify-center text-center">
                            {!ready && <></>}
                            {ready && !authenticated  && <button
                                className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
                                onClick={login}
                            >
                                Log in
                            </button>
                            }
                            {ready && authenticated && <> {JSON.stringify(user, null, 2)} <button onClick={logout}>log out</button></>}
                            {ready && isConnected && <p>You are connected</p>}
                            {ready && address && <p>Wagmi wallet {address}</p>}
                            {ready && wallets && <p>Wallets array: {wallets[0]?.address}</p>}
                            {ready && wallets && <button disabled={!wallets[0]?.isConnected()} onClick={() => wallets[0]?.sign('hello').then(x => setWalletSign(x))}>Sign</button>}
                            {ready && walletSign && <p>{walletSign}</p>}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
