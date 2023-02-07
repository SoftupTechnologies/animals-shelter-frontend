import Axios from 'axios';
import { routes } from '../../../constants/routes';
import {
  Animal,
  AnimalBody,
  GetAnimalResponseType,
  UpdateAnimalResponseType,
} from './types';

const backendUrl = 'http://167.99.252.248:5000';

export const getAnimals = async (
  page: number,
  limit: number,
): Promise<GetAnimalResponseType> => {
  try {
    const url = `${backendUrl}${routes.API.BASE}${routes.API.ANIMALS}?page=${page}&limit=${limit}`;

    const response = await Axios({
      method: 'GET',
      url,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAnimal = async (animal: AnimalBody): Promise<Animal> => {
  try {
    const url = `${backendUrl}${routes.API.BASE}${routes.API.ANIMALS}`;

    const response = await Axios({
      method: 'PUT',
      url,
      data: animal,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAnimal = async (
  animal: AnimalBody,
  animalId: number,
): Promise<UpdateAnimalResponseType> => {
  try {
    const url = `${backendUrl}${routes.API.BASE}${routes.API.ANIMALS}?id=${animalId}`;

    const response = await Axios({
      method: 'POST',
      url,
      data: animal,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAnimal = async (animalId: any) => {
  try {
    const url = `${backendUrl}${routes.API.BASE}${routes.API.ANIMALS}?id=${animalId}`;
    const response = await Axios({
      method: 'DELETE',
      url,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
