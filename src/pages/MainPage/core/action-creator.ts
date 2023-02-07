import { AppDispatch } from '../../../app/store';
import {
  deleteAnimal,
  getAnimals,
  postAnimal,
  updateAnimal,
} from './animal-api';

import {
  addTheAnimal,
  getTheAnimals,
  hasError,
  isLoading,
  updateTheAnimal,
} from './animal-reducer';
import { Animal, AnimalBody, AnimalUpdateBodyRedux } from './types';

export const getAllAnimals = (page: number, limit: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const allAnimalData = await getAnimals(page, limit);
      dispatch(getTheAnimals(allAnimalData.animals));
    } catch (error: any) {
      dispatch(hasError(error.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const addAnAnimal = (animal: AnimalBody) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const createdAnimal = await postAnimal(animal);
      dispatch(addTheAnimal(createdAnimal));
    } catch (error: any) {
      dispatch(hasError(error.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const udpateAnAnimal = (animal: Animal, animalId: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const animalBody: AnimalBody = {
        origin: animal.origin,
        gender: animal.gender,
        age: animal.age,
        chipped: animal.chipped,
        chip_number: animal.chip_number,
        parvo_vaccine: animal.parvo_vaccine,
        chip_date: animal.chip_date,
        chip_position: animal.chip_position,
        breed: animal.breed,
        is_alive: animal.is_alive,
        death_date: animal.death_date,
        death_cause: animal.death_cause,
        inShelter: animal.in_shelter,
        images: animal.images.map((img) => img.url),
      };
      await updateAnimal(animalBody, animalId);
      dispatch(updateTheAnimal(animal));
    } catch (error: any) {
      dispatch(hasError(error.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const deleteAnAnimal = (animalId: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      await deleteAnimal(animalId);
      dispatch(deleteAnAnimal(animalId));
    } catch (error: any) {
      dispatch(hasError(error.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
