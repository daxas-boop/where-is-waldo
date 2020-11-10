import firebase from '../../config/fbConfig';

export const logIn = (email: string, password: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: 'USER_LOGGED_IN' });
    } catch (error) {
      dispatch({ type: 'USER_LOGGED_IN_ERROR' });
    }
  };
};

export const signUp = (email: string, password: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password);
      dispatch({ type: 'SIGNUP_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SIGNUP_ERROR' });
    }
  };
};
