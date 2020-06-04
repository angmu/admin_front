import React from 'react';

// reactstrap components
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
  UncontrolledTooltip,
} from 'reactstrap';
// core components
import ApiService from '../../apiService/ApiService';
import { dateConverter } from '../utils/DateConverter';

let rowStyle = {
  cursor: 'pointer',
};

class CouponList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
      messages: null,
      adjustCoupon: null,
    };
  }

  componentDidMount() {
    this.reloadUserList();
  }

  reloadUserList = () => {
    ApiService.fetchCoupons()
      .then((res) => {
        this.setState({ coupons: res.data });
      })
      .catch((err) => console.log('reloadCouponList() Error!', err));
  };

  handleClick = (coup) => {
    this.props.collectInfo(coup);
    this.props.toggle();
  };

  render() {
    return (
      <>
        {/* Page content */}
        <Container>
          {/* Table */}
          <Card className="shadow">
            <Table hover className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">쿠폰번호</th>
                  <th scope="col">쿠폰이름</th>
                  <th scope="col">쿠폰타입</th>
                  <th scope="col">할인금액</th>
                  <th scope="col">시작일</th>
                  <th scope="col">종료일</th>
                </tr>
              </thead>
              <tbody>
                {this.state.coupons.map((coup) => (
                  <tr
                    key={coup.coupon_num}
                    onClick={(e) => this.handleClick(coup)}
                    style={rowStyle}
                    onMouseOver={this.handleOver}
                  >
                    <td>{coup.coupon_num}</td>
                    <td>{coup.coupon_name}</td>
                    <td>{coup.coupon_type}</td>
                    <td>{coup.coupon_pay}</td>
                    <td>{dateConverter(coup.startday)}</td>
                    <td>{dateConverter(coup.endday)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* 페이지네이션 */}
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-end mb-0"
                  listClassName="justify-content-end mb-0"
                >
                  <PaginationItem className="disabled">
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      tabIndex="-1"
                    >
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="active">
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      2 <span className="sr-only">(current)</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
          </Card>
        </Container>
      </>
    );
  }
}

export default CouponList;
