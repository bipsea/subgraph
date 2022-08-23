# Subgraph

## Subgraphs

https://api.studio.thegraph.com/query/5210/bipsea-goerli/v0.0.8/graphql?query=query+MyQuery+%7B%0A++balances%28first%3A+10%29+%7B%0A++++address%0A++++balance%0A++%7D%0A++items+%7B%0A++++blockNumber%0A++++itemId%0A++++investor%0A++++price%0A++++seller%0A++++sold%0A++++timestamp%0A++++transactionHash%0A++++uri%0A++%7D%0A++purchases%28first%3A+10%29+%7B%0A++++amount%0A++++blockNumber%0A++++buyer%0A++++itemId%0A++++timestamp%0A++++transactionHash%0A++%7D%0A%7D

## Build and Deploy

```bash
yarn codegen && yarn build --network goerli && yarn deploy:goerli 
```

## Adding Networks

### Create a Subgraph.

![](https://user-images.githubusercontent.com/19412160/184470320-43c0ce0c-3772-4f11-b47d-17b56c905a6c.png)

### Call it `bipsea-<NETWORK_NAME>`

![](https://user-images.githubusercontent.com/19412160/184470333-9fe683d8-8774-4db6-af37-31f6ab89b60d.png)

### Deploy contract and get block number

![](https://user-images.githubusercontent.com/19412160/184470286-ed796dea-c488-4c58-a873-f19280f1d526.png)

### In `networks.json`, add `address` and `startBlock` number

![](https://user-images.githubusercontent.com/19412160/184470382-d1fb070d-5f6a-4fc9-87f1-ad152e807cc1.png)

### In `package.json` add `deploy:<NETWORK_NAME>`

![](https://user-images.githubusercontent.com/19412160/184470435-e88c1c73-a634-4d4e-bc7c-33ebda351d4e.png)

