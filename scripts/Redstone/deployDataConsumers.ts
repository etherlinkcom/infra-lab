import { ethers } from "hardhat";
import { DataConsumer } from "../../typechain-types";
import { verifyContract } from "../utils/verify";

// On Etherlink testnet
const redstonePriceFeed = {
  ETH: '0xb31D94df41ccc22b46fd2Ae4eA2a6D6eB9c23bfb',
  BTC: '0xfe66A25096128f57D3876D42cD2B4347a77784c2',
  XTZ: '0xE06FE39f066562DBfE390167AE49D8Cb66e1F887'
};

async function main() {
  // deploy data consumers
  const DataConsumer = await ethers.getContractFactory("DataConsumer");
  const dataConsumerETH = await DataConsumer.deploy(redstonePriceFeed.ETH) as DataConsumer;
  const dataConsumerBTC = await DataConsumer.deploy(redstonePriceFeed.BTC) as DataConsumer;
  const dataConsumerXTZ = await DataConsumer.deploy(redstonePriceFeed.XTZ) as DataConsumer;
  await dataConsumerETH.waitForDeployment();
  await dataConsumerBTC.waitForDeployment();
  await dataConsumerXTZ.waitForDeployment();

  console.log(`Data consumer ETH is deployed: ${await dataConsumerETH.getAddress()}`);
  console.log(`Data consumer BTC is deployed: ${await dataConsumerBTC.getAddress()}`);
  console.log(`Data consumer XTZ is deployed: ${await dataConsumerXTZ.getAddress()}`);

  // verify
  await verifyContract(dataConsumerETH, [redstonePriceFeed.ETH]);
  await verifyContract(dataConsumerBTC, [redstonePriceFeed.BTC]);
  await verifyContract(dataConsumerXTZ, [redstonePriceFeed.XTZ]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});