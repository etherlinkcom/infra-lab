# Pyth Scripts

There are two scripts in this directory:

- `Entropy.ts`: test the Pyth Entropy random number generator service
- `PriceFeed.ts`: test the Pyth price feed service

The scripts are independent, and can be run in any order.

## Price Feeds

To run the price feeds script on Etherlink Testnet simply run

```bash
npx hardhat run scripts/Pyth/PriceFeed.ts --network etherlinkTestnet
```

The expected output looks as follows:

```bash
Deploying contract...
Contract deployed!! Address: 0x92cd987A893B53f22d8F552B913e0CF2A675C0a2
Current BTC/USD Price: 6410018227334n e^ -8n | Publish Time: 1718964329
```

> Note 🚨
>
> If you want the most up to date price, go to https://docs.pyth.network/price-feeds/api-reference/evm/update-price-feeds and get the example BTC/USD price data. You'll then need to use this in the `updateData` parameter dirctly in the `PriceFeed.ts` script!

## Entropy Random Numbers

To run the entropy script on Etherlink Testnet, simply run:

```bash
npx hardhat run scripts/Pyth/Entropy.ts --network etherlinkTestnet
```

The expected output looks as follows:

```bash
tx hash: 0x9d7fece03394bc3bd3f2ed72721fb46dd9bfc39d8c7d6f82f3f6d1481e13579b
Random Number: 102846360105837751021950799626473513676601074199512456726591353332961095346138
```
