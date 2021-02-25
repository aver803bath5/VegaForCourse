import { IKeyValuePair } from "./IKeyValuePair";

export interface IMake extends IKeyValuePair {
  models: Array<IKeyValuePair>
}
