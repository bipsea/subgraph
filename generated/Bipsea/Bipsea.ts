// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Buy extends ethereum.Event {
  get params(): Buy__Params {
    return new Buy__Params(this);
  }
}

export class Buy__Params {
  _event: Buy;

  constructor(event: Buy) {
    this._event = event;
  }

  get _itemId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _buyer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Delist extends ethereum.Event {
  get params(): Delist__Params {
    return new Delist__Params(this);
  }
}

export class Delist__Params {
  _event: Delist;

  constructor(event: Delist) {
    this._event = event;
  }

  get _itemId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _seller(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Revenue extends ethereum.Event {
  get params(): Revenue__Params {
    return new Revenue__Params(this);
  }
}

export class Revenue__Params {
  _event: Revenue;

  constructor(event: Revenue) {
    this._event = event;
  }

  get _itemId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _address(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Sell extends ethereum.Event {
  get params(): Sell__Params {
    return new Sell__Params(this);
  }
}

export class Sell__Params {
  _event: Sell;

  constructor(event: Sell) {
    this._event = event;
  }

  get _itemId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Bipsea__itemsResult {
  value0: Address;
  value1: Address;
  value2: string;
  value3: BigInt;
  value4: boolean;

  constructor(
    value0: Address,
    value1: Address,
    value2: string,
    value3: BigInt,
    value4: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromBoolean(this.value4));
    return map;
  }

  getSeller(): Address {
    return this.value0;
  }

  getInvestor(): Address {
    return this.value1;
  }

  getUri(): string {
    return this.value2;
  }

  getPrice(): BigInt {
    return this.value3;
  }

  getCanBuy(): boolean {
    return this.value4;
  }
}

export class Bipsea extends ethereum.SmartContract {
  static bind(address: Address): Bipsea {
    return new Bipsea("Bipsea", address);
  }

  items(param0: BigInt): Bipsea__itemsResult {
    let result = super.call(
      "items",
      "items(uint256):(address,address,string,uint256,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Bipsea__itemsResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toString(),
      result[3].toBigInt(),
      result[4].toBoolean()
    );
  }

  try_items(param0: BigInt): ethereum.CallResult<Bipsea__itemsResult> {
    let result = super.tryCall(
      "items",
      "items(uint256):(address,address,string,uint256,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Bipsea__itemsResult(
        value[0].toAddress(),
        value[1].toAddress(),
        value[2].toString(),
        value[3].toBigInt(),
        value[4].toBoolean()
      )
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  purchase(param0: BigInt, param1: Address): boolean {
    let result = super.call("purchase", "purchase(uint256,address):(bool)", [
      ethereum.Value.fromUnsignedBigInt(param0),
      ethereum.Value.fromAddress(param1)
    ]);

    return result[0].toBoolean();
  }

  try_purchase(param0: BigInt, param1: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("purchase", "purchase(uint256,address):(bool)", [
      ethereum.Value.fromUnsignedBigInt(param0),
      ethereum.Value.fromAddress(param1)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class BuyCall extends ethereum.Call {
  get inputs(): BuyCall__Inputs {
    return new BuyCall__Inputs(this);
  }

  get outputs(): BuyCall__Outputs {
    return new BuyCall__Outputs(this);
  }
}

export class BuyCall__Inputs {
  _call: BuyCall;

  constructor(call: BuyCall) {
    this._call = call;
  }

  get _itemId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class BuyCall__Outputs {
  _call: BuyCall;

  constructor(call: BuyCall) {
    this._call = call;
  }
}

export class DelistCall extends ethereum.Call {
  get inputs(): DelistCall__Inputs {
    return new DelistCall__Inputs(this);
  }

  get outputs(): DelistCall__Outputs {
    return new DelistCall__Outputs(this);
  }
}

export class DelistCall__Inputs {
  _call: DelistCall;

  constructor(call: DelistCall) {
    this._call = call;
  }

  get _itemId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DelistCall__Outputs {
  _call: DelistCall;

  constructor(call: DelistCall) {
    this._call = call;
  }
}

export class SellCall extends ethereum.Call {
  get inputs(): SellCall__Inputs {
    return new SellCall__Inputs(this);
  }

  get outputs(): SellCall__Outputs {
    return new SellCall__Outputs(this);
  }
}

export class SellCall__Inputs {
  _call: SellCall;

  constructor(call: SellCall) {
    this._call = call;
  }

  get _itemId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _seller(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _investor(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _uri(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _price(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class SellCall__Outputs {
  _call: SellCall;

  constructor(call: SellCall) {
    this._call = call;
  }
}

export class SetOwnerCall extends ethereum.Call {
  get inputs(): SetOwnerCall__Inputs {
    return new SetOwnerCall__Inputs(this);
  }

  get outputs(): SetOwnerCall__Outputs {
    return new SetOwnerCall__Outputs(this);
  }
}

export class SetOwnerCall__Inputs {
  _call: SetOwnerCall;

  constructor(call: SetOwnerCall) {
    this._call = call;
  }

  get _newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetOwnerCall__Outputs {
  _call: SetOwnerCall;

  constructor(call: SetOwnerCall) {
    this._call = call;
  }
}
