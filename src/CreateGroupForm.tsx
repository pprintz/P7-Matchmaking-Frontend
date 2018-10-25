import * as React from 'react';
import {FormComponentProps} from 'antd/lib/form/Form';
import { Form, Icon, Input, Button, InputNumber } from 'antd'
import './App.css';
import GroupService from './services/GroupService';

class CreateGroupForm extends React.Component<FormComponentProps> {
//   constructor(props : any) {
//     super(props);
//     // this is necessary for 'this' to not be undefined when calling handleSubmit
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
  
  public render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    return (
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
            <InputNumber min={1} max={99}  placeholder="Group size" />
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" size="large">
          Create
        </Button>
      </Form>
    );
  }

  private handleSubmit = (event : any) => {
    event.preventDefault();
    this.props.form.validateFields((validationErrors: boolean, formGroup: any) => {
      if (!validationErrors) {
        const createdGroup = GroupService.createGroup(formGroup);
        // TODO: Redirect to group
      }
    });
  }
}

export default Form.create()(CreateGroupForm);