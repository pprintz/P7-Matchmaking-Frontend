import * as React from 'react';
// import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Icon, Input, Button, InputNumber, Card } from 'antd'
import GroupService from '../services/GroupService';
import { UserServiceCookies } from '../services/userServiceCookies';
import IGroup from '../models/IGroup';
// import GroupService from './services/GroupService';

class CreateGroupForm extends React.Component<any> {

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
        this.props.history.push('/groups/' + createdGroup._id)
      };
    })
  }

  private async createGroup(formGroup: IGroup) {
    const userServiceCookies = new UserServiceCookies();
    const userId = userServiceCookies.getUserInfo().userId;
    // Add the user creating the group to the list of users
    formGroup.users = [userId];
    // TODO: Inject group service
    const response = await GroupService.createGroup(formGroup);
    const createdGroup = response.data;
    return createdGroup;
  }
}

export default Form.create<any>()(CreateGroupForm);