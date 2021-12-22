import Button from '@material-ui/core/Button';
import { CartItemType } from '../types';
import { Wrapper } from './Item.styles';
import 'reactjs-popup/dist/index.css';
import { Link } from 'react-router-dom';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
 
  <Wrapper>
    <img src={item.image || "https://tinyurl.com/nosushipic"} alt={item.name} />
    <div>
      <h3>{item.name}</h3>
      <h3>{item.price || "-"}{item.price > 0 && "€"} </h3>
    </div>
    <Button className="buttonDetailed">
    <Link to={`/itempage/${item.id}`} className="buttonDetailed">More info</Link>
    </Button>
    {item.price > 0 &&
      <Button onClick={() => handleAddToCart(item)} className="button">
        Add to Cart
    </Button>
    }
  </Wrapper>
);

export default Item;