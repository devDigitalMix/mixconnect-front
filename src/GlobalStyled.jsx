import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
/*Reset*/
/* 17a1f1 */
:root {
  --main: #807DF0;
  --light: #F9F8FE;
  --sec: #76ffbd;
  --gray: #eeeeee;
  --danger: #D20E0E;
  --dark: #141415;
  --font: Audiowide;
  --font2: IBM Plex Mono;
  --linear: linear-gradient(
      to right,
      #c5c3ff 0%,
      #a3a0f8 50%,
      #4441c8 100%
    );
  --cantoEsq: radial-gradient(circle farthest-corner at top left, #807DF0 0%, #14141511 32%, #14141511 83%, #807DF0 100%);
  --cantoDir: radial-gradient(circle farthest-corner at top right, #807DF0 0%, #14141511 32%, #14141511 83%, #807DF0 100%);

}
::selection {
  background-color: var(--main);
  color: var(--light);
}
html {
  box-sizing: border-box;
  scroll-behavior: smooth;
  background-color: #1E1E1E;
  cursor: default;
  /* background: url("/bg.webp") no-repeat center center; */
  /* background-size: cover; */
  color: var(--light);
  font-family: 'Epilogue', sans-serif;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
#bolinha {
  display: block;
  background-color: var(--main);
  width: 10px;
  transition: all.1s ease;
  border-radius: 90px;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
}
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  padding: 0 10px;
  margin: 0;
  position: relative;
}
#roxo, #roxo2 {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  height: 1px;
  width: 1px;
  box-shadow: 0 0 300px 150px var(--main);
}
#roxo2{
  bottom: inherit;
  top: 0;
  left: 30%;
  box-shadow: 0 0 850px 150px var(--main);
}
#verde {
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -1;
  height: 1px;
  width: 1px;
  box-shadow: 0 0 300px 100px #76FFBD;
}
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
p,
pre,
blockquote,
figure,
figcaption,
hr,
dl,
dd {
  margin: 0;
  padding: 0;
}

ul,
ol {
  list-style: none;
}

input,
textarea,
select,
button {
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
}

input[type="text"],
textarea {
  width: 100%;
}

input,
textarea,
button {
  border: 1px solid gray;
}

button {
  padding: 0;
  line-height: inherit;
  border-radius: 0;
  background-color: transparent;
  cursor: pointer;
}

img,
iframe,
video,
object,
embed {
  display: block;
  max-width: 100%;
}

svg {
  max-width: 100%;
}

table {
  table-layout: fixed;
  width: 100%;
}

[hidden] {
  opacity: 0;
  visibility: hidden;
}

noscript {
  display: block;
  margin-bottom: 1em;
  margin-top: 1em;
}

[tabindex="-1"] {
  outline: none !important;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: auto;
  margin: 0;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
  white-space: nowrap;
}

* {
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
span {
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
}

img {
  display: block;
  max-width: 100%;
}

a {
  margin: 0px;
  padding: 0px;
  display: block;
}

table {
  border-spacing: 0px;
}

button {
  border: none;
}
hr {
  border: none;
}

a,
button,
svg path {
  transition: 0.3s;
}
#root {
 display: flex;
 flex-direction: column;
 align-items: center;
}
.btn {
  background: linear-gradient(to left, #C5C3FF 0%, #A3A0F8 49%, #4441C8 100%);
  max-width: fit-content;
  margin: 0 auto;
  padding: 7px 20px 3px;
  max-width: 205px;
  width: 100%;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 5px;
  color: var(--light);
  box-shadow: 0 0 0 0px var(--light) inset;
  &:hover {
    color: var(--main);
    box-shadow: 0 0 30px 20px var(--light) inset;
  }
}
.danger {
  background: var(--danger);&:hover {
    color: var(--danger);
    box-shadow: 0 0 30px 20px var(--light) inset;
  }
}
.neutral {
  background: var(--dark);
  box-shadow: 0 0 0 2px var(--main) inset;
  color: var(--main);
  &:hover {
    color: var(--light);
    box-shadow: 0 0 30px 20px var(--main) inset;
  }
}

.img-effect {
  cursor: pointer;
    transition: all.3s;
    &:hover {
      filter: hue-rotate(280deg);
      filter: saturate(1000%) brightness(120%);
    }
    &:active {
      transform: scale(0.9);
      transition: transform 0.1s;
    }
}

.custom-loader {
  width: 30px !important;
  height: 30px !important;
  border-radius: 50% !important;
  background: 
    radial-gradient(farthest-side,#766DF4 94%,#0000) top/6px 6px no-repeat,
    conic-gradient(#0000 30%,#766DF4);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 6px),#000 0);
  animation:s3 1s infinite linear;
}

@keyframes s3{ 
  100%{transform: rotate(1turn)}
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: var(--dark);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--main);
}

`;
