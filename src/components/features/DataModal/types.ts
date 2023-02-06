export type DataPropsType = {
  showDataModal: (a: boolean) => void;
};

export type newDataTypes = {
  origin: string;
  gender: string;
  age: number;
  chipped: boolean;
  chip_number: string | undefined;
  parvo_vaccine: string | undefined;
  chip_date: string;
  chip_position: string;
  inShelter: boolean;
  breed: string;
  is_alive: boolean;
  death_date: string;
  death_cause: string;
  images: string[];
};
