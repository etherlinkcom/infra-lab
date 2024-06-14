# Lab

This is a repo for quickly testing dApps on Etherlink Testnet and ensuring identical functionality to BNB Testnet.

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
npx hardhat run scripts/<YOUR_SCRIPT> --network <`etherlinkTestnet` or `bscTestnet`>
```
