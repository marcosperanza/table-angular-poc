import {Type} from "./ServerEvent";


export interface DocumentStateUpdated {

  type: Type;
  progress: number;
  documentState: string;
  documentStateReason: string;
  resultCount: number;
}
