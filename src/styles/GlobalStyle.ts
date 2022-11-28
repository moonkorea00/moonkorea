import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
  line-height: 35px;
}

body {
  margin: 0;
  font-family: "Roboto","Arial",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-overflow: ellipsis;
  
  ::-webkit-scrollbar {
    display: none;
}
}

span {
  color: #364149;
}

p {
  word-spacing: 3px;
}

a {
  color: #4182C4;
  text-decoration: none;
}

button {
  border: none;
  cursor: pointer;
}
`;

export default GlobalStyle;
