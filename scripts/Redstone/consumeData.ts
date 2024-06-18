import { ethers } from "hardhat";

// On Etherlink testnet
const dataConsumers = {
  ETH: '0x5C155c3368dCCb4150C5D926c29074591DF3dD6e',
  BTC: '0xa02662113053b55CfB5B39c1Ad22322E9025F4A2',
  XTZ: '0xd23b612D8A1E084090ce1936436feAA304ab3017'
};

async function main() {
  // deploy data consumers
  const decimalsToKeep = 4;
  const dataConsumerETH = await ethers.getContractAt('DataConsumer', dataConsumers.ETH);
  const dataConsumerBTC = await ethers.getContractAt('DataConsumer', dataConsumers.BTC);
  const dataConsumerXTZ = await ethers.getContractAt('DataConsumer', dataConsumers.XTZ);
  const ethPrice = (await dataConsumerETH.getDataFeedLatestAnswer(decimalsToKeep)).toString();
  const btcPrice = (await dataConsumerBTC.getDataFeedLatestAnswer(decimalsToKeep)).toString();
  const xtzPrice = (await dataConsumerXTZ.getDataFeedLatestAnswer(decimalsToKeep)).toString();
  console.log(`ETH price: ${ethPrice.slice(0, -decimalsToKeep)}.${ethPrice.slice(-decimalsToKeep)} USD`);
  console.log(`BTC price: ${btcPrice.slice(0, -decimalsToKeep)}.${btcPrice.slice(-decimalsToKeep)} USD`);
  console.log(`XTZ price: ${xtzPrice.slice(0, -decimalsToKeep)}.${xtzPrice.slice(-decimalsToKeep)} USD`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});