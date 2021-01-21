import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}
* { margin: 0; padding: 0; }

ul, ol { list-style: none; }

a {
  text-decoration: none;
  color: inherit;
}
html {
  height: 100%;
}
a {
  /* 取消chrome点击蓝色高亮效果 */
  -webkit-tap-highlight-color: transparent;
}
body {
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
    "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}
#root {
  height: 100%;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
`
export default GlobalStyle
