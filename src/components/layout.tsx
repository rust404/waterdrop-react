import React from 'react'
import Nav from './nav'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    > main {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: auto;
      -webkit-overflow-scrolling:touch;
    }
  }
`
type Props = {
  children: any
}
const Layout = (props: Props) => {
  return (
    <Wrapper>
      <div>
        <main>
          {props.children}
        </main>
        <Nav />
      </div>
    </Wrapper>
  )
}

export default Layout
