import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        client_id: '568372018000-2dn6ktcg35s4perf3djgf5s3f89fol90.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
         this.auth = window.gapi.auth2.getAuthInstance();
         this.onAuthChange(this.auth.isSignedIn.get());
         this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
        this.props.signIn(this.auth.currentUser.get().getId());
      } else {
        this.props.signOut();
      }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={() => this.auth.signOut()} className="ui google red button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={() => this.auth.signIn()}  className="ui google blue button">
          <i className="google icon" />
            Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {
  signIn: signIn,
  signOut: signOut
})(GoogleAuth);
