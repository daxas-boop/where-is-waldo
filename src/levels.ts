import { ILevels } from './types/level-types';
import level1_img from './assets/images/level_1.png';

class Level {
  image: any;
  name: string;
  characters: string[];
  constructor(characters: Array<string>, image: any, name: string) {
    this.name = name;
    this.image = image;
    this.characters = characters;
  }
}

const level_1 = new Level(['waldo', 'falling woman'], level1_img, 'Level 1');

export const levels: { [key: string]: ILevels } = {
  level_1,
};
