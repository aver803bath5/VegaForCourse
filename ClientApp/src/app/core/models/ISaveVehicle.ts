import { IContact } from "./IContact";


export interface ISaveVehicle {
  id: Number;
  makeId: Number;
  modelId: Number;
  isRegistered: Boolean;
  features: Array<Number>;
  contact: IContact;
}
