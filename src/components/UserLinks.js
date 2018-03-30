import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import wood2 from '../assets/wood2.jpg';
import Card from './Card'

const StyledUserLinks = styled.div`
  background: url(${wood2}) repeat-y;
  margin-top: 7vh;
  min-height: 88vh;
  padding-bottom: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;

  /* @media (max-width: 700px) {
    .container {
      padding: 10px;
    } 
  } */
  

  .container {
    margin-top: 20px;
    padding: 30px;
    width: 80%;
    min-height: 50vh;
    background: rgba(255,255,255,0.6);

    @media(max-width: 700px) {
      padding: 10px;
      width: 90%;
    }
  }
`


class UserLinks extends React.Component {

  state = {
    links: null
  }

  componentDidMount () {
    axios.get(process.env.REACT_APP_API_SERVER_BASE_URL + 'get-links/', {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('user_token')
      }
    })
    .then(response => {
      console.log(response)
    this.setState({links: response.data})
    })
  }

  deleteLink = (id) => {
    axios.delete(process.env.REACT_APP_API_SERVER_BASE_URL + 'delete-link/' + id, {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('user_token')
      }
    })
    .then(response => {
      console.log(response)
      let links = this.state.links.filter(link => {
        return link.id !== id;
      });
      this.setState({links: links});
    })
  }

  render () {

    let links = null;

    if (this.state.links) {
      links = this.state.links.map(link => {
        return (
          <Card 
            longUrl={link.long_url}
            shortUrl={link.short_url}
            id={link.id}
            key={link.id}
            deleteLink={this.deleteLink}
          />
        )
      })
    }
    

    return (
      <StyledUserLinks>
        <div className='container'>
          {links}
        </div>
          
      </StyledUserLinks>
    )
  }
}

export default UserLinks;