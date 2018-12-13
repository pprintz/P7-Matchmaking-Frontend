import * as React from "react";
import { Button, Row, Col } from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

export default withRouter(class CreateOrFindGroup extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div id="containerCenter">
        <div id="box">
          <Row>
            <Col span={6} />
            <Col span={12}>
              <div id="boxItem">
                <Button type="primary" style={{ marginBottom: "10px", width: "100%", height: "100px" }} size="large" onClick={this.handleFindGroupClicked}>
                  Find group
                </Button>
                <Button type="primary" style={{ marginBottom: "10px", width: "100%", height: "100px" }} size="large" onClick={this.handleCreateGroupClicked}>
                  Create group
                </Button>
                <Button type="primary" style={{ marginBottom: "10px", width: "100%", height: "100px" }} size="large" onClick={this.handleQueueClicked}>
                  Queue
                </Button>
              </div>
            </Col>
            <Col span={6} />
          </Row>
        </div>
      </div>
    );
  }

  private handleQueueClicked = () => {
    this.props.history.push("/queue")
  }
  private handleCreateGroupClicked = () => {
    this.props.history.push("/create");
  };
  private handleFindGroupClicked = () => {
    this.props.history.push("/groups");
  };
})
