# Redstone Scripts

There are two scripts in this directory:

- `consumeData.ts`: test and print the price retrieve from each oracles
- `deployDataConsumers.ts`: deploy the dataConsumer contracts, each one linked to a specific oracle and verified directly in the script

You first need to deploy the contracts with the deploy script and then run the consume data test.

## Deploy the contracts

To deploy the contracts, run:
```bash
npx hardhat run scripts/Redstone/deployDataConsumers.ts --network etherlinkTestnet
```

This will automatically deploy a consumer contract for the oracles prices for:
- ETH
- BTC
- XTZ

## Test the oracles

If you want to test the oracles, you can either use the default ones I deployed and change nothing or if you want to use the ones you deployed you can modify these addresses in `scripts/Redstone/consumeData.ts`:
```js
const dataConsumers = {
  ETH: '0x5C155c3368dCCb4150C5D926c29074591DF3dD6e',
  BTC: '0xa02662113053b55CfB5B39c1Ad22322E9025F4A2',
  XTZ: '0xd23b612D8A1E084090ce1936436feAA304ab3017'
};
```

Then you can run:
```bash
npx hardhat run scripts/Redstone/consumeData.ts --network etherlinkTestnet
```