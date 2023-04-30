import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const items = useSelector(state => state.cart.items);

  const itemsAvailable = items.length !== 0;

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {itemsAvailable && items.map(item => (
          <CartItem
          key={item.id}
          item={{id: item.id, title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price }}
        />
        ))}
        {!itemsAvailable && <p>Your cart is empty.</p>}
      </ul>
    </Card>
  );
};

export default Cart;
