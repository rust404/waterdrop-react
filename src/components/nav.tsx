import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const NavWrapper = styled.nav`
  border: 1px solid red;
  ul {
    display: flex;
    li {
      flex:1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 56px;
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
