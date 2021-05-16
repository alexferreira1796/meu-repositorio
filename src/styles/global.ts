import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    min-height: 100%;
  }
  body {
    background-color: #0D2636;
    font-size: 14px;
    -webkit-font-smoothing: antialiased !important;
  }
  a {
    text-decoration: none;
  }
  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
  button {
    cursor: pointer;
  }
  @media(max-width: 600px) {
    body {
      padding: 0 15px;
    }
  }
`;

export default GlobalStyled;