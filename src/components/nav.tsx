import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Icon from 'components/icon'

const NavWrapper = styled.nav`
  ul {
    display: flex;
    box-shadow: 0 -2px 4px rgba(0,0,0,0.5);
    li {
      flex:1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
      font-size: 12px;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`
const Nav = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          <Link to="/tags"><Icon id="tags" />标签</Link>
        </li>
        <li>
          <Link to="/record"><Icon id="money" />记一笔</Link>
        </li>
        <li>
          <Link to="/statistics"><Icon id="statistics" />数据</Link>
        </li>
      </ul>
    </NavWrapper>
  )
}
export default Nav
