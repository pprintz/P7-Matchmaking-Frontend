import React, { Component } from 'react';
import './App.css';

export default class CreateGroupForm extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
      }

  render() {
    return (
      <form>
            <p>Group name: 
              <input
                name="name" 
                placeholder="Group name"
                value={this.state.name} 
                onChange={this.handleChange} />
            </p>
            <p>Game: 
              <input
                name="game" 
                placeholder="Game" 
                value={this.state.game} 
                onChange={this.handleChange} />
            </p>
            <p> Max size:
                <input 
                    name="maxSize"
                    placeholder="Max size" 
                    value={this.state.maxSize} 
                    onChange={this.handleChange} />
            </p>
          <input type="submit" value="Create" onClick={this.submitForm} />
      </form>
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
}