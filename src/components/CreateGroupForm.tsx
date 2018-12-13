import * as React from 'react';
import { Form, Icon, Input, Button, InputNumber, Card, Select } from 'antd'
import { UserService, GroupService, Group, PersistedGroup, IGame, SocketResponse, IWSGroupService } from "../services/interfaces";
import { withRouter, RouteComponentProps } from 'react-router';
import { SharedContext, GlobalContext } from 'src/models/SharedContext';
import WSGroupService from 'src/services/WSGroupService';
import { __await } from 'tslib';
import { toast } from 'react-toastify';

interface GroupProps {
    form: any
}

interface State {
    gameList: IGame[],
    game: IGame,
    gamesLoaded: boolean
}

class CreateGroupForm extends React.Component<GroupProps & RouteComponentProps, State> {
    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;
    private userService: UserService;
    private WSGroupService: IWSGroupService;
    private apiGroupService: GroupService;

    constructor(props: GroupProps & RouteComponentProps) {
        super(props);

        this.state = {
            gameList: [],
            game: { name: "12345", maxSize: 0 },
            gamesLoaded: false
        }
    }

    


    public componentWillMount() {
        this.userService = (this.context as SharedContext).UserService;
        this.WSGroupService = (this.context as SharedContext).WSGroupService;
        this.apiGroupService = (this.context as SharedContext).GroupServiceApi;
    }

    public async componentDidMount() {
        const games = await this.apiGroupService.getGameList();
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

        await this.props.form.validateFields(async (validationErrors: boolean, formGroup: Group) => {
            if (!validationErrors) {
                const userId = this.userService.getUserInfo().userId;

                // Add the user creating the group to the list of users
                formGroup.users = [userId];
                formGroup.invite_id = "";
                formGroup.visible = false;
                formGroup.game = this.state.game.name;
                try {
                    await this.WSGroupService.createGroup(formGroup, this.onGroupCreatedCallback);
                } catch (error) {
                    toast.error("Cannot establish a connection");
                }
            };
        })

        
    }



    private onGroupCreatedCallback = (res: SocketResponse<PersistedGroup>) => {

        if(res.error){
            toast.error("Sorry, you are already in a group");
            return;
        }

        // Set users groupID
        const grpId = res.data._id;
        this.userService.updateGroupIdUserInfo(grpId, this.context);
        (this.context as SharedContext).User.ownerGroupId = grpId;
        this.userService.setUserOwnerGroup(grpId, this.context);

        this.props.history.push('/groups/' + grpId)
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