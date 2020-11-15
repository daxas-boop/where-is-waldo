import { LevelState } from '../types';

const initState: LevelState = {
  level: null,
};

const levelReducer = (
  state = initState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case 'LEVEL_SELECTED':
      console.log('level selected');
      return { ...state, level: action.payload };
    default:
      return { ...state };
  }
};

export default levelReducer;
