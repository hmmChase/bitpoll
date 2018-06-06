import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-brands';
import './SignIn.css';

const SignIn = props => {
  return (
    <div className="sign-in-btn" onClick={props.login}>
      <FontAwesomeIcon className="github-icon" icon={['fab', 'github']} />
      <span className="sign-in-btn-txt">Sign in with GitHub</span>
    </div>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired
};

export default SignIn;
