import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap';

function Header() {
  const [open, setOpen] = useState(false); 

  const toggleNav = () => {
    setOpen(!open);
  }

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarBrand tag={Link} to='/'>Minhas Series</NavbarBrand>
        <NavbarToggler onClick={toggleNav}/>

        <Collapse isOpen={open} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/generos'>Gêneros</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;