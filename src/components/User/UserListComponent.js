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
      <Table>
        <thead>
          <tr>
            <th scope="col">글번호</th>
            <th scope="col">글제목</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
            <th scope="col">조회수</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {console.log(this.state.users)}
          {this.state.users.map((user) => (
            <tr key={user.bid}>
              <td>{user.bid}</td>
              <td>{user.btitle}</td>
              <td>{user.bname}</td>
              <td>{new Date(user.bdate).toLocaleString()}</td>
              <td>{user.bhit}</td>
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
