import React from "react";
import firebase from "firebase/app";

import { AuthCheck, FirebaseAppProvider, useAuth } from "reactfire";

function AuthButtons() {
  const auth = useAuth();
  const signIn = async () => {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <AuthCheck
      fallback={
        <button className="button is-primary" onClick={signIn}>
          Sign In
        </button>
      }
    >
      <button className="button is-info" onClick={signOut}>
        Sign Out
      </button>
    </AuthCheck>
  );
}

export default AuthButtons;
