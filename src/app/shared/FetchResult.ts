
import {OutputRecord} from "./OutputRecord";
import {Type} from "./ServerEvent";

export interface FetchResult {

  type: Type;

  fetchId: number;
  records: OutputRecord[];
  offset: number;
}
