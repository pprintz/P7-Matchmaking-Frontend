import * as React from 'react';
// import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Icon, Input, Button, InputNumber, Card, Col, Row } from 'antd'
import { UserService, GroupService, IGroup } from "../services/interfaces";
import { withRouter, RouteComponentProps } from 'react-router';
import { ThemeConsumer } from 'styled-components';
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
      <Row>
        <Col span={8} />
        <Col span={8}>
          <Card>
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
                  <InputNumber min={2} max={99} placeholder="Size" />
                )}
              </FormItem>
              <Button type="primary" htmlType="submit" size="large">
                Create
        </Button>
            </Form>
          </Card>
        </Col>
        <Col span={8} />
      </Row>
    );
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFields(async (validationErrors: boolean, formGroup: IGroup) => {
      if (!validationErrors) {
        const createdGroup = await this.createGroup(formGroup);
        console.log(createdGroup);

        // Set users groupID
        const user = this.props.userService.getUserInfo();
        user.groupId = createdGroup._id;
        this.props.userService.setUserInfo(user);


        this.props.history.push('/groups/' + createdGroup._id)
      };
    })
  }

  private async createGroup(formGroup: IGroup) {
    const userId = this.props.userService.getUserInfo().userId;
    // Add the user creating the group to the list of users
    formGroup.users = [userId];
    formGroup.invite_id = "";
    formGroup.visible = false;
    const response = await this.props.groupService.createGroup(formGroup);
    const createdGroup = response.data;
    return createdGroup;

  }
}

export default withRouter(Form.create<any>()(CreateGroupForm));