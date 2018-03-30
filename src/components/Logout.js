import React from  'react';


class Logout extends React.Component {

  componentDidMount () {
    localStorage.removeItem('user_token')
    this.props.unauthenticateUser();
    this.props.history.push('/')
  }

  render () {
    return null;
  }
}

export default Logout;