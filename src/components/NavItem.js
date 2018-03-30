import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavItem = styled.li`
  
  background-color: ${props => props.active ? 'pink': 'inherit'};
  height: 100%;
  /* width: 100%; */
  position: relative;
  letter-spacing: 1px;
  font-weight: 500;
  color: honeydew;
  

  a {
    display: inline-block;
    box-sizing: border-box;
    /* color: white; */
    /* width: 100%; */
    height: 100%;
    padding: 0 15px;

    &.active, &:hover {
      background-color: #112f51;
      cursor: pointer;
    }

    &.active ~ .highlight, &:hover ~ .highlight {
      width: 50%;
    }
  }

  .highlight {
    position: absolute;
    bottom: 0;
    width: 0%;
    background: aqua;
    height: 4px;
    transition: all 200ms ease-in-out;
  }

  .right {
    right: 0;
  }

  .left {
    left: 0;
  }

`

const NavItem = (props) => {
  return (
    <StyledNavItem >
      <NavLink to={props.link} exact>
        {props.children}
      </NavLink>
      <span className='highlight left'></span>
      <span className='highlight right'></span>
    </StyledNavItem>
  )
}

export default NavItem;