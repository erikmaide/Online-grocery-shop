import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 25px;
  top: 40px;
`;

export const ShoppingCartButton = styled.button`
  position: fixed;
  z-index: 100;
  right: 10px;
  top: 40px;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 10px;
  background-color: #1aff1a;
  opacity: 80%;
`;