import React, { Component } from 'react';
import MyComponent from './custom.js';
import './App.css';

class App extends Component {
  render() {
    getBooks();
    
    
    return (
      <div class="App">
        <header class="App-header">
        <div class="header-right">
          <a class="active" href="#home">Home</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
        </header>
        <MyComponent hello="Thomsen"/>
      </div>
    );
  }
}

async function getBooks() {
  const res = await fetch("http://localhost:3000/")
  const books = await res.json();
  console.log(books);
  return books;
}

export default App;
