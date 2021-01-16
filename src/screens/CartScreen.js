import React, { useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Radio, Input } from 'antd';
import Message from '../components/Message'
import { editProductInCart, deleteCartItem, applyCoupon } from '../actions/productAction'

const CartScreen = () => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.addToCart)
    const { cartItems, coupon: available_coupon } = cart

    const [coupon, setCoupon] = useState('')
    const [value, setValue] = useState(1);
    const [errorMessage, setErrorMessage] = useState({ error: false, message: '' })

    const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const onChange = (e, item) => {
        setValue(e.target.value)
        dispatch(editProductInCart({
            ...item, delivery: e.target.value
        }))
    };

    const handleQuantity = (quantity, item) => {
        dispatch(editProductInCart({
            ...item, quantity: Number(quantity)
        }))
    }

    const handleDelivery = (delivery, item) => {
    }

    const handleDelete = (id) => {
        dispatch(deleteCartItem({ id }))
    }

    const handleCouponInput = (e) => {
        setErrorMessage({ error: false, message: '' })

        let code = /^[a-z0-9]*$/i
        if (e.target.value.match(code)) {
            setCoupon(e.target.value)
        }
    }

    const handleApplyCoupon = (coupon_number) => {
        if (coupon_number.length == 5) {
            dispatch(applyCoupon(coupon_number))
        } else {
            setErrorMessage({ error: true, message: 'Coupon must contain 5 characters' })
        }

    }

    const radioStyle = {
        display: 'block',
        height: '20px',
        lineHeight: '20px',
        fontSize: '11px',
        fontWeight: 'bolder',
    };

    const buttonStyle = {
        background: '#002b5c',
        borderRadius: '0',
        height: '40px',
        fontWeight: '900',
        border: '1px solid #002b5c',
        textTransform: 'uppercase',
    }

    const buttonStyleApply = {
        background: '#002b5c',
        borderRadius: '0',
        fontSize: '10px',
        fontWeight: '900',
        border: '1px solid #002b5c',
    }

    const buttonStyleRed = {
        background: '#d63855',
        borderRadius: '0',
        height: '40px',
        fontWeight: '900',
        border: '1px solid #d63855',
        textTransform: 'uppercase',
    }

    const buttonStyleSeaBlue = {
        background: '#1176bb',
        borderRadius: '0',
        height: '40px',
        fontWeight: '900',
        border: '1px solid #1176bb',
        textTransform: 'uppercase',
    }

    const headerStyle = {
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: '600'
    }

    return (
        <>
            <h1 style={{display:'flex', color: '#002b5c' }}> 
            My Bag <span className="number-circle">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span> 
            </h1>
            {cartItems && cartItems.length === 0 ?
                <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
                :
                (<>
                    <Row >
                        <Col md={8} style={{ background: '#f8f8f8' }}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item style={{ background: '#f8f8f8' }}>
                                    <Row>
                                        <Col md={5} style={headerStyle}>Item</Col>
                                        <Col md={1} style={headerStyle}>Unit Price</Col>
                                        <Col md={2} style={headerStyle}>Qty</Col>
                                        <Col md={2} style={headerStyle}>Delivery/Pickup</Col>
                                        <Col md={2} style={headerStyle}>Total Price</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                {cartItems && cartItems.map((item, i) => (
                                    <ListGroup.Item key={i}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.images[0]} alt={''} fluid rounded />
                                            </Col>
                                            <Col md={4}>
                                                <Row ><Link style={{ color: '#002b5c', fontWeight: 'bolder' }} to={`product`}>Harbor Fleece Shep Shirt</Link></Row>
                                                <Row>
                                                    <span className="cart-info"> <strong>Style</strong>: L9031</span>
                                                    <span className="cart-info"> <strong>Size</strong>: {item.size}</span>
                                                    <span className="cart-info"> <strong>Color</strong>: {item.color}</span>
                                                </Row>
                                                <Row style={{ marginTop: '5px' }}>
                                                    <Link to={`/edit/${item._id}`} className="cart-action-buttons"> <strong>Edit</strong></Link>
                                                    <span onClick={() => handleDelete(item._id)} className="cart-action-buttons"> <strong>Remove</strong></span>
                                                    <span className="cart-action-buttons"> <strong>Color</strong></span>
                                                </Row>
                                            </Col>
                                            <Col md={1}>
                                                <Row style={{ fontSize: '10px', fontWeight: 'bolder' }}>
                                                    UNIT PRICE
                                                </Row>
                                                <Row>
                                                    ${item.price.toFixed(2)}
                                                </Row>
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control style={{ width: '60px' }} as='select' onChange={(e) => handleQuantity(e.target.value, item)} value={item.quantity} >
                                                    {count.map(x => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Radio.Group onChange={(e) => onChange(e, item)} value={item.delivery} style={{ fontSize: '11px' }}>
                                                    <Radio style={radioStyle} value={1}>
                                                        Ship to Me
                                                    </Radio>
                                                    <Radio style={radioStyle} value={2}>
                                                        In-Store Pickup
                                                    </Radio>
                                                    <Radio style={radioStyle} value={3}>
                                                        Curbside Pickup
                                                    </Radio>
                                                </Radio.Group>

                                            </Col>
                                            <Col md={2} style={{ fontWeight: 'bolder', fontSize: '13px' }}>
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item style={{ background: '#002b5c', color: 'white', fontWeight: '900' }}>
                                        <Col>
                                            <Row>
                                                <h3 style={{ color: 'white' }}> Order Summary</h3>
                                            </Row>
                                            <Row>
                                                {cartItems && cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
                                            </Row>
                                        </Col>

                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Subtotal
                                            </Col>
                                            <Col>
                                                {!available_coupon ?
                                                    <>
                                                        <span className={"price"}>
                                                            ${cartItems && cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                                                        </span>
                                                    </>
                                                    :
                                                    <>
                                                        <span className={"old-price"}>${cartItems && cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
                                                        <span className={"price"}>${cartItems && cartItems.reduce((acc, item) => acc + item.quantity * item.price / 2, 0).toFixed(2)}</span>

                                                    </>
                                                }
                                                {available_coupon && <Row> <span className="red-text"> 50% Coupon applied </span></Row>}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Sales Tax
                                            </Col>
                                            <Col>$0.00</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={7}>
                                                <Input placeholder={"Enter coupon code"} type="text" value={coupon} onChange={handleCouponInput} style={{ width: '100%', marginLeft: 10 }} />
                                            </Col>
                                            <Col md={5}>
                                                <Button style={buttonStyleApply} type='button' className='btn-block' onClick={() => handleApplyCoupon(coupon)}>
                                                    Apply
                                                </Button>
                                            </Col>
                                        </Row>
                                        {errorMessage.error &&
                                            <Row style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'10px'}}>
                                                <Message>{errorMessage.message}</Message>
                                            </Row>}
                                    </ListGroup.Item>

                                    <Link to='/checkout'>
                                        <ListGroup.Item>
                                            <Button style={buttonStyleRed} type='button' className='btn-block' /*disabled={cartItems.lenght === 0} onClick={checkoutHandler}*/>
                                                Checkout
                                        </Button>
                                        </ListGroup.Item>
                                    </Link>

                                    <Link to='/'>
                                    <ListGroup.Item>
                                        <Button
                                            className='btn-block'
                                            type='button'
                                            style={{ background: 'white', color: '#002b5c', borderRadius: '0', height: '40px', fontWeight: '900', border: '1px solid #002b5c' }}
                                        >
                                            CONTINUE SHOPPING
                                        </Button>
                                    </ListGroup.Item>
                                    </Link>


                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <Button style={buttonStyleSeaBlue} type='button' className='btn-block' /*disabled={cartItems.lenght === 0} onClick={checkoutHandler}*/>
                                                    PayPal
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button style={buttonStyle} type='button' className='btn-block' /*disabled={cartItems.lenght === 0} onClick={checkoutHandler}*/>
                                                    CREDIT
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>

                        </Col>
                    </Row>
                </>
                )
            }
        </>
    )
}

export default CartScreen
