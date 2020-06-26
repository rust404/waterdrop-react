import React, {FC} from "react";
import {Switch, Route, Redirect, useLocation} from "react-router-dom";
import CatagoryManage from "../views/catagory/CatagoryManage";
import RecordAdd from "../views/record/RecordAdd";
import Statistics from "../views/Statistics";
import Notfound from "../views/Notfound";
import Test from "../views/Test";
import CatagoryEdit from "../views/catagory/CatagoryEdit";
import CatagoryAdd from "../views/catagory/CatagoryAdd";
import RecordDetail from "../views/record/RecordDetail";
import RecordEdit from "../views/record/RecordEdit";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`
const RoutesConfig = [
  {path: "/catagory/manage", component: CatagoryManage},
  {path: "/catagory/edit/:id", component: CatagoryEdit},
  {path: "/catagory/add", component: CatagoryAdd},
  {path: "/record/detail", component: RecordDetail},
  {path: "/record/add", component: RecordAdd},
  {path: "/record/edit/:id", component: RecordEdit},
  {path: "/test", component: Test},
  {path: "/statistics", component: Statistics},
  {path: "*", component: Notfound}
];

RoutesConfig.forEach(route => {
  const Comp = route.component
  const Wrap: FC = (props) => {
    return <Wrapper className="wrap"><Comp {...props} /></Wrapper>
  }
  route.component = Wrap
})

const Routes: FC = () => {
  const location = useLocation();
  return (
    <TransitionGroup className="transition-wrapper">
      <CSSTransition timeout={500} key={location.pathname} classNames={"right"}>
        <Switch location={location}>
          <Redirect from="/" exact to="/record/add" />
          {RoutesConfig.map(config => {
            return <Route key={config.path} {...config} />;
          }).concat()}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routes;
