# The Infra Lab

This is a repo for quickly testing protocols and dApps on Etherlink Testnet and ensuring identical functionality to BNB Testnet.

## Setup

You'll need to get gas tokens for both networks:
- **BNB Testnet:** https://www.bnbchain.org/en/testnet-faucet
- **Etherlink Testnet:** https://faucet.etherlink.com/

You'll also need to set your environment variables in a `.env` file as in `.env.example`.

## Quick Start

First, to install dependencies and compile your contracts, you can run:

```bash
npm install
npx hardhat compile
```

Then, you can run whatever Typescript workflow you like under `scripts/` using:

```bash
npx hardhat run scripts/<PARTNER_NAME>/<YOUR_SCRIPT> --network <`etherlinkTestnet` or `bscTestnet`>
```

## Developer Guide

If you want to create a test for a new protocol or dApp deploying on Etherlink, consider following these steps:

1. Create two folders with the same name representing the partner deployed to Etherlink, one under `contracts/` and one under `scripts/`
2. Create smart contract(s) in the new `contracts/<PARTNER_NAME>/` dir to test the partner deployment
3. Create typescript scripts in the new `scripts/<PARTNER_NAME>/` dir to deploy your contracts and run tests

## Redstone

### Deploy the contracts

To deploy the contracts, run:
```
npx hardhat run scripts/Redstone/deployDataConsumers.ts --network etherlinkTestnet
```

This will automatically deploy a consumer contract for the oracles prices for:
- ETH
- BTC
- XTZ

### Test the oracles

If you want to test the oracles, you can either use the default ones I deployed and change nothing or if you want to use the ones you deployed you can modify these addresses in `scripts/Redstone/consumeData.ts`:
```
const dataConsumers = {
  ETH: '0x5C155c3368dCCb4150C5D926c29074591DF3dD6e',
  BTC: '0xa02662113053b55CfB5B39c1Ad22322E9025F4A2',
  XTZ: '0xd23b612D8A1E084090ce1936436feAA304ab3017'
};
```

Then you can run:
```
npx hardhat run scripts/Redstone/consumeData.ts --network etherlinkTestnet
```