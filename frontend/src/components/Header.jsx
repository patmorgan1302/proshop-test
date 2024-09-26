import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(resetCart());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>YoungLadCo The Store
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <SearchBox />
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <FaShoppingCart />{" "}Cart
                                        {cartItems.length > 0 && (
                                    <Badge pill bg='danger' style={{marginLeft: '5px'}}>
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                <Nav.Link href="/login">
                                    <FaUser />{" "}Login
                                </Nav.Link>
                            </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                     <NavDropdown.Item as={Link} to='/admin/productlist'>
                                        Products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/orderlist'>
                                        Orders
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/userlist'>
                                        Users
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
};

export default Header;