import {ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART} from '../../utils/constant';

const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART: //upsert
      const index = state.findIndex(cart => cart.product === action.payload);
      if (index !== -1) {
        return [
          ...state.slice(0, index),
          {...state[index], quantity: state[index].quantity + 1},
          ...state.slice(index + 1),
        ];
      } else {
        return [
          ...state,
          {product: action.payload, quantity: 1, isChecked: false},
        ];
      }
    case REMOVE_FROM_CART:
      return state.filter(cart => cart.product !== action.payload);
    case CLEAR_CART:
      return (state = []);
  }
  return state;
};

export default cartItems;
