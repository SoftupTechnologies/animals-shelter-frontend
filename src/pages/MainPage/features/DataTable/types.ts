export interface DataType {
  key: React.Key;
  breed: string;
  origin: string;
  gender: string;
  age: number;
  chipped: JSX.Element;
  in_shelter: JSX.Element;
  isAlive: JSX.Element;
  action: JSX.Element;
}

export interface ExpandedDataType {
  key: React.Key;
  chip_number: string;
  parvo_vaccine: string;
  chip_date: string;
  chip_position: string;
  death_date: string;
  death_cause: string;
  images: JSX.Element;
}

export type newDataPropsType = {
  showDataModal: (a: boolean) => void;
};
