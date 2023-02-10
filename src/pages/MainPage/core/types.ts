export interface Animal {
  id: number;
  origin: string;
  gender: string;
  age: number;
  chip_position: string;
  polyvalent_vaccine: string;
  chip_date: string;
  username: undefined | string;
  user_id: undefined | string;
  chipped: boolean;
  chip_number: string;
  parvo_vaccine: string;
  distemper_vaccine: string;
  rabies_vaccine: string;
  in_shelter: boolean;
  sterilization_date: string;
  breed: string;
  is_alive: boolean;
  death_date: string;
  death_cause: string;
  images: string[];
}

export type GetAnimalResponseType = {
  animals: {
    id: number;
    origin: string;
    gender: string;
    age: number;
    chip_position: string;
    polyvalent_vaccine: string;
    chip_date: string;
    username: string;
    user_id: string;
    chipped: boolean;
    chip_number: string;
    parvo_vaccine: string;
    distemper_vaccine: string;
    rabies_vaccine: string;
    in_shelter: boolean;
    sterilization_date: string;
    breed: string;
    is_alive: boolean;
    death_date: string;
    death_cause: string;
    images: { url: string }[];
  }[];
  count: number;
};
export type UpdateAnimalResponseType = {
  animal: AnimalUpdateBodyResponse;
  error: boolean;
  message: string;
};

export type AnimalBody = {
  origin: string;
  gender: string;
  age: number;
  chipped: boolean;
  chip_number?: string;
  parvo_vaccine?: string;
  distemper_vaccine?: string;
  polyvalent_vaccine?: string;
  rabies_vaccine?: string;
  sterilization_date?: string;
  chip_date?: string;
  chip_position?: string;
  in_shelter: boolean;
  breed: string;
  is_alive: boolean;
  death_date?: string;
  death_cause?: string;
  images?: string[];
};

export type AnimalState = {
  animals: Animal[];
  selectedAnimal: Animal | undefined;
  isLoading: boolean;
  error: any;
};

export type AnimalUpdateBodyResponse = {
  origin: string;
  gender: string;
  age: number;
  chipped: boolean;
  chip_number: string;
  chip_date: string;
  chip_position: string;
  parvo_vaccine: string;
  distemper_vaccine: string;
  polyvalent_vaccine: string;
  rabies_vaccine: string;
  in_shelter: boolean;
  sterilization_date: string;
  breed: string;
  is_alive: boolean;
  death_date: string;
  death_cause: string;
  images: string[];
};
