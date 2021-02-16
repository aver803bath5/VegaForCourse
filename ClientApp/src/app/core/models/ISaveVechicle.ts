import { IContact } from "./IContact";


export interface ISaveVechicle {
  id: Number;
  makeId: Number;
  modelId: Number;
  isRegistered: Boolean;
  features: Array<Number>;
  contact: IContact;
}
