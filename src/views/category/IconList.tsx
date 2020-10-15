import React, {FC} from 'react'
import styled from "styled-components";
import {brandColor, grey2} from "../../style/variables";
import {CATEGORY_ICON_NAMES} from "../../icons";
import Icon from "../../components/Icon";
import classNames from "classnames";


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
  background: ${grey2};
  &.is-active {
    background-color: ${brandColor};
    .icon {
      fill: #fff;
    }
  }
`

interface IconListProps {
  icon: string
  onChange?: (icon: string) => void
}

const IconList: FC<IconListProps> = (props) => {
  const {icon, onChange} = props
  return (
    <Wrapper>
      {CATEGORY_ICON_NAMES.map(name => {
        const IconClass = classNames({
          'is-active': icon === name
        })
        return (
          <li key={name} onClick={() => {onChange && onChange(name)}}>
            <IconWrapper className={IconClass}>
              <Icon id={name} size="60%" className="icon"/>
            </IconWrapper>
          </li>
        )
      })}
    </Wrapper>
  )
}

export default IconList
