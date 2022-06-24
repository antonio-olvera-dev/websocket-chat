import { Injectable } from '@angular/core';
import { ChatI } from '../interfaces/interfaces';
import { v4 as uuidV4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WsChatService {

  private socket: WebSocket = new WebSocket("ws://localhost:8080");
  private messages: ChatI[] = [];
  public idChat: string = uuidV4();

  constructor() {
    this.readMessages();
  }

  private readMessages() {
    this.socket.onmessage = (messageEvent: MessageEvent<any>) => {

      console.log(messageEvent.data);
      try {

        const message: ChatI = JSON.parse(messageEvent.data);
        this.messages.push(message);

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
    this.socket = new WebSocket("ws://localhost:8080");
  }

  public isConnected(): boolean {
    return this.socket?.readyState === 1;
  }

  public get getMessages(): ChatI[] {
    return this.messages;
  }

  public sendMessage(message: ChatI): void {
    message.id = this.idChat;
    this.socket.send(JSON.stringify(message));
  }

}
