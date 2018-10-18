import React, { Component } from 'react';
import './App.css';

export default class MyComponent extends Component {
    constructor(props){
        super(props);
        this.state = {hello: props.hello};
      }

  render() {
    return (
      <div>
          <p>Hello World!</p>
            <button onClick={() => this.setState({hello: "HEY"})}>
              Min Knap {this.state.hello}
            </button>
      </div>
    );
  }
}