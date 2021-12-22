import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 10px;
  height: 100%;

  h3 {
    text-align: center;
  }

  .button {
    border-radius: 10px;
    margin: 20px;
    background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
    text-transform: none;
  }

  .buttonDetailed {
    border-radius: 10px;
    background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
    text-transform: none;
  }

  img {
    max-height: 160px;
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
  }
`;