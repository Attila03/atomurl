import React from 'react';

import styled from 'styled-components';

import axios from 'axios';

const StyledLogin = styled.div`
  margin: 100px auto;

  form {
    background: pink;
    border: orange 1px solid;
    padding: 50px;
    width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      display: inline-block;
      margin-top: 30px;
      width: 120px;
      height: 40px;
      border: none;
      background: crimson;
      cursor: pointer;
      border: 1px solid darkolivegreen;
      color: darkgreen;
      font-weight: 600;

      &:hover {
        box-shadow: 1px 1px 1px 1px black;
      }
     
    }

    div {
      text-align: center;
      margin: 8px auto;
      color: crimson;

      label {
        display: inline-block;
        text-align: left;
        width: 80px;
      }

      input {
        height: 20px;
        margin-left: 10px;
        width: 300px;
      }

    }
    
  }

`

class Login extends React.Component {

  state = {
    email: '',
    password: ''
  }

  submitForm = (e) => {
    e.preventDefault()
    axios.post(process.env.REACT_APP_API_SERVER_BASE_URL + 'login/', {
      'email': this.state.email,
      'password': this.state.password
    })
    .then(response => {
      console.log(response)
      if (response.data.error) {
          console.log('hi')
      } else {
        localStorage.setItem('user_token', response.data.token.key);
        this.props.authenticateUser();
        this.props.history.push('/');
        
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <StyledLogin>
        <form onSubmit={this.submitForm}>
          <div>
            <label name='email'>
              Email: 
            </label>
            <input type='email' name='email' onChange={this.handleChange} value={this.state.email}/>
          </div>
          
          <div>
            <label name='password'>
              Password: 
            </label>
            <input type='password' name='password' onChange={this.handleChange} value={this.state.password}/>
          </div>
          <button type='submit'>LOGIN</button>
        </form>
      </StyledLogin>
    )
  }
}

export default Login;