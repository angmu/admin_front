import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledCollapse,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // creates the links that appear in the left menu / Sidebar
  createLinks = ({name, path, icon},key) => {
      return (
          <NavItem key={key}>
            <NavLink
              to={"/admin" + path}
              tag={NavLinkRRD}
              onClick={this.closeCollapse}
              activeClassName="active"
            >
              <i className={icon[0]} />
              <div className="pr-2">{name}</div>
              {icon.length > 1 ? <i className={icon[1]} />: ""}
            </NavLink>
          </NavItem>
        );
  };

  createLinkRecur = (routes,key) => {
    const submenu = routes.submenu;
    if(submenu && submenu.length >0){
      return(
        <div key={key}>
          <div id={`toggler${key}`}>
            {this.createLinks(routes,key)}
          </div>
          <UncontrolledCollapse toggler={`#toggler${key}`}>
             {submenu.map(this.createLinks.bind(this))}
          </UncontrolledCollapse>
        </div>
      )
    }
    else{
      return this.createLinks(routes,key);
    }
  }


  render() {
    const { routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-2" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* Collapse */}
          <Collapse navbar>
            {/* Navigation */}
            <h6 className="navbar-heading text-muted">ADMIN MENU</h6>
            {/* Divider */}
            <hr className="my-3"/>
            {/* Heading */}
            <Nav navbar>{routes.map(this.createLinkRecur.bind(this))}</Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
