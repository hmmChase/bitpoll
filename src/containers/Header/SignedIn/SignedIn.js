import React from 'react';
import { connect } from 'react-redux';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-regular';
import './SignedIn.css';

const SignedIn = props => {
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

export default connect(mapStateToProps)(SignedIn);
