import React from 'react';
import styled, {keyframes} from 'styled-components';
import axios from 'axios';
import phone from '../assets/phone.jpeg';


const transmit = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(0.5);
  }

  100% {
    opacity: 0;
    transform: scale(1)
  }
`

// const slideIn = keyframes`

//   0% {
//     transform: translateX(-400px);
//   }

//   80% {
//     transform: translateX(20px);
//   }

//   100% {
//     transform: translateX(0);
//   }

// `

const fadeIn = keyframes`

  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1)
  }


`


const StyledMain = styled.div`
  font-size: 25px;
  margin-top: 7vh;
  height: 93vh;
  background: url(${phone});
  background-size: 100% 100%;

  .container {
    background: rgba(255,255,255,0.5);
    width:100%;
    height: 100%;
  }

  h2 {
    text-align: center;
    padding-top: 40px;
  }

  .url-input {
    margin-top: 80px;
  }

  .url-input form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    .input {
      width: 70%;
      position: relative;
      text-align: center;

      @media(max-width: 700px) {
        width: 85%;
      }

      .error-msg {
        position: absolute;
        width: 80%;
        top: -35px;
        left: 10%;
        padding: 3px;
        font-size: 14px;
        background: rgb(237, 34, 11);
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .loading {
        position: absolute;
        display: inline-block;
        padding: 10px;
        height: 30px;

        .loader {
          display: inline-block;
          border-radius: 50%;
          background: orange;
          animation: 1s ${transmit} linear infinite;
          height: 30px;
          width: 30px;
        }
      }

      input {
        height: 30px;
        width: 80%;
        padding: 6px 10px;
        color: darkmagenta;
        font-size: 18px;

        @media(max-width: 700px) {
          font-size: 14px;
        }
      }

    }

    button {
      display: block;
      height: 40px;
      padding: 5px;
      width: 100px;
      border: 2px solid #0074D9;
      background: white;
      cursor: pointer;
      color: #0074D9;
      font-weight: 750;
      margin: 10px;

      &:hover {
        background-color: #0074D9;
        color: white;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  .url-container {
    /* background: #7FDBFF; */
    background: #85144b;
    color: white;
    display: flex;
    box-shadow: 1px 1px 1px 1px;
    flex-direction: column;
    font-size: 15px;
    width: 80%;
    align-items: center;
    justify-content: center;
    padding: 30px;
    margin: 40px auto 10px;
    max-width: 600px;
    animation: 400ms ${fadeIn} ease-in-out;
    box-shadow: 2px 2px 2px 2px black;

    .short-url {
      text-align: center;

      p:first-child {
        text-decoration: underline;
      }

      p {
        margin: 5px;
      }
    }
  }
`

class Main extends React.Component {

  state = {
    link: '',
    urlObject: null,
    showShortUrl: false,
    loading: false,
    errorMsg: ''
  }

  handleChange = (e) => {
    this.setState({link: e.target.value})
  }

  hideUrlObject = () => {
    this.setState({showShortUrl: false})
  }

  setUrlObject = (urlObject) => {
    this.setState({
      urlObject: urlObject,
      showShortUrl: true
    })
  }

  clearError = () => {
    this.setState({errorMsg: ''})
  }

  submitForm = (e) => {
    this.setState({loading: true})
    this.hideUrlObject()
    this.clearError()
    e.preventDefault()

    if (this.state.link) {

      axios.post(process.env.REACT_APP_API_SERVER_BASE_URL + 'create-link/', {
        "long_url": this.state.link
      }, {
        headers: { Authorization: 'Token ' + localStorage.getItem('user_token')}
      })
      .then(response => {
        this.setState({link: ''})
        console.log(response);
        this.setUrlObject(response.data)
        this.setState({loading: false})
        
      })
      .catch(error => {
        // console.log(error.response) 
        if (error.response) {
          this.setState({errorMsg: error.response.data['long_url'][0]})
        } else {
          this.setState({errorMsg: 'Server Error. Try Again Later'})
        }
        
        this.setState({loading: false})
      })
    } else {
      this.setState({errorMsg: 'Empty URL.'})
      this.setState({loading: false})
    }

    
  }

  render () {

    let urlObject = null;

    if (this.state.showShortUrl) {
      urlObject = (
        <div className='url-container'>
          <div className='long-url'>{this.state.urlObject['long_url']}</div>
          <div className='short-url'>
            <p>Short Link </p>
            <p>{this.state.urlObject['short_url']}</p>
          </div>
        </div>
      )
    }

    let loader = null;

    if (this.state.loading) {
      loader = (
        <div className='loading'>
          <span className='loader'></span>
        </div>
      )
    }

    return (
      <StyledMain>
        <div className='container'>
          <h2>Shorten A Link!</h2>
          <div className='url-input'>
            <form>
              <div className='input'>
                {this.state.errorMsg ? <div className='error-msg'>{this.state.errorMsg}</div>: null}
                
                <input 
                  type='url'
                  value={this.state.link} 
                  onChange={this.handleChange} 
                  required
                  placeholder='Enter URL/Link'/>
                {/* <div className='loading'><span className='loader'></span></div> */}
                {loader}
              </div>
                
              <button onClick={this.submitForm} disabled={this.state.loading}>SHORTEN!</button>
            </form>
          </div>
          
          
          {urlObject}

        </div>
        

        
        
      </StyledMain>
    )
  }
}

export default Main;