import { ethers, network } from 'hardhat';

async function main() {
  // Deploying Pyth contract
  console.log("Deploying contract...")
  let pythAddress: string
  if (network.name === 'bscTestnet') {
    pythAddress = "0x5744Cbf430D99456a0A8771208b674F27f8EF0Fb";
  } else if (network.name === 'etherlinkTestnet') {
    pythAddress = "0x2880aB155794e7179c9eE2e38200202908C17B43";
  } else {
    throw new Error(`Unsupported network: ${network.name}`);
  }
  const PythFactory = await ethers.getContractFactory('Pyth')
  const pythContract = await PythFactory.deploy(pythAddress)
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
