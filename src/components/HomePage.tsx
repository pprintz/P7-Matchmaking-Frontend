import { Icon, Popover, Button } from 'antd';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import { UserService } from 'src/services/interfaces';
import CreateOrFindGroup from './CreateOrFindGroup';
import LandingPage from './LandingPage';

class HomePage extends React.Component<RouteComponentProps>{
    private static contextType = GlobalContext;
    private userService: UserService;
    public componentWillMount(){
        this.userService = (this.context as SharedContext).UserService;
    }
    public render() {
    
        if (this.userService.isLoggedIn()) {
            return <CreateOrFindGroup />;
        } else {
            return <LandingPage />;
        }
    }
}

export default withRouter(HomePage);