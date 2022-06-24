import { IncomingMessage } from 'http';
import { WebSocketServer } from 'ws';

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

wss.on('connection', function connection(ws, request: IncomingMessage) {

    ws.on('message', function message(data: any) {
        console.log('received: %s', data);
    });

    setInterval(() => {
        ws.send('message');
    }, 1000)
    setTimeout(() => {
        ws.close()
    }, 6000);
});

