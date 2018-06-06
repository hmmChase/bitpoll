import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-regular';
import './SignedIn.css';

export const SignedIn = props => {
  return (
    <div className="signed-in-state">
      <div className="log-in-out">
        <p className="welcome-text">Welcome {props.displayName}</p>
        {props.isContributor && (
          <p className="verifed-text">
            <FontAwesomeIcon
              className="verified-icon"
              icon={['far', 'check-circle']}
            />verified contributor
          </p>
        )}
      </div>
      <div className="sign-out-btn" onClick={props.logOut}>
        <span>Log out</span>
      </div>
    </div>
  );
};

export const mapStateToProps = state => ({
  displayName: state.user.displayName,
  isContributor: state.user.isContributor
});

SignedIn.propTypes = {
  displayName: PropTypes.string.isRequired,
  isContributor: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(SignedIn);
