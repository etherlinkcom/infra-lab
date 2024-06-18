// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DataConsumer {
    AggregatorV3Interface public dataFeed;

    constructor(address _dataFeed) {
        dataFeed = AggregatorV3Interface(_dataFeed);
    }

    function getDataFeedLatestAnswer(uint8 _decimalsToKeep) public view returns (int) {
        uint decimals = dataFeed.decimals() - _decimalsToKeep;
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        int price = answer;
        if (decimals > 1) {
            price = answer / int(10 ** decimals);
        }
        return price;
    }
}
