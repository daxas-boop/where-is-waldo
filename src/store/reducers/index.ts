const initState = {};

const rootReducer = (state = initState, action: { type: string }) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('login success');
      break;
    case 'LOGIN_ERROR':
      console.log('login error');
      break;
    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      break;
    case 'SIGNUP_ERROR':
      console.log('signup error');
      break;
    default:
      return state;
  }
  return state;
};

export default rootReducer;
