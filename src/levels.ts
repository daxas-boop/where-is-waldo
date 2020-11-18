import { ILevels } from './types/level-types';
import level1_img from './assets/images/level_1.png';

class Level {
  charactersNotFound: string[];
  image: any;
  name: string;
  charactersFound: string[];
  constructor(characters: Array<string>, image: any, name: string) {
    this.charactersNotFound = characters;
    this.image = image;
    this.name = name;
    this.charactersFound = [];
  }
}

const level_1 = new Level(['waldo', 'falling woman'], level1_img, 'Level 1');

export const levels: { [key: string]: ILevels } = {
  level_1,
};
