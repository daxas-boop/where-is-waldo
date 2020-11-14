import { ILevels } from './types/level-types';
const level1_img = require('./assets/images/level_1.png');

const levelFactory = (
  characters: Array<string>,
  image: File,
  name: string
): ILevels => {
  const getCharacters = () => characters;
  const getImage = () => image;
  const getName = () => name;

  const isCharacterFound = (coords: Array<number>) => {
    return true;
  };

  const characterLeft = () => {};

  const isLevelOver = () => {};

  return { getCharacters, getImage, isLevelOver, characterLeft, getName };
};

export const levels: { [key: string]: ILevels } = {
  level_1: levelFactory(['waldo'], level1_img, 'Level 1'),
};
