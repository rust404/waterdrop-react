import React, {FC} from 'react'
import Nav from './Nav'
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
interface ILayoutProps extends React.Props<HTMLElement> {
}
const Layout: FC<ILayoutProps> = (props) => {
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
