import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Modify the state type and arg types to match your needs
interface userState {
  user: { username: string; password: string };
  isAuthenticated: boolean;
}

const initialState: userState = {
  user: { username: '', password: '' },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    UserInfoRedux: (state: userState, action: PayloadAction<Partial<userState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logoutUserRedux: () => {
      return initialState;
    },
  },
});

export const { UserInfoRedux, logoutUserRedux } = userSlice.actions;

export default userSlice.reducer;
