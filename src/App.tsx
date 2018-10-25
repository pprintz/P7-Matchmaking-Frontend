import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import GroupsPageContainer from './Group/GroupsPageContainer';
import GroupPageContainer from './Group/GroupPageContainer';
import { Menu, Layout } from 'antd'
// import logo from './logo.svg';

const { Header, Content } = Layout;
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Groups</Menu.Item>
            <Menu.Item key="3">Login</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ paddingTop: '64px' }}>
          <Router>
            <Switch>
              {/* The commented routes below should be un-commented and modified to point to the correct component
            once the components are implemented. */}
              {/* <Route path="/groups/:group_id/:invite_id" component={GroupPageContainer} /> */}
              <Route path="/groups/:group_id" component={GroupPageContainer} />
              <Route path="/groups" component={GroupsPageContainer} />

            </Switch>
          </Router>
        </Content>
      </div>
    );
  }
}

export default App;
