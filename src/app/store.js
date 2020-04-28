import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slices/login'
import tourReducer from '../slices/tour'
import toursReducer from '../slices/tours';

export default configureStore({
  reducer: {
    login: loginReducer,
    tour: tourReducer,
    tours: toursReducer
  },
});
