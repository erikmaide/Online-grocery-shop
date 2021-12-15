import { useState } from 'react';
import { useQuery } from 'react-query';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid'
import Item from './Item/Item';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Wrapper, ShoppingCartButton } from './App.styles';

export type CartItemType = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  quantity: number;
};

const regex = /(?<=[#])[0-9]+/;
const getProducts = (): Promise<CartItemType[]> => 
fetch('https://raw.githubusercontent.com/erikmaide/sampledata/main/products.json')
.then(r => r.json())
.then(json => json.map((item: { name: string; }) => {
   const id = item.name.match(regex);
   return {
    ...item,
    id,
   };
}))

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  const calculateTotal = (items: CartItemType[]) =>
  items.reduce((ack: number, item) => ack + item.quantity * item.price, 0).toFixed(2);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something is broken...</div>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <ShoppingCartButton onClick={() => setCartOpen(true)}>
      <h3>Enter shopping cart</h3>
      <h3>Total cost: {[calculateTotal(cartItems),"€"]}</h3>
      </ShoppingCartButton>
      <Grid container spacing={5}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
