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

  //시리얼 넘버 다 가져오기
  fetchSerialNumber() {
    return axios.get(FRONT_SERVICE_URL + 'admin/plist/serial');
  }

  //상품 삭제
  deleteProduct(data) {
    return axios.delete(FRONT_SERVICE_URL + `admin/plist/${data}`);
  }

  //상품 수정
  updateProduct(data) {
    return axios.post(FRONT_SERVICE_URL + `admin/plistp`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //메인상품 갖고오기
  fetchMainProduct() {
    return axios.get(FRONT_SERVICE_URL + 'admin/mplist');
  }

  //메인상품 업데이트하기
  updateMainProduct(data) {
    return axios.put(FRONT_SERVICE_URL + `admin/mplist`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //상품문의글 불러오기
  fetchProductQuestion() {
    return axios.get(FRONT_SERVICE_URL + 'admin/pqlist');
  }

  //상품 답변글 불러오기
  fetchProductAnswer(num) {
    return axios.get(FRONT_SERVICE_URL + `admin/pqalist`);
  }

  //상품 답변글 작성
  addProductAnswer(data) {
    return axios.post(FRONT_SERVICE_URL + 'admin/pqalist', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //상품 답변 업데이트
  updateProductAnswer(data) {
    return axios.put(FRONT_SERVICE_URL + 'admin/pqalist', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //상품 답변 삭제
  deleteProductAnswer(code) {
    return axios.delete(FRONT_SERVICE_URL + `admin/pqalist/${code}`);
  }

  //1:1문의 불러오기
  fetchQuestion() {
    return axios.get(FRONT_SERVICE_URL + 'admin/qlist');
  }

  //1:1문의 답변불러오기
  fetchAnswer() {
    return axios.get(FRONT_SERVICE_URL + 'admin/alist');
  }

  //1:1문의 답변 등록
  addAnswer(data) {
    return axios.post(FRONT_SERVICE_URL + 'admin/alist', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //1:1문의답변 삭제
  deleteAnswer(code) {
    return axios.delete(FRONT_SERVICE_URL + `admin/alist/${code}`);
  }

  //1:1문의답변 수정
  updateAnwser(data) {
    return axios.put(FRONT_SERVICE_URL + 'admin/alist', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //1:1문의 질문분류 가져오기
  fetchQType() {
    return axios.get(FRONT_SERVICE_URL + 'admin/aqlist');
  }

  //review 목록 가져오기
  fetchReivew() {
    return axios.get(FRONT_SERVICE_URL + 'admin/rlist');
  }

  //review 답변 작성
  addReviewAnswer(data) {
    return axios.patch(FRONT_SERVICE_URL + 'admin/rlist', data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //review 답변 삭제
  removeReviewAnswer(key) {
    return axios.patch(FRONT_SERVICE_URL + `admin/rlist/${key}`);
  }

  //review 에 대한 상품정보
  fetchReviewProduct(key) {
    return axios.get(FRONT_SERVICE_URL + `admin/rlistp/${key}`);
  }

  //faq 가져오기
  fetchFaq() {
    return axios.get(FRONT_SERVICE_URL + 'admin/faqlist');
  }

  //order 내역 가져오기
  fetchOrder() {
    return axios.get(FRONT_SERVICE_URL + 'admin/olist');
  }

  //orderList 내역 가져오기
  fetchOrderList() {
    return axios.get(FRONT_SERVICE_URL + `admin/ollist`);
  }

  //orderProductList 목록 불러오기
  fetchOrderPList() {
    return axios.get(FRONT_SERVICE_URL + 'admin/olplist');
  }

  //orderStatus 변경하기
  updateOStatus(code, value) {
    return axios.patch(FRONT_SERVICE_URL + `admin/olist/${code}/${value}`);
  }

  //order에 대한 payment 정보 가져오기
  fetchPaymentInfo(key) {
    return axios.get(FRONT_SERVICE_URL + `admin/paylist/${key}`);
  }

  //order에 대한 payee 정보 가져오기
  fetchPayeeInfo(key) {
    return axios.get(FRONT_SERVICE_URL + `admin/payeelist/${key}`);
  }

  //반품리스트 가져오기
  fetchChangeList(){
    return axios.get(FRONT_SERVICE_URL + 'admin/clist');
  }

  //반품상태 업데이트
  updateCStatus(code, val1, val2){
    return axios.patch(FRONT_SERVICE_URL + `admin/clist/${code}/${val1}/${val2}`);
  }

  //모든 배너정보 가져오기
  fetchBannerList(){
    return axios.get(FRONT_SERVICE_URL + 'admin/blist');
  }
}

export default new ApiService();
