import { createSlice } from "@reduxjs/toolkit";

interface SearchSliceState {
    search: string;
}

const initialState: SearchSliceState = {
    search: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        },
    }
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;