import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City } from "models";

export interface CitySate {
    loading: boolean;
    list: City[];
}

const initialState: CitySate = {
    loading: false,
    list: [],
}

const citySlice = createSlice({
    name: "city",
    initialState: initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<Array<City>>) {
            state.loading = false;
            state.list = action.payload;
        },
        fetchCityListFailed(state) {
            state.loading = false;
        }
    }
})
// Action
export const cityActions = citySlice.actions; 

// Selector
export const selectCityList = (state: RootState) => state.city.list;

export const selectCityMap = createSelector(selectCityList, (cityList) => 
    cityList.reduce((map: {[key: string]: City}, city) => {
        map[city.code] = city;
        return map
    }, {})
)

export const selectCityOptions = createSelector(selectCityList, (cityList) => 
    cityList.map((city) => {
        return {label: city.name, value: city.code}
    })
)

// Reducers
const cityReducer = citySlice.reducer;
export default cityReducer;
