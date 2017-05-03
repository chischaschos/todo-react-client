import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class TodoList extends React.Component {
  render() {
    return null
  }
}

class TodoCreator extends React.Component {
  render() {
    return null
  }
}

class LogoutButton extends React.Component {
  constructor(props) {
    super(props)
    // TODO: enable experimental syntax to setup events
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    this.props.onAccessTokenChange('');
    event.preventDefault()
  }

  render() {
    return (<a href='_blank' onClick={this.handleLogout}>Logout</a>)
  }
}

// LoginForm is an uncontrolled component
class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const email = this._email.value;
    const password = this._password.value;

    this.signIn(email, password)

    event.preventDefault()
  }

  signIn(email, password) {
    axios.post('https://murmuring-anchorage-39689.herokuapp.com/api/session', {
      user: {
        email: email,
        password: password
      }
    })
      .then((response) => {
        this.props.onAccessTokenChange(response.data.access_token);
      })
      .catch((error) => {
        this.props.onAccessTokenChange('');
        console.log('logging you out because of an error on the backend')
        console.log(error)
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name='email' type='email' ref={ input => this._email = input } />
        <input name='password' type='password' ref={ input => this._password = input } />
        <input type='submit' value='login' />
      </form>
    )
  }
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = { accessToken: '', todos: [] }
    this.handleAccessTokenChange = this.handleAccessTokenChange.bind(this);
  }

  handleAccessTokenChange(accessToken) {
    this.setState({ accessToken: accessToken })
  }

  render() {
    const isLoggedIn = this.state.accessToken.length;
    let button = null;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} onAccessTokenChange={this.handleAccessTokenChange} />;
    } else {
      button = <LoginForm onClick={this.handleLoginClick} onAccessTokenChange={this.handleAccessTokenChange} />;
    }

    return (
      <div>
        {button}
      </div>
    );

  }
}

class Page extends React.Component {
  render() {
    return (
      <div>
        <LoginControl />
        <TodoCreator />
        <TodoList />
      </div>
    )
  }
}


ReactDOM.render(
  <Page />,
  document.getElementById('app')
)
