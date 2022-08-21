export {};

declare global {
  interface Window {
    solana: Solana
  }
}

interface Solana {
  isPhantom: boolean;
}
