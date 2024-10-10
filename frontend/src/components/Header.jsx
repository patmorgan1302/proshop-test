import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';
import './Header.css';

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
        <header style={{ backgroundColor: '#FFFBE6' }} className="my-1 shadow bg-white rounded">
            <Navbar expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>YNGLD.CO
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <SearchBox />
                            <LinkContainer to="/cart" style={{ marginTop: '15px' }}>
                                <Nav.Link>
                                    <FaShoppingCart />{" "}cart
                                        {cartItems.length > 0 && (
                                    <Badge pill bg='danger' style={{marginLeft: '5px'}}>
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            
                            {userInfo ? (
                                <>

                                <LinkContainer className='link-container' to='/'>
                                <Nav.Link onClick={() => window.location.replace("/#products")}>
                                    products
                                </Nav.Link>
                                </LinkContainer> 

                                <LinkContainer className='link-container' to='/'>
                                <Nav.Link onClick={() => window.location.replace("/#craft")}>
                                    my craft
                                </Nav.Link>
                                </LinkContainer> 

                                <LinkContainer className='link-container' to='/'>
                                <Nav.Link onClick={() => window.location.replace("/#contact")}>
                                    contact
                                </Nav.Link>
                                </LinkContainer> 

                                <NavDropdown title={userInfo.name} id='username' className="link-container">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                
                                </>
                             
                            ) : (

                                <>

                                <LinkContainer className="link-container" to="/login">
                                <Nav.Link href="/login">
                                    <FaUser />{" "}login
                                </Nav.Link>
                                </LinkContainer>

                                <LinkContainer className='link-container' to='/'>
                                <Nav.Link onClick={() => window.location.replace("/#products")}>
                                    products
                                </Nav.Link>
                                </LinkContainer> 

                                <LinkContainer className='link-container' to='/'>
                                <Nav.Link onClick={() => window.location.replace("/#craft")}>
                                    my craft
                                </Nav.Link>
                                </LinkContainer> 

                                <LinkContainer className='link-container' to='/'>
                                <Nav.Link onClick={() => window.location.replace("/#contact")}>
                                    contact
                                </Nav.Link>
                                </LinkContainer> 


                                </>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu' className='link-container'>
                                     <NavDropdown.Item as={Link} to='/admin/productlist'>
                                        products
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/orderlist'>
                                        orders
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/admin/userlist'>
                                        users
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