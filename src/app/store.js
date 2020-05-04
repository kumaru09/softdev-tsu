import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slices/login'
import tourReducer from '../slices/tour'
import toursReducer from '../slices/tours';
import registerReducer from '../slices/register';
import messageReducer from '../slices/message'

export default configureStore({
  reducer: {
    login: loginReducer,
    tour: tourReducer,
    tours: toursReducer,
    register: registerReducer,
    message: messageReducer
  },
});
