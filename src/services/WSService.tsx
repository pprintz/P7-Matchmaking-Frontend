import * as IOClient from 'socket.io-client';

export default class WSService {
    protected IO : SocketIOClient.Socket;

    public constructor(namespace : string = "/"){
        this.IO = IOClient(process.env.REACT_APP_API_URL + (namespace.startsWith('/') ? namespace : ('/' + namespace)), {path: '/api/socket.io'});
        // localhost:3000/api/socket.io/queues
    }

    public registerEventHandler(event : string, fn : any) : void {
        this.IO.on(event, fn);
    }
}