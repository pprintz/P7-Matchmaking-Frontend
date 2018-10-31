import * as React from 'react';
import * as IOClient from 'socket.io-client';

export default class SocketTest extends React.Component<{}, {count : number}> {
    private socket : SocketIOClient.Socket;
    constructor(props : {}){
        super(props);
        this.state = {count : 1};
        
        this.socket = IOClient('http://localhost:3000');
        
        this.socket.emit('subscribeToTimer', this.state.count);
        this.socket.on('timer', count => this.setState({"count" : count}));
        this.onButtonHit = this.onButtonHit.bind(this);
    }

    public render(){
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.onButtonHit}>Increment count</button>
            </div>
        );
    }   
    
    private onButtonHit(){
        this.socket.emit('inctimer', this.state.count);
    }

}

