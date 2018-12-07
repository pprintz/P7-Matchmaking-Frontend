import * as React from 'react';
import { PersistedGroup, UserService, GroupService, IWSGroupService } from "../services/interfaces";
import { Form, Icon, Input, Button, InputNumber, Card, Select } from 'antd'
import WSGroupService from '../services/WSGroupService';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import { RouteComponentProps, withRouter, Route } from 'react-router';
import NotAllowedHere from './NotAllowedHere';
import LeaveGroup from './LeaveGroup';
import { UserServiceCookies } from 'src/services/userServiceCookies';
import { GroupServiceApi } from 'src/services/groupServiceApi';
import { User } from 'src/models/User';
import RemoveGroupComponent from './RemoveGroupComponent';
import ActionButton from 'antd/lib/modal/ActionButton';
import InviteUrlComponent from './InviteUrlComponent';
import DiscordUrlComponent from './DiscordUrlComponent';
import FormItem from 'antd/lib/form/FormItem';
import "../Styles/queueUsersStyle.scss";


export class QueueUsers extends React.Component<RouteComponentProps> {
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;
    private WSGroupService: IWSGroupService;
    private UserServiceCookies: UserService;

    public constructor(props: RouteComponentProps) {
        super(props)
    }

  public render() {
    const FormItem = Form.Item;

    return (
        <div className="queueUsers">
            <div className="outer">
                <div className="filterContainer">
                    <h2>Filter</h2>
                    <hr />
                    <Form layout="horizontal">
                            <Select placeholder="Mode">
                                <Select.Option key="1" value="competitive">
                                    Competitive
                                </Select.Option>
                                <Select.Option key="2" value="casual">
                                    Casual
                                </Select.Option>
                            </Select>
                            <Select placeholder="Ranking">
                                <Select.Option key="1" value="above">
                                    Above your rank
                                </Select.Option>
                                <Select.Option key="2" value="same">
                                    Same rank
                                </Select.Option>
                                <Select.Option key="3" value="below">
                                    Below your rank
                                </Select.Option>
                            </Select>
                    </Form>
                </div>
                <div className="queueContainer">
                    <h2>Queue</h2>
                    <hr />
                    <Button id="queueButton" type="primary" size="large">
                    </Button>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(QueueUsers);
