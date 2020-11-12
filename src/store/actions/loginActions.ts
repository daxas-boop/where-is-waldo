import firebase from '../../config/fbConfig';

export const signIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      dispatch({ type: 'LOGIN_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error });
    }
  };
};

export const signUp = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      dispatch({ type: 'LOGIN_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SIGNUP_ERROR', payload: error });
    }
  };
};

export const logout = () => {
  return (dispatch: any) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
      })
      .catch((error) => {
        dispatch({ type: 'LOGOUT_ERROR', payload: error });
      });
  };
};
