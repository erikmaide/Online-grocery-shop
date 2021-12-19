import React from 'react';
import { styled, alpha } from  '@material-ui/core/styles';
import AppBar from  '@material-ui/core/AppBar';
import Box from  '@material-ui/core/Box';
import Toolbar from  '@material-ui/core/Toolbar';
import InputBase from  '@material-ui/core/InputBase';
import { CartItemType } from '../App';
import Button from '@material-ui/core/Button'
import { ShoppingCart,} from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  cartItems: CartItemType[];
  setCartOpen: any;
  setSearchTerm: any;
  setSorting: any;
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.type === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



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
         {cartItems.length === 0 ? <Button onClick={() => setCartOpen(true)} variant="outlined" endIcon={<ShoppingCart />}>Cart is empty.</Button>:
         <Button onClick={() => setCartOpen(true)} variant="outlined" endIcon={<ShoppingCart />}>
          Total: {calculateTotal(cartItems).toFixed(2)}€
         </Button>}
          <div>
      <Button
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
Sort products
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setSorting("PriceDesc")} disableRipple>
          Price from high to low
        </MenuItem>
        <MenuItem onClick={() => setSorting("PriceAsc")} disableRipple>
          Price from low to high
        </MenuItem>
        <MenuItem onClick={() => setSorting("NameAsc")} disableRipple>
          Products from A-Z
        </MenuItem>
        <MenuItem onClick={() => setSorting("NameDesc")} disableRipple>
          Products from Z-A
        </MenuItem>
        <MenuItem onClick={() => setSorting("")} disableRipple>
          Disable sorting
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Close menu
        </MenuItem>
      </StyledMenu>
    </div>
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