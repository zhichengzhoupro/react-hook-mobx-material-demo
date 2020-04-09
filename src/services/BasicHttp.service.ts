import axios from 'axios'

export default class BaseHttpService {

    BASE_URL = '';
    _accessToken = '';
    private routerStore: any;

    constructor(routerStore: any) {
        this.routerStore = routerStore;
    }

    get(url: string, options ={}) {
        Object.assign(options, this.addAuthInOption());
        return axios.get(`${this.BASE_URL}/${url}`, options).catch((error) => {
            this.handleError(error);
        })
    }

    post(url: string, data= {},  options ={}) {
        Object.assign(options, this.addAuthInOption());
        return axios.post(`${this.BASE_URL}/${url}`,data, options).catch((error) => {
            this.handleError(error);
        })
    }

    addAuthInOption = (): any => {
        return {
            headers: {
                Auth: 'Bear ' + this.accessToken
            }
        };
    };

    get accessToken() {
        return this._accessToken ? this._accessToken : this.loadToken();
    }

    loadToken = ()=> {
        const token: any = window.localStorage.getItem('accessToken');
        this._accessToken = token;
        return token
    };

    saveToken(accessToken: string) {
        this._accessToken = accessToken;
        return localStorage.setItem('accessToken', accessToken);
    }

    private handleError(error: any) {
        const {statusCode} = error.response.data;

    }
}