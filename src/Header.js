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
		<Navbar color='light' light expand='md'>
			<div className="container">
				<NavbarBrand tag={Link} to='/'>Minhas Series</NavbarBrand>
				<NavbarToggler onClick={toggleNav} />

				<Collapse isOpen={open} navbar>
					<Nav className='ml-auto' navbar>
						<NavItem>
							<NavLink tag={Link} to='/generos'>Gêneros</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to='/series'>Series</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</div>
		</Navbar>
	);
}

export default Header;