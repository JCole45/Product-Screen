import React from 'react'
import { Container } from 'react-bootstrap'
import './App.css';
import ProductDetails from './screens/ProductDetails'
import EditScreen from './screens/EditScreen'
import CartScreen from './screens/CartScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (

    <Router>
      <Header/>
      <main>
        <Container>
          <Route path='/' component={ProductDetails} exact />
          <Route path='/edit/:id' component={EditScreen} exact />
          <Route path='/cart' component={CartScreen} exact />
          <Route path='/checkout' component={CheckoutScreen} exact />
        </Container>
      </main>
    </Router>

  );
}

export default App;
