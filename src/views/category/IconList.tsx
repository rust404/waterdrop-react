import React, {FC} from 'react'
import styled from "styled-components";
import {brandColor} from "../../style/variables";


const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  .category-icon-wrapper {
  }
  > li {
    width: 20%;
  }
`
const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 10px 10px;
  background: $grey-2;
  &.is-active {
    background-color: ${brandColor};
    .category-icon {
      color: #fff;
    }
  }
`

interface IconListProps {
  icon: string
}

const IconList:FC<IconListProps> = (props) => {
  return (
    <Wrapper>
      {}
    </Wrapper>
  )
}
