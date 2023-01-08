import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown, Offcanvas, Dropdown, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBudgets } from '../contexts/BudgetContext';
import { getMonthsAndYearsFromExpenses } from '../utils/getMonthsAndYearsFromExpenses';
import { getBudgets } from '../utils/getBudgets';
import '../App.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        ref={ref}
        className='select'
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

export default function NavBar() {
    const navigate = useNavigate();
    const { currentUser, logOut } = useAuth();
    const { expenses, budgets } = useBudgets();

    return (
        <Navbar key={'md'} bg="primary" expand={'md'} className="mb-3" variant="dark">
            <Container fluid>
                <Navbar.Brand onClick={() => navigate('/')}>BUDGET APP</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            BUDGET APP
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {currentUser ? (
                            <Nav className="justify-content-end flex-grow-1 pe-5">
                                <Nav.Item className='p-3'>
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                            Select year
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu as={CustomMenu}>
                                            {
                                                getMonthsAndYearsFromExpenses(expenses, 'year').map(year => <Dropdown.Item key={year} eventKey="1">{year}</Dropdown.Item>)
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav.Item>
                                <Nav.Item className='p-3'>
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                            Select month
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu as={CustomMenu}>
                                            {
                                                getMonthsAndYearsFromExpenses(expenses, 'month').map(month => <Dropdown.Item key={month} eventKey="1">{month}</Dropdown.Item>)
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav.Item>
                                <Nav.Item className='p-3'>
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                            Select budget
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu as={CustomMenu}>
                                            {
                                                getBudgets(budgets).map(budget => <Dropdown.Item key={budget} eventKey="1">{budget}</Dropdown.Item>)
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav.Item>
                                <Nav.Link className='p-3' onClick={() => navigate('/chart')}>Chart</Nav.Link>
                                <NavDropdown
                                    title={currentUser?.displayName}
                                    id={`offcanvasNavbarDropdown-expand-${'md'}`}
                                    className='p-2'
                                >
                                    <NavDropdown.Item className='w-50' onClick={() => navigate('/reset-password')}>Change Password</NavDropdown.Item>
                                    <NavDropdown.Item className='w-50' onClick={logOut}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : null}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}