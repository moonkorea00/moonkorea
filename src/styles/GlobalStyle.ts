import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  
  ::-webkit-scrollbar {
    display: none;
  }
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
  word-spacing: 1.5px;
}

a {
  color: #4182C4;
  text-decoration: none;
}

button {
  border: none;
  cursor: pointer;
}

pre {
  margin-top: 0;
};

code {
  font-family: Consolas, Monaco, "Courier New", monospace;
}

summary {
  :hover{
    cursor: pointer;
  }
}
`;

export default GlobalStyle;
