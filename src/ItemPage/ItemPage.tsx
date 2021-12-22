import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { CartItemType } from '../types';
import { Wrapper } from './ItemPage.styles';
import { Link } from 'react-router-dom';

type Props = {
  addToCart: (clickedItem: CartItemType) => void;
  data: any;
};

const ItemPage: React.FC<Props> = ({ data, addToCart }) => {
  const { itemId } = useParams();
  const item: CartItemType = data ?.find((item: { id: string | undefined; }) => (item.id === itemId));
  return (
    <Wrapper>
      <img src={item.image || "https://tinyurl.com/nosushipic"} alt={item.name} style={{ height: "200px" }} />
      <h2>{item.name}</h2>
      <h2>Price: {item.price || "-"}€</h2>
      <h2>Rating: {item.rating || "-"}</h2>
      <h2>Ingredients: {item.description || "-"}</h2>
      <Button className="buttonDetailed">
        <Link to="/" className="buttonDetailed">Back</Link>
      </Button>
      {item.price > 0 &&
        <Button onClick={() => addToCart(item)} className="button" >
          Add to Cart
        </Button>
      }
    </Wrapper>
  );
}
export default ItemPage;