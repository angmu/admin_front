import axios from 'axios';

const FRONT_SERVICE_URL = 'http://192.168.0.159:8181/';

class ApiService {
  fetchUsers() {
    return axios.get(FRONT_SERVICE_URL + 'admin/mlist');
  }
  fetchEvents(start, end) {
    return axios.get(FRONT_SERVICE_URL + `admin/elist/${start}/${end}`);
  }
  fetchCoupons() {
    return axios.get(FRONT_SERVICE_URL + `admin/couplist`);
  }

  addEvent(data) {
    return axios.post(FRONT_SERVICE_URL + `admin/elist`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  fetchNotices() {
    return axios.get(FRONT_SERVICE_URL + 'admin/nlist');
  }

  addNotice(data) {
    return axios.post(FRONT_SERVICE_URL + 'admin/nlist', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default new ApiService();
