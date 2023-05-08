import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

SignIn.propType = {};

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    signInSuccessUrl: '/photos',
    // We will display Google as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignIn() {
    return (
        <div>
            <div className="text-center">
                <h2>Login Form</h2>
                <p>or login with social accounts</p>
            </div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
    );
}

export default SignIn;
