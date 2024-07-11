import { Episode } from './Episode';
import { Location } from './Location';

export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  location?: Location;
  origin?: Location;
  episode?: Episode[];
}
