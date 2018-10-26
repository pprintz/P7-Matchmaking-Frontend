import * as React from 'react';
// import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Icon, Input, Button, InputNumber, Card } from 'antd'
import GroupService from 'src/services/GroupService';
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
              <InputNumber min={1} max={99} placeholder="Group size" />
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" size="large">
            Create
        </Button>
        </Form>
      </Card>
    );
  }

  public componentDidMount() {
    // TODO: get user
    // TODO: save userID in state
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFields(async (validationErrors: boolean, formGroup: IFormGroup) => {
      if (!validationErrors) {
        // TODO: Inject group service
        // TODO: Send userID to createGroup and attach the user to the group when creating
        const response = await GroupService.createGroup(formGroup);
          const createdGroup = response.data;
          this.props.history.push('/groups/'+createdGroup._id)
        };
      })
    
  }
}

interface IFormGroup {
  name: string;
  game: string;
  maxSize: number;
}

export default Form.create<any>()(CreateGroupForm);