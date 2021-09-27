import { render, screen } from '@testing-library/react';
import App from './App';
// import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import store from './store'
import ProductDetails from './screens/ProductDetails'


test('renders cart', () => {
  render(
  <Provider store={store}>
  <App />
  </Provider>
  );
  const linkElement = screen.getByText(/cart/i);
  expect(linkElement).toBeInTheDocument();
});

test('checking ProductDetails component', () => {
  const handleColor = jest.fn()
  const wrapper = render(
    <Provider store={store}>
    <ProductDetails />
    </Provider>
  );

  const color = wrapper.find('.color-button');
  color.simulate('click');
  expect(handleColor).toBeCalledWith('red')
})
