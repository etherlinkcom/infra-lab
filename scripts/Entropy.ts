import { ethers, network } from 'hardhat';
import web3 from 'web3';

async function main() {
  const entropyContract = await ethers.getContractAt("Entropy", "0xFDc8e8f99C19E2a40D3450952D4Dc5862BBB4dc5")


  // Running getRandomNumber function
  const randomNumber = web3.utils.randomHex(32);
  const num = await entropyContract.getRandomNumber(randomNumber);
  console.log("Entropy number:", num);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
