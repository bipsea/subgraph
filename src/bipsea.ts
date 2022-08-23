import { store } from "@graphprotocol/graph-ts";
import { BigInt } from "@graphprotocol/graph-ts";
import { Bipsea, Buy, Sell, Delist } from "../generated/Bipsea/Bipsea";
import { Item, Purchase, Balance } from "../generated/schema";

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
  let sellerAmount = event.params._amount.times(BigInt.fromI32(99)).div(BigInt.fromI32(100));
  seller.balance = seller.balance.plus(sellerAmount);
  seller.save();

  let investorAddress = Bipsea.bind(event.address).items(event.params._itemId).value1;
  let investor = Balance.load(investorAddress.toHexString());
  if (investor == null) {
    investor = new Balance(investorAddress.toHexString());
    investor.address = investorAddress;
  }
  let investorAmount = event.params._amount.times(BigInt.fromI32(1)).div(BigInt.fromI32(100));
  investor.balance = investor.balance.plus(investorAmount); 
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

export function handleDelist(event: Delist): void {
  // https://thegraph.com/docs/en/developing/assemblyscript-api/#removing-entities-from-the-store
  store.remove("Item", event.params._itemId.toHexString());
}
