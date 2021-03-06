import * as React from 'react';
import { PersistedGroup, UserService, GroupService, IWSGroupService, IUserWSService, SocketResponse, PersistedQueueEntry } from "../services/interfaces";
import { Form, Button, Card, Select } from 'antd'
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import { RouteComponentProps, withRouter } from 'react-router';
import "../Styles/queueUsersStyle.scss";
import { toast } from 'react-toastify';
import { Level, Mode } from "../models/LevelEnums";

export interface GameSettings {
    level: Level,
    mode: Mode,
    rank: number
}

interface Props {
    users? : Array<string>,
    callback? : () => void
}

interface State {
    gameSettings: GameSettings,
    isQueued: boolean,
    timeSpent: number
}

export class QueueUsers extends React.Component<RouteComponentProps & Props, State> {
    private static contextType = GlobalContext;
    private userWSService: IUserWSService;
    private userServiceCookies: UserService;

    private interval: NodeJS.Timeout;

    public constructor(props: RouteComponentProps & Props) {
        super(props);

        this.state = {
            gameSettings: {
                level: Level.UNSET,
                mode: Mode.UNSET,
                rank: -1
            },
            isQueued: false,
            timeSpent: 0
        };


        // bind functions for render events
        this.editCriteriaJSON = this.editCriteriaJSON.bind(this);
        this.changeQueueState = this.changeQueueState.bind(this);
    }

    public componentWillMount() {
        // Retrieve SharedContext services
        this.userWSService = (this.context as SharedContext).UserWSService;
        this.userServiceCookies = (this.context as SharedContext).UserService;

        // Register Socket Event Handlers
        this.userWSService.registerEventHandler("joinedGroup", this.joinedGroup);
    }

    public componentWillUnmount() {
        clearInterval(this.interval);
    }
                        /*
                        <Select.Option key={index.toString()} value={"level:" + value}>
                            Hello World!
                        </Select.Option>
                        */
    public renderLevelSelect(){
        // A mapping function from a Level Enum to a string that makes sense for the user.
        const LevelNames = new Map<number, string>([
            [Level.SILVER1, "Silver 1"],
            [Level.SILVER2, "Silver 2"],
            [Level.SILVER3, "Silver 3"],
            [Level.SILVER4, "Silver 4"],
            [Level.SILVERELITE, "Silver Elite"],
            [Level.SILVERELITEMASTER, "Silver Elite Master"],
            [Level.GOLDNOVA1, "Gold Nova 1"],
            [Level.GOLDNOVA2, "Gold Nova 2"],
            [Level.GOLDNOVA3, "Gold Nova 3"],
            [Level.GOLDNOVAMASTER, "Gold Nova Master"],
            [Level.MASTERGUARDIAN1, "Master Guardian 1"],
            [Level.MASTERGUARDIAN2, "Master Guardian 2"],
            [Level.MASTERGUARDIANELITE, "Master Guardian Elite"],
            [Level.DESTINGUISHEDMASTERGUARDIAN, "Destiniguished Master Guardian"],
            [Level.LEGENDARYEAGLE, "Legendary Eagle"],
            [Level.LEGENDARYEAGLEMASTER, "Legendary Eagle Master"],
            [Level.SUPREMEMASTERFIRSTCLASS, "Supreme Master First Class"],
            [Level.GLOBALELITE, "Global Elite"]
        ]);

        // Map each level into a Select.Option selector
        const renderObj = (Object.keys(Level).map(key => {
            // Check if the key can be parsed
            if(!Number.isNaN(parseInt(key))){
                // Make an Option Selector
                return (
                    <Select.Option key={key} value={"level:" + key} >
                        {LevelNames.get(parseInt(key))} 
                    </Select.Option>
                )
            }else{
                return;
            }
        })
        )

        return renderObj;
    }

    public render() {
        const FormItem = Form.Item;

        const levelOptions = this.renderLevelSelect();

        // If the user is not queued yet
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
                                            {levelOptions}
                                        </Select>
                                        <Select placeholder="Mode" onChange={this.editCriteriaJSON}>
                                            <Select.Option key="1" value="mode:1">
                                                Competitive
                                        </Select.Option>
                                            <Select.Option key="2" value="mode:2">
                                                Casual
                                        </Select.Option>
                                        </Select>
                                        <Select placeholder="Ranking" onChange={this.editCriteriaJSON}>
                                            <Select.Option key="1" value="rank:2">
                                                Above your rank
                                        </Select.Option>
                                            <Select.Option key="2" value="rank:1">
                                                Same rank
                                        </Select.Option>
                                            <Select.Option key="3" value="rank:0">
                                                Below your rank
                                        </Select.Option>
                                        </Select>
                                    </Form>
                                </div>
                                <div className="queueContainer">
                                    <p className="queueCardHeader" style={{ marginLeft: "none" }}>Queue</p>
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
            // If the user is queued
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

    // This is called if a group is found for the user
    private joinedGroup = (group: any, caller: string) : void => {
        // Redirect to group id
        if(group === null){
            toast.error("A group could not be found");
            this.setState({isQueued: false});

            return;
        }

        console.log(group);
        toast.success("Redirecting to group");

        const groupId = group.group._id;
        this.userServiceCookies.updateGroupIdUserInfo(groupId, this.context);

        this.props.history.push("/groups/" + groupId);
    }

    // This is called when the user joins a queue
    private queueJoined = (response: SocketResponse<PersistedQueueEntry>) : void => {
        toast.success("Joined the queue")
        console.log("Response: " + response);
        if(response.error){
            // If reject => Set the state to false, so the page will be redirected to the first page again.
            this.setState({
                isQueued: !this.state.isQueued,
            });

            // Reset the timer
            this.setState({ timeSpent: 0 });

            toast.error("The queue could not be joined");

            return;
        }
        this.setState({
            isQueued: !this.state.isQueued,
        });
        // Reset the timer
        this.setState({ timeSpent: 0 });

        this.queueEntry = response.data;
        // If success => Set an interval to count up the timer
        this.interval = setInterval(() => {
            this.setState({ timeSpent: (this.state.timeSpent + 1) })
        }, 1000);   
    }

    private queueEntry : PersistedQueueEntry;
    private queueLeft = (response: SocketResponse<PersistedQueueEntry>): void => {
        if(response.error){
           
        }
        this.setState({
            isQueued: !this.state.isQueued,
        });
        clearInterval(this.interval);

        this.setState({ timeSpent: 0 });
    }

    async changeQueueState(event) {
        if(this.props.callback != undefined){
            this.props.callback();
        }

        // Is the filter set?
        if (this.state.gameSettings.mode == Mode.UNSET || this.state.gameSettings.rank == -1 || this.state.gameSettings.level == Level.UNSET) {
            toast.warn("Please fill the filter");
            return;
        }

        // Are we already queued?
        if (this.state.isQueued == false) {
            try {
                // Emit joinQueue request to the backend using WS
                    await this.userWSService.joinQueue({
                        users: this.props.users == undefined ? [this.userServiceCookies.getUserInfo().userId] : this.props.users,
                        gameSettings: this.state.gameSettings}, this.queueJoined);
                

                                // Success => Change state to isQueued
                

                
            } catch (error) {
                // If there is an error, we are not queued
                this.setState({ isQueued: false });

                toast.error("Failed to join a queue");
            }
        } else {
            // We are already in a queue and cancel
            try {
                // Call leaveQueue request using WS
                await this.userWSService.leaveQueue(this.queueEntry,this.queueLeft);
                
            } catch (error) {
                this.setState({ isQueued: false });
                toast.error("Failed to leave the queue");
            }
        }
    }

    // Changes the GameSettings of the queue
    editCriteriaJSON(event) {
        if(this.props.callback != undefined){
            this.props.callback();
        }

        try {
            const setting: string[] = event.split(":");

            const prefix: string = setting[0];
            const suffix: string = setting[1];

            const gameSettingsObj = this.state.gameSettings;

            switch (prefix) {
                case "level":
                    gameSettingsObj.level = parseInt(suffix);
                    break;
                case "mode":
                    gameSettingsObj.mode = parseInt(suffix);
                    break;
                case "rank":
                    gameSettingsObj.rank = parseInt(suffix);
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
