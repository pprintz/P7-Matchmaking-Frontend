import * as React from "react";
import LandingPage from "./LandingPage";
import { UserContext, isLoggedIn } from "src/App";
import { RouteComponentProps } from "react-router";
import CreateOrFindGroup from './CreateOrFindGroup';

export default class FrontPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <UserContext.Consumer>
        {context => {
          if (isLoggedIn(context.user)) {
            return <CreateOrFindGroup />;
          } else {
            return <LandingPage {...this.props} />;
          }
        }}
      </UserContext.Consumer>
    );
  }
}
