import React, {FC, ChangeEvent} from 'react'
import Icon from "../../components/Icon";
import styled from "styled-components";
import {brandColor} from "../../style/variables";

const Wrapper = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${brandColor};
  > .icon {
    fill: #fff;
  }
`
const NameInput = styled.input`
  width: 0;
  flex: 1;
  border: none;
  outline: none;
  text-align: right;
  line-height: 24px;
  font-size: 20px;
`

interface CategoryInfoProps {
  name: string
  icon: string
  onChange?: (name: string) => void
}

const CategoryInfo: FC<CategoryInfoProps> = (props) => {
  const {name, icon, onChange} = props
  const handleChange = (e: ChangeEvent) => {
    onChange && onChange((e.target as HTMLInputElement).value)
  }
  return (
    <Wrapper>
      <IconWrapper>
        <Icon className="icon" size="24px" id={icon}/>
      </IconWrapper>
      <NameInput type="text" value={name} onChange={handleChange} placeholder="分类名称"/>
    </Wrapper>
  )
}

export default CategoryInfo
