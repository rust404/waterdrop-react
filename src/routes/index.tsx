import React, {FC} from "react";
import {Switch, Route, Redirect, useLocation, useHistory, matchPath} from "react-router-dom";
import CatagoryManage from "../views/catagory/CatagoryManage";
import RecordAdd from "../views/record/RecordAdd";
import Statistics from "../views/Statistics";
import Notfound from "../views/Notfound";
import CatagoryEdit from "../views/catagory/CatagoryEdit";
import CatagoryAdd from "../views/catagory/CatagoryAdd";
import RecordDetail from "../views/record/RecordDetail";
import RecordEdit from "../views/record/RecordEdit";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import styled from "styled-components";
import * as H from 'history'

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
`;
interface ISceneConfig {
  POP: string;
  PUSH: string;
};

interface IRoutesConfigItem {
  path: string;
  component: FC;
  sceneConfig: ISceneConfig,
  exact?: boolean;
}
const RoutesConfig: IRoutesConfigItem[] = [
  {
    path: "/catagory/manage",
    component: CatagoryManage,
    sceneConfig: {POP: "l-to-r", PUSH: "r-to-l"}
  },
  {
    path: "/catagory/edit/:id",
    component: CatagoryEdit,
    sceneConfig: {POP: "l-to-r", PUSH: "r-to-l"}
  },
  {
    path: "/catagory/add",
    component: CatagoryAdd,
    sceneConfig: {POP: "l-to-r", PUSH: "r-to-l"}
  },
  {
    path: "/record/detail",
    component: RecordDetail,
    sceneConfig: {POP: "fade", PUSH: "fade"}
  },
  {
    path: "/record/add",
    component: RecordAdd,
    sceneConfig: {POP: "fade", PUSH: "fade"}
  },
  {
    path: "/record/edit/:id",
    component: RecordEdit,
    sceneConfig: {POP: "l-to-r", PUSH: "r-to-l"}
  },
  {
    path: "/statistics",
    component: Statistics,
    sceneConfig: {POP: "fade", PUSH: "fade"}
  },
  {path: "*", component: Notfound, sceneConfig: {POP: "", PUSH: ""}}
];

RoutesConfig.forEach(route => {
  const Comp = route.component;
  const Wrap: FC = props => {
    return (
      <Wrapper className="wrap">
        <Comp {...props} />
      </Wrapper>
    );
  };
  route.component = Wrap;
});
const DEFAULT_SCENE_CONFIG: ISceneConfig = {
  PUSH: "r-to-l",
  POP: "l-to-r"
};

const getSceneConfig = (location: H.Location) => {
  // const matchedRoute = RoutesConfig.find(config =>
  //   new RegExp(`^${config.path}$`).test(location.pathname)
  // );
  const matchedRoute = RoutesConfig.filter(config => {
    if (config.path === '*') return false
    return matchPath(location.pathname, {
      path: config.path,
      exact: true
    })
  })[0];
  return (matchedRoute && matchedRoute.sceneConfig) || DEFAULT_SCENE_CONFIG;
};
let oldLocation: H.Location | null = null
const Routes: FC = () => {
  const location = useLocation();
  const history = useHistory()
  let classNames = "";
  if (history.action === "PUSH") {
    classNames = getSceneConfig(location)['PUSH'];
  } else if (history.action === "POP" && oldLocation) {
    classNames = getSceneConfig(oldLocation)['POP'];
  }

  // 更新旧location
  oldLocation = location;

  return (
    <TransitionGroup className="transition-wrapper" childFactory={
      child => React.cloneElement(child, {classNames})
    }>
      <CSSTransition timeout={500} key={location.pathname} classNames={"b-to-t"}>
        <Switch location={location}>
          <Redirect from="/" exact to="/record/add" />
          {RoutesConfig.map(({path, component, exact = false}) => {
            return (
              <Route
                key={path}
                path={path}
                component={component}
                exact={exact}
              />
            );
          }).concat()}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routes;
