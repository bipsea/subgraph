import { store } from "@graphprotocol/graph-ts";
import { BigInt } from "@graphprotocol/graph-ts";
import { Bipsea, Buy, Sell, Withdraw, Delist } from "../generated/Bipsea/Bipsea";
import { Item, Purchase, Withdrawal, Balance } from "../generated/schema";

export function handleBuy(event: Buy): void {
  let buy = new Purchase(event.params._itemId.toHexString() + "-" + event.params._buyer.toHexString());
  buy.buyer = event.params._buyer;
  buy.itemId = event.params._itemId;
  buy.amount = event.params._amount;
  buy.transactionHash = event.transaction.hash;
  buy.blockNumber = event.block.number;
  buy.timestamp = event.block.timestamp;
  buy.save();

  let item = Item.load(event.params._itemId.toHexString());
  if (item != null) {
    item.sold = item.sold.plus(BigInt.fromI32(1));
    item.save();
  }

  let sellerAddress = Bipsea.bind(event.address).items(event.params._itemId).value0;
  let seller = Balance.load(sellerAddress.toHexString());
  if (seller == null) {
    seller = new Balance(sellerAddress.toHexString());
    seller.address = sellerAddress;
  }
  seller.balance = Bipsea.bind(event.address).balances(sellerAddress);
  seller.save();

  let investorAddress = Bipsea.bind(event.address).items(event.params._itemId).value1;
  let investor = Balance.load(investorAddress.toHexString());
  if (investor == null) {
    investor = new Balance(investorAddress.toHexString());
    investor.address = investorAddress;
  }
  investor.balance = Bipsea.bind(event.address).balances(investorAddress);
  investor.save();
}

export function handleSell(event: Sell): void {
  let sell = new Item(event.params._itemId.toHexString());
  sell.itemId = event.params._itemId;
  sell.seller = Bipsea.bind(event.address).items(event.params._itemId).value0;
  sell.investor = Bipsea.bind(event.address).items(event.params._itemId).value1;
  sell.uri = Bipsea.bind(event.address).items(event.params._itemId).value2;
  sell.price = Bipsea.bind(event.address).items(event.params._itemId).value3;
  sell.transactionHash = event.transaction.hash;
  sell.blockNumber = event.block.number;
  sell.timestamp = event.block.timestamp;
  sell.sold = BigInt.fromI32(0);
  sell.save();
}

export function handleWithdraw(event: Withdraw): void {
  let seller = new Withdrawal(event.transaction.hash.toHex() + "-" + event.params._sellerAddress.toHexString() + "-" + event.params._sellerAmount.toHexString());
  seller.to = event.params._sellerAddress;
  seller.amount = event.params._sellerAmount;
  seller.transactionHash = event.transaction.hash;
  seller.blockNumber = event.block.number;
  seller.timestamp = event.block.timestamp;
  seller.save();

  let sellerAddress = Balance.load(event.params._sellerAddress.toHexString());
  if (sellerAddress != null) {
    sellerAddress.balance = Bipsea.bind(event.address).balances(event.params._sellerAddress);
    sellerAddress.save();
  }

  let withdrawer = new Withdrawal(event.transaction.hash.toHex() + "-" + event.params._withdrawerAddress.toHexString() + "-" + event.params._withdrawerAmount.toHexString());
  withdrawer.to = event.params._withdrawerAddress;
  withdrawer.amount = event.params._withdrawerAmount;
  withdrawer.transactionHash = event.transaction.hash;
  withdrawer.blockNumber = event.block.number;
  withdrawer.timestamp = event.block.timestamp;
  withdrawer.save();

  let withdrawerAddress = Balance.load(event.params._withdrawerAddress.toHexString());
  if (withdrawerAddress != null) {
    withdrawerAddress.balance = Bipsea.bind(event.address).balances(event.params._withdrawerAddress);
    withdrawerAddress.save();
  }
}

export function handleDelist(event: Delist): void {
  // https://thegraph.com/docs/en/developing/assemblyscript-api/#removing-entities-from-the-store
  store.remove("Item", event.params._itemId.toHexString());
}
