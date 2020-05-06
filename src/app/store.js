import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slices/login'
import tourReducer from '../slices/tour'
import toursReducer from '../slices/tours';
import registerReducer from '../slices/register';
import messageReducer from '../slices/message'
import addtourReducer from '../slices/addtour'
import messagesReducer from '../slices/messages'
import favoriteReducer from '../slices/favorite'
import memberReducer from '../slices/member'
import transcriptReducer from '../slices/transcript'
import commentsReducer from '../slices/comments'
import reviewReducer from '../slices/review'

export default configureStore({
  reducer: {
    login: loginReducer,
    tour: tourReducer,
    tours: toursReducer,
    register: registerReducer,
    message: messageReducer,
    addtour: addtourReducer,
    messages: messagesReducer,
    favorite: favoriteReducer,
    member: memberReducer,
    transcript: transcriptReducer,
    comments: commentsReducer,
    review: reviewReducer
  },
});
