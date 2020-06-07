import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from 'reactstrap';
import React, { Component } from 'react';

import ApiService from '../../apiService/ApiService';
import { dateConverter } from '../utils/DateConverter';
import { RefreshConsumer } from '../contexts/EventContext';
import '../../assets/css/table.css';
export class EventListComponent extends Component {
  constructor(props) {
    super(props);
    this.eventCount = [0, 0, 0];
    this.state = {
      events: [],
      messages: null,
    };
  }

  componentDidMount() {
    this.reloadUserList(1, 100);
    this.props.setValue(this.reloadUserList);
  }

  reloadUserList = (start, end) => {
    ApiService.fetchEvents(start, end)
      .then((res) => {
        const filterData = res.data.map((element) => ({
          ...element,
          judge: this.eventState(element.event_start, element.event_end),
        }));
        filterData.forEach((event) => {
          this.eventCount[event.judge] += 1;
        });
        this.props.counter(this.eventCount);
        this.setState({ events: filterData });
      })
      .catch((err) => console.log('reloaEventList() Error!', err));
  };

  //eventStateJudge
  eventState = (start, end) => {
    //현재 날짜
    const now = new Date().getTime();
    //현재 날짜 < 시작날짜 :진행예정
    if (now < start) {
      return 0;
    } else if (now > start) {
      if (now < end) {
        return 1;
      }
      return 2;
    }
  };

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-sm">
          <thead className="thead-light">
            <tr>
              <th scope="col">번호</th>
              <th scope="col">쿠폰번호</th>
              <th scope="col">이벤트이름</th>
              <th scope="col">등록일</th>
              <th scope="col">시작일/종료일</th>
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
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <td className="table-info">{startDate}</td>
                        </tr>
                        <tr>
                          <td className="table-warning">{endDate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td>
                    {event.judge === 0 ? (
                      <Badge color="dark" pill>
                        진행예정
                      </Badge>
                    ) : event.judge === 1 ? (
                      <Badge color="success" pill>
                        진행중
                      </Badge>
                    ) : (
                      <Badge color="warning" pill>
                        종료
                      </Badge>
                    )}
                  </td>
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
        </table>
      </div>
    );
  }
}

const SendsContainer = (props) => (
  <RefreshConsumer>
    {({ state, actions }) => (
      <EventListComponent setValue={actions.setValue} {...props} />
    )}
  </RefreshConsumer>
);

export default SendsContainer;
