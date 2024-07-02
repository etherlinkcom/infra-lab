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
Deploying contract...
Contract deployed!! Address: 0x9372b7be9Abd2E066065B93FCb5F1222465A480b
tx hash: 0xfb52fb2d40ee5f3b9c8b1b4cd719ab467bd93bd7656af5991d814aebaa462065
Random Number: 30908385009869117951309812175351878727575403369204413330894790026129079903881
```
