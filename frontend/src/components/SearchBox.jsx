import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
    const navigate = useNavigate();
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            setKeyword('');
            navigate(`/search/${keyword}`)
        } else {
            navigate('/');
        }
    }

    return (
        <Form onSubmit={ submitHandler } className='d-flex py-3'> 
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder='Search Products...'
                className='mr-sm-4 ml-sm-5'
                style={{ width: '200px', height: '30px', marginTop: '3px'}}
                >

                </Form.Control>
                <FaSearch style={{ marginTop: '10px', marginLeft: '6px', marginRight: '15px'}}
                    
                />
        </Form>
    )
};

export default SearchBox;