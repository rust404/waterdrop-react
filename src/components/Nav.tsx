import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import Icon from "components/Icon";

const NavWrapper = styled.nav`
  ul {
    display: flex;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.5);
    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
      font-size: 12px;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        &.active {
          color: #ffd947;
          svg {
            fill: #ffd947;
          }
        }
      }
    }
  }
`;
const Nav: FC = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          <NavLink to="/record/detail" activeClassName="active">
            <Icon id="mingxi" />
            明细
          </NavLink>
        </li>
        <li>
          <NavLink to="/record/add" activeClassName="active">
            <Icon id="money" />
            记一笔
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="active">
            <Icon id="statistics" />
            数据
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
};
export default React.memo(Nav);
// export default Nav
