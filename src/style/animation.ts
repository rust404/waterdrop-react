import {createGlobalStyle} from "styled-components";

const duration = '250ms'
const Animation = createGlobalStyle`
.l-to-r-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.l-to-r-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all ${duration};
}
.l-to-r-exit {
  opacity: 1;
  transform: translateX(0);
}
.l-to-r-exit-active {
  opacity: 0;
  transform: translateX(100%);
  transition: all ${duration};
}
.r-to-l-enter {
  opacity: 0;
  transform: translateX(100%);
}
.r-to-l-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all ${duration};
}
.r-to-l-exit {
  opacity: 1;
  transform: translateX(0);
}
.r-to-l-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all ${duration};
}
.t-to-b-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.t-to-b-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all ${duration};
}
.t-to-b-exit {
  opacity: 1;
  transform: translateY(0);
}
.t-to-b-exit-active {
  opacity: 0;
  transform: translateY(100%);
  transition: all ${duration};
}
.b-to-t-enter {
  opacity: 0;
  transform: translateY(100%);
}
.b-to-t-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all ${duration};
}
.b-to-t-exit {
  opacity: 1;
  transform: translateY(0);
}
.b-to-t-exit-active {
  opacity: 0;
  transform: translateY(-100%);
  transition: all ${duration};
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: all ${duration};
}
.fade-enter-done {
  opacity: 1;
  transition: all ${duration};
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: all ${duration};
}
.fade-exit-done {
  opacity: 0;
}
.transition-wrapper {
  width: 100vw;
  height: 100%;
  overflow: hidden;
}
.slide-from-bottom-enter,
.slide-from-bottom-appear {
  opacity: 0;
  transform: translateY(100%);
}
.slide-from-bottom-enter-active,
.slide-from-bottom-appear-active {
  opacity: 1;
  transform: translateY(0);
  transition: all ${duration};
}
.slide-from-bottom-exit {
  opacity: 1;
  transform: translateY(0);
}
.slide-from-bottom-exit-active {
  opacity: 0;
  transform: translateY(100%);
  transition: all ${duration};
}
`;
export default Animation
