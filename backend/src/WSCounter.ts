import { IncomingMessage } from 'http';
import { RawData, WebSocketServer } from 'ws';
import { CounterI } from './interfaces';

export class WSCounter {

    private counter: CounterI = {
        allMessagesSentFromBackend: 0,
        allMessagesReceivedFromFrontend: 0
    }

    constructor(counter: CounterI) {
        this.counter = counter;
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

            ws.on('message', (data: RawData) => {
                console.log('received: %s', data);
            });

            setInterval(() => {
                ws.send(JSON.stringify(this.counter))
            },100);
        });


    }
}