import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slices/login'

export default configureStore({
  reducer: {
    login: loginReducer,
  },
});
