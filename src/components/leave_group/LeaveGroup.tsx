import * as React from 'react';

interface IGroupProps {
    groupName: string
}

interface IGroupStates {
    groupName: string
}

class LeaveGroup extends React.Component<IGroupProps, IGroupStates> {

    constructor(props : IGroupProps){
        super(props);

        this.state = {
            groupName: this.props.groupName
        };

        this.handleOnClick = this.handleOnClick.bind(this);
    }
    
    public handleOnClick() : void {
        this.setState({groupName: ""});
    }

    public render() {
        return (
            <div className="LeaveGroupComponent">
                <div className="LeaveGroupHeader">
                    <h1>Leave Group</h1>
                </div>
                
                <div className="LeaveGroupBody">
                    <div>
                        <p>Current Group: {this.state.groupName} </p>
                    </div>
                    <div>
                        <button onClick={this.handleOnClick}>Leave</button>
                    </div>
                </div>
            </div>
        );
  }
}

export default LeaveGroup;
