import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

// Enhanced Web3 configuration for Base Wallet
export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "TopUp Shop - Web3 Digital Marketplace",
      appLogoUrl: "/logo.png", // App logo for wallet display
      preference: "smartWalletOnly", // Force Smart Wallet (Base Wallet) usage
      version: "4",
    }),
  ],
  transports: {
    [base.id]: http("https://mainnet.base.org"),
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
  ssr: false, // Disable server-side rendering for Web3
});

// Network configuration
export const supportedChains = {
  base: {
    id: 8453,
    name: "Base",
    network: "base",
    nativeCurrency: {
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    },
    rpcUrls: {
      default: { http: ["https://mainnet.base.org"] },
      public: { http: ["https://mainnet.base.org"] },
    },
    blockExplorers: {
      default: { name: "BaseScan", url: "https://basescan.org" },
    },
  },
  baseSepolia: {
    id: 84532,
    name: "Base Sepolia",
    network: "base-sepolia",
    nativeCurrency: {
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    },
    rpcUrls: {
      default: { http: ["https://sepolia.base.org"] },
      public: { http: ["https://sepolia.base.org"] },
    },
    blockExplorers: {
      default: { name: "BaseScan", url: "https://sepolia.basescan.org" },
    },
  },
};

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
