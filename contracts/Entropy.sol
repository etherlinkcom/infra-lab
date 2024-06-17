// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
 
import { IEntropyConsumer } from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import { IEntropy } from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";
 
contract Entropy is IEntropyConsumer {
    IEntropy entropy;
    address entropyProvider;

    event SequenceNumber(uint64 sequenceNumber);
    event RandomNumber(uint randomNumber);
 
    constructor(address entropyAddress) {
        entropy = IEntropy(entropyAddress);
        entropyProvider = entropy.getDefaultProvider();
    }

    function getFee() public view returns (uint fee) {
        fee = entropy.getFee(entropyProvider);
        return fee;
    }

    function getRandomNumber(bytes32 randomNumber) external payable returns (uint64 sequenceNumber) {
        // get the required fee
        uint128 requestFee = entropy.getFee(entropyProvider);
        // check if the user has sent enough fees
        if (msg.value < requestFee) revert("not enough fees");

        sequenceNumber = entropy.requestWithCallback{value: requestFee}(entropyProvider, randomNumber);

        emit SequenceNumber(sequenceNumber);
        return sequenceNumber;
    }

    // This method is required by the IEntropyConsumer interface.
    // It returns the address of the entropy contract which will call the callback.
    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }
    
    // It is called by the entropy contract when a random number is generated.
    function entropyCallback(
        uint64 sequenceNumber,
        // If your app uses multiple providers, you can use this argument to
        // distinguish which one is calling the app back.
        address provider,
        bytes32 randomNumber
    ) internal override {
        emit RandomNumber(uint(randomNumber));
    }
 
}
