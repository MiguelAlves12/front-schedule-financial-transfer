import api from '../services/base/api.axios';
import ApiConfig from './base/apiConfig';

export class BankTransferService extends ApiConfig {

    protected path: string = '/bank-transfer';

    public save(params = {}) {
        return api.post(`${this.path}/save`, params);
    }

    public findAll() {
        return api.get(`${this.path}`);
    }
}