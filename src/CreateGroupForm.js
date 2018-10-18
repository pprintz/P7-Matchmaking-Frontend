import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card, AutoComplete, Row, Col } from 'antd'
import './App.css';
import GroupService from './services/GroupService';

const FormItem = Form.Item;

export default class CreateGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    GroupService.setupDefaults();
  }

  render() {
    return (

      <Row style={{ paddingTop: 100 }}>
        <Col span={8}></Col>
        <Col span={8}>
          <Card style={{ width: 400 }}
            actions={[<Icon type="setting" />, <Icon type="edit" />]}>
            <form onSubmit={this.handleSubmit}>
              <FormItem>
                <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text" placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}></Input>
              </FormItem>
              <FormItem>
                <Input prefix={<Icon type="crown" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="text" placeholder="Game"
                  name="game"
                  value={this.state.game}
                  onChange={this.handleChange}></Input>
              </FormItem>
              <FormItem className="input">
                <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="number"
                  placeholder="Group size"
                  name="groupSize"
                  value={this.state.groupSize}
                  onChange={this.handleChange}></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" value="Create" size="large">
                  Create group
          </Button>
              </FormItem>
            </form >
          </Card>
        </Col>
        <Col span={8}></Col>
      </Row>

    );
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    GroupService.createGroup(this.state);
  }
}