export interface ILevels {
  getCharacters: () => string[];
  getImage: () => File;
  isLevelOver: () => void;
  charactersLeft: () => void;
  getName: () => string;
}
