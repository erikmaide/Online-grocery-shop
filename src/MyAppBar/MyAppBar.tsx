import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import { Toolbar, TextField } from '@material-ui/core';
import { CartItemType } from '../App';
import { ShoppingCart } from '@material-ui/icons';

type Props = {
  cartItems: CartItemType[];
  setCartOpen: any;
  setSearchTerm: any;
};

const MyAppBar: React.FC<Props> = ({ cartItems, setCartOpen, setSearchTerm }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button onClick={() => setCartOpen(true)} color="inherit" variant="outlined" endIcon={<ShoppingCart />}>
          Shopping Cart Total: {calculateTotal(cartItems).toFixed(2)}€
      </Button>
        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(event) => {
          setSearchTerm(event.target.value);
        }} />
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
