import * as React from 'react';
// import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Icon, Input, Button, InputNumber, Card, Col, Row } from 'antd'
import { UserService, GroupService, IGroup, GroupResponse } from "../services/interfaces";
import { withRouter, RouteComponentProps } from 'react-router';
import { ThemeConsumer } from 'styled-components';
import { SharedContext, GlobalContext } from 'src/models/SharedContext';
import WSGroupsService from 'src/services/WSGroupsService';


class CreateGroupForm extends React.Component<{ form: any } & RouteComponentProps> {
    private userService: UserService;
    private WSGroupsService: WSGroupsService;

    // THIS VARIABLE *IS* IN FACT USED! DO NOT REMOVE!!!
    private static contextType = GlobalContext;

    public componentWillMount() {
        this.userService = (this.context as SharedContext).UserService;
        this.WSGroupsService = (this.context as SharedContext).WSGroupsService;
    }

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

    private handleSubmit = async (event: any) => {
        event.preventDefault();
        await this.props.form.validateFields(async (validationErrors: boolean, formGroup: IGroup) => {
            if (!validationErrors) {
                const userId = this.userService.getUserInfo().userId;
                // Add the user creating the group to the list of users
                formGroup.users = [userId];
                formGroup.invite_id = "";
                formGroup.visible = false;
                console.info("Right before createGroup")
                await this.WSGroupsService.createGroup(formGroup, this.onGroupCreatedCallback);
                console.info("Right after createGroup")
            };
        })
    }

    private onGroupCreatedCallback = (group: GroupResponse) => {
        console.log("Succesfully created group " + group.name);

        // Set users groupID
        const user = this.userService.getUserInfo();
        user.groupId = group._id;
        this.userService.setUserInfo(user);

        this.props.history.push('/groups/' + group._id)
    }
}

export default withRouter(Form.create<any>()(CreateGroupForm));