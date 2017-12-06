import {DocumentStateUpdated} from "../shared/DocumetStateUpdate";
import {OutputRecordFetched} from "../shared/OutputRecordFetched";
import {ServerEvent, Type} from "../shared/ServerEvent";
import {Subject} from "rxjs/Subject";

export class  WebsocketEventListener {

  public outputRecord: Subject<OutputRecordFetched> = new Subject<OutputRecordFetched>();
  public stateUpdate: Subject<DocumentStateUpdated> = new Subject<DocumentStateUpdated>();


  protected onNext(data: string) {

    const event: ServerEvent = JSON.parse(data);

    if (event.type == Type.OUTPUT_RECORD_FETCHED) {
      this.outputRecord.next(event);
    } else if (event.type == Type.STATE_UPDATED) {
      this.stateUpdate.next(event);
      //this.resultsLength = out.resultCount;
    }

  }

  protected onComplete() {
    console.log("> CLOSED: " );

  }

  protected onOpen(responseBody: string) {
    console.log("> OPEN: " + JSON.stringify(responseBody,null,"    "));

  }

  protected onError(responseBody: string) {
    console.log("> ERROR: " + JSON.stringify(responseBody,null,"    "));

  }
}
