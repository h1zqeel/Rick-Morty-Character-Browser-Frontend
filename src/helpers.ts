import { Character } from './types/Character';

function searchByName(array: Character[], name: string) {
  if (!name.length) return array;
  return array.filter((character) => character.name.toLowerCase().includes(name.toLowerCase()));
}

export default searchByName;
