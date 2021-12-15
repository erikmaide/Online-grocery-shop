import Button from '@material-ui/core/Button';
import { CartItemType } from '../App';
import { Wrapper } from './Item.styles';


type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image || "https://tinyurl.com/nosushipic"} alt={item.name} />
    <div>
      <h3>{item.name}</h3>
      <h3>{item.price|| "-"}{item.price > 0 && "€"} </h3>
    </div>
    {item.price > 0 &&
    <Button onClick={() => handleAddToCart(item)}>
      Add to cart
    </Button>
    }
  </Wrapper>
);

export default Item;
