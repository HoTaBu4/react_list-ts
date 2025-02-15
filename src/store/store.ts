import { configureStore } from '@reduxjs/toolkit';
import  UsersSlice  from './usersSlice'

const store = configureStore({
  reducer: {
    users: UsersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;