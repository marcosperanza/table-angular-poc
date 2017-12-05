
import {OutputRecord} from "./OutputRecord";

export interface FetchResult {

  fetchId: number;
  records: OutputRecord[];
  offset: number;
}
