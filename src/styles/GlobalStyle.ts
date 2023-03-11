import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Roboto","Arial",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-overflow: ellipsis;  
}

span {
  color: #364149;
}

input:focus{
  outline: none;
  border: none;
}

textarea {
  font-size: inherit;
  font-family: inherit; 
  resize: none;
}

textarea:focus{
    outline: none;
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
