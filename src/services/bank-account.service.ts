import api from '../services/base/api.axios';
import ApiConfig from './base/apiConfig';

export class BankAccountService extends ApiConfig {

    protected path: string = '/bank-account';

    public findAll() {
        return api.get(`${this.path}`);
    }
}