// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
 
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
 
contract PriceFeed {
    IPyth pyth;
    bytes32 ethUsdPriceId;
    bytes32 btcUsdPriceId;
    bytes32 xtzUsdPriceId;
 
    constructor(address pythAddress) {
        pyth = IPyth(address(pythAddress));
        ethUsdPriceId = bytes32(0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace);
        btcUsdPriceId = bytes32(0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43);
        xtzUsdPriceId = bytes32(0x0affd4b8ad136a21d79bc82450a325ee12ff55a235abc242666e423b8bcffd03);
    }

    function updateBtcUsdPrice(bytes[] memory updateData) external payable {
        uint fee = 1;
        pyth.updatePriceFeeds{value: fee}(updateData);
    }

    function getBtcUsdPrice() public view returns (int64 price, int32 expo, uint256 publishTime) {
        PythStructs.Price memory priceStruct = pyth.getPriceUnsafe(btcUsdPriceId);
        return (priceStruct.price, priceStruct.expo, priceStruct.publishTime);
    }

    function getEthUsdPrice() public view returns (int64 price, int32 expo, uint256 publishTime) {
        PythStructs.Price memory priceStruct = pyth.getPriceUnsafe(ethUsdPriceId);
        return (priceStruct.price, priceStruct.expo, priceStruct.publishTime);
    }

    function getXtzUsdPrice() public view returns (int64 price, int32 expo, uint256 publishTime) {
        PythStructs.Price memory priceStruct = pyth.getPriceUnsafe(xtzUsdPriceId);
        return (priceStruct.price, priceStruct.expo, priceStruct.publishTime);
    }
}
