import * as React from 'react';
import { PersistedGroup, UserService, GroupService, IWSGroupService, IUserWSService } from "../services/interfaces";
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
import { toast } from 'react-toastify';

export interface GameSettings {
    Level: string,
    Mode: string,
    Rank: string
}

interface State {
    gameSettings: GameSettings,
    isQueued: boolean,
    timeSpent: number
}

export class QueueUsers extends React.Component<RouteComponentProps, State> {
    private static contextType = GlobalContext;
    private userWSService: IUserWSService;
    private userServiceCookies: UserService;

    private interval : NodeJS.Timeout;

    public constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            gameSettings: {
                Level: "",
                Mode: "",
                Rank: ""
            },
            isQueued: false,
            timeSpent: 0
        };

        this.editCriteriaJSON = this.editCriteriaJSON.bind(this);
        this.changeQueueState = this.changeQueueState.bind(this);
    }

    public componentWillMount() {
        this.userWSService = (this.context as SharedContext).UserWSService;
        this.userServiceCookies = (this.context as SharedContext).UserService;
        this.userWSService.registerEventHandler('joinedQueue', this.queueJoined);

        this.interval = setInterval(() => {
            this.setState({timeSpent: (this.state.timeSpent + 1)}) 
        }, 1000);    
    }

    public componentWillUnmount(){
        clearInterval(this.interval);
    }

    public render() {
        const FormItem = Form.Item;

        if (!this.state.isQueued) {
            return (
                <div className="queueWrapper">
                <Card title="Queue">
                    <div className="queueUsers">
                        <div className="outer">
                            <div className="filterContainer">
                                <p className="queueCardHeader">Filter</p>
                                <Form layout="horizontal" className="filterForm">
                                    <Select placeholder="Enter your rank" onChange={this.editCriteriaJSON}>
                                        <Select.Option key="1" value="level:silver">
                                            Silver 1
                                        </Select.Option>
                                        <Select.Option key="2" value="level:gold">
                                            Gold Nova 1
                                        </Select.Option>
                                        <Select.Option key="3" value="level:mge">
                                            Master Guardian Elite
                                        </Select.Option>
                                        <Select.Option key="4" value="level:supreme">
                                            Supreme Master
                                        </Select.Option>
                                    </Select>
                                    <Select placeholder="Mode" onChange={this.editCriteriaJSON}>
                                        <Select.Option key="1" value="mode:competitive">
                                            Competitive
                                        </Select.Option>
                                        <Select.Option key="2" value="mode:casual">
                                            Casual
                                        </Select.Option>
                                    </Select>
                                    <Select placeholder="Ranking" onChange={this.editCriteriaJSON}>
                                        <Select.Option key="1" value="rank:above">
                                            Above your rank
                                        </Select.Option>
                                        <Select.Option key="2" value="rank:same">
                                            Same rank
                                        </Select.Option>
                                        <Select.Option key="3" value="rank:below">
                                            Below your rank
                                        </Select.Option>
                                    </Select>
                                </Form>
                            </div>
                            <div className="queueContainer">
                                <p className="queueCardHeader" style={{marginLeft: "none"}}>Queue</p>
                                <Button id="queueButton" type="primary" size="large" onClick={this.changeQueueState}>
                                    Queue
                            </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            );
        } else {
            return (
            <div className="queueWrapper">
                <Card title="Finding Group">
                    <div className="queueUsers">
                        <p className="queueCardHeader">Searching For Group</p>
                        <p id="counter">{this.state.timeSpent} seconds</p>
                        <Button id="queueButton" type="danger" size="large" onClick={this.changeQueueState}>
                            Cancel
                    </Button>
                    </div>
                </Card>
            </div>
            );
        }
    }

    private queueJoined = (response : any) => {
        toast.success("Successfully joined the queue!")
    }

    async changeQueueState(event) {
        if(this.state.gameSettings.Mode == "" || this.state.gameSettings.Rank == "" || this.state.gameSettings.Level == ""){
            toast.warn("Please fill the filter");
            return;
        }

        if(this.state.isQueued == false){
            try{
                await this.userWSService.joinQueue(this.userServiceCookies.getUserInfo().userId, this.state.gameSettings);

                this.setState({
                    isQueued: !this.state.isQueued,
                });
            
                this.setState({timeSpent: 0});
            }catch(error){
                this.setState({isQueued: false});

                toast.error("Failed to join a queue");
            }
        }else{
            try{
                await this.userWSService.leaveQueue(this.userServiceCookies.getUserInfo().userId);
    
                this.setState({
                    isQueued: !this.state.isQueued,
                });
            
                this.setState({timeSpent: 0});
            }catch(error){
                this.setState({isQueued: false});
                toast.error("Failed to leave the queue");
            }
        }        
    }

    editCriteriaJSON(event) {
        try {
            const setting: string[] = event.split(":");

            const prefix: string = setting[0];
            const suffix: string = setting[1];

            const gameSettingsObj = this.state.gameSettings;

            switch (prefix) {
                case "level":
                    gameSettingsObj.Level = suffix;
                    break;
                case "mode":
                    gameSettingsObj.Mode = suffix;
                    break;
                case "rank":
                    gameSettingsObj.Rank = suffix;
                    break;
                default:
                    throw new Error("Prefix setting does not exist!");
            }

            this.setState({ gameSettings: gameSettingsObj });
        } catch (error) {
            toast.error(error.message);
        }

    }
}

export default withRouter(QueueUsers);
