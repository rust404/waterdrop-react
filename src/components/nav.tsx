import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

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
    }
  }
`
const Nav = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          <Link to="/tags">标签</Link>
        </li>
        <li>
          <Link to="/record">记一笔</Link>
        </li>
        <li>
          <Link to="/statistics">数据</Link>
        </li>
      </ul>
    </NavWrapper>
  )
}
export default Nav
