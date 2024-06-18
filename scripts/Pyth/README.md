# Pyth Scripts

There are two scripts in this directory:

- `Entropy.ts`: test the Pyth Entropy random number generator service
- `PriceFeed.ts`: test the Pyth price feed service

The scripts are independent, and can be run in any order.

## Price Feeds

To run the price feeds script simply run

```bash
npx hardhat run scripts/Pyth/PriceFeed.ts --network etherlinkTestnet
```

The expected output looks as follows:

```bash
Deploying contract...
Contract deployed!! Address: 0xf985422846A9969a00E160C41A6268AcD3bB368a
Current ETH/USD Price: 337841560500n e^ -8n | Publish Time: 1718392397
```

## Entropy Random Numbers

To run the entropy script, simply run:

```bash
npx hardhat run scripts/Pyth/Entropy.ts --network etherlinkTestnet
```

The expected output looks as follows:

```bash
tx hash: 0x9d7fece03394bc3bd3f2ed72721fb46dd9bfc39d8c7d6f82f3f6d1481e13579b
Random Number: 102846360105837751021950799626473513676601074199512456726591353332961095346138
```
