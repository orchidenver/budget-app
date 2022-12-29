import { Container, Navbar, Nav, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
    const navigate = useNavigate();
    const { logOut } = useAuth();

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
                        <Nav className="justify-content-end flex-grow-1 pe-5">
                            <Nav.Link className='p-3' onClick={() => navigate('/charts')}>Charts</Nav.Link>
                            <NavDropdown
                                title="Dropdown"
                                id={`offcanvasNavbarDropdown-expand-${'md'}`}
                                className='p-2'
                            >
                                <NavDropdown.Item className='w-50' onClick={navigate('/reset-password')}>Change Password</NavDropdown.Item>
                                <NavDropdown.Item className='w-50' onClick={logOut}>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
