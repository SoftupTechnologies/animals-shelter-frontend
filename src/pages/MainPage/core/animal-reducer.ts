import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Animal, AnimalState, AnimalUpdateBodyRedux } from './types';

const initialState: AnimalState = {
  animals: [],
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
      state.animals.push(action.payload);
    },
    getTheAnimals: (state, action: PayloadAction<Animal[]>) => {
      state.animals = action.payload;
    },
    updateTheAnimal: (state, action: PayloadAction<Animal>) => {
      state.animals.map((animal) => {
        if (animal.id === action.payload.id) {
          animal = action.payload;
        }
        return animal;
      });
    },
  },
});

export const {
  isLoading,
  hasError,
  addTheAnimal,
  getTheAnimals,
  updateTheAnimal,
} = animalSlice.actions;

export default animalSlice.reducer;
