import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  CardBody,
  CardTitle,
} from 'reactstrap';
import React, { Component } from 'react';

import ApiService from '../../apiService/ApiService';
import { dateConverter } from '../utils/DateConverter';

export default class EventListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      messages: null,
    };
  }

  componentDidMount() {
    this.reloadUserList(1, 1);
  }

  reloadUserList = (start, end) => {
    ApiService.fetchEvents(start, end)
      .then((res) => {
        this.setState({ events: res.data });
      })
      .catch((err) => console.log('reloaEventList() Error!', err));
  };

  //eventStateJudge
  eventState = (start, end) => {
    //현재 날짜
    const now = new Date().toLocaleString();
    //현재 날짜 < 시작날짜 :진행예정
    if (now < start) {
      return (
        <Badge color="success">
          <strong>진행예정</strong>
        </Badge>
      );
    } else if (now > start) {
      if (now < end) {
        return (
          <Badge color="info">
            <strong>진행중</strong>
          </Badge>
        );
      }
      return (
        <Badge color="danger">
          <strong>종료</strong>
        </Badge>
      );
    }
  };

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">쿠폰번호</th>
            <th scope="col">이벤트이름</th>
            <th scope="col">등록일</th>
            <th scope="col">이벤트시작일</th>
            <th scope="col">이벤트종료일</th>
            <th scope="col">상태</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.events.map((event) => {
            const registDate = dateConverter(event.event_regist);
            const startDate = dateConverter(event.event_start);
            const endDate = dateConverter(event.event_end);

            return (
              <tr key={event.event_num}>
                <td>{event.event_num}</td>
                <td>{event.coupon_num}</td>
                <td>{event.event_title}</td>
                <td>{registDate}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>{this.eventState(startDate, endDate)}</td>
                <td className="text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      href="#pablo"
                      role="button"
                      size="sm"
                      color=""
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-edit fa-lg" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem href="#">상세정보</DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        편집
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
