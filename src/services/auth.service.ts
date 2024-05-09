import api from '../services/base/api.axios';
import ApiConfig from './base/apiConfig';

export class AuthService extends ApiConfig {

    protected path: string = '/auth';

    public login(params = {}) {
        return api.post(`${this.path}/login`, params);
    }
}