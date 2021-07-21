import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://pogofdev.ooguy.com:8082/api/test/';
// const API_URL = 'http://localhost:8082/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  async createNewTokens(amount) {
      return await axios.post(API_URL + 'user/mint', {amount}, {headers: authHeader()});
  }
  async transferTokens(recipient,amount) {
      return await axios.post(API_URL + 'user/transfer', {recipient,amount}, {headers: authHeader()});
  }
}

export default new UserService();
