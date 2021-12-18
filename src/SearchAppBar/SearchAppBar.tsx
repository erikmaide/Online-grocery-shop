import { styled, alpha } from  '@material-ui/core/styles';
import AppBar from  '@material-ui/core/AppBar';
import Box from  '@material-ui/core/Box';
import Toolbar from  '@material-ui/core/Toolbar';
import InputBase from  '@material-ui/core/InputBase';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button'
import { ShoppingCart } from '@material-ui/icons';

type Props = {
  cartItems: CartItemType[];
  setCartOpen: any;
  setSearchTerm: any;
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


  const SearchAppBar: React.FC<Props> = ({ cartItems, setCartOpen, setSearchTerm }) => {
    const calculateTotal = (items: CartItemType[]) =>
      items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
         {cartItems.length === 0 ? <p>No items in cart.</p> :
         <Button onClick={() => setCartOpen(true)} color="inherit" endIcon={<ShoppingCart />}>
          Shopping Cart Total: {calculateTotal(cartItems).toFixed(2)}€
         </Button>}
          <Search>
            <StyledInputBase
              placeholder="Search items"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchAppBar;