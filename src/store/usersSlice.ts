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
  openModal:boolean
}

const initialState: usersState = {
  users: users,
  filters: {
    department: [],
    country: null,
    status: null,
  },
  openModal:false,
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
    setOpenModal: (state,action: PayloadAction<boolean>) => {
      state.openModal = action.payload
    }
  },
});

export const { addUser, setFilters, resetFilters,setOpenModal } = usersSlice.actions;

export default usersSlice.reducer;