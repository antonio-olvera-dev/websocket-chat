import { IncomingMessage } from 'http';
import { RawData, WebSocketServer, WebSocket } from 'ws';
import { CounterI } from './interfaces';

export class WSCounter {

    private connections: WebSocket[] = [];
    private counter: CounterI = {
        allMessagesSentFromBackend: 0,
        allMessagesReceivedFromFrontend: 0
    }

    constructor() {
        this.init();
    }

    init() {

        const wss: WebSocketServer = new WebSocketServer({
            port: 8081,
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

            ws.send('Connection established successfully on de port 8081. 👍');
            this.connections.push(ws);
            this.sendCounter();

            ws.on('message', (data: RawData) => {
                console.log('received: %s', data);
            });
        });


    }

    public sentFromBackend(): void {
        this.counter.allMessagesSentFromBackend++;
        this.sendCounter();
    }

    public receivedFromFrontend(): void {
        this.counter.allMessagesReceivedFromFrontend++;
        this.sendCounter();
    }

    private sendCounter(): void {
        try {
            for (const connection of this.connections) {
                connection.send(JSON.stringify(this.counter))
            }
        } catch (error) {
            console.log(error);

        }
    }
}