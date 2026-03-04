import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
body {
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    background: #0b0d12;
    color: #e9eef7;
}
    input, button { font: inherit; }
`;