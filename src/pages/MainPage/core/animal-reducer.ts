import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Animal, AnimalState } from './types';

const initialState: AnimalState = {
  animals: [],
  selectedAnimal: undefined,
  isLoading: false,
  error: undefined,
};

export const animalSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hasError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    addTheAnimal: (state, action: PayloadAction<Animal>) => {
      state.animals = [action.payload, ...state.animals];
    },
    getTheAnimals: (state, action: PayloadAction<Animal[]>) => {
      state.animals = action.payload;
    },
    updateTheAnimal: (state, action: PayloadAction<Animal>) => {
      state.animals = state.animals.map((animal) => {
        if (animal.id === action.payload.id) {
          animal = action.payload;
        }
        return animal;
      });
    },
    deleteTheAnimal: (state, action: PayloadAction<number>) => {
      state.animals = state.animals.filter(
        (animal) => animal.id !== action.payload,
      );
    },
    selectAnimal: (state, action: PayloadAction<Animal>) => {
      state.selectedAnimal = action.payload;
    },
    deselectAnimal: (state) => {
      state.selectedAnimal = undefined;
    },
  },
});

export const {
  isLoading,
  hasError,
  addTheAnimal,
  getTheAnimals,
  updateTheAnimal,
  deleteTheAnimal,
  selectAnimal,
  deselectAnimal,
} = animalSlice.actions;

export default animalSlice.reducer;
