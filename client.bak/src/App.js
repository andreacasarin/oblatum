import React, { Component } from 'react';
import Header from './common/Header.js';
import Main from './common/Main.js';
import Footer from './common/Footer.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import 'bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main className="App-main">
          <Main />
        </main>
        <footer className="App-footer">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
