import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ListParams, ListResponse, PaginationParams, Student } from "models";

export interface StudentListState {
    loading: boolean;
    list: Student[];
    filter: ListParams; 
    pagination: PaginationParams;
}

const initialState: StudentListState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 10,
    }, 
    pagination: {
        _limit: 1,
        _page: 1,
        _totalRows: 1
    }
}

const studentSlice = createSlice({
    name: "student",
    initialState: initialState,
    reducers: {
        fetchStudentList(state, action?: PayloadAction<ListParams>) {
            state.loading = true;
        },
        fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
            state.loading = false;
            state.list = action.payload.data;
            state.pagination = action.payload.pagination;

        },
        fetchStudentListFailed(state, action: PayloadAction) {
            state.loading = false;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setFilterWithDebounce(state, action: PayloadAction<ListParams>) {
            
        }
    }
})
// Action
export const studentActions = studentSlice.actions; 

// Selector
export const selectLoading = (state: RootState) => state.student.loading;
export const selectList = (state: RootState) => state.student.list;
export const selectFilter = (state: RootState) => state.student.filter;
export const selectPagination = (state: RootState) => state.student.pagination;


// Reducers
const studentReducer = studentSlice.reducer;
export default studentReducer;
