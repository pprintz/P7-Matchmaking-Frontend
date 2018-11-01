import * as React from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { Button, Layout } from "antd";
const { Content } = Layout;

interface LandingPageProps extends RouteComponentProps {
  userId: string;
  doIt(): Promise<void>;
}

export default class LandingPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Layout>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
          <Button type="primary" onClick={this.clicked}>
            Register
          </Button>
        </Content>
      </Layout>
    );
  }

  private clicked = () => {
    this.props.history.push("/register");
  };
}
