import { Row, Col, Image, Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Message from '../components/Message';
import Meta from '../components/Meta';
import ContactForm from '../components/ContactForm';
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/linkedin'
import 'react-social-icons/twitter'
import 'react-social-icons/youtube'
import 'react-social-icons/github'
import ProductCarousel from '../components/ProductCarousel';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import BestFriends from './pictures/BestFriends.png'
import BirdMan from './pictures/BirdMan.png'
import RamHead from './pictures/RamHead.png'
import Canibals from './pictures/Canibals.png'



const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();

   const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

    return (
        <>
            <Meta title="Welcome To The Shop"/>
            { !keyword ? (
                 <Row style={{ marginBottom: '400px', marginTop: '100px'}}>
                    <Col md={4}>
                        <Image src={BirdMan} alt='Bird' style={{height:'auto', width:'100%'}} fluid />
                    </Col>
                    <Col md={8} style={{ marginTop: '56px'}}>
                        <h3 style={{ marginBottom: '23px'}}>lucas dicenzo, artist and designer. </h3>
                        <h1>WElCOME TO MY SITE. PLEASE TAKE A LOOK AROUND.</h1>
                        <div onClick={() => window.location.replace("/#products")}>
                        <button style={{marginTop: '10px'}}> view latest products </button>                         
                        </div>
                        
                    </Col>
                </Row>
            ) : 
             (<Link to='/' className='btn btn-light mb-4'>Back Home</Link>)}
            { isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{ error?.data?.message || error.error }</Message>
            ) : 
            (<>
                
                    <h2 id='products' className="py-3">latest products.</h2>
                    <Row>
                        {data.products.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                        ))}
                    </Row>

                    <div id="canibals">
                        <Image src={Canibals} alt='Bird' style={{height: 'auto', width:'100%' }} fluid />
                        <h2 id='products' className="py-3">top products.</h2>                    
                        <ProductCarousel />
                    </div>

                

                    <div id="best-friends">
                        <Image src={BestFriends} alt='Bird' style={{height: 'auto', width:'100%', marginBottom: '90px'}} fluid />
                    </div>
                    
                    <Row id="craft" class="py-3">
                        <Container className='py-3'>
                            <h2 style={{ textAlign: 'left', marginBottom: '53px', }}>my craft.</h2>
                            <p className="py-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a rutrum massa. Nullam ut lacinia magna. Ut massa risus, ornare ut dolor ut, efficitur molestie est. Nam in ante in est scelerisque porttitor. 
                            Ut vel elit nunc. Donec nec varius metus. Morbi vitae mi malesuada, semper ante id, dictum lacus. Etiam vel lobortis nisi. Aliquam velit odio, cursus vitae tincidunt quis, dapibus non mauris. Phasellus 
                            sollicitudin lacus sem, quis malesuada velit pretium sit amet. Vivamus pretium suscipit placerat. Vestibulum dictum, purus a tristique suscipit, quam felis condimentum ipsum, vitae porttitor tortor magna 
                            sed erat. Aenean sollicitudin eleifend nunc dictum eleifend.
                            </p>
                        </Container>
                    </Row>

                     <Row  id='contact' class="py-3">
                        <Container className='py-3'>
                            <h2 style={{ textAlign: 'left', marginBottom: '3px', marginTop: '122px' }}>contact.</h2>
                            <Row className='py-3' style={{ textAlign: 'left'}}>
                                <SocialIcon style={{ marginRight: '5px'}} url="www.linkedin.com" />
                                <SocialIcon style={{ marginRight: '5px'}} url="www.twitter.com" />
                                <SocialIcon style={{ marginRight: '5px'}} url="www.youtube.com" />
                                <SocialIcon url="www.github.com" />
                            </Row>
                            <h5 className="py-3" style={{ textAlign: 'left'}}>
                                <ContactForm />
                            </h5>
                        </Container>
                    </Row>

                    <footer>
                        <Image src={RamHead} alt='Bird' style={{height: 'auto', width:'100%'}} />
                    </footer>
                <Paginate
                    pages={data.pages}
                    page={data.page}
                    keyword={keyword ? keyword : ''}
                />
             </>) }

           
        </>
    )
};

export default HomeScreen;