import { ethers, network } from 'hardhat';

async function main() {
  // Deploying Pyth contract
  console.log("Deploying contract...")
  let pythAddress: string
  if (network.name === 'bscTestnet') {
    pythAddress = "0x5744Cbf430D99456a0A8771208b674F27f8EF0Fb";
  } else if (network.name === 'etherlinkTestnet') {
    pythAddress = "0x2880aB155794e7179c9eE2e38200202908C17B43";
  } else if (network.name === "etherlink") {
    pythAddress = "0x2880aB155794e7179c9eE2e38200202908C17B43";
  }
  else {
    throw new Error(`Unsupported network: ${network.name}`);
  }
  const PythFactory = await ethers.getContractFactory('PriceFeed')
  const pythContract = await PythFactory.deploy(pythAddress)
  await pythContract.waitForDeployment()
  console.log("Contract deployed!! Address:", await pythContract.getAddress())

  // Running getBtcUsdPrice function
  // To update the price, go to https://docs.pyth.network/price-feeds/api-reference/evm/update-price-feeds
  // and replace the hex string in `updateData` with the given string by the "Latest BTC/USD update data" example.
  const updateData = ["0x504e41550100000003b801000000040d006d36c00ef42f59fed5af79514de0f49009709f771d5dc3ca535d7cc4c6fe0de14123fa199d527170ec28cd101f9fdfa670d42b1e44111012228c5a45c521548201016324b1d21aef5fe85b8f5694ab665cad4e9a22e32909ea07dbdefbaa77649a313af74dfc7f1c21ccd770242b23d8ad4f6923059ce9504597191bd79e82ce02f50102b679ec8eb2cc8df1aefd4d16bdd0e85d99ef4274164bf9afe30afb1cac361d2a1dc073467cca3d55d9c69500e8eb564a5aa38ad947da74dca5a178372f1265f10004a8e91289f69d7f0dd34efc5265fb1962e168a00875c02fc461ac3572fce45be052648706faa1cf36a6a946752ee51fbf4b6e2838f1962c0e063504bb2f6abf320106ea58e7b9ea9c5370175ef7b5af6fa3c8794c53aa2f1167d659b785613362a6e44428e64e6a4a84df1d175fdbe29c3502a1c5abb0eabb208f13574797826036d50009247b8a526607417dae9bb224fa7f43990b0b5ee023d7c3118ce35a916a5f61896aeb45db385ce8641077087980829c71089cf68b415af578b0696d383533f849010aeffec77c7dcc712d7dc8abeedf6f0436a0baefced0f723dcf8419ce882d0308b6608797e1312a3437cd8c164f2f120baa5be52f62de43ef9e9096eb82ae47319000b1959449a212c6aa86f09e0b80542ddca1f69e54617691b37051ba71644d1ce504470a86f3cbfa06358f92cb6e5104ada6754cc07018952aabe5bcb3bd6804657000c0dfc129921528a5349975faa04e8e69b01b9f43ccb4d74e40146ff57d17285b00856ccd0d2c5dce29dcb396f885dc1d859381ae1087db1d24b7d6680e17f0071000d035dca353275780f584217a06d99259d2e0e563f84e39924f06082d8072604d9045bb276468774c520b599014c55f408c66406b270902a4dddf2c7b5226b4c73000ebdc4be90a238032ea1739ba9dc9bc070de5d2ade8a40d83392069b7f9c44258763f5312cd0d8f17a90961f27e4f6a2c30df4beaae693be2d23eb67f14967a15a000f270f00971bfa3200ac634bfa8470efaac89b87a9c4a047dd04c0f36df677e9e91752573f1c70ed65f4449d682c216a4519b8c012064d0948c9d8d3acafdbaf740012937268ee673eed20b43621e8c3a6e53ff63c9b6db214c279cdda48dc8a538b2317db91e113ec0f67ef0f5a4e45a079d4542aadb27e5cc52c69c93dc4343daaf1016683e06e00000000001ae101faedac5851e32b9b23b5f9411a8c2bac4aae3ed4dd7b811dd1a72ea4aa710000000003f83735014155575600000000000902b090000027108204e5d7e60635ff123272b76a8910e27f806c5601005500e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43000005b1e91f689f00000001ef09f685fffffff8000000006683e06d000000006683e06d000005b1c701472000000001d11a46040ad233b5cbe3013c98b439e84fe1b3b6a6fc10ba21fb99f5d8019f91e18960441e332d6a0146db5009543957ce745ad691243305fe44c56dc52626a5cd206fa94f0e81fccc4a80725d3c879fae9f73ec33e75656bfeb1b7671511b7f765f0c48442390aa3ae1231312f6f6589c1b09039f62910460fee07822535e749dc7db932afee81db9b6b3471c4b118cccd1d7ae5d7ab771d92c93a2dbc8f484f3ed003249d6bd238da14f098b591dc3d690febfd4592fe126ff1aa491091a2dfa02e21ffa4a4b52ae32c94950"]
  await pythContract.updatePrice(updateData, {value: BigInt(2)})
  const [price, expo, publishTime] = await pythContract.getBtcUsdPrice();
  console.log('Current BTC/USD Price:', price, 'e^', expo, '| Publish Time:', publishTime.toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
