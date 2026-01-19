import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Category } from '../../types/models.types';

export interface ProductState {
  categories: Category[];
  products: Product[];
  selectedCategoryId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  categories: [],
  products: [],
  selectedCategoryId: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    selectCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategoryId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setCategories, 
  setProducts, 
  selectCategory,
  setLoading,
  setError 
} = productSlice.actions;

export const productReducer = productSlice.reducer;
