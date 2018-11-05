import * as React from 'react';
import WSGroupService from './services/WSGroupsService';

export default class SocketTest extends React.Component<{}, {count : number}> {
    private WSGroupService : WSGroupService;
    constructor(props : {}){
        super(props);
        this.state = {"count" : 1};
        this.WSGroupService = new WSGroupService();
        this.WSGroupService.registerCallback('timer', this.onTimerCallback);
        this.onButtonHit = this.onButtonHit.bind(this);
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
    
    private onTimerCallback = (count : number) : void => {
        this.setState({ "count" : count});
    }

    private onButtonHit(){
        console.log('Button hit!');
        this.WSGroupService.incTimer(this.state.count);
    }
}