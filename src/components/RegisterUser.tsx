import * as React from "react";
import { Form, Card, Input, Icon, InputNumber, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { GroupResponse } from "src/services/interfaces";
import { RouteComponentProps, withRouter } from "react-router";
import { User } from 'src/models/User';

interface MyProps extends RouteComponentProps, FormComponentProps {
  doIt(IFormUser): any
}

class RegisterUserForm extends React.Component<MyProps> {
  public render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h1>Register User</h1>
        <Card
          style={{
            margin: "0 auto",
            maxWidth: 500,
          }}>
          <Form hideRequiredMark={true} onSubmit={this.handleSubmit}>
            <FormItem label="Display name" {...formItemLayout}>
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your display name.",
                  },
                ],
              })(
                <Input
                  placeholder="EpicGrinder1337"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              )}
            </FormItem>
            <FormItem label="Discord ID" {...formItemLayout}>
              {getFieldDecorator("discordId", {
                rules: [
                  { required: true, message: "Please input your Discord ID." },
                ],
              })(
                <Input
                  placeholder="User#1234"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" size="large">
                Register
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }

  private handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.form.validateFields(
      async (validationErrors: boolean, user: IFormUser) => {
        if (!validationErrors) {
          // login()
          console.log("Registering");
          this.props.doIt(user)
          this.props.history.push("/");
        }
      }
    );
  };
}

export interface IFormUser {
  name: string
  discordId: string
}

const RegisterUserFormWithRouter = withRouter(RegisterUserForm);
export default Form.create()(RegisterUserFormWithRouter);
