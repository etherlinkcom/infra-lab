import { ethers } from 'hardhat';

async function main() {
  // Deploying Pyth contract
  console.log("Deploying contract...")
  const PythFactory = await ethers.getContractFactory('Pyth')
  const pythContract = await PythFactory.deploy()
  await pythContract.waitForDeployment()
  console.log("Contract deployed!! Address:", await pythContract.getAddress())


  // Running getEthUsdPrice function
  const [price, expo, publishTime] = await pythContract.getEthUsdPrice();
  console.log('Current ETH/USD Price:', price, 'e^', expo, '| Publish Time:', publishTime.toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
