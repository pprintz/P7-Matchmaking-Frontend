import * as React from "react";
import { Form, Card, Input, Icon, InputNumber, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { PersistedGroup, UserService } from "src/services/interfaces";
import { RouteComponentProps, withRouter } from "react-router";
import { User } from 'src/models/User';
import { GlobalContext, SharedContext } from 'src/models/SharedContext';
import Axios from 'axios';

interface Props {
  form: any
}

class RegisterUserForm extends React.Component<RouteComponentProps & Props> {

  private static contextType = GlobalContext;
  private userService: UserService;

  public componentWillMount(){
    this.userService = (this.context as SharedContext).UserService;
  }
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

 
  public createUserAndSaveInCookie = async (user: IFormUser) => {
    try {
      const response = await Axios.post(
        process.env.REACT_APP_API_URL + "/api/users/create",
        user
      );
      const createdUser = response.data;
      const userState = {
        user: new User(
          createdUser._id,
          createdUser.name,
          createdUser.discordId,
          "",
          ""
        )
      };
      this.userService.setUserInfo(userState.user, this.context);
    } catch (error) {
      console.error("ERROR:", error);
    }
  }
  private handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    this.props.form.validateFields(
      async (validationErrors: boolean, user: IFormUser) => {
        if (!validationErrors) {
          await this.createUserAndSaveInCookie(user);
          this.props.history.push('/');
        }
      }
    );
  }
}



export interface IFormUser {
  name: string
  discordId: string
}

const RegisterUserFormWithRouter = withRouter(RegisterUserForm);
export default Form.create()(RegisterUserFormWithRouter);
