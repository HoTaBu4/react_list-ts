import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/userType";
import { users } from "../data/users";


interface usersState {
  users: User[];
  filters: {
    department: string[];
    country: string | null;
    status: string | null;
  };
}

const initialState: usersState = {
  users: users,
  filters: {
    department: [],
    country: null,
    status: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setFilters: (state, action: PayloadAction<usersState["filters"]>) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        department: [],
        country: null,
        status: null,
      };
    },
  },
});

export const { addUser, setFilters, resetFilters } = usersSlice.actions;

export default usersSlice.reducer;