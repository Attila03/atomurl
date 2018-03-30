import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from  'styled-components';

import * as FontAwesome  from 'react-icons/lib/fa';

const StyledSideDrawer = styled.div`

  width: 700px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 2;
  transition: all 300ms ease-in-out;
  transform: ${props => props.active ? 'none': 'translateX(-100%)'};
  display: flex;

  .drawer-content {
    background: honeydew;
    width: 300px;
    height: 100%;
  }

  .backdrop {
    width: 700px;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }

  nav {
    ul {
      list-style: none;
      padding: 0;
      text-align: center;

      li {
        padding: 10px;

        &:hover {
          background: grey;
        }

        a {
          display: inline-block;
          width: 100%;
          height: 100%;  

          svg {
            padding: 5px;
          }
        }
      } 
    }
  }

`


class SideDrawer extends React.Component {
  
  render () {
    return (
      <StyledSideDrawer active={this.props.active}>
        <div className='drawer-content'>
          <div className='logo'>
            <NavLink to='/'>LOGO</NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to='/'>
                  <FontAwesome.FaHome /> HOME
                </NavLink>
              </li>
              <li>
                <NavLink to='/links'>
                  <FontAwesome.FaChain /> LINKS
                </NavLink>
              </li>
              <li>
                <NavLink to='/logout'>
                  <FontAwesome.FaPowerOff /> LOGOUT
                </NavLink>
              </li>
              <li>
                <NavLink to='/login'>
                  <FontAwesome.FaSignIn /> LOGIN
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className='backdrop' onClick={this.props.toggleSideDrawer}>
        </div>
        
      </StyledSideDrawer>
    )
  }
}

export default SideDrawer;