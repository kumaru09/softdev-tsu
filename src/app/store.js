import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slices/login'
import tourReducer from '../slices/tour'
import toursReducer from '../slices/tours';
import registerReducer from '../slices/register';

export default configureStore({
  reducer: {
    login: loginReducer,
    tour: tourReducer,
    tours: toursReducer,
    register: registerReducer
  },
});
