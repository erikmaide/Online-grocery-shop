import Button from '@material-ui/core/Button';
import { CartItemType } from '../types';
import Popup from 'reactjs-popup';
import { Wrapper } from './Item.styles';
import 'reactjs-popup/dist/index.css';

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
    <Popup trigger={<button className="popupButton">More info</button>} modal nested >
      <h2>{item.name}</h2>
      <h2>Price: {item.price || "-"}</h2>
      <h3>Rating: {item.rating || "-"}</h3>
      <h3>Ingredients: {item.description || "-"}</h3>
      {item.price > 0 &&
        <Button onClick={() => handleAddToCart(item)} className="buttonDetailed">
          Add to Cart
    </Button>
      }
    </Popup>
    {item.price > 0 &&
      <Button onClick={() => handleAddToCart(item)} className="button">
        Add to Cart
    </Button>
    }
  </Wrapper>
);

export default Item;