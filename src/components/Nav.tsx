import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import Icon from "components/Icon";
import {brandColor} from "../style/variables";

const NavWrapper = styled.nav`
  display: flex;
  box-shadow: 0 -2px 8px #e0e0e0;
  flex-shrink: 0;
  > * {
    flex: 1 0 0;
    line-height: 1;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav-icon {
      font-size: 20px;
      margin-bottom: 8px;
    }
    &.active {
      color: ${brandColor};
      svg {
        fill: ${brandColor};
      }
    }
  }
`;
const Nav: FC = () => {
  return (
    <NavWrapper>
      <NavLink to="/record/detail" activeClassName="active">
        <Icon id="mingxi" className="nav-icon"/>
        明细
      </NavLink>
      <NavLink to="/record/add" activeClassName="active">
        <Icon id="money" className="nav-icon"/>
        记一笔
      </NavLink>
      <NavLink to="/statistics" activeClassName="active">
        <Icon id="statistics" className="nav-icon"/>
        数据
      </NavLink>
    </NavWrapper>
  );
};
export default Nav;
