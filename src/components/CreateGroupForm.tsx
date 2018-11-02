import * as React from 'react';
// import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Icon, Input, Button, InputNumber, Card } from 'antd'
import {UserService, GroupService, GroupResponse, IGroup} from "../services/interfaces";
import { withRouter, RouteComponentProps } from 'react-router';
// import GroupService from './services/GroupService';

interface GroupProps {
  groupService: GroupService,
  userService: UserService,
  form: any
}

class CreateGroupForm extends React.Component<GroupProps & RouteComponentProps> {

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
              rules: [{ required: true, message: 'Please input the game.' }],
            })(
              <Input prefix={<Icon type="crown" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Game" />
            )}
          </FormItem>
          <FormItem label="Group size">
            {getFieldDecorator('maxSize', {
              rules: [{ required: true, message: 'Please input group size.' }],
            })(
              // prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
              <InputNumber min={2} max={99} placeholder="Group size" />
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" size="large">
            Create
        </Button>
        </Form>
      </Card>
    );
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFields(async (validationErrors: boolean, formGroup: IGroup) => {
      if (!validationErrors) {
        const createdGroup = await this.createGroup(formGroup);
        console.log(createdGroup);
        this.props.history.push('/groups/' + createdGroup._id)
      };
    })
  }

  private async createGroup(formGroup: IGroup) {
    const userId = this.props.userService.getUserInfo().userId;
    // Add the user creating the group to the list of users
    formGroup.users = [userId];
    formGroup.invite_id = "";
    // TODO: Inject group service
    console.log(formGroup)
    const response = await this.props.groupService.createGroup(formGroup);
    const createdGroup = response.data;
    return createdGroup;
  }
}

export default withRouter(Form.create<any>()(CreateGroupForm));