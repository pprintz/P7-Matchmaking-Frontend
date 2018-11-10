import * as React from 'react';
// import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Icon, Input, Button, InputNumber, Card, Select } from 'antd'
import {UserService, GroupResponse, IGroup, IGame} from "../services/interfaces";
import { withRouter, RouteComponentProps } from 'react-router';
import { User } from 'src/models/User';
import { __await } from 'tslib';
import { GroupServiceApi } from 'src/services/groupServiceApi';

interface GroupProps {
  groupService: GroupServiceApi,
  userService: UserService,
  form: any
}

interface State {
  gameList : IGame[],
  game : IGame,
  gamesLoaded: boolean
}

class CreateGroupForm extends React.Component<GroupProps & RouteComponentProps, State> {

  constructor(props : GroupProps & RouteComponentProps){
    super(props);

    this.state = {
      gameList: [],
      game: {name: "12345", maxSize: 0},
      gamesLoaded: false
    }
  }

  public async componentDidMount(){
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
                  this.state.gamesLoaded ? this.state.gameList.map((val : IGame, id : number) => {
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

  private handleGameChange = (event: string) => {
    const maybeGame : IGame | undefined = this.state.gameList.find(game => game.name === event) ;
    const chosenGame : IGame = maybeGame === undefined ? {name: "none", maxSize: 2} : maybeGame;

    this.setState({game: chosenGame})

    this.props.form.setFieldsValue({
      "maxSize": chosenGame.maxSize 
    });
  }


  private handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFields(async (validationErrors: boolean, formGroup: IGroup) => {
      if (!validationErrors) {
        const createdGroup : GroupResponse = await this.createGroup(formGroup);

        console.log("Created Group:", createdGroup);

        this.props.history.push('/groups/' + createdGroup._id)
      };
    })
  }

  private async createGroup(formGroup: IGroup) : Promise<GroupResponse>{
    const userId = this.props.userService.getUserInfo().userId;
    // Add the user creating the group to the list of users
    formGroup.users = [userId];
    formGroup.invite_id = "";
    const response = await this.props.groupService.createGroup(formGroup);
    const createdGroup = response.data;

    this.props.userService.updateGroupIdUserInfo(createdGroup._id);
    this.props.userService.setUserOwnerGroup(createdGroup._id);

    return createdGroup;
  }
}

export default withRouter(Form.create<any>()(CreateGroupForm));