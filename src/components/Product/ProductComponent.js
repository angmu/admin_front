import React, { useState } from 'react';
import classnames from 'classnames';

import {
  Card,
  CardBody,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import ProductThumb from './ProductThumb';
import '../../assets/css/product.css';
import RegisterForm1 from './RegisterForm1';
import RegisterForm2 from './RegisterForm2';

export default function ProductComponent(props) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col md={4}>
            <strong>썸네일 이미지</strong>
            <ProductThumb />
          </Col>
          <Col md={8} style={{ margin: '0 auto' }}>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '1' })}
                    onClick={() => {
                      toggle('1');
                    }}
                  >
                    <h4>상품정보1</h4>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === '2' })}
                    onClick={() => {
                      toggle('2');
                    }}
                  >
                    <h4>상품정보2</h4>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <RegisterForm1 {...props} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <RegisterForm2 {...props} />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
