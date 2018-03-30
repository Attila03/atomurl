import React from 'react';
import styled from 'styled-components';
import  { Link } from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa';

import NavItem from './NavItem'

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #001f3f;
  display: flex;
  height: 7vh;
  line-height: 7vh;

  .hamburger {
    display: none;
  }

  .logo {
    margin-right: auto;

    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: white;
    }
  }

  nav {
    ul {
      list-style: none;
      display: flex;
      margin: 0;
    }
  }
  

  @media(max-width: 700px) {

    .hamburger {
      display: inline-block;
      border-radius: 50%;

      &:hover {
        background-color: #112f51;
      }

      svg {
        padding: 10px;
      }
    }

    .logo {
      margin: auto;
    }

    nav {
      display: none;
    }
  }
`

class Header extends React.Component {

  render () {
    return (
      <StyledHeader className='header'>
        <div className='hamburger' onClick={this.props.toggleSideDrawer}>
          <FontAwesome.FaAlignJustify color='white'/>
        </div>
        <div className='logo'>
          <Link to='/'>LOGO</Link>
        </div>
        <nav>
          <ul>
            <NavItem link='/'>
            <FontAwesome.FaHome /> HOME
            </NavItem>
            {this.props.userAuthenticated 
              ? <NavItem link='/links'><FontAwesome.FaChain /> LINKS</NavItem>
              : null}
            {
              this.props.userAuthenticated 
              ? <NavItem link='/logout'><FontAwesome.FaPowerOff /> LOGOUT</NavItem> 
              : <NavItem link='/login'><FontAwesome.FaSignIn /> LOGIN</NavItem>
            }
          </ul>
        </nav>
        
      </StyledHeader>
    )
  }
}

export default Header;