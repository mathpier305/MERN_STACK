import React from 'react';
import { NavItem, Modal, Button, NavDropdown, MenuItem } from 'react-bootstrap';

export default class SigninNavItem extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      showing: false, disabled: true,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signout = this.signout.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentDidMount(){
    window.gapi.load('auth2', () => {
      if(!window.gapi.auth2.getAuthInstance()){
        if(!window.config || !window.config.googleClientId) {
          this.props.showError('Missing Google Client Id or  config file /static/config.js');
        }else{
          window.gapi.auth2.init({ client_id: window.config.googleClientId}).then( ()=>{
            this.setState({disabled : false});
          });
        }
      }
    });
  }

  /*signin(){
    this.hideModal();
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      const name  = googleUser.getBasicProfile().getGivenName();
      console.log("signed in success - name : ", name);
      this.props.onSignin(name);
    }, error =>{
      this.props.showError(`Error authentication with Google ${error}`);
    });
  }*/

  signin(){
    this.hideModal();
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      fetch('/signin', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id_token: googleUser.getAuthResponse().id_token }),
      }).then(response => {
        if(response.ok){
        response.json().then(user =>{
          this.props.onSignin(user.name);
        });
      }else {
        response.json().then(error => {
          this.props.showError(`App login failed : ${error}`);
        });
      }
    }).catch(err => {
      this.props.showError(`Error posting login to app: ${err}`);
    });
  },error => {
    this.props.showError(`Error authentication with Google ${error}`);
  });

  }

  /*signout(){
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(response => {
      this.props.showSuccess('Successfully signed out.');
      this.props.onSignout();
    });
  }*/

  signout(){
    const auth2 = window.gapi.auth2.getAuthInstance();
    fetch('/signout', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
    }).then(response => {
      if(response.ok){
        auth2.signOut().then( ()=>{
          this.props.showSuccess('Successfully signed out');
          this.props.onSignout();
        });
      }
    });
  }

  showModal() {
    if(this.state.disabled){
      this.props.showError('Missing Google Client Id or config file /static/config.js ');
    } else {
      this.setState({ showing: true});
    }
  }

  hideModal() {
    this.setState({ showing: false});
  }

  render() {
    if(this.props.user.signedIn) {
      return (
        <NavDropdown title={this.props.user.name} id="user-dropdown">
          <MenuItem onClick={this.signout}>Sign out</MenuItem>
        </NavDropdown>
      );
    }
    return(
      <NavItem onClick={this.showModal}> Sign In
        <Modal keyboard show={this.state.showing} onHide={this.hideModal}
          bsSize="sm">
            <Modal.Header closeButton>
              <Modal.Title>
                Sign In
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button block disabled={this.state.disabled} onClick={this.signin}>
                <img src="/btn_google_signin_dark_normal_web.png" alt="Signin" />
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel </Button>
            </Modal.Footer>
          </Modal>
      </NavItem>
    );
  }
}


SigninNavItem.propTypes = {
  user : React.PropTypes.object,
  onSignin: React.PropTypes.func.isRequired,
  onSignout: React.PropTypes.func.isRequired,
  showError: React.PropTypes.func.isRequired,
  showSuccess: React.PropTypes.func.isRequired,
};
