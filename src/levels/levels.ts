import { ILevels } from '../types/level-types';
import Level from './Level';
import level1_img from '../assets/images/level_1.png';
import level2_img from '../assets/images/level_2.png';

const level_1 = new Level(
  ['waldo', 'odlaw', 'wenda', 'whitebeard'],
  level1_img,
  'Level 1'
);

const level_2 = new Level(
  ['lisa', 'homer', 'marge', 'bart'],
  level2_img,
  'Level 2'
);

export const levels: { [key: string]: ILevels } = {
  level_1,
  level_2,
};
