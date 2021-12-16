import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import { CartItemType } from '../App';
import { ShoppingCart } from '@material-ui/icons';

type Props = {
  cartItems: CartItemType[];
  setCartOpen: any;
};

const MyAppBar: React.FC<Props> = ({ cartItems, setCartOpen }) => {
    const calculateTotal = (items: CartItemType[]) =>
      items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <AppBar position="fixed">
      <Button onClick={() => setCartOpen(true)} color="inherit"  variant="outlined" endIcon={<ShoppingCart/>}>
        Shopping Cart Total: {calculateTotal(cartItems).toFixed(2)}€
      </Button>
      </AppBar>
    </Box>
  );
}

export default MyAppBar;
