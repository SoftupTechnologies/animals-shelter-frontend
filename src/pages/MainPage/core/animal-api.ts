import Axios from 'axios';
import { routes } from '../../../constants/routes';
import {
  Animal,
  AnimalBody,
  GetAnimalResponseType,
  UpdateAnimalResponseType,
} from './types';

const backendUrl = 'http://167.99.252.248:5000';
const token = localStorage.getItem('token');

export const getAnimals = async (
  page: number,
  limit: number,
): Promise<GetAnimalResponseType> => {
  try {
    const url = `${backendUrl}${routes.API.BASE}${routes.API.ANIMALS}?page=${page}&limit=${limit}`;

    const response = await Axios({
      method: 'GET',
      url,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    // console.log('animlas in api', response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAnimal = async (
  animal: AnimalBody,
): Promise<{ animal: Animal }> => {
  try {
    const url = `${backendUrl}${routes.API.BASE}${routes.API.ANIMAL}`;

    const response = await Axios({
      method: 'PUT',
      url,
      headers: {
        Authorization: 'Bearer ' + token,
      },
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
    const url = `${backendUrl}${routes.API.BASE}${routes.API.ANIMAL}?id=${animalId}`;

    const response = await Axios({
      method: 'POST',
      url,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: animal,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAnimal = async (animalId: any) => {
  try {
    const url = `${backendUrl}${routes.API.BASE}${routes.API.ANIMAL}?id=${animalId}`;
    const response = await Axios({
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      url,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadAnimalImage = async (file: FormData) => {
  try {
    const url = `${backendUrl}${routes.API.BASE}${routes.API.ANIMAL_IMAGE_UPLOAD}`;
    const response = await Axios({
      method: 'POST',
      url,
      data: file,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
