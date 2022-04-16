const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  name: "",
  email: "",
  photo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },

    setUserLogOut: (state, action) => {
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUserLogin, setUserLogOut } = actions;
export default reducer;
