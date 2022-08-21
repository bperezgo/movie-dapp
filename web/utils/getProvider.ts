import { PhantomProvider } from "../@types/phantomProvider";

/**
 * @description gets Phantom provider, if it exists
 */
const getProvider = (): PhantomProvider | null => {
  if ("solana" in window) {
    // @ts-ignore
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as PhantomProvider;
  }
  return null
};

export default getProvider;
