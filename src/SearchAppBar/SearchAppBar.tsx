import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button'
import { ShoppingCart } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import { Search, StyledInputBase, StyledMenu } from './SearchAppBar.styles'

type Props = {
  cartItems: CartItemType[];
  setCartOpen: any;
  setSearchTerm: any;
  setSorting: any;
};

const SearchAppBar: React.FC<Props> = ({ cartItems, setCartOpen, setSearchTerm, setSorting }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {cartItems.length === 0 ? <Button onClick={() => setCartOpen(true)} variant="outlined" endIcon={<ShoppingCart />}>Cart is empty.</Button> :
            <Button onClick={() => setCartOpen(true)} variant="outlined" endIcon={<ShoppingCart />}>
              Total: {calculateTotal(cartItems).toFixed(2)}€
         </Button>}
         <Box sx={{ pl: 1 }}>
          <div>
            <Button
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
            >
              Sort products
      </Button>
            <StyledMenu
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() =>{ setSorting("PriceDesc"); handleClose();}} disableRipple>
                Price from high to low
        </MenuItem>
              <MenuItem onClick={() =>{ setSorting("PriceAsc"); handleClose();}} disableRipple>
                Price from low to high
        </MenuItem>
              <MenuItem onClick={() =>{ setSorting("NameAsc"); handleClose();}} disableRipple>
                Products from A-Z
        </MenuItem>
              <MenuItem onClick={() =>{ setSorting("NameDesc"); handleClose();}} disableRipple>
                Products from Z-A
        </MenuItem>
              <MenuItem onClick={() =>{ setSorting(""); handleClose();}} disableRipple>
                Disable sorting
        </MenuItem>
            </StyledMenu>
          </div>
          </Box>
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
