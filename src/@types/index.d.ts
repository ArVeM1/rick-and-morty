export declare global {
  type MetaDetails = {
    count: number;
    next: string;
    pages: number;
    prev: null | number;
  };

  type ResponseDetails<T = unknown> = {
    info: MetaDetails;
    results: T;
  };
  interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: CharacterLocation;
    image: string;
    episode: string[];
    url: string;
    created: string;
  }

  interface Origin {
    name: string;
    url: string;
  }

  interface Location {
    name: string;
    url: string;
    status: string;
  }

  interface CharacterLocation {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
  }
}
