import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  line-height: 30px;
  /* padding: 0;  */
  
}

body {
  box-sizing: border-box;
  display: inline-flex;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
