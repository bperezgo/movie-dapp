import "../styles/globals.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import getProvider from "../utils/getProvider";
import { PhantomProvider } from "../@types/phantomProvider";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  const [walletAddress, setWalletAddress] = useState<PhantomProvider | null>(
    null
  );
  const checkIfWalletIsConnected = async () => {
    const { solana } = window as any;

    if (solana && solana.isPhantom) {
      const res = await solana.connect();
      console.log("Connected with Public key:", res.publicKey.toString());
      const provider = getProvider();
      setWalletAddress(provider);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const connectWallet = async () => {
    const { solana } = window as any;
    if (solana) {
      const res = await solana.connect();
      console.log("Connected with Public key:", res.publicKey.toString());
      const provider = getProvider();
      setWalletAddress(provider);
    }
  };

  if (!walletAddress) {
    return (
      <div className={styles.container}>
        <button
          className={styles.sol_connect_wallet_button}
          onClick={connectWallet}
        >
          Conectarse
        </button>
      </div>
    );
  }

  return (
    <div>
      <main>
        <nav className="border-b p-6">
          <p className="text-4xl font-bold">Platzi Movies</p>
          <div className="flex mt-4">
            <Link href="/">
              <a className="mr-4">Inicio</a>
            </Link>
            <Link href="/add-movie">
              <a className="mr-6">Agregar Películas</a>
            </Link>
            <Link href="/my-movies">
              <a className="mr-6">Mis Películas</a>
            </Link>
          </div>
        </nav>
      </main>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
