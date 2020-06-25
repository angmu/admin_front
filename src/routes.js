import Index from 'views/analysis/Index.js';
import Profile from 'views/basic/Profile.js';
import Tables from 'views/board/Tables.js';
import Member from 'views/member/Member.js';

//MEMBER
import MemberList from 'views/member/MemberList.js';

//////////////////////////////////////////////////////////////////
//PRODUCT
import ProductWrap from 'views/product/ProductWrap';
//RELATED PRODUCT
import RelatedProduct from 'views/product/RelatedProduct';
//MAIN PORUDCT
import MainProduct from 'views/product/MainProduct';
//PRODUCT QUESTION
import ProductQnA from 'views/product/ProductQnA';
//CATEGORY
import Category from 'views/category/Category';

//////////////////////////////////////////////////////////////////
//EVENT
import EventList from 'views/board/EventList';
//NOTICE
import NoticeWrap from 'views/board/NoticeWrap';
//QNA
import OneOneQnA from 'views/board/OneOneQnA';
//REVIEW ANSWER
import ReviewA from 'views/board/ReviewA';
//FAQ
import FAQ from 'views/board/FAQ';


/////////////////////////////////////////////////////////////////////
//ORDER
import OrderList from 'views/order/OrderList';
//RETURN (반품)
import Return from './views/order/Return';

/////////////////////////////////////////////////////////////////////
//Banner
import Banner from 'views/basic/Banner';

var routes = [
  {
    path: '/index',
    name: 'Analysis',
    icon: ['ni ni-chart-bar-32 text-primary'],
    component: Index,
    submenu: null,
  },
  {
    path: '/member',
    name: '회원관리',
    icon: ['ni ni-single-02', 'ni ni-bold-down'],
    component: Member,
    submenu: [
      {
        path: '/member/list',
        name: '회원리스트',
        icon: ['ni ni-fat-delete'],
        component: MemberList,
        submenu: null,
      },
      {
        path: '/member',
        name: '회원메일발송',
        icon: ['ni ni-fat-delete'],
        component: Member,
        submenu: null,
      },
      {
        path: '/member',
        name: '회원포인트관리',
        icon: ['ni ni-fat-delete'],
        component: Member,
        submenu: null,
      },
      {
        path: '/member',
        name: '회원쿠폰관리',
        icon: ['ni ni-fat-delete'],
        component: Member,
        submenu: null,
      },
    ],
  },
  {
    path: '/product',
    name: '상품관리',
    icon: ['ni ni-basket text-success', 'ni ni-bold-down'],
    component: Index,
    submenu: [
      {
        path: '/product/crud',
        name: '상품등록/수정',
        icon: ['ni ni-fat-delete'],
        component: ProductWrap,
        submenu: null,
      },
      {
        path: '/product/related',
        name: '연관상품등록',
        icon: ['ni ni-fat-delete'],
        component: RelatedProduct,
        submenu: null,
      },
      {
        path: '/product/category',
        name: '카테고리관리',
        icon: ['ni ni-fat-delete'],
        component: Category,
        submenu: null,
      },
      {
        path: '/product/main',
        name: '메인노출상품',
        icon: ['ni ni-fat-delete'],
        component: MainProduct,
        submenu: null,
      },
      {
        path: '/product/qna',
        name: '상품문의답변',
        icon: ['ni ni-fat-delete'],
        component: ProductQnA,
        submenu: null,
      },
    ],
  },
  {
    path: '/order',
    name: '주문관리',
    icon: ['ni ni-credit-card text-danger', 'ni ni-bold-down'],
    component: Index,
    submenu: [
      {
        path: '/order/list',
        name: '전체주문목록',
        icon: ['ni ni-fat-delete'],
        component: OrderList,
        submenu: null,
      },
      {
        path: '/order/return',
        name: '반품/교환',
        icon: ['ni ni-fat-delete'],
        component: Return,
        submenu: null,
      },
    ],
  },
  {
    path: '/board',
    name: '게시글관리',
    icon: ['ni ni-bullet-list-67 text-red', 'ni ni-bold-down'],
    component: Tables,
    submenu: [
      {
        path: '/board/notice',
        name: '공지사항관리',
        icon: ['ni ni-fat-delete'],
        component: NoticeWrap,
        submenu: null,
      },
      {
        path: '/board/event',
        name: '이벤트글관리',
        icon: ['ni ni-fat-delete'],
        component: EventList,
        submenu: null,
      },
      {
        path: '/board/qna',
        name: '1:1문의 답변',
        icon: ['ni ni-fat-delete'],
        component: OneOneQnA,
        submenu: null,
      },
      {
        path: '/board/reviewA',
        name: '리뷰 답변',
        icon: ['ni ni-fat-delete'],
        component: ReviewA,
        submenu: null,
      },
      {
        path: '/board/FAQ',
        name: 'FAQ',
        icon: ['ni ni-fat-delete'],
        component: FAQ,
        submenu: null,
      },
    ],
  },
  {
    path: '/basic',
    name: '기본 설정',
    icon: ['ni ni-key-25 text-yellow', 'ni ni-bold-down'],
    component: Profile,
    submenu: [
      {
        path: '/member',
        name: '쿠폰관리',
        icon: ['ni ni-fat-delete'],
        component: Member,
        submenu: null,
      },
      {
        path: '/member',
        name: '추가배송비관리',
        icon: ['ni ni-fat-delete'],
        component: Member,
        submenu: null,
      },
      {
        path: '/basic/banner',
        name: '배너관리',
        icon: ['ni ni-fat-delete'],
        component: Banner,
        submenu: null,
      },
      {
        path: '/member',
        name: '팝업관리',
        icon: ['ni ni-fat-delete'],
        component: Member,
        submenu: null,
      },
      {
        path: '/member',
        name: '쇼핑몰설정',
        icon: ['ni ni-fat-delete'],
        component: Member,
        submenu: null,
      },
    ],
  },
];
export default routes;
