import { City, ListResponse } from "models";
import axiosClient from "./axiosClient";

const cityApi = {
    getAll(): Promise<ListResponse<City>>  {
        const url = '/cities';
        return axiosClient.get(url)
    }
}

export default cityApi;