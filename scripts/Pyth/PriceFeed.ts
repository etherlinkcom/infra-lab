import { ethers, network } from 'hardhat';

async function main() {
  const pythContract = await ethers.getContractAt("PriceFeed", "0xbEEf9Af60a2F4AD4aeCe2BB26c6219057c8A07c6")

  // Running getEthUsdPrice function
  await pythContract.updateBtcUsdPrice({value: BigInt(2)})
  const [price, expo, publishTime] = await pythContract.getBtcUsdPrice();
  console.log('Current BTC/USD Price:', price, 'e^', expo, '| Publish Time:', publishTime.toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
