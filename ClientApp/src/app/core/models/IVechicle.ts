import { IContact } from "./IContact";
import { IKeyValuePair } from "./IKeyValuePair";

export interface IVehicle {
  id: Number;
  make: IKeyValuePair;
  model: IKeyValuePair;
  isRegistered: Boolean;
  features: Array<IKeyValuePair>;
  contact: IContact;
  lastUpdate: string
}

