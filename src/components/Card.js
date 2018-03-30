import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 80%;
  text-align: center;
  margin: 20px auto 10px;

  @media(max-width: 700px) {
    width: 100%;

    /* div {
      padding: 5px;
    } */
  }

  &:hover {
    box-shadow: 1px 1px 1px 1px;
  }

  div {
    padding: 10px;

    p {
      margin: 0;
    }
  }

  button {
    background: white;
    color: crimson;
    font-weight: 600;
    border: crimson 2px solid;
    width: 100px;
    height: 30px;
    margin: 10px auto;
    cursor: pointer;

    &:hover {
      background: crimson;
      color: white;
    }
  }

`

class Card extends React.Component {

  render () {
    return (
      <StyledCard>
        <div className='long-url'>{this.props.longUrl}</div>
        <div className='short-url'>
          <p>Short Link </p>
          <p>{this.props.shortUrl}</p>
        </div>
        <button onClick={() => this.props.deleteLink(this.props.id)}>DELETE</button>
      </StyledCard>
    )
  }
}

export default Card;