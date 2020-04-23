import axios from 'axios'
import {removeLocalStorageInformation} from "../helpers/comme.util";
import history from "../helpers/history";

export default class BaseHttpService {

    BASE_URL = 'http://localhost:3000';
    _accessToken = '';

    get(url: string, options = {}) {
        Object.assign(options, this.addAuthInOption());
        return axios.get(`${this.BASE_URL}/${url}`, options).catch((error) => {
            this.handleError(error);
        })
    }

    post(url: string, data = {}, options = {}) {
        Object.assign(options, this.addAuthInOption());
        return axios.post(`${this.BASE_URL}/${url}`, data, options).catch((error) => {
            this.handleError(error);
        })
    }

    addAuthInOption = (): any => {
        return {
            headers: {
                Authorization: 'Bearer ' + this.accessToken
            }
        };
    };

    get accessToken() {
        return this._accessToken ? this._accessToken : this.loadToken();
    }

    loadToken = () => {
        const token: any = window.localStorage.getItem('accessToken');
        this._accessToken = token;
        return token;
    };

    handleError = (error: any) => {
        const {status} = error.response;

        if (status === 401) {
            removeLocalStorageInformation();
            window.location.href = '/sign-in';
        }
    };
}