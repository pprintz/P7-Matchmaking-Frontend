import * as React from 'react';
// import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Icon, Input, Button, InputNumber, Card, Col, Row, Select } from 'antd'
import { UserService, GroupService, IGroup, GroupResponse, IGame } from "../services/interfaces";
import { withRouter, RouteComponentProps } from 'react-router';
import { SharedContext, GlobalContext } from 'src/models/SharedContext';
import WSGroupsService from 'src/services/WSGroupsService';
import { User } from 'src/models/User';
import { __await } from 'tslib';
import { GroupServiceApi } from 'src/services/groupServiceApi';
import UserServiceApi from 'src/services/userServiceApi';
import { toast } from 'react-toastify';
import { UserServiceCookies } from 'src/services/userServiceCookies';

interface GroupProps {
    groupService: GroupServiceApi,
    userService: UserServiceCookies
    form: any
}

interface State {
    gameList: IGame[],
    game: IGame,
    gamesLoaded: boolean
}

class CreateGroupForm extends React.Component<GroupProps & RouteComponentProps, State> {
    private userService: UserService;
    private WSGroupsService: WSGroupsService;

    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;

    public componentWillMount() {
        this.userService = (this.context as SharedContext).UserService;
        this.WSGroupsService = (this.context as SharedContext).WSGroupsService;
    }

    constructor(props: GroupProps & RouteComponentProps) {
        super(props);

        this.state = {
            gameList: [],
            game: { name: "12345", maxSize: 0 },
            gamesLoaded: false
        }
    }

    public async componentDidMount() {
        const games = await this.props.groupService.getGameList();
        this.setState({
            gameList: games,
            gamesLoaded: true
        });
    }

    public render() {
        const FormItem = Form.Item;
        const { getFieldDecorator } = this.props.form;
        return (
            <Card style={{
                margin: '0 auto',
                maxWidth: 500
            }}>
                <Form onSubmit={this.handleSubmit} hideRequiredMark={true}>
                    <FormItem label="Group name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input your group name.' }],
                        })(
                            <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Group name" />
                        )}
                    </FormItem>
                    <FormItem label="Game">
                        {getFieldDecorator('game', {
                            rules: [{ required: true, message: 'Please input game.' }],
                        })(
                            <Select placeholder="Choose Game" onChange={this.handleGameChange}>
                                {
                                    this.state.gamesLoaded ? this.state.gameList.map((val: IGame, id: number) => {
                                        return <Select.Option key={id.toString()} value={val.name}>{val.name}</Select.Option>
                                    }) : null
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="Group size">
                        {getFieldDecorator('maxSize', {
                            rules: [{ required: true, message: 'Please input group size.' }],
                        })(
                            // prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            <InputNumber min={2} max={99} placeholder="Group size" disabled={true} />
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit" size="large">
                        Create
                     </Button>
                </Form>
            </Card>

        );
    }

    private handleSubmit = async (event: any) => {
        event.preventDefault();

        await this.props.form.validateFields(async (validationErrors: boolean, formGroup: IGroup) => {
            if (!validationErrors) {
                const userId = this.userService.getUserInfo().userId;

                // Add the user creating the group to the list of users
                formGroup.users = [userId];
                formGroup.invite_id = "";
                formGroup.visible = false;
                formGroup.game = this.state.game.name;
                try {
                    await this.WSGroupsService.createGroup(formGroup, this.onGroupCreatedCallback);
                } catch (error) {
                    toast.error("Sorry, you can't join this group. Leave your current group");
                }
            };
        })

        
    }

    private onGroupCreatedCallback = (group: GroupResponse) => {
        console.log("Succesfully created group " + group.name);

        // Set users groupID
        const user = this.userService.getUserInfo();
        user.groupId = group._id;
        this.userService.setUserInfo(user);

        this.props.userService.updateGroupIdUserInfo(group._id);
        this.props.userService.setUserOwnerGroup(group._id);

        this.props.history.push('/groups/' + group._id)
    }

    private handleGameChange = (event: string) => {
        const maybeGame: IGame | undefined = this.state.gameList.find(game => game.name === event);
        const chosenGame: IGame = maybeGame === undefined ? { name: "none", maxSize: 2 } : maybeGame;

        this.setState({ game: chosenGame });

        this.props.form.setFieldsValue({
            "maxSize": chosenGame.maxSize
        });
    }
}

export default withRouter(Form.create<any>()(CreateGroupForm));