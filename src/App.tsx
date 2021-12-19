import { useState } from 'react';
import { useQuery } from 'react-query';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid'
import Item from './Item/Item';
import LinearProgress from '@material-ui/core/LinearProgress';
import uniqid from 'uniqid';
import { Wrapper } from './App.styles';
import SearchAppBar from './SearchAppBar/SearchAppBar';
import * as _ from "lodash";

export type CartItemType = {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  quantity: number;
};

const getProducts = (): Promise<CartItemType[]> =>
  fetch('https://raw.githubusercontent.com/erikmaide/sampledata/main/products.json')
    .then(r => r.json())
    .then(json => json.map((item: { name: string; }) => {
      const id = uniqid();
      return {
        ...item,
        id,
      };
    }));

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortingSet, setSorting] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

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

  const setDataSorting = (selectedSorter?: string) => {
    switch(selectedSorter) {
      case "PriceAsc":
        return _.orderBy(data, 'price', 'asc');
      case "PriceDesc":
        return _.orderBy(data, 'price', 'desc');
      case "NameAsc":
          return _.orderBy(data, 'name', 'asc');
      case "NameDesc":
          return _.orderBy(data, 'name', 'desc');
      default:
        return data;
    }
  }




  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something is broken...</div>;

  return (
    <Wrapper>
      <SearchAppBar
        cartItems={cartItems}
        setCartOpen={setCartOpen}
        setSearchTerm={setSearchTerm}
        setSorting={setSorting}
      />
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Grid container spacing={5}>
        {setDataSorting(sortingSet)?.filter((item) => {
          if (searchTerm === "") {
            return item
          } return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        }).map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
