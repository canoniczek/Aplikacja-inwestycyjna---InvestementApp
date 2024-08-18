import { createSlice } from "@reduxjs/toolkit";


const saveSlice = createSlice({
    name: "save",
    initialState: {
        saves: [],
        error: null,
    },

    reducers: {
        addSingleSave: (state, action) => {
            state.saves.push(action.payload);
        },
        setSaves: (state, action) => {
            state.saves = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {addSingleSave, setSaves, setError} = saveSlice.actions;
export default saveSlice.reducer;