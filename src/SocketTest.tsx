import * as React from 'react';
import WSGroupService from './services/WSGroupsService';
// import * as IOClient from 'socket.io-client';

export default class SocketTest extends React.Component<{}, {count : number}> {
    // private socket : SocketIOClient.Socket;
    private WSGroupService : WSGroupService;
    constructor(props : {}){
        super(props);
        this.state = {count : 1};
        this.WSGroupService = new WSGroupService();
        this.WSGroupService.registerCallback('timer', this.onTimerCallback);
        // this.socket = IOClient('http://localhost:3000/groups');
        
        // this.socket.emit('subscribeToTimer', this.state.count);
        // this.socket.on('timer', count => this.setState({"count" : count}));
        
        
        this.onButtonHit = this.onButtonHit.bind(this);
        this.onTimerCallback = this.onTimerCallback.bind(this);
        // this.IO.on('timer', count => this.incTimer(count));
        this.WSGroupService.subscribeToTimer(this.state.count);
    }

    public render(){
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={this.onButtonHit}>Increment count</button>
            </div>
        );
    }   
    
    private onTimerCallback(count : number) : void{
        this.setState({ "count" : count});
    }

    private onButtonHit(){
        console.log('Button hit!');
        this.WSGroupService.incTimer(this.state.count);
    }

}

