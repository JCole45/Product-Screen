import React, { useState, useEffect } from 'react'
import Rating from '../components/Rating'
import { Row, Col, Image, ListGroup, Card, Button, Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, editProductInCart } from '../actions/productAction'
import Message from '../components/Message'
import { Drawer } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import item_images from '../images'




const ProductDetails = ({ history, location, match }) => {
    const dispatch = useDispatch()
    
    const [name, setName] = useState('Harbor Fleece Shep Shirt')
    const [price, setPrice] = useState(138)
    const [qty, setQty] = useState(1)
    const [color, setColor] = useState()
    const [size, setSize] = useState()
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ error: false, message: '' })
    const [successMessage, setSuccessMessage] = useState({ success: false, message: '' })
    const [showCartItems, setShowCartItems] = useState(false)
    
    
    const cart = useSelector(state => state.addToCart)
    const { cartItems } = cart
    
    const setEditInfo = (item) => {
        setName(item.name)
        setPrice(item.price)
        setQty(item.quantity)
        setColor(item.color)
        setSize(item.size)
    }
    
    const colors = ['red', 'yellow', 'green', 'blue', 'white']
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    
    const onClose = () => {
        setVisible(false);
    };
    
    const showDrawer = () => {
        if (!color) {
            setErrorMessage({ error: true, message: 'Select color of item' })
            onClose()
        }
        if (!size) {
            setErrorMessage({ error: true, message: 'Select size of item' })
            onClose()
        }
        if (qty <= 0) {
            setErrorMessage({ error: true, message: 'Item quantity cannot be 0' })
            onClose()
        }
        if (color && size && qty > 0) {
            setVisible(true);
            setErrorMessage({ error: false, message: '' })
        }
    };
    const hideDrawer = () => {
        setVisible(false)
    }
    
    const handleInputField = (e) => {
        let code = /^[0-9]*$/i
        if (e.target.value.match(code)) {
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
                images: item_images[color],
                delivery: 1
            }))
            history.push('/cart')
        }
    }
    
    const handleShowCartItems = () => {
        setShowCartItems(!showCartItems)
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
        cursor: 'pointer',
        marginTop: '10px'
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
                        <Image src={color && item_images[color][0]} alt={'shirt'} fluid />
                    </Col>

                    <Col md={7}>
                        <Row>
                            <h5 className="draw-name"> Harbor Fleece Shep Shirt </h5>
                        </Row>
                        <Row>
                            <span className="draw-price">${price.toFixed(2)}</span>
                        </Row>
                        <Row>
                            <span className="draw-color">{color && color}/{size && size}</span>
                        </Row>
                        <Row>
                            <span className="draw-quantity">Qty:{qty}</span>
                        </Row>
                    </Col>
                </Row>

                <Row style={drawRowStyle} onClick={handleShowCartItems}>
                    {cartItems.length} Additional Items in Bag
                    {showCartItems ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
                </Row>

                {showCartItems &&
                    <Row>
                        <ListGroup>
                            {
                                cartItems.map((item, i) => (
                                    <ListGroup.Item key={i}>
                                        <Row >
                                            <Col md={3}>
                                                <Image src={color && item.images[0]} alt={'shirt'} fluid />
                                            </Col>

                                            <Col md={7}>
                                                <Row>
                                                    <span className="name-field">{item.name}</span>
                                                </Row>
                                                <Row>
                                                    <span className="price-field">${item.price.toFixed(2)}</span>
                                                </Row>
                                                <Row>
                                                    <span className="color-field">{item.color}/{item.size} </span>
                                                </Row>
                                                <Row>
                                                    <span className="color-field">Ship to me </span>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Row>
                }

                <Row>
                    <Col style={drawColStyle} >
                        <span>Cart Subtotal</span>
                        <span>
                            ${cartItems && cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                        </span>
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
                    {successMessage.success && <Message variant="success">  {successMessage.message}</Message>}
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
                                        <span key={i} onClick={() => handleColor(available_color)} className={color === available_color ? `color-button-selected ${available_color}` : `color-button ${available_color}`}></span>
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
                                    <span className="decrease" onClick={handleDecrease}> <i className="fas fa-minus"></i> </span>
                                    <input value={qty} onChange={handleInputField} className="item-number-input"></input>
                                    <span className="increase" onClick={handleIncrease}> <i className="fas fa-plus"></i></span>

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

                    <Row>
                        <Col md={6}>
                            <h3>Reviews</h3>
                            <ListGroup variant='flush'>
                                {cartItems.map((review, i) => (
                                    <ListGroup.Item key={i}>
                                        <Rating value={4} color="#1176bb" />
                                        <p>I wasnt sure if this would be liked due to the material however it was immediately put on and loved!</p>
                                    </ListGroup.Item>
                                ))}

                            </ListGroup>
                        </Col>
                    </Row>

        </>
    )
}

export default ProductDetails
