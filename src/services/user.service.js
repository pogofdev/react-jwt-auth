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

  async buyTicket(ticketType,quantity) {
      return await axios.post(API_URL + 'user/buy', {ticketType,quantity}, {headers: authHeader()});
  }

  async useTicket(ticketNumbers) {
      return await axios.post(API_URL + 'user/use', {ticketNumbers}, {headers: authHeader()});
  }

  async getUserTransactions() {
      return await axios.post(API_URL + 'user/transactions', {}, {headers: authHeader()});
  }

  async getOwnerTickets() {
      return await axios.post(API_URL + 'user/getOwnerTickets', {}, {headers: authHeader()});
  }

  async getRedeemTickets() {
      return await axios.post(API_URL + 'user/getRedeemTickets', {}, {headers: authHeader()});
  }
}

export default new UserService();
