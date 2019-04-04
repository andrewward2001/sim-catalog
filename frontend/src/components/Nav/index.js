import React, { Component } from 'react'

import { NavLink, withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

class SimCatalogNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      navOpaque: false,
      isHome: false
    }
    
    this.scrollListener = this.scrollListener.bind(this)
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener)
    
    if (this.props.location.pathname === '/') {
      this.setState({
        isHome: true
      })
    } else {
      this.setState({
        isHome: false
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener)
  }

  componentDidUpdate() {
    if (this.props.location.pathname === '/' && this.state.isHome === false) {
      this.setState({
        isHome: true
      })
    } else if (this.props.location.pathname !== '/' && this.state.isHome === true) {
      this.setState({
        isHome: false
      })
    }
  }

  scrollListener() {
    const scrollPos = document.body.scrollTop || document.documentElement.scrollTop
    if(scrollPos > 30 && this.state.isHome === true) {
      this.setState({
        navOpaque: true
      })
    } else {
      this.setState({
        navOpaque: false
      })
    }
  }

  render() {
    return (
      <Navbar id="main-nav" collapseOnSelect expand="lg" sticky={this.state.isHome ? 'top' : ''} fixed={this.state.isHome ? '' : 'top'} className={this.state.navOpaque ? 'top' : ''}>
        <Container>
          <Navbar.Brand href="/">sim-catalog</Navbar.Brand>
          <Navbar.Toggle aria-controls="sim-catalog-nav" />
          <Navbar.Collapse id="sim-catalog-nav">
            <Nav className="mr-auto">
              <Nav.Item><NavLink to="/aircraft">Aircraft</NavLink></Nav.Item>
              <Nav.Item><NavLink to="/airports">Airports</NavLink></Nav.Item>
              <NavDropdown title="Regions">
                <NavLink className="dropdown-item" to="/regions/north-america">North America</NavLink>
                <NavLink className="dropdown-item" to="/regions/south-america">South America</NavLink>
                <NavLink className="dropdown-item" to="/regions/pacific">Pacific</NavLink>
                <NavLink className="dropdown-item" to="/regions/europe">Europe</NavLink>
                <NavLink className="dropdown-item" to="/regions/africa">Africa</NavLink>
                <NavLink className="dropdown-item" to="/regions/asia">Asia</NavLink>
                <NavLink className="dropdown-item" to="/regions/oceania">Oceania</NavLink>
                <NavLink className="dropdown-item" to="/regions/other">Other</NavLink>
              </NavDropdown>
              <Nav.Item><NavLink to="/freeware">Freeware</NavLink></Nav.Item>
            </Nav>
            <Form inline id="nav-search">
              <FormControl type="text" placeholder="Search" />
              <Button type="submit">Submit</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

const NavWithRouter = withRouter(props => <SimCatalogNav {...props}></SimCatalogNav>)

export default NavWithRouter