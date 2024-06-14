// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
 
import { IEntropyConsumer } from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import { IEntropy } from "@pythnetwork/entropy-sdk-solidity/IEntropy.sol";
 
contract Entropy is IEntropyConsumer {
    IEntropy entropy;
    address entropyProvider;
 
    constructor(address entropyAddress) {
        entropy = IEntropy(entropyAddress);
        entropyProvider = entropy.getDefaultProvider();
    }

    function getRandomNumber(bytes32 randomNumber) public returns (uint64 sequenceNumber) {
        uint fee = entropy.getFee(entropyProvider);
        sequenceNumber = entropy.requestWithCallback{value: fee}(entropyProvider, randomNumber);
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
        // Implement your callback logic here.
    }
 
}
