import { store } from "@graphprotocol/graph-ts";
import { BigInt } from "@graphprotocol/graph-ts";
import { Bipsea, Buy, Sell, Delist, Revenue } from "../generated/Bipsea/Bipsea";
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
    item.sold = item.sold.plus(new BigInt(1));
    item.save();
  }
}

export function handleSell(event: Sell): void {
  let item = new Item(event.params._itemId.toHexString());
  item.itemId = event.params._itemId;
  item.seller = Bipsea.bind(event.address).items(event.params._itemId).value0;
  item.investor = Bipsea.bind(event.address).items(event.params._itemId).value1;
  item.uri = Bipsea.bind(event.address).items(event.params._itemId).value2;
  item.price = Bipsea.bind(event.address).items(event.params._itemId).value3;
  item.transactionHash = event.transaction.hash;
  item.blockNumber = event.block.number;
  item.timestamp = event.block.timestamp;
  item.sold = BigInt.fromI32(0);
  item.canBuy = true;
  item.save();
}

export function handleDelist(event: Delist): void {
  // https://thegraph.com/docs/en/developing/assemblyscript-api/#removing-entities-from-the-store
  // store.remove("Item", event.params._itemId.toHexString());
  let item = new Item(event.params._itemId.toHexString());
  item.canBuy = false;
  item.save();
}

export function handleRevenue(event: Revenue): void {
  let balance = new Balance(event.params._address.toHexString());
  if (balance != null) {
    balance.address = event.params._address;
    balance.balance = new BigInt(0);
  }
  balance.balance = balance.balance.plus(event.params._amount);
  balance.save();
}
