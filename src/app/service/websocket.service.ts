import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import * as Atmosphere from 'atmosphere.js';
import {Subject} from 'rxjs/Subject';
import {WebsocketEventListener} from "./websocket-event-listener";



@Injectable()
export class  WebsocketService {
  public eventsSubject: Rx.Subject<any> = new Rx.Subject<any>();
  private url:string = "http://localhost:4200/ws/register";

  private socket: typeof Atmosphere = Atmosphere;
  private subSocket: any;
  private request: Atmosphere.Request;

  public listener: WebsocketEventListener = new WebsocketEventListener();


 // public dataStream: Subject<any> = new Subject<any>();
  constructor() {

    this.request = <Atmosphere.Request>{
      url: this.url,
      contentType: 'application/json',
      logLevel: 'debug',
      transport: 'websocket',
      fallbackTransport: 'long-polling',
      onOpen: (response: Atmosphere.Response) => {
        console.log('Atmosphere connected using ' + response.transport);
        this.listener.onOpen(response.responseBody);

      },
      onMessage: (response: Atmosphere.Response) => {
        this.listener.onNext(response.responseBody);
      },
      onClose: (response: Atmosphere.Response) => {
        this.listener.onComplete();
      },
      onError: (response: Atmosphere.Response) => {
        this.listener.onError(response.responseBody);
      }
    };

    try {
      this.subSocket = this.socket.subscribe(this.request);
    } catch (e) {
      console.log("Error: " + e);
    }
  }


  public send(data: any) {
    this.subSocket.push(data);
  }
}
