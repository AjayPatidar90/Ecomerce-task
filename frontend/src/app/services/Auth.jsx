import axios from "axios";
import * as Config from "../utils/Config";

axios.defaults.withCredentials = true;

export async function login(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}login`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}


export async function Registerinfo(data, token) {
    try {
        const res = await axios.post(`${Config.base_url}register`, data, {
            data: {},
        })
        return await res?.data;
    }
    catch (err) {
        return await err;

    }

}
