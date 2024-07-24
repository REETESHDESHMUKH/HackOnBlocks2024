import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const CARDONA_RPC_URL = process.env.CARDONA_RPC_URL || "";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    cardona: {
      url: CARDONA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 2442
    },
  }
};

export default config;
