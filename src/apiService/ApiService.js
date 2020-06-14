import axios from 'axios';

const FRONT_SERVICE_URL = 'http://localhost:8181/';

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
  //상품리스트
  fetchProductList() {
    return axios.get(FRONT_SERVICE_URL + 'admin/plist');
  }

  //상품카테고리1
  fetchProductCate1() {
    return axios.get(FRONT_SERVICE_URL + 'admin/plist/category/1');
  }

  //상품카테고리2
  fetchProductCate2() {
    return axios.get(FRONT_SERVICE_URL + 'admin/plist/category/2');
  }

  //상품등록
  addProduct(data) {
    return axios.post(FRONT_SERVICE_URL + 'admin/plist', data);
  }

  //연관상품 목록
  fetchRelatedProduct() {
    return axios.get(FRONT_SERVICE_URL + 'admin/rplist');
  }

  //연관상품 등록
  addRelatedProduct(data) {
    return axios.post(FRONT_SERVICE_URL + 'admin/rplist', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //연관상품 삭제
  SetNUllRelatedProduct(data) {
    return axios.put(FRONT_SERVICE_URL + 'admin/rplist', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //카테고리1 등록
  addProductCate1(data) {
    return axios.post(FRONT_SERVICE_URL + 'admin/plist/category/1', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //카테고리2 등록
  addProductCate2(data) {
    return axios.post(FRONT_SERVICE_URL + 'admin/plist/category/2', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //카테고리1 삭제
  deleteProductCate1(data) {
    return axios.delete(FRONT_SERVICE_URL + `admin/plist/category/1/${data}`);
  }

  //카테고리2 삭제
  deleteProductCate2(data) {
    return axios.delete(FRONT_SERVICE_URL + `admin/plist/category/2/${data}`);
  }

  //시리얼 넘버
  fetchSerialNumber() {
    return axios.get(FRONT_SERVICE_URL + 'admin/plist/serial');
  }
}

export default new ApiService();
