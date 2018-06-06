import React from 'react';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGithub from '@fortawesome/fontawesome-free-brands';
import './SignIn.css';

const SignIn = props => {
  return (
    <div className="sign-in-btn" onClick={props.login}>
      <FontAwesomeIcon className="github-icon" icon={['fab', 'github']} />
      <span className="sign-in-btn-txt">Sign in with GitHub</span>
    </div>
  );
};

export default SignIn;
