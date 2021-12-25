import { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocalStorage } from 'usehooks-ts';
import Cart from './Cart/Cart';
import { CartItemType } from './types';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid'
import Item from './Item/Item';
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchAppBar from './SearchAppBar/SearchAppBar';
import { orderBy } from "lodash";
import { Wrapper } from './App.styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  ItemPage from './ItemPage/ItemPage';

let countString = 0;
const regex = /(?<=[#])[0-9]+/;
const getProducts = (): Promise<CartItemType[]> =>
  fetch('https://raw.githubusercontent.com/erikmaide/sampledata/main/products.json')
    .then(r => r.json())
    .then(json => json.map((item: { name: string; }) => {
      countString = countString + 1;
      const id = item.name.match(regex) + countString.toString();
      return {
        ...item,
        id,
      };
    }));

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortingSet, setSorting] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage("jsonData", [] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts,
    {
      refetchOnWindowFocus: false
    }
  );

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        };
      }, [] as CartItemType[])
    );
  };

  const setDataSorting = (selectedSorter?: string) => {
    switch(selectedSorter) {
      case "PriceAsc":
        return orderBy(data, 'price', 'asc');
      case "PriceDesc":
        return orderBy(data, 'price', 'desc');
      case "NameAsc":
          return orderBy(data, 'name', 'asc');
      case "NameDesc":
          return orderBy(data, 'name', 'desc');
      default:
         return data;
    };
  };
  
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
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Grid container spacing={5}>
            {setDataSorting(sortingSet)?.filter((item) => {
              if (searchTerm === ""){
                return item}
              return item.name.toLowerCase().includes(searchTerm.toLowerCase())})
              .map(item => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>))}
            </Grid>
          }/>
          <Route path={`itempage/:itemId`} element ={<ItemPage data={data} addToCart={handleAddToCart}/>} />
        </Routes>
      </BrowserRouter>
    </Wrapper> 
  );
};

export default App;