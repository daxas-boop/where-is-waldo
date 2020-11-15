import { ILevels } from './types/level-types';
import level1_img from './assets/images/level_1.png';

const levelFactory = (
  characters: Array<string>,
  image: any,
  name: string
): ILevels => {
  const getCharacters = () => characters;
  const getImage = () => image;
  const getName = () => name;

  const charactersLeft = () => {};

  const isLevelOver = () => {};

  return { getCharacters, getImage, isLevelOver, charactersLeft, getName };
};

export const levels: { [key: string]: ILevels } = {
  level_1: levelFactory(['waldo'], level1_img, 'Level 1'),
};
