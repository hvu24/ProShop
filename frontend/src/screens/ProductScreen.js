import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen({ match }) {
    const history = useNavigate();
    const [qty, setQty] = useState(1)
    const {id} = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    // const product = products.find((p) => p._id === id)
    // const [product, setProduct] = useState([])

    useEffect(() => {
        // async function fetchProducts() {
        //     const { data } = await axios.get(`/api/products/${id}`)
        //     setProduct(data)
        // }

        // fetchProducts()
        dispatch(listProductDetails(id))
    }, [dispatch])

    const addToCartHandler = () => {
        history(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item variant='flush'>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>${product.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x)=>(
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                        className='btn-block'
                                        disabled={product.countInStock === 0}
                                        type='button'
                                        onClick={addToCartHandler}
                                        >Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
            }
        </div>
    )
}

export default ProductScreen
