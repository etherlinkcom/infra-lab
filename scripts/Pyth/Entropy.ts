import { ethers, network } from 'hardhat';
import web3 from 'web3';
import { eth } from "web3";

async function main() {
  // Deploying Pyth contract
  console.log("Deploying contract...")
  let entropyAddress: string
  if (network.name === 'etherlinkTestnet') {
    entropyAddress = "0x23f0e8FAeE7bbb405E7A7C3d60138FCfd43d7509";
  } else if (network.name === "etherlink") {
    entropyAddress = "0x23f0e8FAeE7bbb405E7A7C3d60138FCfd43d7509";
  }
  else {
    throw new Error(`Unsupported network: ${network.name}`);
  }
  const EntropyFactory = await ethers.getContractFactory('Entropy')
  const entropyContract = await EntropyFactory.deploy(entropyAddress)
  await entropyContract.waitForDeployment()
  console.log("Contract deployed!! Address:", await entropyContract.getAddress())

  // Running getRandomNumber function
  const randomNumber = web3.utils.randomHex(32)
  const fee = await entropyContract.getFee() + BigInt(1)
  const tx = await entropyContract.getRandomNumber(randomNumber, {value: fee.toString()})
  const txReceipt = await tx.wait();

  if(!txReceipt){
    console.error("Transaction receipt is null");
    return;
  }

  console.log("tx hash:", txReceipt.hash)

  // Decode the logs
  const eventSignature = web3.utils.keccak256("RandomNumber(uint256)");
  const logs = txReceipt.logs.filter(log => log.topics[0] === "0xa4c85ab66677ced5caabbbba151714887944b9e0fee05f320e42a1b13a01fbc6");

  logs.forEach(log => {
    const decodedLog = eth.abi.decodeLog(
      [
        {
          type: 'uint256',
          name: 'randomNumber'
        }
      ],
      log.data,
      log.topics.slice(1)
    );
    
    console.log(`Random Number: ${decodedLog.randomNumber}`);
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
