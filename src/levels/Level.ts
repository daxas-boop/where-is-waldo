export default class Level {
  image: string;
  name: string;
  characters: string[];
  constructor(characters: Array<string>, image: string, name: string) {
    this.name = name;
    this.image = image;
    this.characters = characters;
  }
}
