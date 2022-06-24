import { IncomingMessage } from 'http';
import { RawData, WebSocket, WebSocketServer } from 'ws';
import { CounterI } from './interfaces';

export class WSChat {

    public counter: CounterI = {
        allMessagesSentFromBackend: 0,
        allMessagesReceivedFromFrontend: 0
    }

    constructor() {
        this.init();
    }

    init() {

        const connections: WebSocket[] = [];
        const wss: WebSocketServer = new WebSocketServer({
            port: 8080,
            perMessageDeflate: {
                zlibDeflateOptions: {
                    chunkSize: 1024,
                    memLevel: 7,
                    level: 3
                },
                zlibInflateOptions: {
                    chunkSize: 10 * 1024
                },

                clientNoContextTakeover: true,
                serverNoContextTakeover: true,
                serverMaxWindowBits: 10,
                concurrencyLimit: 10,
                threshold: 1024
            }
        });

        wss.on('connection', (ws, request: IncomingMessage) => {

            ws.send('Connection established successfully on de port 8080. 👍');
            this.counter.allMessagesSentFromBackend++;
            connections.push(ws);

            ws.on('message', (data: RawData) => {
                this.counter.allMessagesReceivedFromFrontend++;
                console.log('received: %s', data);

                for (const connection of connections) {
                    connection.send(data.toString());
                }

                this.counter.allMessagesSentFromBackend++;
            });

        });



    }
}