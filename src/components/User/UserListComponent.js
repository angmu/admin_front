import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
} from 'reactstrap';
import React, { Component } from 'react';
import ApiService from '../../apiService/ApiService';

export default class UserListComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      messages: null,
    };
  }

  componentDidMount() {
    this.reloadUserList();
  }

  reloadUserList = () => {
    ApiService.fetchUsers()
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => console.log('reloadUserList() Error!', err));
  };

  render() {
    return (
      <Table bordered responsive hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">이름</th>
            <th scope="col">비밀번호</th>
            <th scope="col">이메일</th>
            <th scope="col">이메일수신여부</th>
            <th scope="col">우편번호</th>
            <th scope="col">주소</th>
            <th scope="col">상세주소</th>
            <th scope="col">핸드폰번호</th>
            <th scope="col">전화번호</th>
            <th scope="col">SMS수신여부</th>
            <th scope="col">생년월일</th>
            <th scope="col">음력/양력</th>
            <th scope="col">보유포인트</th>
            <th scope="col">가입일</th>
            <th scope="col">탈퇴일</th>
          </tr>
        </thead>
        <tbody>
          {console.log(this.state.users)}
          {this.state.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.pw}</td>
              <td>{user.email}</td>
              <td>{user.email_check}</td>
              <td>{user.address1}</td>
              <td>{user.address2}</td>
              <td>{user.address3}</td>
              <td>{user.phone}</td>
              <td>{user.tel}</td>
              <td>{user.sms}</td>
              <td>{new Date(user.birth).toLocaleDateString()}</td>
              <td>{user.calender_check}</td>
              <td>{user.point}</td>
              <td>{new Date(user.join_date).toLocaleString()}</td>
              <td>
                {user.delete_date
                  ? new Date(user.delete_date).toLocaleString()
                  : null}
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
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem href={`info#${user.bid}`}>
                      상세정보
                    </DropdownItem>
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
          ))}
        </tbody>
      </Table>
    );
  }
}
