import { IContact } from "./IContact";

export interface IKeyValuePair {
  id: Number;
  name: String;
}

export interface IVehicle {
  id: Number;
  make: IKeyValuePair;
  model: IKeyValuePair;
  isRegistered: Boolean;
  features: Array<IKeyValuePair>;
  contact: IContact;
  lastUpdate: string
}

