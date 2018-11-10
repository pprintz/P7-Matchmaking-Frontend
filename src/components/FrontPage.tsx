import * as React from "react";
import LandingPage from "./LandingPage";
import { RouteComponentProps } from "react-router";
import CreateOrFindGroup from './CreateOrFindGroup';
import { GlobalContext } from '../models/SharedContext';

export default class FrontPage extends React.Component<RouteComponentProps> {
    public render() {
        return (
            <GlobalContext.Consumer>
                {context => {
                    if (context.UserService.isLoggedIn()) {
                        return <CreateOrFindGroup />;
                    } else {
                        return <LandingPage {...this.props} />;
                    }
                }}
            </GlobalContext.Consumer>
        );
    }
}
