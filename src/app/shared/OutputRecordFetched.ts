

import {ServerEvent} from "./ServerEvent";
import {OutputRecord} from "./OutputRecord";

export interface OutputRecordFetched extends ServerEvent {

  offset: number;
  outputRecords: OutputRecord[];
}
