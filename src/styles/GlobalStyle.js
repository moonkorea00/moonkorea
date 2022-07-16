import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  line-height: 33px;
  box-sizing: border-box;
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
span{
  color: #364149;
}

p{
  word-spacing: 2px;
}

a {
  color: #4182C4;
  text-decoration: none;
}
`;

export default GlobalStyle;
