import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar';
import { CartItemType } from '../App';

type Props = {
  cartItems: CartItemType[];
  setCartOpen: any;
};

const MyAppBar: React.FC<Props> = ({ cartItems, setCartOpen }) => {
    const calculateTotal = (items: CartItemType[]) =>
      items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
      <Button onClick={() => setCartOpen(true)}>Enter shopping cart</Button>
      <h3>Total: {calculateTotal(cartItems).toFixed(2)}€</h3>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MyAppBar;
