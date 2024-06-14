import { ethers, network } from 'hardhat';

async function main() {
  // Deploying Pyth contract
  console.log("Deploying contract...")
  let entropyAddress: string
  if (network.name === 'etherlinkTestnet') {
    entropyAddress = "0x23f0e8FAeE7bbb405E7A7C3d60138FCfd43d7509";
  } else {
    throw new Error(`Unsupported network: ${network.name}`);
  }
  const entropyFactory = await ethers.getContractFactory('Entropy')
  const entropyContract = await entropyFactory.deploy(entropyAddress)
  await entropyContract.waitForDeployment()
  console.log("Contract deployed!! Address:", await entropyContract.getAddress())


  // Running getRandomNumber function
  const randomNumber = ethers.randomBytes(32);
  const num = await entropyContract.getRandomNumber(randomNumber);
  console.log("Entropy number:", num);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
