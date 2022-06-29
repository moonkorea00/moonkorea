import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  line-height: 30px;
}

body {
  box-sizing: border-box;
  display: inline-flex;
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
a {
  text-decoration: none;
}
`;

export default GlobalStyle;
