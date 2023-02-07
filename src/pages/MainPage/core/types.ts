export type Animal = {
  id: number;
  origin: string;
  gender: string;
  age: number;
  chip_position: string;
  polyvalent_vaccine: undefined | string;
  chip_date: string;
  username: undefined | string;
  user_id: undefined | string;
  chipped: boolean;
  chip_number: string;
  parvo_vaccine: string;
  distemper_vaccine: undefined | string;
  rabies_vaccine: undefined | string;
  in_shelter: boolean;
  sterilization_date: undefined | string;
  breed: string;
  is_alive: boolean;
  death_date: string;
  death_cause: string;
  images: { url: string }[];
};

export type GetAnimalResponseType = {
  animals: Animal[];
  count: number;
};
export type UpdateAnimalResponseType = {
  animal: {
    origin: string;
    gender: string;
    age: number;
    chipped: boolean;
    chip_number: string;
    chip_date: string;
    chip_position: string;
    parvo_vaccine: string;
    distemper_vaccine: string | undefined;
    polyvalent_vaccine: string | undefined;
    rabies_vaccine: string | undefined;
    in_shelter: boolean;
    sterilization_date: undefined | string;
    breed: string;
    is_alive: boolean;
    death_date: string;
    death_cause: string;
    images: string[];
  };
  error: boolean;
  message: string;
};

export type AnimalBody = {
  origin: string;
  gender: string;
  age: number;
  chipped: boolean;
  chip_number: string;
  parvo_vaccine: string;
  chip_date: string;
  chip_position: string;
  inShelter: boolean;
  breed: string;
  is_alive: boolean;
  death_date: string;
  death_cause: string;
  images: string[];
};

export type AnimalState = {
  animals: Animal[];
  isLoading: boolean;
  error: any;
};

export type AnimalUpdateBodyRedux = {
  animal: {
    origin: string;
    gender: string;
    age: number;
    chipped: boolean;
    chip_number: string;
    chip_date: string;
    chip_position: string;
    parvo_vaccine: string;
    distemper_vaccine: string | undefined;
    polyvalent_vaccine: string | undefined;
    rabies_vaccine: string | undefined;
    in_shelter: boolean;
    sterilization_date: undefined | string;
    breed: string;
    is_alive: boolean;
    death_date: string;
    death_cause: string;
    images: string[];
  };
  id: number;
};
