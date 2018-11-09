import * as React from "react";
import { Button } from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

export default withRouter(class CreateOrFindGroup extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div style={{ "height": "100%" }}>
        <Button size="large" onClick={this.handleFindGroupClicked}>
          Find group
        </Button>
        <Button size="large" onClick={this.handleCreateGroupClicked}>
          Create group
        </Button>
      </div>
    );
  }
  private handleCreateGroupClicked = () => {
    this.props.history.push("/create");
  };
  private handleFindGroupClicked = () => {
    this.props.history.push("/groups");
  };
})
