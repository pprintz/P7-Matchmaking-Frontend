import * as IOClient from 'socket.io-client';

export default class WSService {
    protected IO : SocketIOClient.Socket;

    public constructor(namespace : string = "/"){
        this.IO = IOClient(process.env.REACT_APP_API_URL + '/api' + (namespace.startsWith('/') ? namespace : ('/' + namespace)));
    }

    public registerEventHandler(event : string, fn : any) : void {
        this.IO.on(event, fn);
    }
}