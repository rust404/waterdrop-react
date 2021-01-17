import React, {FC} from "react";
import {Switch, Route, Redirect, useLocation, useHistory, matchPath} from "react-router-dom";
import CategoryManage from "../views/category/CategoryManage";
import RecordAdd from "../views/record/RecordAdd";
import Statistics from "../views/Statistics";
import Notfound from "../views/Notfound";
import CategoryEdit from "../views/category/CategoryEdit";
import CategoryAdd from "../views/category/CategoryAdd";
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
}

interface IRoutesConfigItem {
  path: string;
  component: FC;
  sceneConfig: ISceneConfig,
  exact?: boolean;
}

const RoutesConfig: IRoutesConfigItem[] = [
  {
    path: "/category/manage",
    component: CategoryManage,
    sceneConfig: {POP: "l-to-r", PUSH: "r-to-l"}
  },
  {
    path: "/category/edit/:id",
    component: CategoryEdit,
    sceneConfig: {POP: "l-to-r", PUSH: "r-to-l"}
  },
  {
    path: "/category/add",
    component: CategoryAdd,
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
  route.component = props => {
    return (
      <Wrapper className="wrap">
        <Comp {...props} />
      </Wrapper>
    );
  };
});
const DEFAULT_SCENE_CONFIG: ISceneConfig = {
  PUSH: "r-to-l",
  POP: "l-to-r"
};

const getSceneConfig = (location: H.Location) => {
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
      <CSSTransition timeout={500} key={location.pathname} classNames="fade">
        <Switch location={location}>
          <Redirect from="/" exact to="/record/add"/>
          {RoutesConfig.map(({path, component, exact = false}) => {
            return (
              <Route
                key={path}
                path={path}
                component={component}
                exact={exact}
              />
            );
          })}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routes;
