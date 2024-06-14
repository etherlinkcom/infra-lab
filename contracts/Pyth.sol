// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
 
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
 
contract Pyth {
    IPyth pyth;
    bytes32 ethUsdPriceId;
 
    constructor() {
        // BNB Testnet: 0x5744Cbf430D99456a0A8771208b674F27f8EF0Fb
        // Etherlink Testnet: 0x2880aB155794e7179c9eE2e38200202908C17B43
        pyth = IPyth(address(0x5744Cbf430D99456a0A8771208b674F27f8EF0Fb));
        ethUsdPriceId = bytes32(0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace);
    }

    function getEthUsdPrice() public view returns (int64 price, int32 expo, uint256 publishTime) {
        PythStructs.Price memory priceStruct = pyth.getPrice(ethUsdPriceId);
        return (priceStruct.price, priceStruct.expo, priceStruct.publishTime);
    }

    function oneDollarInWei() public view returns (uint256 res) {
        PythStructs.Price memory price = pyth.getPrice(ethUsdPriceId);
    
        uint256 ethPrice18Decimals = (uint256(uint64(price.price)) * (10 ** 18)) /
        (10 ** uint8(uint32(-1 * price.expo)));
        res = ((10 ** 18) * (10 ** 18)) / ethPrice18Decimals;
    
        return res;
    }
}
