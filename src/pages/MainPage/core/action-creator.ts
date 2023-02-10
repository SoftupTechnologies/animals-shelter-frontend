import { AppDispatch } from '../../../app/store';
import {
  deleteAnimal,
  getAnimals,
  postAnimal,
  updateAnimal,
} from './animal-api';

import {
  addTheAnimal,
  deleteTheAnimal,
  getTheAnimals,
  hasError,
  isLoading,
  updateTheAnimal,
} from './animal-reducer';
import { Animal, AnimalBody } from './types';

export const getAllAnimals = (page: number, limit: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const allAnimalData = await getAnimals(page, limit);
      const animals = allAnimalData.animals.map((animal) => {
        const images = animal.images.map((img) => img.url);
        return { ...animal, images };
      });
      dispatch(getTheAnimals(animals));
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
      dispatch(addTheAnimal(createdAnimal.animal));
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
      const animalBody: any = {
        origin: animal.origin,
        gender: animal.gender,
        age: animal.age,
        chipped: animal.chipped,
      };
      if (animal.chip_number) {
        animalBody.chip_number = animal.chip_number;
      }
      if (animal.parvo_vaccine) {
        animalBody.parvo_vaccine = animal.parvo_vaccine;
      }
      if (animal.distemper_vaccine) {
        animalBody.distemper_vaccine = animal.distemper_vaccine;
      }
      if (animal.polyvalent_vaccine) {
        animalBody.polyvalent_vaccine = animal.polyvalent_vaccine;
      }
      if (animal.rabies_vaccine) {
        animalBody.rabies_vaccine = animal.rabies_vaccine;
      }
      if (animal.sterilization_date) {
        animalBody.sterilization_date = animal.sterilization_date;
      }
      if (animal.chip_date) {
        animalBody.chip_date = animal.chip_date;
      }
      if (animal.chip_position) {
        animalBody.chip_position = animal.chip_position;
      }
      if (animal.breed) {
        animalBody.breed = animal.breed;
      }
      if (animal.is_alive) {
        animalBody.is_alive = animal.is_alive;
      }
      if (animal.death_date) {
        animalBody.death_date = animal.death_date;
      }
      if (animal.death_cause) {
        animalBody.death_cause = animal.death_cause;
      }
      if (animal.in_shelter) {
        animalBody.in_shelter = animal.in_shelter;
      }
      if (animal.images) {
        animalBody.images = animal.images;
      }
      console.log('animalBody', animalBody);
      console.log('animal', animal);

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
      dispatch(deleteTheAnimal(animalId));
    } catch (error: any) {
      dispatch(hasError(error.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
