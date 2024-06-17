// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
 
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
 
contract PriceFeed {
    IPyth pyth;
    bytes32 ethUsdPriceId;
 
    constructor(address pythAddress) {
        pyth = IPyth(address(pythAddress));
        ethUsdPriceId = bytes32(0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace);
    }

    function getEthUsdPrice() public view returns (int64 price, int32 expo, uint256 publishTime) {
        PythStructs.Price memory priceStruct = pyth.getPriceUnsafe(ethUsdPriceId);
        return (priceStruct.price, priceStruct.expo, priceStruct.publishTime);
    }
}
