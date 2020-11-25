import { ILevels } from '../types/level-types';
import Level from './Level';
import level1_img from '../assets/images/level_1.png';
import level2_img from '../assets/images/level_2.png';
import level3_img from '../assets/images/level_3.png';
import level4_img from '../assets/images/level_4.png';

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

const level_3 = new Level(['waldo'], level3_img, 'Level 3');

const level_4 = new Level(
  ['waldo', 'odlaw', 'wenda', 'whitebeard'],
  level4_img,
  'Level 4'
);

export const levels: { [key: string]: ILevels } = {
  level_1,
  level_2,
  level_3,
  level_4,
};
