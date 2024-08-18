import { createSlice } from '@reduxjs/toolkit'


const fundSlice = createSlice({
  name: "fund",
  initialState: {
    funds: [],
    error: null,
  
},
  reducers: {
    addSingleFund: (state, action) => {
      state.funds.push(action.payload);
    },
    setFunds: (state, action) => {
      state.funds = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  } 

});

export const {addSingleFund, setFunds, setError} = fundSlice.actions;
export default fundSlice.reducer;