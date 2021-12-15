import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 10px;
  height: 100%;

  h3 {
    text-align: center;
  }

  button {
    border-radius: 0 0 10px 10px;
    background-color: #1aff1a;
  }

  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
  }
`;
