import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { Button, Layout } from "antd";
import { log } from "util";
const { Content } = Layout;
import { withRouter } from "react-router-dom";

class LandingPage extends React.Component<RouteComponentProps> {
  public render() {
    return (

      <div style={{ alignContent: "center" }}>
        <Button type="primary" onClick={this.handleClicked}>
          Register
          </Button>
      </div>

    );
  }

  private handleClicked = () => {
    this.props.history.push("/register");
  };
}

export default withRouter(LandingPage);
