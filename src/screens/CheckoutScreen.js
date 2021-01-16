import React, { useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Radio, Input } from 'antd';
import Message from '../components/Message'
import { editProductInCart, deleteCartItem, applyCoupon } from '../actions/productAction'

const CheckoutScreen = () => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.addToCart)
    const { cartItems, coupon: available_coupon } = cart

    const [coupon, setCoupon] = useState('')
    const [value, setValue] = useState(1);

    const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const onChange = (e, item) => {
        setValue(e.target.value)
        dispatch(editProductInCart({
            ...item, delivery: e.target.value
        }))
    };

    const handleQuantity = (quantity, item) => {
        dispatch(editProductInCart({
            ...item, quantity: quantity
        }))
    }

    const handleDelivery = (delivery, item) => {
    }

    const handleDelete = (id) => {
        dispatch(deleteCartItem({ id }))
    }

    const handleCouponInput = (e) => {
        let code = /^[a-z0-9]*$/i
        if (e.target.value.match(code)) {
            setCoupon(e.target.value)
        }
    }

    const handleApplyCoupon = (coupon_number) => {
        dispatch(applyCoupon(coupon_number))
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
        width:'200px'
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
            <h1 style={{ color: '#002b5c' }}> {`Ship to You ${cartItems.reduce((acc, item) => acc + item.quantity, 0)} Item(s)`} </h1>
            {cartItems && cartItems.length === 0 ?
                <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
                :
                (<>
                    <Row>
                        <Col md={6}>
                            <Row>
                                <Col md={5}>
                                    First Name
                                    <Input placeholder={"Enter coupon code"} type="text" value={coupon} onChange={handleCouponInput} style={{ width: '100%', height: '50px', marginLeft: 10 }} />
                                </Col>
                                <Col md={5}>
                                    Last Name
                                <Input placeholder={"Enter coupon code"} type="text" value={coupon} onChange={handleCouponInput} style={{ width: '100%', height: '50px', marginLeft: 10 }} />
                                </Col>
                            </Row>

                            <Row style={{ marginTop: '25px' }}>
                                <Col md={10}>
                                    Address
                                    <Input placeholder={"Enter coupon code"} type="text" value={coupon} onChange={handleCouponInput} style={{ width: '100%', height: '50px', marginLeft: 10 }} />
                                </Col>
                            </Row>

                            <Row style={{ marginTop: '25px' }}>
                                <Col md={10}>
                                    <Input placeholder={"Enter coupon code"} type="text" value={coupon} onChange={handleCouponInput} style={{ width: '100%', height: '50px', marginLeft: 10 }} />
                                </Col>
                            </Row>

                            <Row style={{ marginTop: '25px' }}>
                                <Col md={5}>
                                    Phone
                                    <Input placeholder={"Enter coupon code"} type="number" value={coupon} onChange={handleCouponInput} style={{ width: '100%', height: '50px', marginLeft: 10 }} />
                                </Col>
                                <Col md={5}>
                                    Zip Code
                                <Input placeholder={"Enter coupon code"} type="number" value={coupon} onChange={handleCouponInput} style={{ width: '100%', height: '50px', marginLeft: 10 }} />
                                </Col>
                            </Row>

                        </Col>

                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item style={{ background: '#002b5c', color: 'white', fontWeight: '900' }}>
                                        <Col>
                                            <Row style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                                <h3 style={{ color: 'white' }}> Order Summary</h3>
                                                <Link to='/cart' className="edit-button">
                                                    <span><i className="fas fa-suitcase" style={{ color: '#002b5c' }}></i></span>
                                                    <span>Edit</span>
                                                </Link>
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
                                                <>
                                                    <span className={"price"}>
                                                        ${!available_coupon ? cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2) : cartItems.reduce((acc, item) => acc + item.quantity * item.price/2, 0).toFixed(2) }
                                                    </span>
                                                </>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Shipping & Handling:
                                            </Col>
                                            <Col>
                                                <>
                                                    <span className={"price"}>
                                                        $14.00
                                                        </span>
                                                </>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col style={{ color: '#d63855' }}>
                                                Shipping Discount
                                            </Col>
                                            <Col>
                                                <>
                                                    <span className={"price"}>
                                                        -$14.00
                                                        </span>
                                                </>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col style={{ color: '#d63855' }}>
                                                TOTAL
                                            </Col>
                                            <Col>
                                                <>
                                                    <span className={"price"}>
                                                    ${!available_coupon ? cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2) : cartItems.reduce((acc, item) => acc + item.quantity * item.price/2, 0).toFixed(2) }
                                                    </span>
                                                </>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>

                        </Col>
                    </Row>
                    <Row style={{marginTop:'50px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Button style={buttonStyleRed} type='button' className='btn-block' /*disabled={cartItems.lenght === 0} onClick={checkoutHandler}*/>
                                Next: Payment
                            </Button>

                    </Row>
                </>
                )
            }
        </>
    )
}

export default CheckoutScreen
