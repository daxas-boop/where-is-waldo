import { ILevels } from '../../types/level-types';

export const selectLevel = (level: ILevels) => {
  return (dispatch: any) => {
    dispatch({ type: 'LEVEL_SELECTED', payload: level });
  };
};
