import React, { Component } from 'react';
import './App.css';

export default class MyComponent extends Component {
    constructor(props){
        super(props);
        this.hello = "";
    }

  render() {
    return (
      <div>
          <p>Hello World!</p>
            <button onClick={() => this.hello = "Hello"}>Min Knap {this.hello}</button>
      </div>
    );
  }
}