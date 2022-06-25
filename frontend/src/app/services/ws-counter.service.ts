import { Injectable } from '@angular/core';
import { CounterI } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WsCounterService {

  private socket: WebSocket = new WebSocket("ws://localhost:8081");
  private counter: CounterI = {
    allMessagesSentFromBackend: 0,
    allMessagesReceivedFromFrontend: 0
  };

  constructor() {
    this.readMessages();
  }

  private readMessages() {
    this.socket.onmessage = (messageEvent: MessageEvent<any>) => {

      console.log(messageEvent.data);
      try {

        const message: CounterI = JSON.parse(messageEvent.data);
        this.counter = message;

      } catch (error) {

      }

    };

    this.socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`);
      } else {
        console.log('[close] La conexión se cayó');
      }
    };

    this.socket.onerror = function (error: any) {
      console.log(`[error] ${error.message}`);
    };
  }

  private connect() {
    this.socket = new WebSocket("ws://localhost:8081");
  }

  public isConnected(): boolean {
    return this.socket?.readyState === 1;
  }

  public get getCounter(): CounterI {
    return this.counter;
  }

}
