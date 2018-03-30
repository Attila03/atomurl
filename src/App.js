import React, { Component } from 'react';
import { Route } from  'react-router-dom';


import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';
import Main from './components/Main';
import UserLinks from  './components/UserLinks';
import SideDrawer from './components/SideDrawer';

class App extends Component {
  
  state = {
    userAuthenticated: false,
    sideDrawer: false
  }

  authenticateUser = () => {
    this.setState({userAuthenticated: true})
  }

  unauthenticateUser = () => {
    this.setState({userAuthenticated: false})
  }

  componentDidMount () {
    let user_token = localStorage.getItem('user_token')
    if (user_token) {
      this.authenticateUser()
    }
  }

  toggleSideDrawer = () => {
    this.setState(prevState => {
      return {sideDrawer: !prevState.sideDrawer}
    })
  }

  render() {
    return (
      <div className="App">
        <SideDrawer 
          active={this.state.sideDrawer}
          toggleSideDrawer={this.toggleSideDrawer}
          ></SideDrawer>
        <Header 
          userAuthenticated={this.state.userAuthenticated}
          toggleSideDrawer={this.toggleSideDrawer}
        />
        <Route exact path='/' component={Main} />
        <Route path='/login' render={(props) => {
          return <Login authenticateUser={this.authenticateUser} {...props}/>
        }}/>
        <Route path='/logout' render={props => {
          return <Logout unauthenticateUser={this.unauthenticateUser} {...props}/>
        }} />
        <Route path='/links' component={UserLinks} />
        
      </div>
    );
  }
}

export default App;
