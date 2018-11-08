import * as React from "react";
import LandingPage from "./LandingPage";
import { isLoggedIn } from "src/App";
import { RouteComponentProps } from "react-router";
import CreateOrFindGroup from './CreateOrFindGroup';
import {GlobalContext, SharedContext } from '../models/SharedContext';

export default class FrontPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <GlobalContext.Consumer>
        {context => {
          if (isLoggedIn(context.User)) {
            return <CreateOrFindGroup />;
          } else {
            return <LandingPage {...this.props} />;
          }
        }}
      </GlobalContext.Consumer>
    );
  }
}
