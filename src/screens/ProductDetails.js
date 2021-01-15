import React, { useState } from 'react'
import Rating from '../components/Rating'
import { Row, Col, Image, ListGroup, Card, Button, Carousel, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../actions/productAction'
import Message from '../components/Message'
import { Drawer } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import item_images from '../images'

const ProductDetails = ({ history }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('Harbor Fleece Shep Shirt')
    const [qty, setQty] = useState(1)
    const [color, setColor] = useState()
    const [size, setSize] = useState()
    const [price, setPrice] = useState(138)
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ error: false, message: '' })

    const colors = ['red', 'yellow', 'green', 'blue', 'white']
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    const showDrawer = () => {
        if (!color) {
            setErrorMessage({ error: true, message: 'Select color of item' })
            onClose()
        }
        if (!size) {
            setErrorMessage({ error: true, message: 'Select size of item' })
            onClose()
        }
        if (color && size) {
            setVisible(true);
        }
    };
    const hideDrawer = () => {
        setVisible(false)
    }

    const onClose = () => {
        setVisible(false);
    };

    const handleInputField = (e) => {
        if (Number(e.target.value)) {
            setQty(Number(e.target.value))
        }
    }

    const handleIncrease = (e) => {
        setQty(qty + 1)
    }

    const handleDecrease = (e) => {
        if (qty > 1) {
            setQty(qty - 1)
        }
    }

    const handleColor = (selected_color) => {
        setColor(selected_color)
        setErrorMessage({ error: false, message: '' })
    }

    const handleItemSize = (item_size) => {
        setSize(item_size)
        setErrorMessage({ error: false, message: '' })
    }

    const handleAddToCart = () => {
        if (!color) {
            setErrorMessage({ error: true, message: 'Select color of item' })
            onClose()
        }
        if (!size) {
            setErrorMessage({ error: true, message: 'Select size of item' })
            onClose()
        }
        if (color && size) {
            setErrorMessage({ error: false, message: '' })
            dispatch(addProductToCart({
                _id: uuidv4(),
                name: name,
                quantity: qty,
                size: size,
                price: price,
                color: color,
                images: item_images[color]
            }))
            history.push('/cart')
        }
    }

    const headerStyle = {
        background: '#002b5c',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white !important',
        fontWeight: 'bolder'
    }

    const bodyStyle = {
        padding: '15px'
    }

    const drawRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        color: '#002b5c',
        fontWeight: '600',
        background: '#f7f7f7',
    }

    const drawColStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        color: '#002b5c',
        fontWeight: '600',
        borderBottom: '1px solid #dcdcdc',
        textTransform: 'uppercase'
    }

    const buttonStyle = {
        background: '#002b5c',
        borderRadius: '0',
        height: '40px',
        fontWeight: '900',
        border: '1px solid #002b5c',
        textTransform: 'uppercase',
    }

    return (
        <>
            <Drawer
                title="Item added to Cart"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                zIndex={10000000}
                headerStyle={headerStyle}
                bodyStyle={bodyStyle}
            >
                <Row>
                    <Col md={5}>
                        <Image src={'https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} alt={'shirt'} fluid />
                    </Col>

                    <Col md={7}>

                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <h5> Harbor Fleece Shep Shirt </h5>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>${price.toFixed(2)}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Qty:{qty}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>{color && color}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                </Row>

                <Row style={drawRowStyle}>
                    1 Additional Items in Bag
                    <i className="fas fa-plus"></i>
                </Row>

                <Row>
                    <Col style={drawColStyle} >
                        <span>Cart Subtotal</span>
                        <span>${price.toFixed(2)}</span>
                    </Col>
                </Row>

                <Row style={{ padding: '20px 20px 0px 20px', marginBottom: '8px' }}>
                    <Button
                        className='btn-block'
                        type='button'
                        onClick={handleAddToCart}
                        style={buttonStyle}
                    >
                        CHECKOUT
                    </Button>
                </Row>

                <Row style={{ padding: '0px 20px 0px 20px' }}>
                    <Button
                        className='btn-block'
                        type='button'
                        onClick={hideDrawer}
                        style={{ background: 'white', color: '#002b5c', borderRadius: '0', height: '40px', fontWeight: '900', border: '1px solid #002b5c' }}
                    >
                        CONTINUE SHOPPING
                    </Button>
                </Row>
            </Drawer>

            <Row>
                <Col md={6}>
                    <Carousel touch={true}>
                        {item_images[color ? color : 'red'].map((url, i) => (
                            <Carousel.Item key={i}>
                                <img
                                    className="d-block w-100"
                                    src={url}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                        )}
                    </Carousel>

                </Col>

                <Col md={5}>
                {errorMessage.error && <Message variant="danger"> <i style={{ color: 'red' }} className="fas fa-times"></i> {errorMessage.message}</Message>}
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2> Harbor Fleece Shep Shirt </h2>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Row className>
                            <Rating value={4.5} text={'64 reviews'} color={'#1176bb'} />
                        </Row>
                    </ListGroup.Item>

                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>${price.toFixed(2)}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    {colors.map((available_color, i) => (
                                        <>
                                            <span key={i} onClick={() => handleColor(available_color)} className={color === available_color ? `color-button-selected ${available_color}` : `color-button ${available_color}`}></span>
                                        </>
                                    ))}
                                </Row>
                                <Row> <span style={{ fontSize: '10px', color: '#1176bb' }}>color: {color}</span></Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className>
                                    {sizes.map((product_size, i) => (
                                        <span key={i} onClick={() => handleItemSize(product_size)} className={size === product_size ? "size-button-selected" : "size-button"}>{product_size}</span>
                                    ))}
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col className="stock">
                                        {'In Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row className>
                                    <span className="decrease" onClick={handleDecrease}> - </span>
                                    <input value={qty} onChange={handleInputField} className="item-number-input"></input>
                                    <span className="increase" onClick={handleIncrease}> + </span>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    onClick={showDrawer}
                                    style={buttonStyle}
                                >
                                    Add to Bag
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>

                </Col>

                <Col md={3}>
                </Col>

            </Row>

            <Row className="details-section">
                <Col md={6}>
                    <Row className="title">The Details</Row>
                    <Row className="details">
                        Our original fleece in our signature Shep Shirt style. Made from soft, recycled fabric this fleece will be your new go-to layer for the fall, winter and spring. (So, you might want to get a few.)
                        Our original fleece in our signature Shep Shirt style. Made from soft, recycled fabric this fleece will be your new go-to layer for the fall, winter and spring. (So, you might want to get a few.)
                    </Row>
                </Col>

                <Col md={4}>
                </Col>
            </Row>
        </>
    )
}

export default ProductDetails
