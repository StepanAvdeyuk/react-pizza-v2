import { createSlice } from "@reduxjs/toolkit";


type Sort = {
    name: 'популярности' | 'цене' | 'алфавиту';
    sortBy: 'rating' | 'price' | 'name';
}

interface FilterSliceState {
    categoryId: number;
    sort: Sort;
    activePage: number;
}

const initialState: FilterSliceState = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortBy: 'rating'
    },
    activePage: 0,

};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setActivePage(state, action) {
            state.activePage = action.payload;
        },
        setFilters(state, action) {
            state.categoryId = +action.payload.activeCategory;
            state.sort = action.payload.sortBy;
            state.activePage = +action.payload.activePage;
        }
    }
});

export const { setCategoryId, setSort, setActivePage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;